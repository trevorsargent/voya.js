import { Msg, MsgType, Model } from './engine'

export type MsgBuilder = (string: string) => (model: Model) => Msg

export const buildMsg: MsgBuilder = (string: string) => (model: Model) => {
  return {
    type: msgType(string),
    model,
  }
}

const msgType = (input: string): MsgType => {
  switch (input) {
    case '':
      return MsgType.EMPTY

    case 'help':
      return MsgType.HELP

    case 'look around':
      return MsgType.OBSERVE

    case 'pockets':
      return MsgType.INVENTORY

    case 'items':
      return MsgType.ITEMS

    case 'walk':
      return MsgType.MOVE

    case 'take':
      return MsgType.TAKE

    case 'drop':
      return MsgType.DROP

    case 'exchange':
      return MsgType.EXCHANGE

    default:
      return MsgType.ERROR
  }
}

