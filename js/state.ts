import { locationIsAccessable, hasPassiveAccess } from './lib/logic'
import { findPlaceFromName, hashHasItems, setAdd, setRemove } from './lib/operative'
import { describeNeighborhood, addArticle, describeSet } from './lib/narative'
import { Player, Place, Item } from './lib/types.js'
import { Model } from './engine'

export const describePlayerLocation = () => (model: Model) => {
  return describeNeighborhood(model.player.location)
}

export const inventory = () => (model: Model): string => {
  return describeSet(model.player.pockets)
}

export const items = () => (model: Model) => {
  return describeSet(model.player.location.items)
}

export const drop = (item: Item) => (model: Model) => {
  if (model.player.pockets.find(stack => stack.item.id === item.id)) {
    return model.messages.dropSuccess + addArticle(item.name)
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
