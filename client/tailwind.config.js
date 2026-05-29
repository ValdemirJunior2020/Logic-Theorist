/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        display: ['Georgia', 'serif']
      },
      animation: {
        ring: 'ring 0.45s infinite',
        flicker: 'flicker 2s infinite',
        shake: 'shake 0.4s infinite',
        pop: 'pop 0.25s ease-out'
      },
      keyframes: {
        ring: { '0%,100%': { transform: 'rotate(-5deg)' }, '50%': { transform: 'rotate(6deg)' } },
        flicker: { '0%,100%': { opacity: '1' }, '45%': { opacity: '.75' }, '50%': { opacity: '.95' } },
        shake: { '0%,100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-3px)' }, '75%': { transform: 'translateX(3px)' } },
        pop: { '0%': { transform: 'scale(.9)', opacity: '.4' }, '100%': { transform: 'scale(1)', opacity: '1' } }
      }
    }
  },
  plugins: []
}
