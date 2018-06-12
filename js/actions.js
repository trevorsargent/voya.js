const buildAction = string => {
  return {} // BLANK ACTION
}

export default {
  buildAction,
  type: {
    MOVE: Symbol('move'),
    INVENTORY: Symbol('inventory'),
    OBSERVE: Symbol('observe'),
    EXCHANGE: Symbol('exchange')
  }
}
