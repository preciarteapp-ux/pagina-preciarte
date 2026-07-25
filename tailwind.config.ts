import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        lp5: ['Outfit', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'lp5-container': '1200px',
        'lp5-narrow': '1080px',
        'lp5-tight': '1000px',
        'lp5-table': '960px',
        'lp5-prose': '780px',
        'lp5-cta': '800px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // ── LP5 — escada derivada da logo PreciArte (#F66A93 no degrau 400)
        // Namespaced para não colidir com os tokens das LPs anteriores.
        lp5: {
          900: "#4F0D21", 800: "#6F1530", 700: "#972142", 600: "#CE2252",
          500: "#EA3E72", 400: "#F66A93", 300: "#FB98B6", 200: "#FCC5D7",
          100: "#FDE3EC", 50: "#FDF1F6", 25: "#FEF9FB",
          "plum-deep": "#270611",
        },
        lp5n: {
          900: "#211F1C", 800: "#393632", 700: "#56524E", 600: "#78736D",
          500: "#9A948D", 400: "#BDB8B2", 300: "#DDD9D5", 200: "#EDEBE8",
          100: "#F6F5F3", 50: "#FAF9F7",
        },
        lp5s: {
          success: "#2E7D5B", "success-bg": "#E6F4EE",
          warning: "#CE691C", "warning-bg": "#FCF1E3",
          danger: "#C0392B", "danger-bg": "#FBEAE8",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "tooltip-fade": {
          "0%, 100%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "20%, 80%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-once": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "tooltip-fade": "tooltip-fade 3s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "pulse-once": "pulse-once 0.6s ease-in-out 1",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
