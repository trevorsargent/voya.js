import { Rom } from "./lib/types"
import { MsgBuilder, buildMsg } from "./msgs"
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { settings, commands, items, output, places, player } from '../roms/carnival.json'

export const input$: Subject<string> = new Subject<string>()
export const output$: Subject<string> = new Subject<string>()

export type Model = Rom

const model: Model = {
  commands,
  items,
  output,
  places,
  player,
  settings
}

export type Msg = {
  type: MsgType
  model: Model,
}

export enum MsgType {
  EMPTY,
  HELP,
  OBSERVE,
  INVENTORY,
  ITEMS,
  EXCHANGE,
  MOVE,
  TAKE,
  DROP,
  ERROR,
}

type Reducer = (msg: Msg) => (model: Model) => Model

const reduceModel: Reducer = (msg: Msg) => (model: Model) => {
  switch (msg.type) {
    case MsgType.EMPTY:
      return {
        ...model,
      }
    case MsgType.HELP:
      return {
        ...model,
      }
    default:
      return {
        ...model,
      }
  }
}

const tick = (buildMsg: MsgBuilder, reduce: Reducer, model: Model) => {
  input$.pipe(
    map(buildMsg),
    map(applyMsg => applyMsg(model)),
    map(reduce),
    map(reduce => reduce(model)),
  ).subscribe(x => {
    output$.next(x.output) // view
    tick(buildMsg, reduce, x)
  })
}

tick(buildMsg, reduceModel, model)
