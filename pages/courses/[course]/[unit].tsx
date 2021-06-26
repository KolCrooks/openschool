import { GetStaticPaths, GetStaticProps } from "next";
import { FullCourse, ICourse } from "../../../models/course";
import { FullUnit, IUnit } from "../../../models/unit";
import { useSession } from "next-auth/client";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";
import { CssBaseline, AppBar, Toolbar, Typography } from "@material-ui/core";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

export default function Unit(props: { unit: FullUnit; course: FullCourse }) {
  const classes = useStyles();
  const [session, loading] = useSession();
  const { unit } = props;

  console.log(session, loading);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header name={props.unit.name} />
      <Sidebar courseName={props.course.name} units={props.course.units} />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Typography paragraph>Here you will learn about algebra.</Typography>
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/NybHckSEQBI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://${process.env.host}/api/unit/list`);
  const units = await res.json();

  const paths = units.map((u: IUnit) => ({
    params: {
      unit: u.name.toLowerCase(),
      course: (u.course as unknown as ICourse).name.toLowerCase(),
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("help");

  const res = await fetch(`http://${process.env.host}/api/unit/${params.unit}`);
  const res2 = await fetch(
    `http://${process.env.host}/api/course/${params.course}`
  );

  const unit: FullUnit = await res.json();
  const course: FullCourse = await res2.json();

  return { props: { unit, course } };
};
