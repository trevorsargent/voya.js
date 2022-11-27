import { messages } from "../content/messages"
import { Action, ActionType } from "../models/action"
import { drop } from "./actions/drop"
import { exchange } from "./actions/exchange"
import { move } from "./actions/move"
import { take } from "./actions/take"
import { describePlayerLocation } from "./queries/descrivePlayerLocation"
import { inventory } from "./queries/inventory"
import { items } from "./queries/items"

export const processAction = async (
  action: Action,
  playerId?: string
): Promise<string> => {
  switch (action.type) {
    case ActionType.EMPTY:
      return ""

    case ActionType.HELP:
      return messages.helpText

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
      return messages.commandInvalid

    case ActionType.WELCOME:
      if (!playerId) {
        return "login required"
      }
      return messages.welcomeText
  }
}
