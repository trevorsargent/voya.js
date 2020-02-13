import * as rom from '../roms/carnival.json'
import { locationIsAccessable, hasPassiveAccess } from './lib/logic'
import { findPlaceFromName, hashHasItems, setAdd } from './lib/operative'
import { describeNeighborhood, glue, addArticle, templateString } from './lib/narative'
import { Player, Place, PlaceConnection } from './lib/types.js'

const places: Place[] = Object.entries(rom.places).map((pk, _, pks) => ({
  name: pk[1].name, 
  connections: [{
    link: 'ahead', 
    place: {
      name: pks.find(k => k[0] === pk[1].ahead)?.[1].name
    } as Place
  },
  {
    link: 'behind', 
    place: {
      name: pks.find(k => k[0] === pk[1].behind)?.[1].name
    } as Place
    },
  {
    link: 'left', 
    place: {
      name: pks.find(k => k[0] === pk[1].left)?.[1].name
    } as Place
    },
  {
    link: 'right', 
    place: {
      name: pks.find(k => k[0] === pk[1].right)?.[1].name
    } as Place
    },
  {
    link: 'above', 
    place: {
      name: pks.find(k => k[0] === pk[1].above)?.[1].name
    } as Place
    },
  {
    link: 'below', 
    place: {
      name: pks.find(k => k[0] === pk[1].below)?.[1].name
    } as Place
  }, ],
  id: pk[1].name.replace(' ', '-').toLowerCase(), 
  items: [
  ],
  settings: {
    isGame: pk[1].settings?.isGame,
    lit: !pk[1].settings?.isDark
  }
} as Place)).map((place, _, pls) => ({
  ...place, 
  connections: place.connections.map(con => ({
    link: con.link, 
    place: pls.find(pl => pl.name === con.place.name)
  } as PlaceConnection))
}))

let player: Player = {
  location: places.find(pl =>
    (Object.entries(rom.places).find(pk =>
      pk[0] === rom.defaultPlayer.settings.startingPlace)[1].name === pl.name)),
  height: rom.defaultPlayer.height as number,
  pockets: Reflect.ownKeys(rom.defaultPlayer.pockets).map(i => ({
    item: {
      name: i as string,
    },
    quantity: (rom.defaultPlayer.pockets[i] as number)
  })),
  settings: {
    lamps: defaultPlayer.settings.lamps.map(i => ({ name: i }))
  }
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
  let neededPassiveKey = false
  const place = findPlaceFromName(placeName, places)
  if (!locationIsAccessable(places, player.currentLocation, place)) {
    return messages.moveError
  }

  place.settings = place.settings || {}
  if (place.settings.passiveKey) {
    if (hasPassiveAccess(place, player)) {
      neededPassiveKey = true
    } else {
      return place.messages.passiveKeyFailure
    }
  }

  player.locationHistory.push(player.currentLocation.name)

  player.currentLocation = place
  return glue(
    neededPassiveKey ? place.messages.passiveKeySuccess : '',
    messages.moveMessage + place.name,
    describePlayerLocation(),
    describeNewPlayerLocation()
  )
}

export const drop = (item) => {
  player.currentLocation.items = player.currentLocation.items || {}
  if (item in player.pockets) {
    hashRemove(player.pockets, item)
    setAdd(player.currentLocation.items, item)
    return messages.dropSuccess + addArticle(item)
  }
  return messages.dropError + addArticle(item)
}

export const take = (item) => {
  player.currentLocation.items = player.currentLocation.items || {}
  if (item in player.currentLocation.items) {
    setAdd(player.pockets, item)
    hashRemove(player.currentLocation.items, item)
    return messages.takeSuccess + addArticle(item)
  }
  return messages.takeError + addArticle(item)
}

export const exchange = item => {
  player.currentLocation.exchanges = player.currentLocation.exchanges || {}
  if (item in player.currentLocation.exchanges) {
    const newItem = player.currentLocation.exchanges[item]
    setAdd(player.pockets, newItem)
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
