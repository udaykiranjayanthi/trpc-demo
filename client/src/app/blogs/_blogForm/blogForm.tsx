"use client";
import React, { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import { BlogFormData } from "@/app/_utils/commonTypes";

type Props = {
  handleSubmit: (data: BlogFormData) => void;
  defaultData?: BlogFormData;
};

export default function BlogForm({ handleSubmit, defaultData }: Props) {
  const [title, setTitle] = useState(defaultData?.title ?? "");
  const [subTitle, setSubTitle] = useState(defaultData?.subTitle ?? "");
  const [body, setBody] = useState(defaultData?.body ?? "");
  const [author, setAuthor] = useState(defaultData?.author ?? "");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit({
      title,
      subTitle,
      body,
      author,
    });
  };

  return (
    <form className={styles.blogForm} onSubmit={onSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="subTitle">Subtitle:</label>
        <input
          type="text"
          id="subTitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
