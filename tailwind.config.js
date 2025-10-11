/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F9EAEA",
          100: "#F3D6D6",
          200: "#E7ADAD",
          300: "#DD282814",
          400: "#CE5C5C",
          500: "#C23333", // main tone (use for primary backgrounds)
          600: "#912525",
          700: "#611818",
          800: "#490C0C", // your core color
          900: "#2E0707",
        },
      },
    },
  },
  plugins: [],
}

