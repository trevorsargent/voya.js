import _ from 'highland'
import * as Action from './actions.js'
import * as State from './state.js'
import { sanitizeBasic, filterEmpty } from './lib/operative'
import { settings } from '../roms/carnival.json'
import { prepend } from './lib/narative.js'

// IO Streams
export const input$ = _()
export const output$ = _()
  .filter(filterEmpty)

const act = (action) => {
  switch (action.type) {
    case Action.type.HELP:
      output$.write(State.help())
      break
    case Action.type.OBSERVE:
      output$.write(State.describePlayerLocation())
      break
    case Action.type.INVENTORY:
      output$.write(State.describeInventory())
      break
    case Action.type.MOVE:
      output$.write(State.attemptMove(action.subject))
      output$.write(State.describePlayerLocation())
      output$.write(State.describeNewPlayerLocation())
      break
  }
}

input$
  .fork()
  .filter(filterEmpty)
  .map(
    prepend(settings.prepend)
  )
  .each(x => {
    output$.write(x)
  })

input$
  .fork()
  .map(sanitizeBasic)
  .map(Action.build)
  .each(act)
