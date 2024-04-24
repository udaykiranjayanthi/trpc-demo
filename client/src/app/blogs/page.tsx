"use client";
import React, { useEffect, useState } from "react";
import { trpcClient } from "../_utils/trpc";

import styles from "./styles.module.css";
import Link from "next/link";
import { Blog } from "../_utils/commonTypes";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    trpcClient.blogs.getAllBlogs
      .query()
      .then((res) => {
        setBlogs(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (blogs.length) {
    return (
      <div className={styles.blogList}>
        <h2>All Blogs</h2>
        <ul className={styles.list}>
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id}>
              <li className={styles.blogItem}>
                <h3>{blog.title}</h3>
                <p className={styles.subTitle}>{blog.subTitle}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
