/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c7a7a',
        secondary: '#1c7a7a', // using teal for both primary/secondary like Gazelle
        highlight: '#deff5f',
        gold: '#c9a84c',
        dark: '#131415',
        smoke: '#f5f5f5',
        teal: '#1c7a7a',
        lime: '#deff5f'
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      borderRadius: {
        'button': '5px',
      }
    },
  },
  plugins: [],
}
