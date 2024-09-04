/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Fixel Text"', 'sans-serif'],
        secondary: ['"SF Pro Text"', 'sans-serif'],
        third: ['"Inter"', 'sans-serif'],
        font3: ['"SF Pro"', 'sans-serif'],
        font4: ['"Fixel Display"', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#06142E",
          "secondary": "#667183",
          "accent": "#005CF9",
          "neutral": "#06142E",
          "base-100": "#ECF8FF",
          "info": "#333E51",
          "error": "#FF4D4D",
        },
      },
    ],
  },
  plugins: [
    daisyui,
  ],
};