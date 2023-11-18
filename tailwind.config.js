/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pending: "#FF8F00",
        paid: "#33D69F",
        draft: "#373B53",
      },
    },
  },
};
