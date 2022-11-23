import * as State from "./state"
import { Action, ActionType } from "./actions"

export const act = (action: Action): string => {
  switch (action.type) {
    case ActionType.EMPTY:
      return ""

    case ActionType.HELP:
      return State.help()

    case ActionType.OBSERVE:
      return State.describePlayerLocation()

    case ActionType.INVENTORY:
      return State.inventory()

    case ActionType.ITEMS:
      return State.items()

    case ActionType.MOVE:
      return State.move(action.subject)

    case ActionType.TAKE:
      return State.take(action.subject)

    case ActionType.DROP:
      return State.drop(action.subject)

    case ActionType.EXCHANGE:
      return State.exchange(action.subject)

    case ActionType.ERROR:
      return State.inputError()

    case ActionType.WELCOME:
      return State.welcome()
  }
}
