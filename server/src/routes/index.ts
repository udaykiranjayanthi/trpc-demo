import { t } from "../trpc";
import { blogsRouter } from "./blogs";
import { userRouter } from "./user";
import { commentsRouter } from "./comments";

export const appRouter = t.router({
  user: userRouter,
  blogs: blogsRouter,
  comments: commentsRouter,
});
