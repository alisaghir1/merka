/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#6b7f95',
          600: '#56657a',
          700: '#434d5e',
          800: '#2f3541',
          900: '#041533',
          950: '#031124',
        },
        secondary: {
          50: '#faf9f7',
          100: '#f3f1ec',
          200: '#e8e3d8',
          300: '#ddd4c4',
          400: '#d2c5b0',
          500: '#c7b69c',
          600: '#b8a488',
          700: '#a99274',
          800: '#998160',
          900: '#877051',
          950: '#6b5a40',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}