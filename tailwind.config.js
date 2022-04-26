const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        reddish: "#E40E16",
        yellowish: "#FCDA19",
        blueish: "#268AEE",
        dropdown: "#F1F8FF",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        serif: ["Birthstone Bounce", ...defaultTheme.fontFamily.serif],
      },
      screens: {
        mdx: { max: "767px" },
        fix: { min: "1100px" },
        lgs: { min: "974px" },
      },
    },
    animation: {
      pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    },
    keyframes: {
      pulse: {
        "0%, 100%": {
          opacity: 0.2,
        },
        "50%": {
          opacity: 1,
        },
      },
      ping: {
        "75%, 100%": {
          transform: "scale(2)",
          opacity: 0,
        },
      },
    },
    transitionProperty: {
      height: "height",
    },
  },
  plugins: [require("@tailwindcss/forms")],
  variants: {
    border: ["hover"],
  },
};
