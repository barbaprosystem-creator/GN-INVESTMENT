/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-error-container": "#93000a",
        "secondary-fixed": "#e2e2e5",
        "outline-variant": "#d5c3bc",
        "tertiary-container": "#8c959d",
        "on-surface-variant": "#51443f",
        "on-secondary-fixed": "#1a1c1e",
        "inverse-surface": "#2e3132",
        "secondary-fixed-dim": "#c6c6c9",
        "outline": "#83746e",
        "on-primary": "#ffffff",
        "tertiary-fixed-dim": "#bfc8d0",
        "secondary-container": "#e2e2e5",
        "primary": "#7c5544",
        "surface-tint": "#7c5544",
        "surface-container-low": "#f3f4f5",
        "primary-container": "#b88a76",
        "surface-container-lowest": "#ffffff",
        "surface": "#f8f9fa",
        "on-error": "#ffffff",
        "on-surface": "#191c1d",
        "on-tertiary-fixed": "#141d23",
        "on-primary-fixed-variant": "#623e2e",
        "primary-fixed-dim": "#efbba5",
        "error-container": "#ffdad6",
        "on-primary-container": "#442516",
        "on-secondary-fixed-variant": "#454749",
        "on-primary-fixed": "#2f1407",
        "on-secondary-container": "#636467",
        "on-tertiary": "#ffffff",
        "tertiary": "#575f67",
        "on-secondary": "#ffffff",
        "secondary": "#5d5e61",
        "inverse-on-surface": "#f0f1f2",
        "on-tertiary-container": "#252e35",
        "surface-variant": "#e1e3e4",
        "background": "#f8f9fa",
        "error": "#ba1a1a",
        "surface-container-high": "#e7e8e9",
        "on-background": "#191c1d",
        "surface-container": "#edeeef",
        "on-tertiary-fixed-variant": "#3f484f",
        "surface-bright": "#f8f9fa",
        "surface-container-highest": "#e1e3e4",
        "surface-dim": "#d9dadb",
        "primary-fixed": "#ffdbcc",
        "inverse-primary": "#efbba5",
        "tertiary-fixed": "#dbe4ed",
        "copper-accent": "#b88a76",
        "glass-white": "rgba(255, 255, 255, 0.08)",
        "glass-stroke": "rgba(255, 255, 255, 0.15)"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        "margin-mobile": "20px",
        "base": "8px",
        "margin-desktop": "60px",
        "container-max": "1280px",
        "section-gap": "120px",
        "gutter": "24px"
      },
      fontFamily: {
        "body-lg": ["Hanken Grotesk", "sans-serif"],
        "label-md": ["Hanken Grotesk", "sans-serif"],
        "body-md": ["Hanken Grotesk", "sans-serif"],
        "headline-md": ["Libre Caslon Text", "serif"],
        "headline-lg-mobile": ["Libre Caslon Text", "serif"],
        "headline-lg": ["Libre Caslon Text", "serif"],
        "title-lg": ["Hanken Grotesk", "sans-serif"],
        "display-lg": ["Libre Caslon Text", "serif"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.1em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "400" }],
        "headline-lg-mobile": ["32px", { lineHeight: "40px", fontWeight: "400" }],
        "headline-lg": ["48px", { lineHeight: "56px", fontWeight: "400" }],
        "title-lg": ["20px", { lineHeight: "28px", letterSpacing: "0.01em", fontWeight: "600" }],
        "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "400" }]
      }
    }
  },
  plugins: []
};
