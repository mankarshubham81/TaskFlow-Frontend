/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

  },
  plugins: [],
};

// module.exports = {
//   darkMode: 'class',
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: '#3B82F6',
//           dark: '#2563EB'
//         },
//         secondary: {
//           DEFAULT: '#6366F1',
//           dark: '#4F46E5'
//         }
//       }
//     }
//   }
// }
