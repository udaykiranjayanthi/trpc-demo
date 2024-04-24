import { initTRPC } from "@trpc/server";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.create();
