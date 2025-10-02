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
        "float": "float 3s ease-in-out infinite",
        "glass-shimmer": "glassShimmer 2s ease-in-out infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-2px)" },
        },
        glassShimmer: {
          "0%": { 
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
          },
          "50%": { 
            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)"
          },
          "100%": { 
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
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
