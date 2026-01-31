// Dark Theme Design System
// A cohesive dark premium theme for the Lighter app

export const theme = {
  // Core backgrounds
  background: {
    primary: '#0D0D0D',    // Main app background
    secondary: '#111111',  // Alternative background
    card: '#1A1A1A',       // Card/surface background
    elevated: '#222222',   // Elevated surfaces
  },

  // Text colors
  text: {
    primary: '#F2F2F2',    // Primary text
    secondary: '#C7C7C7',  // Secondary/muted text
    tertiary: '#888888',   // Tertiary text
    disabled: '#555555',   // Disabled text
  },

  // Accent color - warm amber
  accent: {
    primary: '#F5A623',    // Primary accent (warm amber)
    secondary: '#E09000',  // Darker amber for pressed states
    muted: 'rgba(245, 166, 35, 0.15)', // Muted accent for backgrounds
  },

  // Border colors
  border: {
    primary: '#333333',    // Primary borders
    secondary: '#2A2A2A',  // Secondary/subtle borders
    focus: '#F5A623',      // Focus state border
  },

  // Status colors
  status: {
    error: '#EF4444',
    errorBg: 'rgba(239, 68, 68, 0.15)',
    success: '#22C55E',
    successBg: 'rgba(34, 197, 94, 0.15)',
    warning: '#F59E0B',
    warningBg: 'rgba(245, 158, 11, 0.15)',
    info: '#3B82F6',
    infoBg: 'rgba(59, 130, 246, 0.15)',
  },

  // Category colors (for experiments, logs, etc.)
  category: {
    temperature: '#EF4444',
    pulse: '#EC4899',
    energy: '#22C55E',
    sleep: '#8B5CF6',
    digestion: '#22C55E',
    mood: '#EC4899',
    nutrition: '#3B82F6',
    stress: '#F59E0B',
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Border radius
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
  },

  // Shadows (subtle for dark mode)
  shadow: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
    accent: {
      shadowColor: '#F5A623',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  },
} as const;

// Tailwind class helpers for the dark theme
export const tw = {
  // Backgrounds
  bgPrimary: 'bg-[#0D0D0D]',
  bgSecondary: 'bg-[#111111]',
  bgCard: 'bg-[#1A1A1A]',
  bgElevated: 'bg-[#222222]',

  // Text
  textPrimary: 'text-[#F2F2F2]',
  textSecondary: 'text-[#C7C7C7]',
  textTertiary: 'text-[#888888]',

  // Borders
  borderPrimary: 'border-[#333333]',
  borderSecondary: 'border-[#2A2A2A]',

  // Accent
  accentBg: 'bg-[#F5A623]',
  accentText: 'text-[#F5A623]',
  accentBgMuted: 'bg-[#F5A623]/15',
} as const;

// Gradient colors for buttons
export const gradients = {
  accent: ['#F5A623', '#E09000'] as const,
  accentPressed: ['#E09000', '#C07800'] as const,
  disabled: ['#555555', '#444444'] as const,
} as const;
