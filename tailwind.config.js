/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 4px 3px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'poppins': ['Poppins'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
            width: '0px',
          }
        }
      })
    }
  ]
}