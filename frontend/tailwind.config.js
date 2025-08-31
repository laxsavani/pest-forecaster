
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#2563eb",
        ink: "#111827"
      },
      boxShadow: {
        smooth: "0 10px 30px rgba(0,0,0,.08)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: []
}
