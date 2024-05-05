import { router } from "../trpc";
import { blogsRouter } from "./blogs";
import { userRouter } from "./user";
import { commentsRouter } from "./comments";

export const appRouter = router({
  user: userRouter,
  blogs: blogsRouter,
  comments: commentsRouter,
});
