import JSON from "../../roms/carnival.json"
import {
  describeNeighborhood,
  describeHash,
  glue,
  addArticle,
  templateString,
} from "./narative"
import {
  findPlaceFromName,
  hashRemove,
  hashAdd,
  hashHasItems,
} from "./operative"
import { locationIsAccessable, hasPassiveAccess } from "./logic"
import { Place } from "../world/place"
import { Player } from "../world/player"

const places: Record<string, Place> = JSON.places
const messages: Record<string, string> = JSON.messages

let player: Player = {
  ...JSON.defaultPlayer,
  currentLocation: findPlaceFromName(
    JSON.defaultPlayer.settings.startingPlace,
    places
  )!,
  locationHistory: [],
}

export const welcome = () => {
  return messages.welcomeText
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

export const items = (): string => {
  if (!player.currentLocation?.items) return messages.itemsError
  if (!hashHasItems(player.currentLocation.items)) return messages.itemsError
  return describeHash(player.currentLocation.items)
}

export const describeNewPlayerLocation = (): string => {
  if (!player.locationHistory.find((p) => p == player.currentLocation?.name))
    return ""

  return player.currentLocation?.messages?.newText || ""
}

export const move = (placeName?: string): string => {
  if (!placeName) {
    return messages.moveError
  }
  let neededPassiveKey = false
  const place = findPlaceFromName(placeName, places)

  if (!place) {
    return messages.moveError
  }

  if (!locationIsAccessable(places, player.currentLocation, place)) {
    return messages.moveError
  }

  if (place.settings?.passiveKey) {
    if (hasPassiveAccess(place, player)) {
      neededPassiveKey = true
    } else {
      return place.messages?.passiveKeyFailure ?? ""
    }
  }

  player.locationHistory.push(player.currentLocation.name)

  player.currentLocation = place
  return glue(
    neededPassiveKey ? place.messages?.passiveKeySuccess ?? "" : "",
    messages.moveMessage + place.name,
    describePlayerLocation(),
    describeNewPlayerLocation()
  )
}

export const drop = (item?: string) => {
  if (!item) {
    return messages.dropError + "nothing"
  }
  player.currentLocation.items = player.currentLocation.items || {}
  if (item in player.pockets) {
    hashRemove(player.pockets, item)
    hashAdd(player.currentLocation.items, item)
    return messages.dropSuccess + addArticle(item)
  }
  return messages.dropError + addArticle(item)
}

export const take = (item?: string) => {
  if (!item) {
    return messages.takeError
  }
  player.currentLocation.items = player.currentLocation.items || {}
  if (item in player.currentLocation.items) {
    hashAdd(player.pockets, item)
    hashRemove(player.currentLocation.items, item)
    return messages.takeSuccess + addArticle(item)
  }
  return messages.takeError + addArticle(item)
}

export const exchange = (item?: string) => {
  if (!item) {
    return messages.exchangeFailure
  }
  if (item in player.currentLocation.exchanges) {
    const newItem = player.currentLocation.exchanges[item]
    hashAdd(player.pockets, newItem)
    hashRemove(player.pockets, item)
    return templateString(messages.exchangeSuccess, item, newItem)
  }
  return messages.exchangeFailure
}

export const inputError = () => {
  return messages.commandInvalid
}

export const unlock = () => {
  player.currentLocation.isLocked = false
}
