import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "inverse-on-surface": "#ffecef",
        "tertiary": "#5c5d6e",
        "surface-bright": "#fff8f8",
        "on-tertiary-container": "#565868",
        "primary-fixed": "#beeaf8",
        "surface": "#fff8f8",
        "outline-variant": "#c0c8cb",
        "on-tertiary": "#ffffff",
        "on-secondary-container": "#7b444e",
        "inverse-surface": "#452830",
        "on-tertiary-fixed": "#191b29",
        "magic-purple": "#b794f4",
        "inverse-primary": "#a3cddb",
        "on-surface": "#1e182b",
        "on-background": "#2d141c",
        "surface-container-low": "#fff0f2",
        "surface-variant": "#ffd9e2",
        "on-secondary-fixed-variant": "#6b3741",
        "error-container": "#ffdad6",
        "background": "#fff8f8",
        "outline": "#71787b",
        "on-primary-container": "#355f6b",
        "on-primary": "#ffffff",
        "surface-container-highest": "#ffd9e2",
        "white-muted": "rgba(255, 255, 255, 0.8)",
        "surface-container": "#ffe8ed",
        "on-tertiary-fixed-variant": "#444655",
        "secondary-container": "#ffb6c1",
        "surface-container-high": "#ffe1e7",
        "tertiary-fixed-dim": "#c5c5d8",
        "on-secondary-fixed": "#360c17",
        "on-error-container": "#93000a",
        "surface-tint": "#3a6470",
        "magic-teal": "#4fd1c5",
        "on-secondary": "#ffffff",
        "primary-fixed-dim": "#a3cddb",
        "tertiary-fixed": "#e1e1f5",
        "primary-container": "#add8e6",
        "secondary-fixed-dim": "#fcb3be",
        "on-primary-fixed-variant": "#214c58",
        "secondary": "#874e58",
        "on-error": "#ffffff",
        "border-glass": "rgba(255, 255, 255, 0.4)",
        "tertiary-container": "#cfcfe3",
        "error": "#ba1a1a",
        "secondary-fixed": "#ffd9de",
        "surface-dim": "#fcced9",
        "on-surface-variant": "#41484a",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#001f27",
        "primary": "#3a6470",
        "cotton-lavender": "#e6e6fa"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
        "puffy": "48px",
        "bubble": "40% 60% 70% 30% / 40% 50% 60% 50%"
      },
      spacing: {
        "stack-md": "24px",
        "stack-lg": "48px",
        "gutter": "16px",
        "stack-sm": "12px",
        "container-padding": "24px",
        "unit": "8px"
      },
      fontFamily: {
        "headline-xl-mobile": ["var(--font-outfit)", "sans-serif"],
        "label-sm": ["var(--font-outfit)", "sans-serif"],
        "body-lg": ["var(--font-outfit)", "sans-serif"],
        "headline-xl": ["var(--font-outfit)", "sans-serif"],
        "headline-md": ["var(--font-outfit)", "sans-serif"],
        "label-lg": ["var(--font-outfit)", "sans-serif"],
        "headline-lg": ["var(--font-outfit)", "sans-serif"],
        "body-md": ["var(--font-outfit)", "sans-serif"],
        "outfit": ["var(--font-outfit)", "sans-serif"]
      },
      fontSize: {
        "headline-xl-mobile": ["36px", {"lineHeight": "42px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "headline-xl": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
      },
      boxShadow: {
        "puffy": "10px 10px 20px rgba(0,0,0,0.08), -10px -10px 20px rgba(255,255,255,0.9)",
        "puffy-inset": "inset 10px 10px 20px rgba(0,0,0,0.05), inset -10px -10px 20px rgba(255,255,255,0.8)",
        "puffy-sm": "5px 5px 10px rgba(0,0,0,0.06), -5px -5px 10px rgba(255,255,255,0.8)",
        "inner-puffy": "inset 0 2px 10px rgba(0,0,0,0.05)",
        "puffy-hover": "inset 0 0 20px rgba(255,255,255,0.8), 15px 15px 25px rgba(0,0,0,0.1), -15px -15px 25px rgba(255,255,255,1)"
      },
      backgroundImage: {
        "noise": "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "liquid": "liquid 10s linear infinite",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fill-bar": "fill-bar 1.5s ease-out forwards"
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" }
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "10px 10px 20px rgba(0,0,0,0.08), -10px -10px 20px rgba(255,255,255,0.9)" },
          "50%": { transform: "scale(1.03)", boxShadow: "15px 15px 25px rgba(0,0,0,0.12), -15px -15px 25px rgba(255,255,255,1)" }
        },
        "liquid": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fill-bar": {
          "0%": { width: "0%" }
        }
      }
    },
  },
  plugins: [],
};
export default config;
