export enum ActionType {
  EMPTY = "empty",
  HELP = "help",
  OBSERVE = "observe",
  INVENTORY = "inventory",
  ITEMS = "stock",
  EXCHANGE = "exchange",
  MOVE = "move",
  TAKE = "take",
  DROP = "drop",
  ERROR = "error",
  WELCOME = "welcome",
}

export interface Action {
  type: ActionType
  subject?: string
}
