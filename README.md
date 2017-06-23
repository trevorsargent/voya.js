# [Voya.js](http://trevorsargent.cf/voya.js)

Voya is a text based, interactive fiction adventure game engine.

[lineweight.github.io/voya.js](http://lineweight.cf/voya.js)

## Roadmap

[Full roadmap](https://github.com/lineweight/voya.js/projects/1) is available, but here are the highlights

 - [x] transition to functional programming style (mostly done on this, please [open an issue](https://github.com/trevorsargent/voya.js/issues/new) if there are any elements you see need fixing #### i'm still learning a lot...)   
 - [x] implement 'hand-held' light sources, and the necessity thereof
 - [ ] support multiple lines of 'look around' text, to add to story, and customizable settings for its display
 - [x] re-introduce locking mechanisms on locations, and keys on the player
 - [x] support custom commands titles - a game could retitle the 'walk' command to 'swim' or 'fly' or simply 'go'... etc.

## Carnival

Carnival is the test scenario for Voya.js at the moment.

you're dropped off in the parking lot of what looks to be a very sad carnival.  enter if you want, but there's not much else around.  go on. explore. we'll wait for you. for a little while at least.

scenarios are interchangeable and customizable, and of course open to any and all who wish to write one. implementation for external files is coming soon. See the file description below (or study the `/roms` to write your own)

## Gamefiles

Gamefiles are set up in JSON. The gameplay is outlined in a series of objects, which are described below.

### Settings

#### title:   
The title of the game! This is displayed in the title bar of the browser, and in the bottom right hand corner of the prompt.

#### background-url:   
A path to an image for the background of the game.

#### prepend:
1-3 characters that are displayed at the prompt, and in the transcript to indicate player input.

### Player
#### name: string   
The character's name. At this point, mostly for the developer's enjoyment and creative delight.
#### age: int   
The character's age.
#### height: int   
The character's height.
#### pockets: object   
This is the mechanism that is used for the character's inventory. The objects that the player starts the game with are defined here in a hash with string:int associations. The object names should be singular, plurals are automatically calculated.

### Commands

The list of available commands is set, that is, there is a limited number of actions possible inside the engine. The defaults are listed in parentheses,

#### move
The command to move your main character from place to place. `to` will automatically be consumed, e.g. if the command is `walk [...]`, then `walk to [...]` will also work.

The argument to this command can either be the name of a location that is adjacent to the player's current location, or a direction (`forward`, `backward`, `left`, `right`, `up`, or `down`)

#### observe
Generates, and displays a description of the surrounding locations, and displays the `newText` of the location if the location has not been visited before.

#### takeInventory
Produces a list of items in the player's `pockets`

#### gainItem
moves and item from the player's current location into their `pockets`.

#### loseItem
Moves an item from the player's pockets to their current location. Items persist in locations.

#### perceiveItems
Generates and displays a list of the items in the player's current location.

#### help
displays the `helpText`

#### useItem
Allows the player to "use" an item. If the location is/has an `exchange`, the `use` will allow the player to make that exchange.
