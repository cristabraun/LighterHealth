import { Platform } from 'react-native';
import Purchases, {
  LOG_LEVEL,
  type CustomerInfo,
  type PurchasesOffering,
  type PurchasesPackage,
} from 'react-native-purchases';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/stores/authStore';

export const SUBSCRIPTION_TITLE = 'Lighter Premium Monthly';
export const SUBSCRIPTION_PRICE = '$4.99/month after free trial';
export const SUBSCRIPTION_LENGTH = 'Monthly subscription';
export const PRIVACY_URL = 'https://getlighterapp.com/privacy';
export const TERMS_URL = 'https://getlighterapp.com/terms';
export const APPLE_EULA_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

const ENTITLEMENT_ID = process.env.EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID ?? 'premium';
const IOS_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY;
const ANDROID_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY;

let configuredForUserId: string | null = null;

function getRevenueCatKey() {
  if (Platform.OS === 'ios') return IOS_API_KEY;
  if (Platform.OS === 'android') return ANDROID_API_KEY;
  return IOS_API_KEY ?? ANDROID_API_KEY;
}

export function isRevenueCatConfigured() {
  return Boolean(getRevenueCatKey());
}

async function configurePurchases(appUserId?: string | null) {
  const apiKey = getRevenueCatKey();
  if (!apiKey) {
    throw new Error('Subscription setup is missing for this build.');
  }

  const userKey = appUserId ?? 'anonymous';
  if (configuredForUserId === userKey) return;

  Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.WARN);
  Purchases.configure({ apiKey, appUserID: appUserId ?? undefined });
  configuredForUserId = userKey;
}

function hasActiveEntitlement(customerInfo?: CustomerInfo | null) {
  return Boolean(customerInfo?.entitlements.active[ENTITLEMENT_ID]);
}

function userHasServerSubscription(user: ReturnType<typeof useUser>) {
  return user?.subscriptionStatus === 'active' || user?.subscriptionStatus === 'trialing';
}

export function getMonthlyPackage(offering?: PurchasesOffering | null): PurchasesPackage | null {
  if (!offering) return null;
  return (
    offering.monthly ??
    offering.availablePackages.find((pkg) =>
      pkg.product.identifier.toLowerCase().includes('month')
    ) ??
    offering.availablePackages[0] ??
    null
  );
}

export function packagePriceText(pkg?: PurchasesPackage | null) {
  return pkg?.product.priceString ? `${pkg.product.priceString}/month after free trial` : SUBSCRIPTION_PRICE;
}

export function useSubscription() {
  const user = useUser();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['subscription', user?.id],
    retry: 1,
    queryFn: async () => {
      await configurePurchases(user?.id);
      const [customerInfo, offerings] = await Promise.all([
        Purchases.getCustomerInfo(),
        Purchases.getOfferings(),
      ]);

      return {
        customerInfo,
        offering: offerings.current,
        monthlyPackage: getMonthlyPackage(offerings.current),
      };
    },
  });

  const purchaseMutation = useMutation({
    mutationFn: async (pkg: PurchasesPackage) => {
      await configurePurchases(user?.id);
      return Purchases.purchasePackage(pkg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async () => {
      await configurePurchases(user?.id);
      return Purchases.restorePurchases();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });

  const isPremium = userHasServerSubscription(user) || hasActiveEntitlement(query.data?.customerInfo);

  return {
    ...query,
    isPremium,
    monthlyPackage: query.data?.monthlyPackage ?? null,
    purchaseMutation,
    restoreMutation,
  };
}
