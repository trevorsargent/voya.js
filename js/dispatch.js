import Action from './actions.js'
import State from './state.js'

const act = (action) => {
  switch (action.type) {
    case Action.type.OBSERVE:
      State.describePlayerLocation()
  }
}

export default {
  broadcastAction: act
}
