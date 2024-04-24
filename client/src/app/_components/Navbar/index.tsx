import styles from "./styles.module.css";

const NavigationBar = () => {
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
      </ul>
    </nav>
  );
};

export default NavigationBar;
