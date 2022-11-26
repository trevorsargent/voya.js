import JSON from "../../roms/carnival.json"
import type { Place } from "../models/place"
import {
  describeHash,
  glue,
  addArticle,
  templateString,
} from "../utils/string.utils"
import { recordRemove, recordAdd, recordHasKeys } from "../utils/record.utils"
import { locationIsAccessable, hasPassiveAccess } from "../utils/place.utils"
import { describeNeighborhood } from "../queries/neighborhood.queries"
import {
  getPlayerById,
  getPlayerWithFullLocation,
} from "../queries/player.queries"
import { query } from "../surreal/surreal.client"
import { savePlace, savePlayer } from "../mutations/save.mutations"

const messages: Record<string, string> = JSON.messages

export const welcome = () => {
  return messages.welcomeText
}

export const describePlayerLocation = async (playerId: string) => {
  return describeNeighborhood(playerId)
}

export const help = () => {
  return messages.helpText
}

export const inventory = async (playerId: string) => {
  const player = await getPlayerById(playerId)

  return describeHash(player.pockets)
}

export const items = async (playerId: string): Promise<string> => {
  const { loc } = await getPlayerWithFullLocation(playerId)
  if (!loc?.objects) return messages.itemsError
  if (!recordHasKeys(loc.objects)) return messages.itemsError
  return describeHash(loc.objects)
}

export const describeNewPlayerLocation = async (
  playerId: string
): Promise<string> => {
  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player

  if (!player.locationHistory.find((p) => p == loc?.name)) return ""

  return loc?.messages?.newText || ""
}

export const move = async (
  playerId: string,
  placeName?: string
): Promise<string> => {
  if (!placeName) {
    return messages.moveError
  }
  let neededPassiveKey = false
  const player = await getPlayerWithFullLocation(playerId)
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
    await describePlayerLocation(playerId),
    await describeNewPlayerLocation(playerId)
  )
}

export const drop = async (playerId: string, item?: string) => {
  if (!item) {
    return messages.dropError + "nothing"
  }

  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return "cant drop here"
  }

  if (player.pockets[item] > 0) {
    recordRemove(player.pockets, item)
    recordAdd(loc.objects!, item)
    await savePlace(loc)
    await savePlayer(player)
    return messages.dropSuccess + addArticle(item)
  }
  return messages.dropError + addArticle(item)
}

export const take = async (playerId: string, item?: string) => {
  if (!item) {
    return messages.takeError
  }
  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return messages.takeError
  }
  if (loc.objects && loc.objects[item] > 0) {
    recordAdd(player.pockets, item)
    recordRemove(loc.objects!, item)
    await savePlayer(player)
    await savePlace(loc)
    return messages.takeSuccess + addArticle(item)
  }
  return messages.takeError + addArticle(item)
}

export const exchange = async (playerId: string, item?: string) => {
  if (!item) {
    return messages.exchangeFailure
  }

  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player
  delete player.loc

  if (!loc) {
    return messages.exchangeFailure
  }
  if (loc.exchanges && loc.exchanges[item] !== undefined) {
    const newItem = loc.exchanges[item]
    recordAdd(player.pockets, newItem)
    recordRemove(player.pockets, item)
    await savePlayer(player)
    return templateString(messages.exchangeSuccess, item, newItem)
  }
  return messages.exchangeFailure
}

export const inputError = () => {
  return messages.commandInvalid
}

export const canSee = async (playerId: string) => {
  const player = await getPlayerWithFullLocation(playerId)
  const { loc } = player
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
