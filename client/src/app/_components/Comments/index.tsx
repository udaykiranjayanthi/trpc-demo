import { Comment } from "@/app/_utils/commonTypes";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { trpcClient } from "@/app/_utils/trpc";

const Comments = ({
  comments,
  blogId,
}: {
  comments: Comment[];
  blogId: string;
}) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    trpcClient.comments.addComment
      .mutate({
        blogId,
        text,
      })
      .then((res) => {
        setText("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className={styles.formGroup}>
        <input
          placeholder="Type comment"
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {comments.map((comment, index) => (
        <div key={index} className={styles.comment}>
          <div className={styles.text}>{comment.text}</div>
          <div className={styles.date}>
            {new Date(comment.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
              hour12: true,
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
