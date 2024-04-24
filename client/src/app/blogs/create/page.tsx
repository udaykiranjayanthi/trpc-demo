"use client";
import React from "react";
import styles from "./styles.module.css";
import { trpcClient } from "@/app/_utils/trpc";
import { useRouter } from "next/navigation";
import BlogForm from "../_blogForm/blogForm";
import { BlogFormData } from "@/app/_utils/commonTypes";

export default function CreateBlog() {
  const router = useRouter();

  const handleSubmit = (data: BlogFormData) => {
    trpcClient.blogs.createBlog
      .mutate(data)
      .then((res) => {
        alert("Blog created succesfully");

        router.push("/blogs");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Create a New Blog Post</h2>
      <BlogForm handleSubmit={handleSubmit} />
    </div>
  );
}
