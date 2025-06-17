export default {
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        fadeOut: "fadeOut 0.5s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", visibility: "hidden" },
          "100%": { opacity: "1", visibility: "visible" },
        },
        fadeOut: {
          "0%": { opacity: "1", visibility: "visible" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
      },
    },
  },
};
