import { places, messages, defaultPlayer } from '../roms/carnival.json'
import { describeNeighborhood, describeHash, glue, addArticle } from './lib/narative'
import { findPlaceFromName, hashRemove, hashAdd, hashHasItems } from './lib/operative'

let player = {
  currentLocation: findPlaceFromName(defaultPlayer.settings.startingPlace, places),
  height: defaultPlayer.height,
  pockets: defaultPlayer.pockets,
  locationHistory: []
}

export const describePlayerLocation = () => {
  return describeNeighborhood(player.currentLocation, places)
}

export const help = () => {
  return messages.helpText
}

export const inventory = () => {
  return describeHash(player.pockets)
}

export const items = () => {
  player.currentLocation.items = player.currentLocation.items || {}
  if (hashHasItems(player.currentLocation.items)) {
    return describeHash(player.currentLocation.items)
  }
  return messages.itemsError
}

export const describeNewPlayerLocation = () => {
  if (player.locationHistory.indexOf(player.currentLocation.name) === -1) {
    if (player.currentLocation.messages) {
      return player.currentLocation.messages.newText || ''
    }
  }
  return ''
}

export const move = (placeName) => {
  const place = findPlaceFromName(placeName, places)
  if (place === undefined) {
    return messages.moveError
  }

  player.locationHistory.push(player.currentLocation.name)
  player.currentLocation = place
  return glue(
    messages.moveMessage + place.name,
    describePlayerLocation(),
    describeNewPlayerLocation()
  )
}

export const drop = (item) => {
  player.currentLocation.items = player.currentLocation.items || {}
  if (item in player.pockets) {
    hashRemove(player.pockets, item)
    hashAdd(player.currentLocation.items, item)
    return messages.dropSuccess + addArticle(item)
  }
  return messages.dropError + addArticle(item)
}

export const take = (item) => {
  player.currentLocation.items = player.currentLocation.items || {}
  if (item in player.currentLocation.items) {
    hashAdd(player.pockets, item)
    hashRemove(player.currentLocation.items, item)
    return messages.takeSuccess + addArticle(item)
  }
  return messages.takeError + addArticle(item)
}

export const inputError = () => {
  return messages.commandInvalid
}
