import { places, messages } from '../roms/carnival.json'
import { describeNeighborhood, describeHash } from './lib/narative'
import { findPlaceFromName } from './lib/operative'

let player = {
  currentLocation: findPlaceFromName('parking lot', places),
  locationHistory: []
}

export const describePlayerLocation = () => {
  return describeNeighborhood(player.currentLocation, places)
}

export const help = () => {
  return messages.helpText
}

export const describeInventory = () => {
  return describeHash(player.pockets)
}

export const describeNewPlayerLocation = () => {
  if (player.locationHistory.indexOf(player.currentLocation.name) > -1) {
    return player.currentLocation.messages.newText || ''
  }
}

export const attemptMove = (placeName) => {
  const place = findPlaceFromName(placeName, places)
  if (place === undefined) {
    return messages.moveError
  } else {
    player.locationHistory.push(place.name)
    player.currentLocation = place
    return messages.moveMessage + place.name
  }
}
