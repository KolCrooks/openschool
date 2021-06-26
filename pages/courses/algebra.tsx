import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { GetStaticProps } from "next";
import { FullCourse } from "../../models/course";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Video from "../../components/video";

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

const gridStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  })
);

export default function Algebra(props: { course: FullCourse }) {
  const classes = useStyles();
  const format = gridStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header name="Algebra: Introduction" />
      <Sidebar course={props.course} units={props.course.units} />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Typography paragraph>
          In this course you will learn the fundementals of Algebra. See the
          course units listed on the left. After finishing this course you will
          have the skills necessary to solve a wide variety of algebraic
          problems.
        </Typography>
        <div className={format.root}>
          <Grid container spacing={2}>
            <Grid item xs>
              <iframe
                width="800"
                height="450"
                src="https://www.youtube.com/embed/NybHckSEQBI"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Grid>
            <Grid item xs>
              <GridList cellHeight={200} className={format.gridList} cols={2}>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/NybHckSEQBI" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/NybHckSEQBI" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/NybHckSEQBI" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/NybHckSEQBI" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/NybHckSEQBI" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/NybHckSEQBI" />
                </GridListTile>
              </GridList>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://${process.env.host}/api/course/algebra`);
  const course = await res.json();

  return { props: { course } };
};
