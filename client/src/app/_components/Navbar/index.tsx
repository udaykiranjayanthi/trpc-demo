"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

const NavigationBar = () => {
  const token = sessionStorage.getItem("token");
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>My Blog</div>
      <ul className={styles.navLinks}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/blogs">Blogs</a>
        </li>
        <li>
          <a href="/blogs/create">Create blog</a>
        </li>
        <li>
          {token ? (
            <button onClick={logout} className={styles.logout}>
              Logout
            </button>
          ) : (
            <a href="/login">Login</a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
