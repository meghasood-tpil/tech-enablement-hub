/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'Salesforce Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        sf: {
          blue: {
            15: '#001E5B',
            30: '#022AC0',
            50: '#066AFE',
            80: '#A8CBFF',
            95: '#EDF4FF',
          },
          cloud: {
            20: '#023248',
            40: '#05628A',
            60: '#00B3FF',
            80: '#90D0FE',
            95: '#EAF5FE',
          },
          teal: {
            20: '#023434',
            40: '#056764',
            60: '#06A59A',
            80: '#04E1CB',
            95: '#DEF9F3',
          },
          yellow: {
            20: '#4F2100',
            50: '#A86403',
            70: '#E4A201',
            80: '#FCC003',
            95: '#FBF3E0',
          },
          pink: {
            20: '#61022A',
            40: '#B60554',
            60: '#FF538A',
            70: '#FE8AA7',
            95: '#FEF0F3',
          },
          violet: {
            20: '#481A54',
            30: '#730394',
            50: '#BA01FF',
            65: '#D17DFE',
            95: '#F9F0FF',
          },
          orange: {
            30: '#5F3E02',
            50: '#A96404',
            65: '#F38303',
            80: '#FFBA90',
            95: '#FFF1EA',
          },
          green: {
            20: '#1C3326',
            50: '#2E844A',
            70: '#45C65A',
            80: '#91DB8B',
            95: '#EBF7E6',
          },
          purple: {
            20: '#401075',
            40: '#7526E3',
            60: '#AD7BEE',
            70: '#C29EF1',
            95: '#F6F2FB',
          },
          indigo: {
            20: '#321D71',
            30: '#2F2CB7',
            50: '#5867E8',
            70: '#9EA9F1',
            95: '#F1F3FB',
          },
          'hot-orange': {
            30: '#7E2600',
            60: '#FF5D2D',
            70: '#FF906E',
            95: '#FEF1ED',
          },
          gray: {
            95: '#F3F3F3',
            80: '#DDDBDA',
            60: '#706E6B',
          },
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
        nav: '0 1px 0 rgba(0, 0, 0, 0.08)',
        elevated: '0 20px 40px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
