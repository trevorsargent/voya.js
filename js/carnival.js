//Carnival

//sets up the environment, creates all the places, adds their items.
function setUp() {

    messages = {
        // move descriptors
        moveMessage: "you walk to the ",
        moveError: "that's not a place you can walk from here!",

        //move logic
        moveRedundancy: "you are already at the ",

        //objects
        successPickUp: "you picked up ",
        errorPickUp: "there isn't ",

        welcomeText: 
        '-----------------------------\n' +
        '| welcome to the carnival!! |\n' +
        '-----------------------------\n' +
        'there are lots of fun things here\n'+ 
        'enjoy yourself. we demand it.'
    };

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
    parkingLot.messages = {
        newText :"yikes. is that a knife over there?"
    };
    parkingLot.addItem("knife");

    //ticketEntrance
    ticketEntrance.name = "ticket entrance";
    ticketEntrance.ahead = mainSquare;
    ticketEntrance.behind = parkingLot;
    ticketEntrance.messages = {
        newText: "god this place is run down..."

    };
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
    mainSquare.settings.entryLocked = true;
    mainSquare.settings.leaveUnlocked = true;
    mainSquare.messages.locked = "a ticket is required for entry.\n"
    mainSquare.messages.successEntryGranted = "you use your ticket to enter.\n"
    mainSquare.key = "ticket";

    //ferrisWheel
    ferrisWheel.name = "ferris wheel";
    ferrisWheel.behind = mainSquare;
    ferrisWheel.below = southStairsTop;
    ferrisWheel.settings.isRide = true;
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
    tiltaWhirl.settings.isRide = true;
    tiltaWhirl.messages.rideText = "wheeee!  wheeeeeee!!!!!  \n wow that's a lot of fun. don't do that too many times or you'll get sick";

    //arcade
    arcade.name = "arcade entrance";
    arcade.behind = mainSquare;
    arcade.ahead = whackaMole;
    arcade.left = skeeBall;
    arcade.right = pinBall;

    //whackaMole
    whackaMole.name = "whack-a-mole";
    whackaMole.behind = arcade;
    whackaMole.settings.isGame = true;
    whackaMole.settings.prize = "helmet"
    whackaMole.messages.playText = "whack...whack... wow you're good at this."

    //skeeBall
    skeeBall.name = "skeeball";
    skeeBall.behind = arcade;
    skeeBall.settings.isGame = true;
    skeeBall.settings.prize = "bottomless bucket";
    skeeBall.messages.playText = "fwoomp. crack. boink. clunk. ding ding ding!";

    //pinBall
    pinBall.name = "pinball";
    pinBall.behind = arcade;
    pinBall.settings.isGame = true;
    pinBall.settings.prize = "pair of seven league boots";
    pinBall.messages.playText = "fwap. fwap. zing. broing. shatchatchatchatcha. dinnnng dinnng!";

    //UNDERGROUND CASTLE

    //southStairsTop
    southStairsTop.name = "the top of the south stairs";
    southStairsTop.above = ferrisWheel;
    southStairsTop.below = southStairsBottom;
    southStairsTop.settings.canClimb = true;

    //southStairsBottom
    southStairsBottom.name = "the bottom of the south stairs";
    southStairsBottom.above = southStairsTop;
    southStairsBottom.ahead = entryHall;
    southStairsBottom.settings.lights = false;

    //entryHall
    entryHall.name = "entrance hall";
    entryHall.ahead = antiChamber;
    entryHall.settings.lights = false;
    entryHall.newText = "just as you turn to look about, there's a low rumbling, and the doorway through which you just entered has vanished. " +
        "there is no coming back the way you came. god hope you have your ticket with you";

    //antiChamber
    antiChamber.name = "antichamber";
    antiChamber.behind = entryHall;
    antiChamber.ahead = mainHall;
    antiChamber.settings.lights = false;

    //mainHall
    mainHall.name = "main hall";
    mainHall.behind = antiChamber;
    mainHall.ahead = northStairsBottom;
    mainHall.left = westWing;
    mainHall.right = eastWing;
    mainHall.settings.lights = false;

    //eastWing
    eastWing.name = "east wing";
    eastWing.behind = mainHall;
    eastWing.settings.lights = false;

    //westWing
    westWing.name = "west wing";
    westWing.behind = mainHall;
    westWing.settings.lights = false;
    westWing.addItem("sword");
    westWing.addItem("shield");
    westWing.addItem("hand mirror");
    westWing.addItem("broken chair");

    //northStairsBottom
    northStairsBottom.name = "bottom of the north stairs";
    northStairsBottom.behind = mainHall;
    northStairsBottom.above = northStairsTop;
    northStairsBottom.settings.canClimb = true;
    northStairsBottom.settings.lights = false;
    northStairsBottom.newText = "climb "

    //northStairsTop
    northStairsTop.name = "top of the north stairs";
    northStairsTop.below = northStairsBottom;
    northStairsTop.ahead = owlry;
    northStairsTop.settings.canClimb = true;


    //owlry
    owlry.name = "owlry";
    owlry.behind = northStairsTop;
    owlry.left = balcony;

    // balcony
    balcony.name = "balcony";
    balcony.behind = owlry;
}
