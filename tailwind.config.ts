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
      spacing: {
        13: '3.25rem', // 52px
      },
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
          50: '#EBF6F9',
          100: '#D4ECF2',
          200: '#A9D8E5',
          300: '#7DC4D7',
          400: '#50AABF',
          500: '#2091AA', // Beruang Primary Blue (Container Biru Beranda)
          600: '#1A7A8F',
          700: '#156374',
          800: '#104D5A',
          900: '#0C3943',
          950: '#07232A',
          tint: 'rgba(32, 145, 170, 0.08)',
        },
        success: {
          DEFAULT: '#00AA13', // GoPay Fresh Growth Green (30% Sekunder)
          light: '#F0FDF4',
          dark: '#00880C',
        },
        gopay: {
          blue: '#2091AA',
          'blue-deep': '#1A7A8F',
          green: '#00AA13',
          'green-deep': '#00880C',
          cyan: '#50AABF',
          canvas: '#F3F8FC',
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
        poppins: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        dm: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Poppins"', 'monospace'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        tighter: '0',
        tight: '0',
        normal: '0',
        wide: '0',
        wider: '0',
        widest: '0',
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
