import { places, messages, defaultPlayer } from '../roms/carnival.json'
import { describeNeighborhood, describeHash, glue } from './lib/narative'
import { findPlaceFromName } from './lib/operative'

let player = {
  currentLocation: findPlaceFromName(defaultPlayer.settings.startingPlace, places),
  height: defaultPlayer.height,
  pockets: defaultPlayer.pockets,
  locationHistory: []
}

export const describePlayerLocation = () => {
  return glue(
    describeNeighborhood(player.currentLocation, places),
    describeNewPlayerLocation()
  )
}

export const help = () => {
  return messages.helpText
}

export const describeInventory = () => {
  return describeHash(player.pockets)
}

export const describeNewPlayerLocation = () => {
  if (player.locationHistory.indexOf(player.currentLocation.name) === -1) {
    if (player.currentLocation.messages) {
      return player.currentLocation.messages.newText || ''
    }
  }
  return ''
}

export const attemptMove = (placeName) => {
  const place = findPlaceFromName(placeName, places)
  if (place === undefined) {
    return messages.moveError
  } else {
    player.locationHistory.push(player.currentLocation.name)
    player.currentLocation = place
    return messages.moveMessage + place.name
  }
}
