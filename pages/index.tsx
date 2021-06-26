import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Open Learning!</h1>

        <p className={styles.description}>
          Start your academic adventure with just one click
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Algebra &rarr;</h2>
            <p>A broad area of mathematics with many applications</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Biology &rarr;</h2>
            <p>The study of life</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Physics &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>footer</p>
      </footer>
    </div>
  );
}
