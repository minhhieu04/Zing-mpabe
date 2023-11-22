/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#E7ECEC",
        "main-200": "#DDE4E4",
        "main-300": "#CED9D9",
        "main-400": "#C0D8D8",
        "main-500": "#0E8080",
        "overlay-30": "rgba(0, 0, 0, 0.3)",
      },
      colors: {
        "main-100": "#E7ECEC",
        "main-200": "#DDE4E4",
        "main-300": "#CED9D9",
        "main-400": "#C0D8D8",
        "main-500": "#0E8080",
      },
      keyframes: {
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.5)",
            transform: "scale(0.5)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px)",
            transform: "translateX(-500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(300px)",
            transform: "translateX(300px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        dropdown: {
          "0%": {
            transform: "translateY(-20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": "translateX(300px)",
            transform: "translateX(300px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "rotate-center": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
        "rotate-center-pause": {
          "0%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
            "border-radius": "99999px",
          },
          "100%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
          },
        },
        "scale-up-image": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
          "100%": {
            "-webkit-transform": "scale(1.2)",
            transform: "scale(1.2)",
          },
        },
        "scale-down-image": {
          "0%": {
            "-webkit-transform": "scale(1.2)",
            transform: "scale(1.2)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
      },

      animation: {
        "scale-up-center":
          "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left":
          "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left2":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "rotate-center": "rotate-center 10s linear infinite",
        "rotate-center-pause": "rotate-center-pause 0.3s linear 1 both",
        "scale-up-image":
          "scale-up-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-down-image":
          "scale-down-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        dropdown: "dropdown 0.5s ease both",
      },
      flex: {
        4: "4 4 0%",
        6: "6 6 0%",
        3: "3 3 0%",
        7: "7 7 0%",
      },
    },

    screens: {
      1400: "1400px",
      1024: "1024px",
      840: "840px",
    },
  },
  plugins: [],
};
