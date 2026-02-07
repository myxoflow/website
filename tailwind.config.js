/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
        },
        primary: {
          DEFAULT: '#6366F1',
          500: '#6366F1',
          400: '#818CF8',
          300: '#A5B4FC',
        },
        electric: {
          DEFAULT: '#0EA5E9',
        },
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15,23,42,0.6)',
        insetGlass: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 500ms ease-out',
        'fade-up-slow': 'fade-up 700ms ease-out',
        'fade-in': 'fade-in 400ms ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
