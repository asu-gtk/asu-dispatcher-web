/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mining: {
          dark: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          accent: '#f59e0b',
          success: '#10b981',
          warning: '#f97316',
          danger: '#ef4444'
        }
      }
    },
  },
  plugins: [],
}
