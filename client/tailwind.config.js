module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // customLight: "#ffffff",
        // customDark: "#000000",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          // primary: "#4f46e5", // Primary color for the theme
          // secondary: "#9333ea", // Secondary color for the theme
          // accent: "#fbbf24", // Accent color for the theme
          // neutral: "#2a2e37", // Neutral color for the theme
          // "base-100": "#ffffff", // Background color for light theme
          // "base-200": "#f4f4f5", // Light background for dark theme
          // "base-content": "#000000", // Text color for light theme
          // "base-100-dark": "#000000", // Background color for dark theme
          // "base-content-dark": "#ffffff", // Text color for dark theme
        },
      },
      "light",
      "dark",
    ],
  },
};
