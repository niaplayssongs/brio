import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F5F0E8",
        "parchment-dark": "#EDE6D6",
        charcoal: "#2C2C2C",
        "charcoal-light": "#4A4A4A",
        indigo: {
          DEFAULT: "#3D3580",
          light: "#5A50A8",
          dark: "#2A2460",
        },
        // warm muted slate-indigo — replaces gold, accessible on off-white (~6.2:1 contrast)
        slate: {
          DEFAULT: "#525870",
          light: "#6A7088",
          muted: "#424660",
        },
        mist: "#8C8FA8",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(ellipse at 20% 50%, rgba(82,88,112,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(61,53,128,0.05) 0%, transparent 50%)",
      },
      keyframes: {
        pulse_glow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadein: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulse_glow: "pulse_glow 2.5s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        fadein: "fadein 0.8s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
