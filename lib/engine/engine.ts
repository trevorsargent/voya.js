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

import { Action, ActionType } from "./actions"

export const act = async (
  action: Action,
  playerId?: string
): Promise<string> => {
  switch (action.type) {
    case ActionType.EMPTY:
      return ""

    case ActionType.HELP:
      return help()

    case ActionType.OBSERVE:
      if (!playerId) {
        return "login required"
      }
      return describePlayerLocation(playerId)

    case ActionType.INVENTORY:
      if (!playerId) {
        return "login required"
      }
      return inventory(playerId)

    case ActionType.ITEMS:
      if (!playerId) {
        return "login required"
      }
      return items(playerId)

    case ActionType.MOVE:
      if (!playerId) {
        return "login required"
      }
      return move(playerId, action.subject)

    case ActionType.TAKE:
      if (!playerId) {
        return "login required"
      }
      return take(playerId, action.subject)

    case ActionType.DROP:
      if (!playerId) {
        return "login required"
      }
      return drop(playerId, action.subject)

    case ActionType.EXCHANGE:
      if (!playerId) {
        return "login required"
      }
      return exchange(playerId, action.subject)

    case ActionType.ERROR:
      return inputError()

    case ActionType.WELCOME:
      if (!playerId) {
        return "login required"
      }
      return welcome()
  }
}
