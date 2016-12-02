//Made by, and copyright, @trevorsargent 2016

// DATA
var data

//prints a line of text to the screen
function println(line) {
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
listHash = function(hash) {
	var toReturn = ""
	if (Object.keys(hash)
		.length > 0) {
		for (var item in hash) {
			toReturn += item + ": (" + hash[item] + ") </br>"
		}
	} else {
		toReturn = null
	}
	return toReturn
}

//prints the welcome message
function welcome() {
	lineNum(8)
	println(data.messages.welcomeText)
	line()
}



//walks to the place
moveTo = function(placeName) {
	data.player.currentLocation.settings.beenHere = true
	destination = {}
	var toReturn = ""

	if (data.player.currentLocation.name.indexOf(placeName) > -1) {
		return messages.moveRedundancy + data.player.currentLocation.name
	}

	if (data.player.currentLocation.left.name != undefined && data.player.currentLocation.left.name.indexOf(placeName) > -1) {
		destination = data.player.currentLocation.left
	} else if (data.player.currentLocation.right.name != undefined && data.player.currentLocation.right.name.indexOf(placeName) > -1) {
		destination = data.player.currentLocation.right
	} else if (data.player.currentLocation.ahead.name != undefined && data.player.currentLocation.ahead.name.indexOf(placeName) > -1) {
		destination = data.player.currentLocation.ahead
	} else if (data.player.currentLocation.behind.name != undefined && data.player.currentLocation.behind.name.indexOf(placeName) > -1) {
		destination = data.player.currentLocation.behind
	} else if (data.player.currentLocation.above.name != undefined && data.player.currentLocation.above.name.indexOf(placeName) > -1) {
		destination = data.player.currentLocation.above
	} else if (data.player.currentLocation.below.name != undefined && data.player.currentLocation.below.name.indexOf(placeName) > -1) {
		destination = data.player.currentLocation.below
	} else {
		return messages.moveError
	}

	if (destination.settings.entryLocked) {

		toReturn = destination.messages.locked

		if (data.player.pockets[destination.key] != undefined) {
			toReturn += destination.messages.successEntryGranted
			if (destination.settings.leaveUnlocked) {
				destination.settings.entryLocked = false
			}
		} else {
			return toReturn
		}
	}

	data.player.currentLocation = destination
	wirePlace(data.player.currentLocation)
	toReturn += messages.moveMessage + data.player.currentLocation.name
	return toReturn
}

//takes an item out of the current place and adds it to the person's pockets

//adds an item to the person's 'pockets'
addItem = function(string, list) {
	if (string in list) {
		list[string]++
	} else {
		list[string] = 1
	}
	return list
}

removeItem = function(string, list) {
		if (string in list) {
			list[string]--
				if (list[string] <= 0) {
					delete list[string]
				}
		}
	}
	//location object

//returns a description of the room, including what's around you.
description = function(place) {
	var toReturn = "you're standing in the " + data.player.currentLocation.name + "."
	if (place.left != undefined) {
		toReturn += "</br>on your left is the " + place.left.name + "."
	}
	if (place.right != undefined) {
		toReturn += "</br>on your right is the " + place.right.name + "."
	}
	if (place.ahead != undefined) {
		toReturn += "</br>ahead of you is the " + place.ahead.name + "."
	}
	if (place.behind != undefined) {
		toReturn += "</br>behind you is the " + place.behind.name + "."
	}
	if (!place.settings.beenHere && place.messages.newText != "") {
		toReturn += "</br></br>" + place.messages.newText + "."
	}
	return toReturn
}

function play(place) {
	if (place.settings.isGame) {
		data.player.pockets = addItem(place.prize, data.player.pockets)
		return true
	}
	return false

}

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

function wirePlace(place) {
	place.settings = place.settings || {}
	place.messages = place.messages || {}
	place.left = data.places[place.left]
	place.right = data.places[place.right]
	place.ahead = data.places[place.ahead]
	place.behind = data.places[place.behind]
	place.above = data.places[place.above]
	place.below = data.places[place.left]
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

	});
}

function onLoad() {
	data.player.currentLocation = data.places[data.player.startingPlace]
	wirePlace(data.player.currentLocation)
	welcome();
}



$(document)
	.ready(function() {

		load();

		var inputHistory = new Array()
		var numInputs = 0
		var selectInput

		//on pressing enter after providing a command
		$("form")
			.submit(function() {

				var input = $('#command_line')
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
					location = trimInput(input, "walk to")
					moveTo(location)
					println(data.messages.moveMessage + location)

					//take items
				} else if (input.indexOf("take") > -1) {
					// TODO: take logic
					item = trimInput(input, "take")
					if (item in data.player.currentLocation.objects) {
						data.player.currentLocation.objects = hashRemoveItem(data.player.currentLocation.objects, item)
						data.player.pockets = hashAddItem(data.player.pockets, item)
						println(data.messages.pickUpSuccess + addArticle(item))
					} else {
						println(data.messages.pickUpError + addArticle(item))
					}
					//drop items
				} else if (input.indexOf("drop") > -1) {
					input = trimInput(input, "drop")
						// TODO: drop logic

					//take inventory
				} else if (input.indexOf("pockets") > -1) {
					if (listHash(data.player.pockets)) {

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
				if (code == 38) {
					selectInput--
					if (selectInput >= 0) {
						//alert(inputHistory[selectInput])
						$('#command_line')
							.val(inputHistory[selectInput])
					}
				} else if (code == 40) {
					selectInput++
					if (selectInput >= 0) {
						//alert(inputHistory[selectInput])
						$('#command_line')
							.val(inputHistory[selectInput])
					}
				}
			})
	})
