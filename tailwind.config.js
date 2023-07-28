/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      purple: {
        100: '#fddbff',
        200: '#f892ff',
        300: '#f349ff',
        400: '#ee00ff',
        500: '#aa00b6',
        600: '#66006d',
        700: '#38003c'
      },
      green: {
        100: '#dbffee',
        200: '#92ffcb',
        300: '#49ffa8',
        400: '#00ff85',
        500: '#00b65f',
        600: '#006d39',
        700: '#002413',
      },
      red: {
        100: '#ffdbe7',
        200: '#ff92b8',
        300: '#ff4989',
        400: '#e90052',
        500: '#b60040',
        600: '#6d0026',
        700: '#24000d',
      },
      teal: {
        100: '#dbfeff',
        200: '#92fbff',
        300: '#49f8ff',
        400: '#04f5ff',
        500: '#00afb6',
        600: '#00696d',
        700: '#002324',
      },
      white: {
        100: '#ffffff',
        200: '#c8c8c8',
        300: '#a4a4a4',
        400: '#808080',
        500: '#5b5b5b',
        600: '#373737',
        700: '#121212',
      }
    }),
    extend: {
      colors: {
        purple: {
          100: '#fddbff',
          200: '#f892ff',
          300: '#f349ff',
          400: '#ee00ff',
          500: '#aa00b6',
          600: '#66006d',
          700: '#38003c'
        },
        green: {
          100: '#dbffee',
          200: '#92ffcb',
          300: '#49ffa8',
          400: '#00ff85',
          500: '#00b65f',
          600: '#006d39',
          700: '#002413',
        },
        red: {
          100: '#ffdbe7',
          200: '#ff92b8',
          300: '#ff4989',
          400: '#e90052',
          500: '#b60040',
          600: '#6d0026',
          700: '#24000d',
        },
        teal: {
          100: '#dbfeff',
          200: '#92fbff',
          300: '#49f8ff',
          400: '#04f5ff',
          500: '#00afb6',
          600: '#00696d',
          700: '#002324',
        },
        white: {
          100: '#ffffff',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '##808080',
          500: '#5b5b5b',
          600: '#373737',
          700: '#121212',
        }
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#38003c",

          "secondary": "#00ff85",

          "accent": "#04f5ff",

          "neutral": "#2b3440",

          "base-100": "#ffffff",

          "info": "#04f5ff",

          "success": "#00ff85",

          "warning": "#e90052",

          "error": "#e90052",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
