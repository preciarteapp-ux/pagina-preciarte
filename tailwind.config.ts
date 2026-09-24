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
        lp6: ['Outfit', 'system-ui', 'sans-serif'],
        lp6body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        lp7: ['Poppins', 'system-ui', 'sans-serif'],
        bf: ['Sora', 'system-ui', 'sans-serif'],
        bfbody: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'lp5-container': '1200px',
        'lp5-narrow': '1080px',
        'lp5-tight': '1000px',
        'lp5-table': '960px',
        'lp5-prose': '780px',
        'lp5-cta': '800px',
        'lp6-container': '1240px',
        'lp6-narrow': '1080px',
        'lp6-tight': '1000px',
        'lp6-prose': '800px',
        'lp7-container': '1200px',
        'lp7-narrow': '1020px',
        'lp7-prose': '760px',
        'bf-container': '1200px',
        'bf-narrow': '1020px',
        'bf-prose': '760px',
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
        // ── LP6 — ângulo "Seu preço não é seu"
        // Namespaced para não colidir com LP5. Escuro é quase-preto QUENTE
        // (#180810), não o carvão frio: o ICP é ateliê, não fintech.
        lp6: {
          700: "#A81352", 600: "#C2185B", 500: "#D56D98",
          300: "#F0A9C4", 100: "#FCE7EF", 50: "#FDF2F6",
          ink: "#180810", "ink-deep": "#0E0409",
          text: "#17161A", muted: "#6B6470", line: "#EFE7EA",
          "hero-from": "#C2185B", "hero-to": "#8E0F43",
        },
        // ── LP7 — sistema visual escuro/creme, referencia meuassessor.com
        // Estrutura e ritmo extraidos; cores, copy e conteudo sao nossos.
        lp7: {
          ink: "#0A070D",        // fundo escuro principal
          black: "#000000",      // faixa de prova
          surface: "#120E16",    // card sobre o escuro
          line: "#221C29",       // borda no escuro
          cream: "#F5F0EB",      // secao clara
          chip: "#FAF7F5",       // chip sobre o creme
          text: "#14121A",       // texto no claro
          muted: "#5A5560",      // texto secundario no claro
          violet: "#C383EC",     // acento — inicio do gradiente
          pink: "#DB7DC3",       // acento — fim do gradiente
        },
        // Esquenta Black Friday (/black e /black1). O prefixo e "bf" e nao
        // "black" de proposito: declarar colors.black substituiria o preto
        // padrao do Tailwind e quebraria o bg-black/80 que os overlays do
        // shadcn usam em dialog, sheet, drawer e alert-dialog.
        bf: {
          ink: "#0B0A08",        // fundo escuro, preto levemente quente
          black: "#000000",      // faixa de prova
          surface: "#151109",    // card sobre o escuro
          elevated: "#1E1810",   // card de preco
          line: "#2A2216",       // borda no escuro
          bone: "#F6F1E6",       // secao clara
          chip: "#FFFDF7",       // chip sobre o bone
          text: "#141109",       // texto no claro — 16,7:1
          muted: "#5C5340",      // secundario no claro — 6,7:1
          bronze: "#7A5E14",     // dourado legivel no claro — 5,4:1
          gold: "#D4AF37",       // dourado principal — 9,4:1 sobre ink
          goldlight: "#E8C06A",  // fim do gradiente — 11,5:1
          goldhi: "#F2D98B",     // realce
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
