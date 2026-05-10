// Set-Content -Path ;"tailwind.config.js" -Value 
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#0EA5E9',
//         'primary-dark': '#0284C7',
//         'primary-light': '#7DD3FC',
//         accent: '#F97316',
//         'accent-light': '#FDBA74',
//         sand: '#FEF3C7',
//       },
//       fontFamily: {
//         sans: ['Inter', 'system-ui', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9",
        "primary-dark": "#0284C7",
        accent: "#F97316",
      },
    },
  },
  plugins: [],
}
