import _ from 'highland'
import * as Action from './actions.js'
import * as State from './state.js'
import { sanitizeBasic, filterEmpty } from './lib/operative'
import { settings } from '../roms/carnival.json'
import { prepend } from './lib/narative.js'

export const input$ = _()
export const output$ = _()
  .filter(filterEmpty)

const act = (action) => {
  switch (action.type) {
    case Action.type.EMPTY:
      break
    case Action.type.HELP:
      output$.write(State.help())
      break
    case Action.type.OBSERVE:
      output$.write(State.describePlayerLocation())
      break
    case Action.type.INVENTORY:
      output$.write(State.inventory())
      break
    case Action.type.ITEMS:
      output$.write(State.items())
      break
    case Action.type.MOVE:
      output$.write(State.move(action.subject))
      break
    case Action.type.TAKE:
      output$.write(State.take(action.subject))
      break
    case Action.type.DROP:
      output$.write(State.drop(action.subject))
      break
    case Action.type.ERROR:
      output$.write(State.inputError())
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

output$.write(State.welcome())
