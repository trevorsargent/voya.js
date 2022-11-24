import { query } from "../surreal/engine.client"

export const describeNeighborhood = async (): Promise<string> => {
  var place = await query<{
    left: string
    right: string
    ahead: string
    behind: string
    name: string
  }>(
    "SELECT currentLocation.name as name, currentLocation.ahead.name as ahead, currentLocation.right.name as right, currentLocation.left.name as left, currentLocation.behind.name as behind FROM player:0"
  )

  if (!place) {
    return "i'm not sure where you are"
  }
  let toReturn = "you're standing in the " + place.name + "."
  if (place.left !== null) {
    toReturn += "\n on your left is the " + place.left + "."
  }
  if (place.right !== null) {
    toReturn += "\n on your right is the " + place.right + "."
  }
  if (place.ahead !== null) {
    toReturn += "\n ahead of you is the " + place.ahead + "."
  }
  if (place.behind !== null) {
    toReturn += "\n behind you is the " + place.behind + "."
  }
  return toReturn
}
