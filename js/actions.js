import { sanitize } from './lib/operative'

export const type = {
  HELP: Symbol('help'),
  MOVE: Symbol('move'),
  INVENTORY: Symbol('inventory'),
  OBSERVE: Symbol('observe'),
  EXCHANGE: Symbol('exchange')
}

export const build = string => {
  if (string.indexOf('help') > -1) {
    return {
      type: type.HELP
    }
  }
  if (string.indexOf('look around') > -1) {
    return {
      type: type.OBSERVE
    }
  }
  if (string.indexOf('pockets') > -1) {
    return {
      type: type.INVENTORY
    }
  }
  if (string.indexOf('walk') > -1) {
    string = sanitize('walk')(string)
    return {
      type: type.MOVE,
      subject: string
    }
  }
}
