import Surreal from "surrealdb.js";

const { DB_HOST, DB_PORT, DB_USER, DB_PSWD } = process.env;

export const getClient = async (): Promise<Surreal> => {
  const path = `ws://${DB_HOST}:${DB_PORT}/rpc`;
  const db = new Surreal(path);

  await db.signin({
    user: DB_USER,
    pass: DB_PSWD,
  });

  await db.use("voya", "voya");

  return db;
};
