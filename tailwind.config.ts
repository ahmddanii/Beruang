import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: '#0F1014',
          light: '#FFFFFF',
        },
        sidebar: {
          light: '#FAFAFA',
          dark: '#141519',
        },
        surface: {
          dark: '#18191E',
          '2-dark': '#1D1E24',
          light: '#FFFFFF',
          subtle: '#FAFAFA',
          '2-light': '#F4F4F6',
        },
        border: {
          dark: '#26272F',
          light: '#EAEAEA',
          subtle: '#F0F0F2',
        },
        text: {
          'primary-dark': '#F9FAFB',
          'secondary-dark': '#9CA3AF',
          'muted-dark': '#6B7280',
          'primary-light': '#111827',
          'secondary-light': '#4B5563',
          'muted-light': '#9CA3AF',
        },
        primary: {
          50: '#EEF3FE',
          100: '#D8E4FD',
          200: '#B4CBFC',
          300: '#82ABFA',
          400: '#4B82F6',
          500: '#1F52EB', // Solid Accent Blue (Zero Gradient)
          600: '#173FC7',
          700: '#1332A3',
          800: '#132B84',
          900: '#14276E',
          950: '#0D1845',
          tint: 'rgba(31, 82, 235, 0.08)',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#ECFDF5',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FFFBEB',
          dark: '#D97706',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FEF2F2',
          dark: '#DC2626',
        },
        gold: {
          DEFAULT: '#FED440',
          light: '#FEF8E3',
          dark: '#D4AA0B',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F6',
          200: '#EAEAEA',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#0F1014',
        },
      },
      fontFamily: {
        dm: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '22px',
        '3xl': '28px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.02)',
        card: '0 1px 3px rgba(0, 0, 0, 0.02)',
        subtle: '0 1px 2px rgba(0, 0, 0, 0.03)',
        dropdown: '0 4px 16px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 1px 3px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config
