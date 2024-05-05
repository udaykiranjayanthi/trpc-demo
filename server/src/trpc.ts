import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "./context";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return opts.next();
});
