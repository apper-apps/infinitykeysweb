/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0ebff',
          500: '#1a1a2e',
          600: '#16213e',
          700: '#0f3460',
          800: '#0a0a0f',
          900: '#000000'
        },
        accent: {
          400: '#ff6b8a',
          500: '#e94560',
          600: '#d63447'
        },
        success: '#00d4aa',
        warning: '#ffa940',
        error: '#ff4757',
        info: '#54a0ff'
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Arial Black', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-beat': 'pulse-beat 1s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(233, 69, 96, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(233, 69, 96, 0.6)' }
        },
        'pulse-beat': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
};