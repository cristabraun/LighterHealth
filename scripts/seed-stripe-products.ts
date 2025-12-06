import { getUncachableStripeClient } from '../server/stripeClient';

async function seedProducts() {
  console.log('Creating Lighter subscription product in Stripe...');
  
  const stripe = await getUncachableStripeClient();

  const existingProducts = await stripe.products.search({
    query: "name:'Lighter Premium'"
  });

  if (existingProducts.data.length > 0) {
    console.log('Lighter Premium product already exists:', existingProducts.data[0].id);
    
    const prices = await stripe.prices.list({
      product: existingProducts.data[0].id,
      active: true,
    });
    
    if (prices.data.length > 0) {
      console.log('Price already exists:', prices.data[0].id);
      console.log('Price: $' + (prices.data[0].unit_amount! / 100) + '/month');
      return;
    }
  }

  const product = await stripe.products.create({
    name: 'Lighter Premium',
    description: 'Pro-metabolic health tracking and coaching for women. Daily vital tracking, personalized experiments, AI coach access, and comprehensive metabolic insights.',
    metadata: {
      app: 'lighter',
      features: 'daily_tracking,experiments,ai_coach,insights,food_logging',
    },
  });

  console.log('Created product:', product.id);

  const monthlyPrice = await stripe.prices.create({
    product: product.id,
    unit_amount: 1900,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    metadata: {
      plan: 'monthly',
      trial_days: '3',
    },
  });

  console.log('Created monthly price:', monthlyPrice.id);
  console.log('Price: $19.00/month with 3-day trial');
  console.log('');
  console.log('Setup complete! The webhooks will sync these to your database automatically.');
  console.log('');
  console.log('Use this price ID for checkout:', monthlyPrice.id);
}

seedProducts().catch(console.error);
