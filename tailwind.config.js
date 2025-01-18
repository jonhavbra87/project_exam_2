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
        'h1-desktop': [
          '64px',
          { lineHeight: '80px', letterSpacing: '-0.5px', fontWeight: '700' },
        ],
        'h2-desktop': [
          '40px',
          { lineHeight: '48px', letterSpacing: '-0.25px', fontWeight: '700' },
        ],
        'h3-desktop': [
          '24px',
          { lineHeight: '32px', letterSpacing: '0px', fontWeight: '400' },
        ],

        'h1-mobile': [
          '48px',
          { lineHeight: '60px', letterSpacing: '-0.5px', fontWeight: '700' },
        ],
        'h2-mobile': [
          '32px',
          { lineHeight: '40px', letterSpacing: '-0.25px', fontWeight: '700' },
        ],
        'h3-mobile': [
          '20px',
          { lineHeight: '28px', letterSpacing: '0px', fontWeight: '400' },
        ],

        // Ingress
        'ingress-desktop': [
          '20px',
          { lineHeight: '28px', letterSpacing: '0px', fontWeight: '400' },
        ],
        'ingress-mobile': [
          '16px',
          { lineHeight: '24px', letterSpacing: '0px', fontWeight: '400' },
        ],

        // Body text
        'body-large-desktop': [
          '16px',
          { lineHeight: '24px', letterSpacing: '0px', fontWeight: '400' },
        ],
        'body-medium-desktop': [
          '14px',
          { lineHeight: '20px', letterSpacing: '0px', fontWeight: '400' },
        ],
        'body-small-desktop': [
          '12px',
          { lineHeight: '20px', letterSpacing: '0px', fontWeight: '400' },
        ],

        'body-large-mobile': [
          '14px',
          { lineHeight: '20px', letterSpacing: '0px', fontWeight: '400' },
        ],
        'body-small-mobile': [
          '12px',
          { lineHeight: '16px', letterSpacing: '0px', fontWeight: '400' },
        ],

        // Buttons
        'button-primary-desktop': [
          '14px',
          { lineHeight: '20px', letterSpacing: '1px', fontWeight: '700' },
        ],
        'button-secondary-desktop': [
          '14px',
          { lineHeight: '20px', letterSpacing: '1px', fontWeight: '400' },
        ],

        'button-primary-mobile': [
          '12px',
          { lineHeight: '16px', letterSpacing: '1px', fontWeight: '700' },
        ],
        'button-secondary-mobile': [
          '12px',
          { lineHeight: '16px', letterSpacing: '1px', fontWeight: '400' },
        ],

        // Menu
        'menu-main-desktop': [
          '14px',
          { lineHeight: '20px', letterSpacing: '0.5px', fontWeight: '700' },
        ],
        'menu-sub-desktop': [
          '12px',
          { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '400' },
        ],

        'menu-main-mobile': [
          '14px',
          { lineHeight: '20px', letterSpacing: '0.5px', fontWeight: '700' },
        ],
        'menu-sub-mobile': [
          '12px',
          { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '400' },
        ],

        // Labels
        'label-large-desktop': [
          '12px',
          { lineHeight: '16px', letterSpacing: '0px', fontWeight: '700' },
        ],
        'label-small-mobile': [
          '10px',
          { lineHeight: '14px', letterSpacing: '0px', fontWeight: '400' },
        ],

        // Splash screen
        'splash-large-desktop': [
          '48px',
          { lineHeight: '56px', letterSpacing: '-0.5px', fontWeight: '600' },
        ],
        'splash-small-mobile': [
          '32px',
          { lineHeight: '40px', letterSpacing: '-0.25px', fontWeight: '600' },
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#49106B', // Primary 01
          2: '#340C52', // Primary 02
          3: '#220840', // Primary 03
        },
        secondary: {
          DEFAULT: '#7E30E1', // Secondary 01
        },
        neutral: {
          50: '#FFFFFF', // Pure White
          100: '#F9FBFE', // Very Light Gray
          200: '#F4F6FA', // Extra Light Gray
          300: '#ECEFF4', // Light Gray
          400: '#F3F8FF', // Neutral 05 (Blueish White)
          500: '#DCE1E9', // Soft Gray
          600: '#C8CFD9', // Mid Gray
          700: '#B3BAC6', // Dark Gray
          800: '#8A8A8A', // Very Dark Gray
          900: '#3A3A3A', // Almost Black
        },
        accent: {
          DEFAULT: '#E26EE5', // Accent 01 (Pink)
          2: '#ECA5E6', // Accent 02 (Lighter Pink)
          3: '#FFA500', // New Accent (Orange)
          4: '#FFD700', // New Accent (Gold)
          discount: '#4CAF50', // Discount (Green)
          link: '#00BFA6', // Link Color (Turquoise)
        },
        status: {
          success: '#28A745', // Success Green
          warning: '#FFC107', // Warning Yellow
          error: '#DC3545', // Error Red
          info: '#17A2B8', // Info Blue
        },
        button: {
          primary: '#7E30E1', // Button Primary (Purple)
          secondary: '#E26EE5', // Button Secondary (Pink)
          hover: '#5D0EAD', // Hover Effect (Darker Purple)
          hoverSecondary: '#C850C0', // Hover for Secondary (Darker Pink)
          disabled: '#B3BAC6', // Disabled Button (Gray)
        },
        background: {
          DEFAULT: '#F9FAFB', // Background color
          secondary: '#ECEFF4', // Secondary Background
        },
        text: {
          primary: '#1F1F1F', // Primary text color
          secondary: '#6A6A6A', // Secondary text color
          muted: '#8A8A8A', // Muted text (for metadata)
          contrast: '#FFFFFF', // White for dark backgrounds
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
