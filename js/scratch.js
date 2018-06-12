// const times = (x, func) => {
//   while (x--) {
//     func()
//   }
// }



// // p rints a line of text to the screen
// const println = lines => {
//   lines = lines || ''
//   lines.split('\n').forEach(appendParagraph)
// }



// const getJSONCallback = (err, json) => {
//   if (err !== null) {
//     window.alert('Something went wrong: ' + err)
//   } else {
//     data = json
//     // document.getElementById('image').src = data.settings['background-url']
//     // document.title.innerHTML = data.settings.title
//     // document.getElementById('logo').innerHTML = data.settings.title
//     // document.getElementById('prepend').innerHTML = data.settings.prepend
//   }
// }

// const getJSON = (url, callback) => {
//   var xhr = new window.XMLHttpRequest()
//   xhr.open('GET', url, true)
//   xhr.responseType = 'json'
//   xhr.onload = function () {
//     var status = xhr.status
//     if (status === 200) {
//       callback(null, xhr.response)
//     } else {
//       callback(status)
//     }
//   }
//   xhr.send()
// }

// set state of lock on location
// const unlockLocation = destination => {
//   destination.settings.isLocked = false
//   return destination
// }

// check if a location is locked
// const locationIsLocked = location => {
//   return location.settings.isLocked
// }

// return an item in exchange for another item, based on the place
// function exchange (item, place) {
//   if (item in place.exchanges) {
//     return place.exchanges[item]
//   }
// }

// // take items
// if (input.indexOf(commands.gainItem) > -1) {
//   let item = trimInput(input, commands.gainItem)
//   if (item in player.currentLocation.objects) {
//     player.currentLocation.objects = hashRemove(item, player.currentLocation.objects)
//     player.pockets = hashAdd(item, player.pockets)
//     println(messages.pickUpSuccess + addArticle(item))
//   } else {
//     println(messages.pickUpError + addArticle(item))
//   }

//   // drop items
// } else if (input.indexOf(commands.loseItem) > -1) {
//   let item = trimInput(input, commands.loseItem)
//   if (item in player.pockets) {
//     player.pockets = hashRemove(item, player.pockets)
//     player.currentLocation.objects = hashAdd(item, player.currentLocation.objects)
//     println(messages.dropSuccess + addArticle(item))
//   } else {
//     println(messages.inventoryItemError + addArticle(item))
//   }
// } else if (input.indexOf(commands.useItem) > -1) {
//   let item = trimInput(input, commands.useItem)
//   if (item in player.pockets) {
//     if (player.currentLocation.exchanges[item]) {
//       player.pockets = hashRemove(item, player.pockets)
//       player.pockets = hashAdd(player.currentLocation.exchanges[item], player.pockets)
//       println(messages.exchangeSuccess + addArticle(player.currentLocation.exchanges[item]))
//     } else {
//       println(messages.useError)
//     }
//   } else {
//     println(messages.inventoryItemError + addArticle(item))
//   }

//   // take inventory
// } else if (input.indexOf(commands.takeInventory) > -1) {
//   if (player.pockets !== {}) {
//     println(hashList(player.pockets, messages.inventoryError))
//   }
// } else if (input.indexOf(commands.perceiveItems) > -1) {
//   println(hashList(player.currentLocation.objects))
// } else {
//   if (input.length > 0) {
//     println(messages.commandInvalid)
//   }
// }
// Object.assign(data, { player, places })
// return data
// }
