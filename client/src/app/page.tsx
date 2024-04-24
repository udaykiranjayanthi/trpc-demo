import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
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
      </div>
    </div>
  );
}
