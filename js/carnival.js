//Carnival
//main logic and text-parsing for the game
//Made by, and copyright, @trevorsargent 2014, licenced under

//prints 'line' to the "console" on a new line
function println(line) {
    $("<p>" + line + "</p>").insertBefore("#placeholder");
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
    println('-----------------------------');
    println('| welcome to the carnival!! |');
    println('-----------------------------');
    println('there are lots of fun things here');
    println('enjoy yourself. we demand it.');
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
        this.currentLocation.beenHere = true;
        destination = {};

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
        } else {
            return messages.moveError;
        }

        if (destination.isEntryLocked) {
            return destination.messages.errorEntryLocked;
        }


        

        this.currentLocation = destination;
        return messages.moveMessage + this.currentLocation.name;
    }

    //takes an item out of the current place and adds it to the person's pockets
    this.take = function(item) {
        if (this.currentLocation.removeItem(item)) {
            this.addItem(item);
            return "you picked up " + addArticle(item);
        }
        return "there isn't " + addArticle(item);
    }

    //drops an item out of the person's pockets into the current room.
    this.drop = function(item) {
        var toReturn = ""
        if (this.removeItem(item)) {
            this.currentLocation.addItem(item);
            toReturn += "you dropped " + addArticle(item);
            if(Object.keys(this.currentLocation.exchanges).length > 0){
                var returned = this.currentLocation.exchange(item);
            }
            this.addItem(returned);
            toReturn += "you take " + addArticle(returned) + " in return for the " + item;
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
    this.newText = "";
    this.isEntryLocked = false;
    this.beenHere = false;
    this.isRide = false;
    this.isGame = false;
    this.canClimb = false;
    this.lights = true;
    this.prize = "";
    this.played = false;
    this.rideText;
    this.playText;
    this.key = ""

    this.messages = {
        errorEntryLocked: ""

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
        if (!this.beenHere && this.newText != "") {
            toReturn += "</br></br>" + this.newText + ".";
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

    //sets the prize variable
    this.setPrize = function(string) {
        this.prize = string;
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
        if (this.isGame) {
            player.addItem(this.prize);
            return "you won " + addArticle(this.prize) + "! keep it safe!";
        }
        return "'" + player.currentLocation.name + "' isn't a game... you cant ... 'play' it";

    }

    this.ride = function(player) {
        if (this.isRide) {
            return this.rideText;
        }
        return "'" + player.currentLocation.name + "' isn't a ride... don't just jump onto things that aren't meant to be ridden...";
    }

    this.exchange = function(item){
        if(this.exchanges[item] != undefined){
            return this.exchanges[item];
        }
    }

}



//sets up the environment, creates all the places, adds their items.
function setUp() {

    messages = {
        // move descriptors
        moveMessage: "you walk to the ",
        moveError: "that's not a place you can walk from here!",

        //move logic
        moveRedundancy: "you are already at the "
    }

    parkingLot = new Place();
    ticketEntrance = new Place();
    mainSquare = new Place();
    ferrisWheel = new Place();

    lawn = new Place();
    tiltaWhirl = new Place();
    cottonCandy = new Place();
    cornDogs = new Place();

    arcade = new Place();
    skeeBall = new Place();
    whackaMole = new Place();
    pinBall = new Place();

    southStairsTop = new Place();
    southStairsBottom = new Place();
    entryHall = new Place();
    antiChamber = new Place();
    mainHall = new Place();
    eastWing = new Place();
    westWing = new Place();
    northStairsTop = new Place();
    northStairsBottom = new Place();
    owlry = new Place();
    balcony = new Place();

    //set up LOCATIONS
    //parking lot
    parkingLot.name = "parking lot";
    parkingLot.ahead = ticketEntrance;
    parkingLot.newText = "yikes. is that a knife over there?";
    parkingLot.addItem("knife");

    //ticketEntrance
    ticketEntrance.name = "ticket entrance";
    ticketEntrance.ahead = mainSquare;
    ticketEntrance.behind = parkingLot;
    ticketEntrance.newText = "god this place is run down...";
    //items
    
    ticketEntrance.exchanges = {
        dollar: "ticket",
        quarter: "token"
    }

    //mainSquare
    mainSquare.name = "main square";
    mainSquare.behind = ticketEntrance;
    mainSquare.ahead = ferrisWheel;
    mainSquare.left = lawn;
    mainSquare.right = arcade;
    mainSquare.isEntryLocked = true;
    mainSquare.messages.errorEntryLocked = "It looks like you need a ticket to enter."

    //ferrisWheel
    ferrisWheel.name = "ferris wheel";
    ferrisWheel.behind = mainSquare;
    ferrisWheel.below = southStairsTop;
    ferrisWheel.isRide = true;
    ferrisWheel.rideText = "wow the view is great from up here. make sure you don't drop anything...";

    //lawn
    lawn.name = "lawn";
    lawn.behind = mainSquare;
    lawn.ahead = cottonCandy;
    lawn.left = cornDogs;
    lawn.right = tiltaWhirl;

    //cottonCandy
    cottonCandy.name = "cotton candy stand";
    cottonCandy.behind = lawn;
    //items
    cottonCandy.addItem("cotton candy");

    //cornDogs
    cornDogs.name = "corn dog stand";
    cornDogs.behind = lawn;
    //items
    cornDogs.addItem("corn dog");

    //tiltaWhirl
    tiltaWhirl.name = "tilt-a-whirl";
    tiltaWhirl.behind = lawn;
    tiltaWhirl.isRide = true;
    tiltaWhirl.rideText = "wheeee!  wheeeeeee!!!!!  \n wow that's a lot of fun. don't do that too many times or you'll get sick";

    //arcade
    arcade.name = "arcade entrance";
    arcade.behind = mainSquare;
    arcade.ahead = whackaMole;
    arcade.left = skeeBall;
    arcade.right = pinBall;

    //whackaMole
    whackaMole.name = "whack-a-mole";
    whackaMole.behind = arcade;
    whackaMole.isGame = true;
    whackaMole.setPrize("helmet");
    whackaMole.playText = "whack...whack... wow you're good at this."

    //skeeBall
    skeeBall.name = "skeeball";
    skeeBall.behind = arcade;
    skeeBall.isGame = true;
    skeeBall.setPrize("bottomless bucket");
    skeeBall.playText = "fwoomp. crack. boink. clunk. ding ding ding!";

    //pinBall
    pinBall.name = "pinball";
    pinBall.behind = arcade;
    pinBall.isGame = true;
    pinBall.setPrize("pair of seven league boots");
    pinBall.playText = "fwap. fwap. zing. broing. shatchatchatchatcha. dinnnng dinnng!";

    //UNDERGROUND CASTLE

    //southStairsTop
    southStairsTop.name = "the top of the south stairs";
    southStairsTop.above = ferrisWheel;
    southStairsTop.below = southStairsBottom;
    southStairsTop.canClimb = true;

    //southStairsBottom
    southStairsBottom.name = "the bottom of the south stairs";
    southStairsBottom.above = southStairsTop;
    southStairsBottom.ahead = entryHall;
    southStairsBottom.lights = false;

    //entryHall
    entryHall.name = "entrance hall";
    entryHall.ahead = antiChamber;
    entryHall.lights = false;
    entryHall.newText = "just as you turn to look about, there's a low rumbling, and the doorway through which you just entered has vanished. " +
    "there is no coming back the way you came. god hope you have your ticket with you";

    //antiChamber
    antiChamber.name = "antichamber";
    antiChamber.behind = entryHall;
    antiChamber.ahead = mainHall;
    antiChamber.lights = false;

    //mainHall
    mainHall.name = "main hall";
    mainHall.behind = antiChamber;
    mainHall.ahead = northStairsBottom;
    mainHall.left = westWing;
    mainHall.right = eastWing;
    mainHall.lights = false;

    //eastWing
    eastWing.name = "east wing";
    eastWing.behind = mainHall;
    eastWing.lights = false;

    //westWing
    westWing.name = "west wing";
    westWing.behind = mainHall;
    westWing.lights = false;
    westWing.addItem("sword");
    westWing.addItem("shield");
    westWing.addItem("hand mirror");
    westWing.addItem("broken chair");

    //northStairsBottom
    northStairsBottom.name = "bottom of the north stairs";
    northStairsBottom.behind = mainHall;
    northStairsBottom.above = northStairsTop;
    northStairsBottom.canClimb = true;
    northStairsBottom.lights = false;
    northStairsBottom.newText = "climb "

    //northStairsTop
    northStairsTop.name = "top of the north stairs";
    northStairsTop.below = northStairsBottom;
    northStairsTop.ahead = owlry;
    northStairsTop.canClimb = true;


    //owlry
    owlry.name = "owlry";
    owlry.behind = northStairsTop;
    owlry.left = balcony;

    // balcony
    balcony.name = "balcony";
    balcony.behind = owlry;
}

$(document).ready(function() {

    setUp();
    welcome();

    player = new Person();
    player.currentLocation = parkingLot;
    player.currentLocation.beenHere = true;

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
            // println("HI");
            println(player.currentLocation.listObjects());

            //climb stairs, if that's where you are
        } else if (input.indexOf("climb") > -1) {
            if (player.currentLocation.canClimb && player.currentLocation.above != undefined) {
                player.walkTo(player.currentLocation.above)
            }

            //go down stairs if that's where you are
        } else if (input.indexOf("go down") > -1) {
            if (player.currentLocation.canClimb && player.currentLocation.below != undefined) {
                player.walkTo(player.currentLocation.below);
            }

            //dig, if you have a shovel, and there's something under you
        } else if (input.indexOf("dig") > -1) {
            if (player.currentLocation.below != undefined && player.pockets2["shovel"] > 0) {
                player.currentLocation = player.currentLocation.below;
                println("you dropped down into the " + player.currentLocation.name);
            }
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
