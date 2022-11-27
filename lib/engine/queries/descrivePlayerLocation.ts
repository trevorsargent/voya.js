import { describeNeighborhood } from "../../queries/neighborhood.queries"

export const describePlayerLocation = async (playerId: string) => {
  return describeNeighborhood(playerId)
}
