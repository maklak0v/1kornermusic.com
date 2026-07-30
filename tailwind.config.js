/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#050505',
          950: '#0a0a0b',
          900: '#0f0f11',
          800: '#16161a',
          700: '#1f1f24',
        },
        bone: {
          DEFAULT: '#e8e4dc',
          100: '#f4f1ea',
          200: '#e8e4dc',
          300: '#d6d1c6',
          400: '#b8b2a4',
        },
        ash: {
          DEFAULT: '#6b6863',
          400: '#8a8780',
          500: '#6b6863',
          600: '#524f4a',
        },
        silver: {
          DEFAULT: '#aeb0b3',
          300: '#c7c9cb',
          500: '#aeb0b3',
          700: '#7d7f82',
        },
        ember: {
          DEFAULT: '#7a1f1f',
          600: '#5c1717',
          700: '#3f1010',
        },
        amberf: {
          DEFAULT: '#b8843f',
          500: '#a8762f',
          600: '#8a5e26',
        },
        screenblue: {
          DEFAULT: '#2b3a55',
          500: '#2b3a55',
          600: '#1e2a3f',
        },
      },
      fontFamily: {
        'nemoy-thin': ['var(--font-nemoy-thin)', 'var(--font-fallback)', 'sans-serif'],
        'nemoy-med': ['var(--font-nemoy-medium)', 'var(--font-fallback)', 'sans-serif'],
        'nemoy-black': ['var(--font-nemoy-black)', 'var(--font-fallback)', 'sans-serif'],
        fallback: ['var(--font-fallback)', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.35em',
        extreme: '0.5em',
      },
      animation: {
        'slow-zoom': 'slowzoom 20s ease-in-out infinite alternate',
        'grain': 'grain 0.6s steps(4) infinite',
        'flicker': 'flicker 4s linear infinite',
        'pulse-slow': 'pulseslow 3s ease-in-out infinite',
      },
      keyframes: {
        slowzoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-2%, -3%)' },
          '50%': { transform: 'translate(-1%, 2%)' },
          '75%': { transform: 'translate(2%, -1%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '48%': { opacity: '1' },
          '49%': { opacity: '0.4' },
          '50%': { opacity: '1' },
          '52%': { opacity: '0.7' },
          '53%': { opacity: '1' },
        },
        pulseslow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
