import { Player } from "../models/player"

export const defaultPlayer: Omit<Player, "id"> = {
  height: 172,
  pockets: {
    coin: 6,
    dollar: 5,
    wrench: 1,
    flashlight: 1,
    lamp: 1,
  },
  settings: {
    lamps: ["flashlight", "torch", "lamp", "lantern"],
  },
  currentLocation: "places:parkingLot",
  locationHistory: [],
  username: "",
}
