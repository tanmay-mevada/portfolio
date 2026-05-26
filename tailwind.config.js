/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark:  "#021526",      // main page bg (was missing — used everywhere as bg-dark)
        dark1: "#0D0D0D",
        dark2: "#021526",
        dark3: "#0a1f3a",      // NEW: slightly lighter card surface
        blue:  "#1E90FF",
        gr:    "#149414",
        // NEW semantic accents used in status badges etc.
        accent: {
          green:  "#10b981",   // completed
          amber:  "#f59e0b",   // partially working
          red:    "#ef4444",   // errors / delete
          purple: "#8b5cf6",   // optional future use
        },
      },
      backgroundImage: {
        // NEW: reusable gradients so you can do bg-hero, bg-card etc.
        "hero":       "linear-gradient(135deg, #021526 0%, #0a1f3a 50%, #021526 100%)",
        "card":       "linear-gradient(145deg, #060d18, #0a1628)",
        "blue-glow":  "radial-gradient(ellipse at center, rgba(30,144,255,0.15) 0%, transparent 70%)",
        "blue-line":  "linear-gradient(90deg, transparent, rgba(30,144,255,0.5), transparent)",
      },
      animation: {
        "slow-pulse":    "pulse 6s ease-in-out infinite",
        glow:            "glowPulse 8s ease-in-out infinite",
        float:           "float 3s ease-in-out infinite",
        "glass-shimmer": "glassShimmer 2s ease-in-out infinite",
        // NEW
        "fade-in":       "fadeIn 0.4s ease-out forwards",
        "slide-up":      "slideUp 0.45s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "border-glow":   "borderGlow 3s ease-in-out infinite",
        "scan-line":     "scanLine 4s linear infinite",   // retro matrix-style
        "shimmer":       "shimmer 2.5s linear infinite",  // skeleton loading
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0px 0px 50px rgba(30,144,255,0.4)" },
          "50%":      { boxShadow: "0 0 40px rgba(30,144,255,0.8)"     },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":      { transform: "translateY(-6px)" },
        },
        glassShimmer: {
          "0%":   { background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)" },
          "50%":  { background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)" },
          "100%": { background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)" },
        },
        // NEW
        fadeIn: {
          "0%":   { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%":   { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)"    },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(30,144,255,0.2)" },
          "50%":      { borderColor: "rgba(30,144,255,0.6)" },
        },
        scanLine: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
      fontFamily: {
        mono:    ["Fira Code", "Courier New", "monospace"],
        // NEW: a display font pair — add to index.html via Google Fonts
        display: ["'Space Grotesk'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      boxShadow: {
        // NEW: named shadows so you can do shadow-blue-sm, shadow-blue-lg etc.
        "blue-sm": "0 2px 12px rgba(30,144,255,0.15)",
        "blue-md": "0 4px 24px rgba(30,144,255,0.2)",
        "blue-lg": "0 8px 40px rgba(30,144,255,0.25)",
        "blue-xl": "0 16px 60px rgba(30,144,255,0.3)",
        "card":    "0 4px 20px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 32px rgba(30,144,255,0.12), 0 4px 20px rgba(0,0,0,0.4)",
      },
      transitionTimingFunction: {
        // NEW: a snappier easing used in framer-motion — also available as CSS
        "spring": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "bounce-in": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",   // NEW: for hero cards
      },
      spacing: {
        "sidebar": "5.5rem",  // NEW: exact sidebar width offset for PageLayout
      },
    },
  },
  plugins: [],
};