type ID = string

export interface Rom {
  output: string;
  settings: RomSettings
  player: Player
  places: Place[]
  items: Item[]
  commands: CommandSet
  messages: MessageSet
}

export interface CommandSet {
  move: string,
  observe: string,
  inventory: string,
  take: string,
  drop: string,
  perceive: string
  help: string
  use: string
}

export interface MessageSet {

}

export interface Messages {
  helpText: string,
  visibilityError: string,
  moveMessage: string,
  moveError: string,
  moveRedundancy: string,
  commandInvalid: string,
  inventoryError: string,
  inventoryItemError: string,
  itemsError: string,
  takeSuccess: string,
  takeError: string,
  dropSuccess: string,
  dropError: string,
  exchangeSuccess: string,
  exchangeFailure: string,
  welcomeText: string,
}

export interface RomSettings {
  title: string,
  backgroundUrl?: string,
  prepend?: string
}



// export interface Action {
//   type: ActionType,
//   subject?: string
// }

export interface Place {
  id: ID;
  name: string
  links: Link[]
  items: Stack[]
  settings: PlaceSettings;
  text: string[]
}

export interface PlaceSettings {
  lit?: boolean
  isGame?: boolean
  isLocked?: boolean
  passiveKey?: Item
}

export interface Link {
  name: string,
  settings: LinkSettings
  /**
   * @TJS-type ID
   */
  place: Place
}

export interface LinkSettings {
  locked: boolean
  /**
   * @TJS-type ID
   */
  key: Item
}

export interface Player {
  pockets: Stack[]
  height: number
  /**
   * The player's starting location
   *
   * @TJS-type string
   */
  location: Place
  locationHistory: Set<Place>
  settings: PlayerSettings
}

export interface PlayerSettings {

}

export interface Stack {
  /**
   * @TJS-type string
   */
  item: Item,
  /**
   * @minimum 0
   */
  quantity: number
}

export interface Item {
  id: ID,
  name: string
}

