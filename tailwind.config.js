/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(0deg, rgba(0,48,85,1) 0%, rgba(0,91,162,1) 35%, rgba(0,91,162,1) 65%, rgba(0,48,85,1) 100%)',
      },
    },
  },
  plugins: [],
};