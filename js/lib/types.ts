export enum ActionType {
  EMPTY,
  HELP,
  OBSERVE,
  INVENTORY,
  ITEMS,
  EXCHANGE,
  MOVE,
  TAKE,
  DROP,
  ERROR,
}

export interface Action {
  type: ActionType, 
  subject?: string
}

type ID = string

export interface Place {
  id: ID;
  name: string
  connections: PlaceConnection[]
  items: Stack[]
  settings: PlaceSettings;
}

export interface PlaceSettings{
  lit: boolean
  isGame: boolean
  isLocked: boolean
  passiveKey?: Item
}

export interface PlaceConnection {
  link: string, 
  place: Place
}

export interface Player {
  pockets: Stack[]
  height: number
  location: Place
  settings: PlayerSettings
}

export interface PlayerSettings {
  lamps: Item[]
}

export interface Stack {
  item: Item, 
  quantity: number
}

export interface Item {
  name: string
}

