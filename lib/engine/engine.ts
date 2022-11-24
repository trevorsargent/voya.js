import {
  describePlayerLocation,
  drop,
  exchange,
  help,
  inputError,
  inventory,
  items,
  move,
  take,
  welcome,
} from "./state"
import { type Action, ActionType } from "./actions"

export const act = async (action: Action): Promise<string> => {
  switch (action.type) {
    case ActionType.EMPTY:
      return ""

    case ActionType.HELP:
      return help()

    case ActionType.OBSERVE:
      return describePlayerLocation()

    case ActionType.INVENTORY:
      return inventory()

    case ActionType.ITEMS:
      return items()

    case ActionType.MOVE:
      return move(action.subject)

    case ActionType.TAKE:
      return take(action.subject)

    case ActionType.DROP:
      return drop(action.subject)

    case ActionType.EXCHANGE:
      return exchange(action.subject)

    case ActionType.ERROR:
      return inputError()

    case ActionType.WELCOME:
      return welcome()
  }
}
