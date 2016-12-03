//Made by, and copyright, @trevorsargent 2016

// DATA
var data

//prints a line of text to the screen
function println(line) {
	console.log(line)
	arr = line.split('\n')
	for (var i = 0; i < arr.length; i++) {
		$("<p>" + arr[i].trim() + "</p>")
			.insertBefore("#placeholder")
	}

}

//adds a blank line
function line() {
	$("<p></br></p>")
		.insertBefore("#placeholder")
}

//adds a number of blank lines
function lineNum(int) {
	for (var i = 0; i < int; i++) {
		line()
	}
}

//adds the gramatically appropriate article (in english) to the string passed
function addArticle(string) {
	var article
	if (string.charAt(0) == 'a' || string.charAt(0) == 'e' || string.charAt(0) == 'i' || string.charAt(0) == 'o' || string.charAt(0) == 'u') {
		article = "an "
	} else {
		article = "a "
	}
	return article + " " + string
}

//returns a formatted list of everything in a hash
function hashList(hash, error) {
	var toReturn = ""
	if (Object.keys(hash)
		.length > 0) {
		for (var item in hash) {
			toReturn += item + ": (" + hash[item] + ") \n"
		}
		return toReturn
	} else {
		return error
	}

}

//adds an item to the person's 'pockets'
function hashAdd(string, list) {
	if (string in list) {
		list[string]++
	} else {
		list[string] = 1
	}
	return list
}

function hashRemove(string, list) {
	if (string in list) {
		list[string]--
			if (list[string] <= 0) {
				delete list[string]
			}
	}
	return list
}

//prints the welcome message
function welcome() {
	lineNum(8)
	println(data.messages.welcomeText)
	line()
}



//walks to the place
walkTo = function(player, destination) {
	player.currentLocation.settings.beenHere = true
	destination = applyPlaceDefaults(placeFromString(placeName))
	player.currentLocation = destination
	return player
}

//takes an item out of the current place and adds it to the person's pockets

function locationIsAccessable(placeName, placeObj) {
	place = placeFromString(placeName)
	if (place === undefined) {
		return false
	}
	if (data.places[placeObj.ahead] === place) {
		return true
	}
	if (data.places[placeObj.behind] === place) {
		return true
	}
	if (data.places[placeObj.right] === place) {
		return true
	}
	if (data.places[placeObj.left] === place) {
		return true
	}
	if (data.places[placeObj.above] === place) {
		return true
	}
	if (data.places[placeObj.below] === place) {
		return true
	}
	return false

}

// returns a description of 'place'
description = function(place) {
	var toReturn = "you're standing in the " + place.name + "."
	if (place.left != undefined) {
		toReturn += "</br>on your left is the " + data.places[place.left].name + "."
	}
	if (place.right != undefined) {
		toReturn += "</br>on your right is the " + data.places[place.right].name + "."
	}
	if (place.ahead != undefined) {
		toReturn += "</br>ahead of you is the " + data.places[place.ahead].name + "."
	}
	if (place.behind != undefined) {
		toReturn += "</br>behind you is the " + data.places[place.behind].name + "."
	}
	if (!place.settings.beenHere && place.messages.newText != "") {
		toReturn += "</br></br>" + place.messages.newText + "."
	}
	return toReturn
}

// TODO: FIX

function play(place) {
	if (place.settings.isGame) {
		data.player.pockets = addItem(place.prize, data.player.pockets)
		return true
	}
	return false

}

// TODO: FIX

function exchange(place) {
	if (place.exchanges[item] != undefined) {
		return place.exchanges[item]
	}
}

function placeFromString(placeName) {
	for (var e in data.places) {
		if (data.places[e].name === placeName) {
			return data.places[e]
		}
	}
}

function trimInput(input, string) {
	return input.replace(string, "")
		.trim()
		.replace("the", "")
		.trim();
}

function loadJSON(file, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}


function load() {
	loadJSON("../roms/carnival.json", function(response) {
		data = JSON.parse(response);
		onLoad()
	});
}

function onLoad() {
	data.player.currentLocation = applyPlaceDefaults(data.places[data.player.startingPlace])
	welcome();
}

function applyPlaceDefaults(place) {
	place.settings = place.settings || {}
	place.settings.beenHere = place.settings.beenHere || false
	place.settings.isLocked = place.settings.isLocked || false
	place.messages = place.messages || {}
	place.messages.newText = place.messages.newText || ""
	return place
}

let inputHistory = new Array()
let numInputs = 0
let selectInput = 0

$(document)
	.ready(function() {

		load();



		//on pressing enter after providing a command
		$("form")
			.submit(function() {

				let input = $('#command_line')
					.val()
				inputHistory.push(input)
				numInputs += 1
				selectInput = numInputs

				if (input.length > 0) {
					println(">> " + input)
				}
				line()

				//ask for help
				if (input.indexOf("help") > -1) {
					println('possible commands:')
					println('- look around')
					println('- pockets')
					println('- items')
					println('- walk to [place]')
					println('- drop [item]')
					println('- take [item]')

					//look around describe where you are
				} else if (input.indexOf("look around") > -1) {

					println(description(data.player.currentLocation))

					//walk places
				} else if (input.indexOf("walk to") > -1) {
					// input = input.replace("walk to", "").trim().input.replace("the", "").trim()
					placeName = trimInput(input, "walk to")

					if (locationIsAccessable(placeName, data.player.currentLocation)) {
						data.player = walkTo(data.player, placeName)
						println(data.messages.moveMessage + placeName)
					} else {
						println(data.messages.moveError)
					}



					//take items
				} else if (input.indexOf("take") > -1) {
					// TODO: take logic
					item = trimInput(input, "take")
					if (item in data.player.currentLocation.objects) {
						data.player.currentLocation.objects = hashRemove(item, data.player.currentLocation.objects)
						data.player.pockets = hashAdd(item, data.player.pockets)
						println(data.messages.pickUpSuccess + addArticle(item))
					} else {
						println(data.messages.pickUpError + addArticle(item))
					}
					//drop items
				} else if (input.indexOf("drop") > -1) {
					item = trimInput(input, "drop")
					if (item in data.player.pockets) {
						data.player.pockets = hashRemove(item, data.player.pockets)
						data.player.currentLocation.objects = hashAdd(item, data.player.currentLocation.objects)
						println(data.messages.dropSuccess + addArticle(item))
					} else {
						println(data.messages.dropError + addArticle(item))
					}

					//take inventory
				} else if (input.indexOf("pockets") > -1) {
					if (data.player.pockets != {}) {
						println(hashList(data.player.pockets, data.messages.inventoryError))
					}
					//see what items are in the room.
				} else if (input.indexOf("items") > -1) {
					println(data.player.currentLocation.listObjects())

				} else if (input.indexOf("play") > -1) {
					println(data.player.currentLocation.play(player))

				} else if (input.indexOf("ride") > -1) {
					println(data.player.currentLocation.ride(player))
				} else {
					if (input.length > 0) {
						println("command invalid")
					}
				}


				$("html, body")
					.animate({
						scrollTop: $(document)
							.height()
					}, 500)
				line()
				$("#command_line")
					.val("")
			})


		$(document)
			.on("keyup", function(e) {
				var code = e.which
				if (code == 38) { //up
					if (selectInput > 0) {
						selectInput--
						//alert(inputHistory[selectInput])
						$('#command_line')
							.val(inputHistory[selectInput])
					}
				} else if (code == 40) { //down

					if (selectInput < numInputs) {
						selectInput++
						$('#command_line')
							.val(inputHistory[selectInput])
					} else if (selectInput === numInputs) {
						$('#command_line')
							.val("")
					}
				}
			})
	})
