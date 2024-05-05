import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { users } from "../data/users";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .query((req) => {
      const credentials = req.input;

      const user = users.find((user) => user.email === credentials.email);

      if (user && user.password === credentials.password) {
        const { password, ...userDetails } = user;

        return userDetails;
      }

      throw new TRPCError({ code: "UNAUTHORIZED" });
    }),

  getUser: protectedProcedure.query((req) => {
    const { user } = req.ctx;

    if (user) {
      const { password, ...userDetails } = user;

      return userDetails;
    }

    throw new TRPCError({ code: "UNAUTHORIZED" });
  }),
});
