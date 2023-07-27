module.exports = {
  purge: ["./src/**/*.svelte", "./src/**/*.ts", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        separator: "#EEF6FA",
        primary: "#86AAF9",
        "primary-text": "#000000",
        "secondary-text": "#454545",
        "over-text": "#ffffff",
        success: "#4CAF50",
      },
      fontFamily: {
        sans: ["Inter"],
        headings: ["Inter"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
