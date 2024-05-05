"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { trpcClient } from "./_utils/trpc";
import { UserDetails } from "./_utils/commonTypes";

export default function Home() {
  const [userDetails, setUserDetails] = useState<UserDetails>();

  useEffect(() => {
    trpcClient.user.getUser
      .query()
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.introSection}>
        <h1>Welcome to My Blog</h1>
        <p>Explore the latest articles, tips, and insights.</p>
        <div className={styles.ctaButtons}>
          <Link href="/blogs" className={styles.ctaButton}>
            View all blogs
          </Link>
          <Link href="/blogs/create" className={styles.ctaButton}>
            Write a Blog
          </Link>
        </div>
        <div className={styles.userDetails}>
          {userDetails && (
            <p>
              {userDetails?.name} | {userDetails?.email}{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
