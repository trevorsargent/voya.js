// Made by, and copyright, @trevorsargent 2018
import _ from 'highland'
import Action from './actions.js'
import State from './state.js'
import { sanitizeBasic, filterEmpty, buildAction } from './lib/operative'

// IO Streams
export const input$ = _()
export const output$ = _()

const act = (action) => {
  switch (action.type) {
    case Action.type.OBSERVE:
      console.log('looking....')
      output$.write(State.describePlayerLocation())
  }
}

input$
  .fork()
  .map(sanitizeBasic)
  .map(buildAction)
  .each(act)

input$
  .fork()
  .map(sanitizeBasic)
  .filter(filterEmpty)
  .each(x => {
    output$.write(x)
  })
