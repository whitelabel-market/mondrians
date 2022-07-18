const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      mdx: { max: "767px" },
      md: "768px",
      lgs: { min: "974px" },
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        crimson: {
          DEFAULT: "#E40E16",
          50: "#FAAFB2",
          100: "#F99CA0",
          200: "#F7767B",
          300: "#F44F56",
          400: "#F22930",
          500: "#E40E16",
          600: "#AF0B11",
          700: "#7A080C",
          800: "#450407",
          900: "#110102",
        },
        candlelight: {
          DEFAULT: "#FCDA19",
          50: "#FEF7CE",
          100: "#FEF4BA",
          200: "#FEED92",
          300: "#FDE76A",
          400: "#FDE041",
          500: "#FCDA19",
          600: "#DABA03",
          700: "#A38B02",
          800: "#6B5B01",
          900: "#342C01",
        },
        dodgerblue: {
          DEFAULT: "#268AEE",
          50: "#D0E6FB",
          100: "#BDDCFA",
          200: "#98C7F7",
          300: "#72B3F4",
          400: "#4C9EF1",
          500: "#268AEE",
          600: "#106ECC",
          700: "#0C5298",
          800: "#083664",
          900: "#041A30",
        },
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      fontSize: {
        xxs: ".6rem",
      },
      backgroundImage: {
        "hero-pattern-charlie":
          "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/svg%3E)",
        "hero-pattern-token":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23E5E5E5' fill-opacity='0.4' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "dark-hero-pattern-token":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23E5E5E5' fill-opacity='0.02' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    transitionTimingFunction: {
      "out-circ": "cubic-bezier(0,0.55,0.45,1)",
      "in-circ": "cubic-bezier(0.55, 0, 1, 0.45)",
    },
    animation: {
      pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      bounce: "bounce 1s infinite",
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
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          ["animation-timing-function"]: "cubic-bezier(0, 0, 0.2, 1)",
        },
        "50%": {
          transform: "translateY(0)",
          ["animation-timing-function"]: "cubic-bezier(0.8, 0, 1, 1)",
        },
      },
    },
    transitionProperty: {
      height: "height",
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addVariant }) {
      addVariant(
        "hover",
        "@media (hover: hover) and (pointer: fine) { &:hover }"
      );
      addVariant(
        "group-hover",
        "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }"
      );
      addVariant(
        "peer-hover",
        "@media (hover: hover) and (pointer: fine) { :merge(.peer):hover ~ & }"
      );
    },
  ],
};
