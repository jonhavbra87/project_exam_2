/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Rubik', 'sans-serif'],
        body: ['Marcellus', 'serif'],
        ingress: ['Crete Round', 'serif'],
        label: ['Crete Round', 'serif'],
      },
      fontSize: {
        // Headings
        'h1-desktop': ['64px', { lineHeight: '80px', letterSpacing: '-0.03125em' }],
        'h2-desktop': ['40px', { lineHeight: '48px', letterSpacing: '-0.01563em' }],
        'h3-desktop': ['24px', { lineHeight: '32px', letterSpacing: '0' }],

        'h1-mobile': ['48px', { lineHeight: '60px', letterSpacing: '-0.03125em' }],
        'h2-mobile': ['32px', { lineHeight: '40px', letterSpacing: '-0.01563em' }],
        'h3-mobile': ['20px', { lineHeight: '28px', letterSpacing: '0' }],

        // Ingress
        'ingress-desktop': ['20px', { lineHeight: '28px', letterSpacing: '0' }],
        'ingress-mobile': ['16px', { lineHeight: '24px', letterSpacing: '0' }],

        // Body text
        'body-large-desktop': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'body-medium-desktop': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
        'body-small-desktop': ['12px', { lineHeight: '16px', letterSpacing: '0' }],

        'body-large-mobile': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
        'body-small-mobile': ['12px', { lineHeight: '16px', letterSpacing: '0' }],

        // Buttons
        'button-primary-desktop': ['14px', { lineHeight: '20px', letterSpacing: '0.0625em' }],
        'button-secondary-desktop': ['14px', { lineHeight: '20px', letterSpacing: '0.0625em' }],

        'button-primary-mobile': ['12px', { lineHeight: '16px', letterSpacing: '0.0625em' }],
        'button-secondary-mobile': ['12px', { lineHeight: '16px', letterSpacing: '0.0625em' }],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      colors: {
        primary: {
          DEFAULT: '#49106B',
          2: '#340C52',
          3: '#220840',
        },
        secondary: {
          DEFAULT: '#7E30E1',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#F9FBFE',
          200: '#F4F6FA',
          300: '#ECEFF4',
          400: '#DCE1E9',
          500: '#C8CFD9',
          600: '#B3BAC6',
          700: '#8A8A8A',
          800: '#6A6A6A',
          900: '#3A3A3A',
        },
        accent: {
          DEFAULT: '#E26EE5',
          2: '#ECA5E6',
          3: '#FFA500',
          4: '#FFD700',
          discount: '#4CAF50',
          link: '#00796B',
        },
        status: {
          success: '#28A745',
          warning: '#FFC107',
          error: '#DC3545',
          info: '#17A2B8',
        },
        button: {
          primary: '#7E30E1',
          secondary: '#E26EE5',
          hover: '#5D0EAD',
          hoverSecondary: '#C850C0',
          disabled: '#B3BAC6',
        },
        background: {
          DEFAULT: '#F9FAFB',
          secondary: '#ECEFF4',
        },
        text: {
          primary: '#1F1F1F',
          secondary: '#6A6A6A',
          muted: '#8A8A8A',
          contrast: '#FFFFFF',
        },
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
