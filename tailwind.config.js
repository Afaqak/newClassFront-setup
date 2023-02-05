/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      xs: '370px',
      sm: '480px',
      md: '760px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: '#7380ec',
        danger: '#ff7782',
        success: '#41f1b6',
        warning: '#f1c041',
        infodark: '#7d8da1',
        infolight: '#dce1eb',
        colordark: '#363949',
        colorlight: 'rgba(132,139,200,0.18)',
        colorPrimaryVariant: '#111e88',
        colorDarkVariant: '#677483',
        colorBackground: '#f6f6f9',
      },
    },
  },
};
