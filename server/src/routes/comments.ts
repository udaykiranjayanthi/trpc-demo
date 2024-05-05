import { EventEmitter } from "events";
import { router, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { randomUUID } from "crypto";
import { comments } from "../data/comments";

// create a global event emitter (could be replaced by redis, etc)
const eventEmitter = new EventEmitter();

type Comment = {
  id: string;
  blogId: string;
  text: string;
  createdAt: string;
};

export const commentsRouter = router({
  // This subscription procedure only works with ws
  onAddComment: publicProcedure.subscription((req) => {
    // return an `observable` with a callback which is triggered immediately
    return observable<Comment>((emit) => {
      const onAddComment = (comment: Comment) => {
        // emit data to client
        emit.next(comment);
      };

      // trigger `onAdd()` when `add` is triggered in our event emitter
      eventEmitter.on("addComment", onAddComment);

      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        eventEmitter.off("addComment", onAddComment);
      };
    });
  }),
  addComment: publicProcedure
    .input(
      z.object({
        blogId: z.string(),
        text: z.string(),
      })
    )
    .mutation(async (req) => {
      const comment = {
        ...req.input,
        id: randomUUID(),
        createdAt: new Date().toISOString(),
      };

      comments.push(comment);

      eventEmitter.emit("addComment", comment);
      return comment;
    }),
  getAllComments: publicProcedure.input(z.string()).query((req) => {
    const blogId = req.input;

    return comments.filter((comment) => comment.blogId === blogId);
  }),
});
