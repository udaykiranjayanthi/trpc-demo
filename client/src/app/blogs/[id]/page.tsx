"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Blog, Comment } from "@/app/_utils/commonTypes";
import { trpcClient } from "@/app/_utils/trpc";
import { useRouter } from "next/navigation";
import Comments from "@/app/_components/Comments";

export default function BlogPost({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog>();
  const [comments, setComments] = useState<Comment[]>([]);

  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    trpcClient.blogs.getBlogById
      .query(id as string)
      .then((res) => {
        setBlog(res);
      })
      .catch((err) => {
        console.error(err);
      });

    trpcClient.comments.getAllComments
      .query(id as string)
      .then((res) => {
        setComments(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    const subscription = trpcClient.comments.onAddComment.subscribe(undefined, {
      onData: (data: Comment) => {
        setComments((comments) => [...comments, data]);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDelete = () => {
    trpcClient.blogs.deleteBlog
      .mutate(id as string)
      .then((res) => {
        router.push("/blogs");
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = () => {
    router.push(`/blogs/${id}/edit`);
  };

  if (blog) {
    const { title, subTitle, body, author, createdAt } = blog;
    return (
      <div className={styles.blogPost}>
        <div className={styles.actions}>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete
          </button>
          <button className={styles.editButton} onClick={handleEdit}>
            Edit
          </button>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subTitle}>{subTitle}</p>
        <div className={styles.meta}>
          <span className={styles.author}>By {author}</span>
          <span>• </span>
          <span className={styles.publishedDate}>
            Published on{" "}
            {new Date(createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
              hour12: true,
            })}
          </span>
        </div>
        <p className={styles.body}>{body}</p>

        <div className={styles.comments}>
          <h4>Comments</h4>
          <Comments comments={comments} blogId={id} />
        </div>
      </div>
    );
  }
  return null;
}
