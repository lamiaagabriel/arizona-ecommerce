/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px'
      //   mobile: "640px",
      //   tablet: "960px",
      //   desktop: "1280px",
      },
      container: {
        center: true,
        padding: '1rem'
      }
    },
  },
  plugins: [],
}