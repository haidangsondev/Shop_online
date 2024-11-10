/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      gridRow: {
        "span-7": "span 7 / span 7",
      },
      gridTemplateRows: {
        // Simple 16 row grid
        10: "repeat(10, minmax(0, 1fr))",

        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#1C3341",
      },
      colors: {
        main: "#1C3341",
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
      },
      keyframes: {
        "slide-top": {
          "0% ": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
          "100% ": {
            "-webkit-transform": "translateY(-10px)",
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
    listStyleType: {
      square: "square",
      roman: "upper-roman",
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
