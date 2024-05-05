import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { users } from "./data/users";

function getUserDetails(token: string) {
  const user = users.find((user) => user.token === token);
  return user;
}

export async function createContext(opts: CreateExpressContextOptions) {
  const { req } = opts;

  const authToken = req.headers.authorization;

  if (authToken) {
    return {
      user: getUserDetails(authToken),
    };
  }
  return {
    user: undefined,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
