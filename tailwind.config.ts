import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      backgroundImage: {
        "tile-set": "url('/tileset.png')",
        "player-sprite": "url('/player.png')",
        "blond-hair-sprite": "url('/blond-hair.png')",
        "silver-hair-sprite": "url('/silver-hair.png')",
        "spiky-hair-sprite": "url('/spiky-hair.png')",
        "white-shirt-sprite": "url('/white-shirt.png')",
        "yellow-hat-sprite": "url('/yellow-hat.png')",
        "gestures-sprite": "url('/gesture.png')",
      },
      aspectRatio: {
        "3/2": "3 / 2",
      },
    },
  },
  content: ["./src//**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
};
export default config;
