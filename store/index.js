import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isColor: true,
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
  backend_url: "",
  images: [],
  generatingImage: false,
});

export default state;
