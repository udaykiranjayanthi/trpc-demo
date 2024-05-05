import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { blogs } from "../data/blogs";
import { randomUUID } from "crypto";
import { TRPCError } from "@trpc/server";

export const blogsRouter = router({
  getAllBlogs: publicProcedure.query(() => {
    return blogs;
  }),
  getBlogById: publicProcedure.input(z.string()).query((req) => {
    const id = req.input;

    return blogs.find((blog) => blog.id === id);
  }),
  createBlog: publicProcedure
    .input(
      z.object({
        title: z.string(),
        subTitle: z.string(),
        body: z.string(),
        author: z.string(),
      })
    )
    .mutation((req) => {
      const { title, subTitle, body, author } = req.input;

      const blog = {
        title,
        subTitle,
        body,
        author,
        id: randomUUID(),
        createdAt: new Date().toISOString(),
      };
      blogs.push(blog);

      return blog;
    }),

  deleteBlog: publicProcedure.input(z.string()).mutation((req) => {
    const id = req.input;

    const index = blogs.findIndex((blog) => blog.id === id);

    if (index >= 0) {
      var removed = blogs.splice(index, 1);
      return "Deleted";
    } else {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Id doesn't exist",
      });
    }
  }),

  updateBlog: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        subTitle: z.string(),
        body: z.string(),
        author: z.string(),
      })
    )
    .mutation((req) => {
      const { title, subTitle, body, author, id } = req.input;

      const index = blogs.findIndex((blog) => blog.id === id);

      if (index >= 0) {
        blogs[index] = {
          ...blogs[index],
          title,
          subTitle,
          body,
          author,
          id,
        };
        return blogs[index];
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Id doesn't exist",
        });
      }
    }),
});
