module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    // fontFamily: {
    //   display: ["Open Sans", "sans-serif"],
    //   body: ["Open Sans", "sans-serif"],
    // },
    fontFamily: {
      heading: ["Poppins", "ui-sans-serif", "system-ui"],
      body: ["Public Sans", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        /* brand */
        "brand-primary": "#4F46E5", // indigo‑600   (buttons, links)
        "brand-secondary": "#14B8A6", // teal‑500     (charts, accents)
        "brand-accent": "#F97316", // orange‑400   (warning / highlight)

        /* text */
        "text-main": "#0F172A", // slate‑900
        "text-muted": "#64748B", // slate‑500

        /* surfaces & borders */
        "surface-1": "#FFFFFF",
        "surface-2": "#F5F7FC", // page backdrop
        "border-soft": "#E2E8F0", // slate‑200
      },

      /* ----------  SHADOW & RADIUS TWEAKS ---------- */
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.1)",
        hover: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },

      fontSize: {
        14: "14px",
      },
      // backgroundColor: {
      //   "main-bg": "#EFF6FF",
      //   "main-dark-bg": "#1E3A8A",
      //   "secondary-dark-bg": "#1D4ED8",
      //   "light-gray": "#F9FAFB",
      //   "half-transparent": "rgba(0, 0, 0, 0.5)",
      // },
      backgroundColor: {
        "main-bg": "#F5F7FC", // page backdrop
        "light-gray": "#FAFAFA", // hover & cards
        "main-dark-bg": "#E0E7FF",
        "secondary-dark-bg": "#C7D2FE",
        "half-transparent": "rgba(0,0,0,.4)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "#E2E8F0",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern": "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
    },
  },
  plugins: [],
};
