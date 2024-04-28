/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        "montserrat": ['Montserrat', 'sans-serif'],
        "ubuntu": ['Ubuntu', 'sans-serif'],
        "poppins": ['Poppins', 'sans-serif'],
        "merriweather": ['Merriweather', 'sans-serif'],
        "quicksand": ['Quicksand', 'sans-serif'],
    } 
    },
  },
  plugins: [],
}