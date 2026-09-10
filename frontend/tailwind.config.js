/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stormy: {
          muted: "#6A89A7",
          light: "#BDDDFC",
          sky: "#88BDF2",
          dark: "#384959",
          slate: "#273440",
          surface: "#F4F7FB",
          card: "#FFFFFF",
        },
        status: {
          present: "#22C55E",
          late: "#F59E0B",
          absent: "#EF4444",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(56, 73, 89, 0.08), 0 1px 4px -1px rgba(56, 73, 89, 0.04)',
        'soft-lg': '0 10px 25px -4px rgba(56, 73, 89, 0.12), 0 4px 10px -2px rgba(56, 73, 89, 0.06)',
      }
    },
  },
  plugins: [],
}
