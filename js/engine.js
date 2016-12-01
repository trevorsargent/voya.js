//main logic and text-parsing for the game
//Made by, and copyright, @trevorsargent 2014, licenced under
//prints 'line' to the "console" on a new line
function println(line) {
    arr = line.split('\n');
    for (var i = 0; i < arr.length; i++) {
        $("<p>" + arr[i].trim() + "</p>").insertBefore("#placeholder");
    }
    
}

//adds a blank line
function line() {
    $("<p></br></p>").insertBefore("#placeholder");
}

function lineNum(int) {
    for (var i = 0; i < int; i++) {
        line();
    }
}

//adds the gramatically appropriate article to the string passed
function addArticle(string) {
    var article;
    if (string.charAt(0) == 'a' || string.charAt(0) == 'e' || string.charAt(0) == 'i' || string.charAt(0) == 'o' || string.charAt(0) == 'u') {
        article = "an ";
    } else {
        article = "a "
    }
    return article + " " + string;
}

//prints the welcome message
function welcome() {
    lineNum(8);
    println(messages.welcomeText);
    line();
}

//player object
function Person() {
    this.name = "";
    this.age = 0;
    this.height = 0;
    this.money = 0;
    this.currentLocation = {};
    this.pockets = {
        dollar: 3,
        quarter: 10,
        phone: 1,
        flashlight: 1,
        wrench: 1,
        envelope: 1,
        shovel: 1
    };
    this.paid = false;

    //walks to the place
    this.walkTo = function(placeName) {
        this.currentLocation.settings.beenHere = true;
        destination = {};
        var toReturn = "";

        if (this.currentLocation.name.indexOf(placeName) > -1) {
            return messages.moveRedundancy + this.currentLocation.name;
        }

        if (this.currentLocation.left.name != undefined && this.currentLocation.left.name.indexOf(placeName) > -1) {
            destination = this.currentLocation.left;
        } else if (this.currentLocation.right.name != undefined && this.currentLocation.right.name.indexOf(placeName) > -1) {
            destination = this.currentLocation.right;
        } else if (this.currentLocation.ahead.name != undefined && this.currentLocation.ahead.name.indexOf(placeName) > -1) {
            destination = this.currentLocation.ahead;
        } else if (this.currentLocation.behind.name != undefined && this.currentLocation.behind.name.indexOf(placeName) > -1) {
            destination = this.currentLocation.behind;
        } else if (this.currentLocation.above.name != undefined && this.currentLocation.above.name.indexOf(placeName) > -1) {
            destination = this.currentLocation.above;
        } else if (this.currentLocation.below.name != undefined && this.currentLocation.below.name.indexOf(placeName) > -1) {
            destination = this.currentLocation.below;
        } else {
            return messages.moveError;
        }

        if (destination.settings.entryLocked) {

            toReturn = destination.messages.locked;

            if (this.pockets[destination.key] != undefined) {
                toReturn += destination.messages.successEntryGranted;
                if (destination.settings.leaveUnlocked) {
                    destination.settings.entryLocked = false;
                }
            } else {
                return toReturn;
            }
        }

        this.currentLocation = destination;
        toReturn += messages.moveMessage + this.currentLocation.name;
        return toReturn;
    }

    //takes an item out of the current place and adds it to the person's pockets
    this.take = function(item) {
        if (this.currentLocation.removeItem(item)) {
            this.addItem(item);
            return messages.successPickUp + addArticle(item);
        }
        return messages.errorPickUp + addArticle(item);
    }

    //drops an item out of the person's pockets into the current room.
    this.drop = function(item) {
        var toReturn = ""
        if (this.removeItem(item)) {
            this.currentLocation.addItem(item);
            toReturn += "you dropped " + addArticle(item);
            if (Object.keys(this.currentLocation.exchanges).length > 0) {
                var returned = this.currentLocation.exchange(item);
                this.addItem(returned);
                toReturn += "\nyou take " + addArticle(returned) + " in return for the " + item;
            }
            return toReturn;
        }
        return "you don't have " + addArticle(item);
    }



    //returns a list of everything in the persons's pockets
    this.emptyPockets = function() {
        var toReturn = ""
        if (Object.keys(this.pockets).length > 0) {
            toReturn += "your pockets contain: </br>";
            for (var item in this.pockets) {
                toReturn += item + ": (" + this.pockets[item] + ") </br>";
            }
        } else {
            toReturn += "your pockets are empty"
        }
        return toReturn;
    }

    //adds an item to the person's 'pockets'
    this.addItem = function(string) {
        if (this.pockets[string] != undefined) {
            this.pockets[string]++;
        } else {
            this.pockets[string] = 1;
        }
    }

    this.removeItem = function(string) {
        if (this.pockets[string] != undefined && this.pockets[string] > 0) {
            this.pockets[string]--;
            if (this.pockets[string] == 0) {
                delete this.pockets[string]
            }
            return true;
        }
        return false;

    }
}

//location object
function Place() {

    //field declarations with defaults
    this.name = "";
    this.left = {};
    this.ahead = {};
    this.right = {};
    this.behind = {};
    this.below = {};
    this.above = {};
    this.objects = {};
    this.key = "";

    this.messages = {
        locked: "",
        successEntryGranted: "",
        prize: "", 
        playText: "",
        rideText: "",
        newText: ""
    }

    this.settings = {
        leaveUnlocked: false,
        entryLocked: false,
        beenHere: false,
        isRide: false,
        isGame: false,
        beenPlayed: false,
        canClimb: false,
        isLit: true
    }

    this.exchanges = {
        // NOTE: Exchanges are not symmetrical
        //dollar: "ticket"
    }

    //returns a description of the room, including what's around you.
    this.description = function() {
        var toReturn = "you're standing in the " + this.name + ".";
        if (this.left.name != undefined) {
            toReturn += "</br>on your left is the " + this.left.name + ".";
        }
        if (this.right.name != undefined) {
            toReturn += "</br>on your right is the " + this.right.name + ".";
        }
        if (this.ahead.name != undefined) {
            toReturn += "</br>ahead of you is the " + this.ahead.name + ".";
        }
        if (this.behind.name != undefined) {
            toReturn += "</br>behind you is the " + this.behind.name + ".";
        }
        if (!this.settings.beenHere && this.messages.newText != "") {
            toReturn += "</br></br>" + this.messages.newText + ".";
        }
        return toReturn;
    }

    //lists the items present in the room
    this.listObjects = function() {
            var toReturn = "";
            if (Object.keys(this.objects).length > 0) {
                toReturn += "you see: </br>"
                for (var item in this.objects) {
                    console.log(item);
                    toReturn += item + ": (" + this.objects[item] + ") </br>";
                }
            } else {
                toReturn = "there's nothing here"
            }
            return toReturn;
        }
        //adds an item to the room
    this.addItem = function(string) {
        if (this.objects[string] != undefined) {
            this.objects[string]++;
        } else {
            this.objects[string] = 1;
        }
    }

    //returnes the prize
    this.retrievePrize = function() {
        if (this.isGame) {
            return this.prize
        } else {
            return "";
        }
    }

    //removes an item from the room
    this.removeItem = function(string) {
        if (this.objects[string] != undefined && this.objects[string] > 0) {
            if (this.objects[string] == 0) {
                delete this.objects[string];
            }
            return true;
        } else {
            return false;
        }
    }

    this.play = function(player) {
        if (this.settings.isGame) {
            player.addItem(this.prize);
            return "you won " + addArticle(this.prize) + "! keep it safe!";
        }
        return "'" + player.currentLocation.name + "' isn't a game... you cant ... 'play' it";

    }

    this.ride = function(player) {
        if (this.settings.isRide) {
            return this.rideText;
        }
        return "'" + player.currentLocation.name + "' isn't a ride... don't just jump onto things that aren't meant to be ridden...";
    }

    this.exchange = function(item) {
        if (this.exchanges[item] != undefined) {
            return this.exchanges[item];
        }
    }
}

$(document).ready(function() {

    setUp();
    welcome();

    player = new Person();
    player.currentLocation = parkingLot;
    player.currentLocation.settings.beenHere = true;

    var inputHistory = new Array();
    var numInputs = 0;
    var selectInput;


    //on pressing enter after providing a command
    $("form").submit(function() {
        var input = $('#command_line').val();
        inputHistory.push(input);
        numInputs += 1;
        selectInput = numInputs;

        if (input.length > 0) { println(">> " + input); }
        line();
        //var inputArray = input.split(" ");

        //ask for help
        if (input.indexOf("help") > -1) {
            println('possible commands:');
            println('- look around');
            // println('(returns a description of your surroundings)');
            println('- pockets');
            // println('(returns a list of everything you have in your pockets)');
            println('- items');
            println('- walk to [place]');
            println('- drop [item]');
            println('- take [item]');

            //look around describe where you are
        } else if (input.indexOf("look around") > -1) {
            println(player.currentLocation.description());

            //walk places
        } else if (input.indexOf("walk to") > -1) {
            // input = input.replace("walk to", "").trim().input.replace("the", "").trim();
            input = input.replace("walk to", "");
            input = input.trim();
            input = input.replace("the", "");
            input = input.trim();
            println(player.walkTo(input));

            //take items
        } else if (input.indexOf("take") > -1) {
            input = input.replace("take", "");
            input = input.trim();
            input = input.replace("the", "");
            input = input.trim();
            println(player.take(input));
            //drop items
        } else if (input.indexOf("drop") > -1) {
            input = input.replace("drop", "");
            input = input.trim();
            input = input.replace("the", "");
            input = input.trim();
            println(player.drop(input));

            //take inventory
        } else if (input.indexOf("pockets") > -1) {
            println(player.emptyPockets());

            //see what items are in the room.
        } else if (input.indexOf("items") > -1) {
            println(player.currentLocation.listObjects());

        } else if (input.indexOf("play") > -1) {
            println(player.currentLocation.play(player));

        } else if (input.indexOf("ride") > -1) {
            println(player.currentLocation.ride(player));
        } else {
            if (input.length > 0) { println("command invalid"); }
        }


        $("html, body").animate({
            scrollTop: $(document).height()
        }, 500);
        line();
        $("#command_line").val("");
    });


    $(document).on("keyup", function(e) {
        var code = e.which;
        if (code == 38) {
            selectInput--;
            if (selectInput >= 0) {
                //alert(inputHistory[selectInput]);
                $('#command_line').val(inputHistory[selectInput]);
            }
        } else if (code == 40) {
            selectInput++;
            if (selectInput >= 0) {
                //alert(inputHistory[selectInput]);
                $('#command_line').val(inputHistory[selectInput]);
            }
        }
    });
});