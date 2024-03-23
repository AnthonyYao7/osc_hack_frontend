import Image from "next/image";
import styles from "./page.module.css";
import SearchAppBar from '../../components/CustomAppBar'

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchAppBar></SearchAppBar>

    </main>
  );
}
