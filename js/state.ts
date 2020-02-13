import { messages, commands, defaultPlayer, places, settings } from '../roms/carnival.json'
import { locationIsAccessable, hasPassiveAccess } from './lib/logic'
import { findPlaceFromName, hashHasItems, setAdd, setRemove } from './lib/operative'
import { describeNeighborhood, glue, addArticle, templateString, describeSet } from './lib/narative'
import { Player, Place, Item } from './lib/types.js'

let player: Player = {
  location: {} as Place,
  height: defaultPlayer.height as number,
  pockets: defaultPlayer.pockets,
  settings: {
    lamps: []
  },
  locationHistory: new Set<Place>()
}

export const welcome = () => {
  return messages.welcomeText
}

export const describePlayerLocation = () => {
  return describeNeighborhood(player.location, places)
}

export const help = () => {
  return messages.helpText
}

export const inventory = () => {
  return describeSet(player.pockets)
}

export const items = () => {
  player.location.items = player.location.items || {}
  if (hashHasItems(player.location.items)) {
    return describeSet(player.location.items)
  }
  return messages.itemsError
}

export const describeNewPlayerLocation = () => {
  if (player.locationHistory.has(player.location)) {
    if (player.location) {
      return player.location.text[0]
    }
  }
  return ''
}

export const move = (place: Place) => {
  let neededPassiveKey = false
  if (!locationIsAccessable(player.location, place)) {
    return messages.moveError
  }

  player.locationHistory.add(player.location)

  player.location = place
  return glue(
    messages.moveMessage + place.name,
    describePlayerLocation(),
    describeNewPlayerLocation()
  )
}

export const drop = (item: Item) => {
  if (player.pockets.find(stack => stack.item.id === item.id)) {
    setRemove(player.pockets, item)
    setAdd(player.location.items, item)
    return messages.dropSuccess + addArticle(item.name)
  }
  return messages.dropError + addArticle(item.name)
}

export const take = (item: Item) => {
  if (player.location.items.find(stack => stack.item.id === item.id)) {
    setAdd(player.pockets, item)
    setRemove(player.location.items, item)
    return messages.takeSuccess + addArticle(item.name)
  }
  return messages.takeError + addArticle(item.name)
}

// export const exchange = (item: Item) => {
//   player.location.exchanges = player.currentLocation.exchanges || {}
//   if (item in player.currentLocation.exchanges) {
//     const newItem = player.currentLocation.exchanges[item]
//     setAdd(player.pockets, newItem)
//     hashRemove(player.pockets, item)
//     return templateString(messages.exchangeSuccess, item, newItem)
//   }
//   return messages.exchangeFailure
// }

export const inputError = () => {
  return messages.commandInvalid
}

export const unlock = () => {
  player.location.settings.isLocked = false
}
