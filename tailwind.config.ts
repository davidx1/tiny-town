import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      backgroundImage: {
        "tile-set": `url('${process.env.BASE_PATH}/tileset.png')`,
        "player-sprite": `url('${process.env.BASE_PATH}/player.png')`,
        "blond-hair-sprite": `url('${process.env.BASE_PATH}/blond-hair.png')`,
        "silver-hair-sprite": `url('${process.env.BASE_PATH}/silver-hair.png')`,
        "spiky-hair-sprite": `url('${process.env.BASE_PATH}/spiky-hair.png')`,
        "white-shirt-sprite": `url('${process.env.BASE_PATH}/white-shirt.png')`,
        "yellow-hat-sprite": `url('${process.env.BASE_PATH}/yellow-hat.png')`,
        "gestures-sprite": `url('${process.env.BASE_PATH}/gesture.png')`,
        "control-instruction": `url('${process.env.BASE_PATH}/controls.png')`,
        "end-splash": `url('${process.env.BASE_PATH}/end.png')`,
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
