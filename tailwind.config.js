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
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      screens: {
        mdx: { max: "767px" },
        fix: { min: "1100px" },
        lgs: { min: "974px" },
      },
      backgroundImage: {
        "hero-pattern":
          "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/svg%3E)",
      },
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      serif: ["Optician Sans", ...defaultTheme.fontFamily.serif],
    },
    transitionTimingFunction: {
      "out-circ": "cubic-bezier(0,0.55,0.45,1)",
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
