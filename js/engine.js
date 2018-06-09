// Made by, and copyright, @trevorsargent 2018
import _ from 'highland'

// IO Streams
export const input$ = _()
export const output$ = _()

// returns a string description of a 'place'
const description = (place, places) => {
  let toReturn = "you're standing in the " + place.name + '.'
  if (place.left !== undefined) {
    toReturn += '\n on your left is the ' + places[place.left].name + '.'
  }
  if (place.right !== undefined) {
    toReturn += '\n on your right is the ' + places[place.right].name + '.'
  }
  if (place.ahead !== undefined) {
    toReturn += '\n ahead of you is the ' + places[place.ahead].name + '.'
  }
  if (place.behind !== undefined) {
    toReturn += '\n behind you is the ' + places[place.behind].name + '.'
  }
  if (!place.settings.beenHere && place.messages.newText !== '') {
    toReturn += '\n \n ' + place.messages.newText + '.'
  }
  return toReturn
}

// returns a formatted list of everything in a hash


// adds an item a hash
const hashAdd = (string, list) => {
  if (string in list) {
    list[string]++
  } else {
    list[string] = 1
  }
  return list
}

// removes an item from a hash
const hashRemove = (string, list) => {
  if (string in list) {
    list[string]--
    if (list[string] <= 0) {
      delete list[string]
    }
  }
  return list
}

// returns whether a player can currently see
const canSee = player => {
  if (player.currentLocation.settings.islit) {
    return true
  }
  for (let e in player.settings.lamps) {
    if (player.pockets[player.settings.lamps[e]]) {
      return true
    }
  }
  return false
}

// updates the players
// TODO: break this up
function walkTo (player, destination, places, defaults) {
  player.currentLocation.settings.beenHere = true
  destination = applyPlaceDefaults(placeFromString(destination, places), defaults)
  player.currentLocation = destination
  return player
}

// returns whether a place is accessabel from another place
function locationIsAccessable (player, dest) {
  if (dest === undefined) {
    return false
  }
  if (player.currentLocation.ahead === dest) {
    return true
  }
  if (player.currentLocation.behind === dest) {
    return true
  }
  if (player.currentLocation.right === dest) {
    return true
  }
  if (player.currentLocation.left === dest) {
    return true
  }
  if (player.currentLocation.above === dest) {
    return true
  }
  if (player.currentLocation.below === dest) {
    return true
  }
  return false
}

// set state of lock on location
const unlockLocation = destination => {
  destination.settings.isLocked = false
  return destination
}

// check if a location is locked
const locationIsLocked = location => {
  return location.settings.isLocked
}

// return an item in exchange for another item, based on the place
// function exchange (item, place) {
//   if (item in place.exchanges) {
//     return place.exchanges[item]
//   }
// }

const placeFromString = (placeName, places) => {
  for (let e in places) {
    if (places[e].name === placeName) {
      return places[e]
    }
  }
}

// adds the gramatically appropriate article to the string passed
const addArticle = string => {
  let vowels = ['a', 'e', 'i', 'o', 'u']
  let article = ''
  if (vowels.includes(string.charAt(0))) {
    article = 'an '
  } else {
    article = 'a '
  }
  return article + ' ' + string
}

const applyPlaceDefaults = (place, defaults) => {
  place.settings = place.settings || {}
  place.settings.beenHere = place.settings.beenHere || defaults.place.settings.beenHere
  place.settings.isLocked = place.settings.isLocked || defaults.place.settings.isLocked
  place.settings.isLit = place.settings.isLit || defaults.place.settings.isLit
  place.messages = place.messages || {}
  place.objects = place.objects || {}
  place.exchanges = place.exchanges || {}
  return place
}

const generateObserveText = (player, places, messages) => {
  if (canSee(player)) {
    return description(player.currentLocation, places)
  } else {
    return messages.visibilityError
  }
}

// TODO: Break this up as well
// process the input from each command
const processAndPrint = (input, data) => {
  const { commands, player, places, messages } = data

  if (input.includes(commands.help)) {
    const { messages } = data
    println(messages.helpText)
    return data
  }

  if (input.includes(commands.observe)) {
    println(generateObserveText(player, places, messages))
    return data
  }

  if (input.includes(commands.move)) {
    const destination = trimInput(input, commands.move) // string name
    const { messages, player, places } = data

    // check whether the player is already at the location
    if (player.currentLocation === destination) {
      println(messages.moveRedundancy)
    }

    // check whether location is accessable
    if (!locationIsAccessable(player, destination)) {
      println(placeFromString(destination, places).messages.locationIsLocked)
      return data
    }

    // check whether location is locked

    // check whether player can unlock location

    // unlock the location if necessary

    // move the player to the location

    // 
  }

  // old move method
  // if (input.indexOf(commands.move) > -1) {
  //   let placeName = trimInput(input, commands.move)
  //   let place = placeFromString(placeName, places)
  //   if (place !== undefined) {
  //     place = applyPlaceDefaults(place, defaults)
  //     if (locationIsAccessable(place, player.currentLocation, places) && place !== undefined) {
  //       if (!locationIsLocked(place, player.pockets)) {
  //         player = walkTo(player, placeName, places, defaults)
  //         if (player.currentLocation.settings.isLocked) {
  //           println(player.currentLocation.messages.successEntryGranted)
  //         }
  //         player.currentLocation = unlockLocation(player.currentLocation, player.pockets)
  //         if (player.currentLocation.leaveUnlocked) {
  //           println(player.currentLocation.messages.unlock)
  //         }
  //         println(messages.moveMessage + placeName)
  //       } else {
  //         println(place.messages.locked)
  //       }
  //     } else if (place === player.currentLocation) {
  //       println(messages.moveRedundancy + place.name)
  //     } else {
  //       println(messages.moveError)
  //     }
  //   } else {
  //     println(messages.moveError)
  //   }

  // take items
  if (input.indexOf(commands.gainItem) > -1) {
    let item = trimInput(input, commands.gainItem)
    if (item in player.currentLocation.objects) {
      player.currentLocation.objects = hashRemove(item, player.currentLocation.objects)
      player.pockets = hashAdd(item, player.pockets)
      println(messages.pickUpSuccess + addArticle(item))
    } else {
      println(messages.pickUpError + addArticle(item))
    }

    // drop items
  } else if (input.indexOf(commands.loseItem) > -1) {
    let item = trimInput(input, commands.loseItem)
    if (item in player.pockets) {
      player.pockets = hashRemove(item, player.pockets)
      player.currentLocation.objects = hashAdd(item, player.currentLocation.objects)
      println(messages.dropSuccess + addArticle(item))
    } else {
      println(messages.inventoryItemError + addArticle(item))
    }
  } else if (input.indexOf(commands.useItem) > -1) {
    let item = trimInput(input, commands.useItem)
    if (item in player.pockets) {
      if (player.currentLocation.exchanges[item]) {
        player.pockets = hashRemove(item, player.pockets)
        player.pockets = hashAdd(player.currentLocation.exchanges[item], player.pockets)
        println(messages.exchangeSuccess + addArticle(player.currentLocation.exchanges[item]))
      } else {
        println(messages.useError)
      }
    } else {
      println(messages.inventoryItemError + addArticle(item))
    }

    // take inventory
  } else if (input.indexOf(commands.takeInventory) > -1) {
    if (player.pockets !== {}) {
      println(hashList(player.pockets, messages.inventoryError))
    }
  } else if (input.indexOf(commands.perceiveItems) > -1) {
    println(hashList(player.currentLocation.objects))
  } else {
    if (input.length > 0) {
      println(messages.commandInvalid)
    }
  }
  Object.assign(data, { player, places })
  return data
}

