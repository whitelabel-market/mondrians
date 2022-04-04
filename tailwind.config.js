const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        reddish: "#E40E16",
        yellowish: "#FCDA19",
        blue: "#268AEE",
        dropdown: "#F1F8FF",
      },
      fontFamily: {
        sans: ["inter", ...defaultTheme.fontFamily.sans],
        serif: ["Birthstone Bounce", ...defaultTheme.fontFamily.serif],
      },
      screens: {
        mdx: { max: "767px" },
        fix: { min: "1100px" },
        lgs: { min: "974px" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
