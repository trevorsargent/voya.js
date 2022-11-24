import JSON from "../../roms/carnival.json"
import {
  describeNeighborhood,
  describeHash,
  glue,
  addArticle,
  templateString,
} from "./narative"
import { hashRemove, hashAdd, hashHasItems } from "./operative"
import { locationIsAccessable, hasPassiveAccess } from "./logic"
import { Place } from "../world/place"
import { Player } from "../world/player"
import {
  getPlayerById,
  getPlayerWithFullLocation,
  query,
  savePlace,
  savePlayer,
} from "../surreal/engine.client"

const messages: Record<string, string> = JSON.messages

const PLAYER_ID = "player:0"

export const welcome = () => {
  return messages.welcomeText
}

export const describePlayerLocation = async () => {
  return describeNeighborhood()
}

export const help = () => {
  return messages.helpText
}

export const inventory = async () => {
  const player = await getPlayerById(PLAYER_ID)

  return describeHash(player.pockets)
}

export const items = async (): Promise<string> => {
  const { loc } = await getPlayerWithFullLocation(PLAYER_ID)
  if (!loc?.objects) return messages.itemsError
  if (!hashHasItems(loc.objects)) return messages.itemsError
  return describeHash(loc.objects)
}

export const describeNewPlayerLocation = async (): Promise<string> => {
  const player = await getPlayerWithFullLocation(PLAYER_ID)
  const { loc } = player

  if (!player.locationHistory.find((p) => p == loc?.name)) return ""

  return loc?.messages?.newText || ""
}

export const move = async (placeName?: string): Promise<string> => {
  if (!placeName) {
    return messages.moveError
  }
  let neededPassiveKey = false
  const player = await getPlayerWithFullLocation(PLAYER_ID)
  const place = await query<Place>(
    `SELECT * FROM place WHERE name = '${placeName}'`
  )

  if (!place || !player.loc) {
    return messages.moveError
  }

  if (!locationIsAccessable(player.loc, place)) {
    return messages.moveError
  }

  if (place.settings?.passiveKey) {
    if (hasPassiveAccess(place, player)) {
      neededPassiveKey = true
    } else {
      return place.messages?.passiveKeyFailure ?? ""
    }
  }

  player.locationHistory.push(player.currentLocation)

  player.currentLocation = place.id

  await savePlayer(player)
  return glue(
    neededPassiveKey ? place.messages?.passiveKeySuccess ?? "" : "",
    messages.moveMessage + place.name,
    await describePlayerLocation(),
    await describeNewPlayerLocation()
  )
}

export const drop = async (item?: string) => {
  if (!item) {
    return messages.dropError + "nothing"
  }

  const player = await getPlayerWithFullLocation(PLAYER_ID)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return "cant drop here"
  }

  if (player.pockets[item] > 0) {
    hashRemove(player.pockets, item)
    hashAdd(loc.objects!, item)
    await savePlace(loc)
    await savePlayer(player)
    return messages.dropSuccess + addArticle(item)
  }
  return messages.dropError + addArticle(item)
}

export const take = async (item?: string) => {
  if (!item) {
    return messages.takeError
  }
  const player = await getPlayerWithFullLocation(PLAYER_ID)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return messages.takeError
  }
  if (loc.objects && loc.objects[item] > 0) {
    hashAdd(player.pockets, item)
    hashRemove(loc.objects!, item)
    await savePlayer(player)
    await savePlace(loc)
    return messages.takeSuccess + addArticle(item)
  }
  return messages.takeError + addArticle(item)
}

export const exchange = async (item?: string) => {
  if (!item) {
    return messages.exchangeFailure
  }

  const player = await getPlayerWithFullLocation(PLAYER_ID)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return messages.exchangeFailure
  }
  if (loc.exchanges && loc.exchanges[item] !== undefined) {
    const newItem = loc.exchanges[item]
    hashAdd(player.pockets, newItem)
    hashRemove(player.pockets, item)
    await savePlayer(player)
    return templateString(messages.exchangeSuccess, item, newItem)
  }
  return messages.exchangeFailure
}

export const inputError = () => {
  return messages.commandInvalid
}

export const canSee = async (player: Player) => {
  const { loc } = await getPlayerWithFullLocation(PLAYER_ID)

  if (!loc) {
    return messages.exchangeFailure
  }

  if (!loc) {
    return messages.takeError
  }
  if (loc.settings?.isLit) {
    return true
  }
  for (let e in player.settings.lamps) {
    if (player.pockets[e] > 0) {
      return true
    }
  }
  return false
}
