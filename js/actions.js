import { sanitize } from './lib/operative'

export const type = {
  EMPTY: Symbol('empty'),
  HELP: Symbol('help'),
  OBSERVE: Symbol('observe'),
  INVENTORY: Symbol('inventory'),
  ITEMS: Symbol('stock'),
  EXCHANGE: Symbol('exchange'),
  MOVE: Symbol('move'),
  TAKE: Symbol('take'),
  DROP: Symbol('drop'),
  ERROR: Symbol('error')
}

export const build = string => {
  if (string === '') {
    return {
      type: type.EMPTY
    }
  }
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
  if (string.indexOf('items') > -1) {
    return {
      type: type.ITEMS
    }
  }
  if (string.indexOf('walk') > -1) {
    string = sanitize('walk')(string)
    return {
      type: type.MOVE,
      subject: string
    }
  }
  if (string.indexOf('take') > -1) {
    string = sanitize('take')(string)
    return {
      type: type.TAKE,
      subject: string
    }
  }
  if (string.indexOf('drop') > -1) {
    string = sanitize('drop')(string)
    return {
      type: type.DROP,
      subject: string
    }
  }
  if (string.indexOf('exchange') > -1) {
    string = sanitize('exchange')(string)
    return {
      type: type.EXCHANGE,
      subject: string
    }
  }
  return {
    type: type.ERROR
  }
}
