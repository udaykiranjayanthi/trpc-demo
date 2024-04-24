"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { trpcClient } from "@/app/_utils/trpc";
import { useRouter } from "next/navigation";
import BlogForm from "../../_blogForm/blogForm";
import { Blog, BlogFormData } from "@/app/_utils/commonTypes";

export default function CreateBlog({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog>();

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
  }, [id]);

  const handleSubmit = (data: BlogFormData) => {
    trpcClient.blogs.updateBlog
      .mutate({ ...data, id })
      .then((res) => {
        alert("Blog updated succesfully");

        router.push("/blogs");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (blog) {
    return (
      <div>
        <h2>Edit Blog Post</h2>
        <BlogForm handleSubmit={handleSubmit} defaultData={blog} />
      </div>
    );
  }

  return null;
}
