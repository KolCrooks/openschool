import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import gradCap from "../public/graduation-cap.svg";
import { Typography } from "@material-ui/core";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Open School</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <Image src={gradCap} alt="OpenSchool" layout="responsive" />
        </div>

        <Typography variant="h1" className={styles.title}>
          Open School
        </Typography>

        <Typography variant="body1" className={styles.description}>
          Start your academic adventure with just one click
        </Typography>

        <div className={styles.grid}>
          <Grow in={true}>
            <a href="/courses/algebra" className={styles.card}>
              <h2>Algebra &rarr;</h2>
              <p>A broad area of mathematics with many applications</p>
            </a>
          </Grow>

          <Grow in={true}>
            <a href="/courses/biology" className={styles.card}>
              <h2>Biology &rarr;</h2>
              <p>The study of life and its unifying themes</p>
            </a>
          </Grow>

          <Grow in={true}>
            <a href="/courses/physics" className={styles.card}>
              <h2>Physics &rarr;</h2>
              <p>Discover the rules of the universe and explore</p>
            </a>
          </Grow>
        </div>
        <Typography variant="body1" className={styles.footer}>
          Open School is a crowd sourced educational website. Many teachers have
          created videos and material to cater online class during the pandemic.
          Now they can upload this content within our course and units framework
          to provide high quality education to any student with internet access.
        </Typography>
      </main>
    </div>
  );
}
