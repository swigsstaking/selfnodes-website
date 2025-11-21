/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f4f6',
          100: '#e1e5e9',
          200: '#c8ced5',
          300: '#a3acb9',
          400: '#7a8799',
          500: '#5c697c',
          600: '#485263',
          700: '#3b4351',
          800: '#1a1d24', // Dark background equivalent
          900: '#0f1115',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Purple accent like in the site
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          50: '#fdfcf9',
          100: '#f9f6f0',
          200: '#f3ede1',
          300: '#ebe0cc',
          400: '#d9c5a3', // Beige/crème doux
          500: '#c4a574',
          600: '#a88a5f',
          700: '#8b7050',
          800: '#6f5a42',
          900: '#5a4936',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
