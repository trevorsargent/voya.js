// @ts-nocheck
import Surreal from "surrealdb.js"

const { DB_HOST, DB_PORT, DB_USER, DB_PSWD } = process.env

let db: Surreal

export const getClient = async (): Promise<Surreal> => {
  const path = `ws://${DB_HOST}:${DB_PORT}/rpc`

  if (!db) {
    db = new Surreal(path)

    await db.signin({
      user: DB_USER,
      pass: DB_PSWD,
    })

    await db.use("voya", "voya")
  }
  return db
}

export const query = async <T>(string: string): Promise<T | undefined> => {
  const c = await getClient()
  const x = await c.query<Result<T[]>[]>(string)
  return x.shift()?.result?.shift()
}
