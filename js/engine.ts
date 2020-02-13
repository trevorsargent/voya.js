import { Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import * as State from './state'
import { settings } from '../roms/carnival.json'
import { filterEmpty, sanitizeBasic } from './lib/operative'
import { Action, ActionType } from './lib/types'
import { prepend } from './lib/narative'
import { build } from './actions'

export const input$ : Subject<string> = new Subject<string>()
export const output$ : Subject<string> = new Subject<string>()

const act = (action: Action) : void => {
  switch (action.type) {
    case ActionType.EMPTY:
      break
    case ActionType.HELP:
      output$.next(State.help())
      break
    case ActionType.OBSERVE:
      output$.next(State.describePlayerLocation())
      break
    case ActionType.INVENTORY:
      output$.next(State.inventory())
      break
    case ActionType.ITEMS:
      output$.next(State.items())
      break
    case ActionType.MOVE:
      output$.next(State.move(action.subject))
      break
    case ActionType.TAKE:
      output$.next(State.take(action.subject))
      break
    case ActionType.DROP:
      output$.next(State.drop(action.subject))
      break
    case ActionType.EXCHANGE:
      output$.next(State.exchange(action.subject))
      break
    case ActionType.ERROR:
      output$.next(State.inputError())
  }
}

input$.pipe(
  filter(filterEmpty),
  map(prepend(settings.prepend))
).subscribe(x => {
    output$.next(x)
})

input$.pipe(
  map(sanitizeBasic),
  map(build)
).subscribe(act)

output$.next(State.welcome())
