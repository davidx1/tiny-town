import { CoordinateType } from "@/app/type.d";

const anchor: CoordinateType = [0, 0];
const footprint = [[1]];
export const characterBase = { anchor, footprint };

export const characterBlondHair = {
  ...characterBase,
  name: "characterBlondHair",
};
export const characterSilverHair = {
  ...characterBase,
  name: "characterSilverHair",
};
export const characterSpikyHair = {
  ...characterBase,
  name: "characterSpikyHair",
};
export const characterWhiteShirt = {
  ...characterBase,
  name: "characterWhiteShirt",
};
export const characterYellowHat = {
  ...characterBase,
  name: "characterYellowHat",
};
