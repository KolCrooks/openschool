import { GetStaticPaths, GetStaticProps } from "next";
import { FullCourse, ICourse } from "../../../models/course";
import { FullUnit, IUnit } from "../../../models/unit";
import { signIn, useSession } from "next-auth/client";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";
import { CssBaseline, Typography, Button } from "@material-ui/core";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import Add from "@material-ui/icons/Add";
import Problem from "../../../components/ProblemCard";

const drawerWidth = 240;
const mkdn = `Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.
$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    videos: {},
    videosHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    problems: {},
    problemsHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
  })
);

export default function Unit(props: { unit: FullUnit; course: FullCourse }) {
  const classes = useStyles();
  const [session, loading] = useSession();
  const { unit } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header name={props.unit.name} />
      <Sidebar course={props.course} units={props.course.units} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.videos}>
          <div className={classes.videosHeader}>
            <Typography variant="h4">Videos</Typography>
            <Button variant="outlined">
              Add <Add />
            </Button>
          </div>
          {unit.videos.length === 0 ? (
            <Typography variant="body1">
              There is no video content yet
            </Typography>
          ) : (
            ""
          )}
        </div>
        <div className={classes.problems}>
          <div className={classes.problemsHeader}>
            <Typography variant="h4">Problems</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                if (!session?.user) signIn("Google");
              }}
            >
              Add <Add />
            </Button>
          </div>
          <Problem
            problem={{
              _id: "abc",
              authorId: "",
              content: mkdn,
              created: new Date(),
              score: 0,
              solution: mkdn,
              unitId: unit.name,
            }}
          ></Problem>
        </div>
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
