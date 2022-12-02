const px0_100 = {...Array.from(Array(101)).map((_, i) => `${i}px`)};
const px0_1000 = {...Array.from(Array(1001)).map((_, i) => `${i}px`)};
const number0_1000 = {...Array.from(Array(1001)).map((_, i) => `${i}`)};
const px0_2000 = {...Array.from(Array(2001)).map((_, i) => `${i}px`)};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './components/**/*.{jsx,tsx}'],
  theme: {
    colors: {
      red1: '#ed7272',
      gray1: '#e3dede',
    },
    extend: {
      padding: px0_1000,
      borderRadius: px0_100,
      width: px0_2000,
      height: px0_1000,
      gap: px0_1000,
      fontSize: px0_100,
      fontWeight: number0_1000,
      borderWidth: px0_100,
      margin: px0_1000,
      maxWidth: px0_2000,
      zIndex: number0_1000,
    },
  },
  plugins: [],
};
