/** @type {import('tailwindcss').Config} */
export default {
  content:["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scroll: "scroll 15s linear infinite",// Applying scroll animation
      },
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(100%)", // Start at the right side of the screen
          },
          "100%": {
            transform: "translateX(-100%)", // End at the left side of the screen
          },
        },
      },
    },
  },
  plugins: [],
}

