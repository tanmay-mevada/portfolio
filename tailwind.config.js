/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark1: "#0D0D0D",
        dark2: "#021526",
        blue: "#1E90FF",
        gr: "#149414",
      },
      animation: {
        "slow-pulse": "pulse 6s ease-in-out infinite",
        glow: "glowPulse 8s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": {
            boxShadow: "0px 0px 50px rgba(59,130,246,0.4)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(59,130,246,0.8)",
          },
        },
      },
      fontFamily: {
        mono: ["Fira Code", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
