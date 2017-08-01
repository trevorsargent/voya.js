// Made by, and copyright, @trevorsargent 2017

import _ from 'lodash'

// p rints a line of text to the screen
const println = lines => {
  if (lines) {
    lines.split('\n').forEach(appendPp)
  } else {
    appendBlank()
  }
}

const appendItem = x => {
  document.getElementById('console').appendChild(x)
}

// adds a blank line
const appendBlank = x => {
  const count = x || 1
  _.times(count, x => {
    appendItem(document.createElement('br'))
  })
}

const appendPp = x => {
  var sp1 = document.createElement('p')
  sp1.innerHTML = x.trim()
  appendItem(sp1)
}

function trimInput (input, string) {
  return input.replace(string, '').trim().replace('the ', '').replace('a ', '').replace('to ', '').trim()
}

// returns a description of a 'place'
function description (place, places) {
  let toReturn = "you're standing in the " + place.name + '.'
  if (place.left !== undefined) {
    toReturn += '</br>on your left is the ' + places[place.left].name + '.'
  }
  if (place.right !== undefined) {
    toReturn += '</br>on your right is the ' + places[place.right].name + '.'
  }
  if (place.ahead !== undefined) {
    toReturn += '</br>ahead of you is the ' + places[place.ahead].name + '.'
  }
  if (place.behind !== undefined) {
    toReturn += '</br>behind you is the ' + places[place.behind].name + '.'
  }
  if (!place.settings.beenHere && place.messages.newText !== '') {
    toReturn += '</br></br>' + place.messages.newText + '.'
  }
  return toReturn
}

// returns a formatted list of everything in a hash
function hashList (hash, error) {
  let toReturn = ''
  if (Object.keys(hash).length > 0) {
    for (let item in hash) {
      toReturn += item + ': (' + hash[item] + ') \n'
    }
    return toReturn
  } else {
    return error
  }
}

// adds an item a hash
function hashAdd (string, list) {
  if (string in list) {
    list[string]++
  } else {
    list[string] = 1
  }
  return list
}

// removes an item from a hash
function hashRemove (string, list) {
  if (string in list) {
    list[string]--
    if (list[string] <= 0) {
      delete list[string]
    }
  }
  return list
}

function canSee (player) {
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

// walks to the place
function walkTo (player, destination, places, defaults) {
  player.currentLocation.settings.beenHere = true
  destination = applyPlaceDefaults(placeFromString(destination, places), defaults)
  player.currentLocation = destination
  return player
}

// returns whether a place is accessabel from another place
function locationIsAccessable (dest, source, places) {
  if (dest === undefined) {
    return false
  }
  if (places[source.ahead] === dest) {
    return true
  }
  if (places[source.behind] === dest) {
    return true
  }
  if (places[source.right] === dest) {
    return true
  }
  if (places[source.left] === dest) {
    return true
  }
  if (places[source.above] === dest) {
    return true
  }
  if (places[source.below] === dest) {
    return true
  }
  return false
}

function unlockLocation (destination, pockets) {
  if (pockets[destination.settings.key] && destination.settings.leaveUnlocked) {
    destination.settings.isLocked = false
  }
  return destination
}

function locationIsLocked (destination, pockets) {
  if (destination.settings.isLocked) {
    if (pockets[destination.settings.key]) {
      return false
    }
    return true
  }
  return false
}

// return an item in exchange for another item, based on the place
// function exchange (item, place) {
//   if (item in place.exchanges) {
//     return place.exchanges[item]
//   }
// }

function placeFromString (placeName, places) {
  for (let e in places) {
    if (places[e].name === placeName) {
      return places[e]
    }
  }
}

// adds the gramatically appropriate article to the string passed
function addArticle (string) {
  let vowels = ['a', 'e', 'i', 'o', 'u']
  let article = ''
  if (vowels.includes(string.charAt(0))) {
    article = 'an '
  } else {
    article = 'a '
  }
  return article + ' ' + string
}

function applyPlaceDefaults (place, defaults) {
  place.settings = place.settings || {}
  place.settings.beenHere = place.settings.beenHere || defaults.place.settings.beenHere
  place.settings.isLocked = place.settings.isLocked || defaults.place.settings.isLocked
  place.settings.isLit = place.settings.isLit || defaults.place.settings.isLit
  place.messages = place.messages || {}
  place.objects = place.objects || {}
  place.exchanges = place.exchanges || {}
  return place
}

// process the input from each command
function processInput (input, data) {
  let {settings, commands, player, places, messages, defaults} = data

  input = input.toLowerCase()

  if (input.length > 0) {
    println(settings.prepend + input)
    println()
  }

  // ask for help
  if (input.indexOf(commands.help) > -1) {
    println(messages.helpText)

  // look around describe where you are
  } else if (input.indexOf(commands.observe) > -1) {
    if (canSee(player)) {
      println(description(player.currentLocation, places))
    } else {
      println(messages.visibilityError)
    }

  // walk places
  } else if (input.indexOf(commands.move) > -1) {
    // input = input.replace("walk to", "").trim().input.replace("the", "").trim()
    let placeName = trimInput(input, commands.move)
    let place = placeFromString(placeName, places)
    if (place !== undefined) {
      place = applyPlaceDefaults(place, defaults)
      if (locationIsAccessable(place, player.currentLocation, places) && place !== undefined) {
        if (!locationIsLocked(place, player.pockets)) {
          player = walkTo(player, placeName, places, defaults)
          if (player.currentLocation.settings.isLocked) {
            println(player.currentLocation.messages.successEntryGranted)
          }
          player.currentLocation = unlockLocation(player.currentLocation, player.pockets)
          if (player.currentLocation.leaveUnlocked) {
            println(player.currentLocation.messages.unlock)
          }
          println(messages.moveMessage + placeName)
        } else {
          println(place.messages.locked)
        }
      } else if (place === player.currentLocation) {
        println(messages.moveRedundancy + place.name)
      } else {
        println(messages.moveError)
      }
    } else {
      println(messages.moveError)
    }

  // take items
  } else if (input.indexOf(commands.gainItem) > -1) {
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
  Object.assign(data, {player, places})
  return data
}

window.onload = function () {
  let data = {}
  let inputHistory = []

  getJSON('roms/carnival.json', function (err, json) {
    if (err !== null) {
      window.alert('Something went wrong: ' + err)
    } else {
      data = json
      data.player.currentLocation = applyPlaceDefaults(data.places[data.player.settings.startingPlace], data.defaults)
      appendBlank(8)
      println(data.messages.welcomeText)
      document.getElementById('image').src = data.settings['background-url']
      document.title.innerHTML = data.settings.title
      document.getElementById('logo').innerHTML = data.settings.title
      // on pressing enter after providing a command
      document.getElementById('prepend').innerHTML = data.settings.prepend
    }
  })

  document.getElementById('form').onsubmit = function () {
    let input = document.getElementById('command_line').value
    console.log(input)
    input = input.trim()

    inputHistory.push(input)
    data = processInput(input, data)

    println()
    window.scrollBy({
      top: 100, // could be negative value
      left: 0,
      behavior: 'smooth'
    })

    document.getElementById('command_line').value = ''
  }
}

var getJSON = function (url, callback) {
  var xhr = new window.XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function () {
    var status = xhr.status
    if (status === 200) {
      callback(null, xhr.response)
    } else {
      callback(status)
    }
  }
  xhr.send()
}
