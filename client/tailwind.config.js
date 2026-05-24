// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'disaster-bg': '#0F0E17',
        'disaster-text': '#FFFFFE',
        'disaster-primary': '#FF8906',
        'disaster-secondary': '#F25F4C',
        'disaster-accent': '#E53170',
        'disaster-muted': '#A7A9BE',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}