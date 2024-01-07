import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      backgroundImage: {
        "tile-set": "url('/tileset.png')",
      },
    },
  },
  content: ["./src//**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
};
export default config;
