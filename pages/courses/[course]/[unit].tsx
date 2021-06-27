<<<<<<< HEAD
/* eslint-disable react/no-unescaped-entities */
import "../../../models";
=======
>>>>>>> parent of 589bb55... fixed some errors
import { GetStaticPaths, GetStaticProps } from "next";
import Course, { FullCourse, ICourse } from "../../../models/course";
import { default as UnitDB, FullUnit, IUnit } from "../../../models/unit";
import { signIn, useSession } from "next-auth/client";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import React, { useEffect, useState } from "react";
import ProblemCard from "../../../components/ProblemCard";
import ProblemCreator from "../../../components/problemCreator";
import VideoView from "../../../components/videoView";
import Problem from "../../../models/problem";
import Video from "../../../models/video";
const drawerWidth = 240;

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function Unit(props: { unit: FullUnit; course: FullCourse }) {
  const classes = useStyles();
  const [session, loading] = useSession();
  const [openEditor, setOpenEditor] = useState(false);
  const { unit } = props;
  const [open, setOpen] = useState(false);
  const [vidOpen, vidSetOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  var embedLink = "";

  const handleClickOpenVid = () => {
    if (!session?.user) return signIn("google");
    vidSetOpen(true);
  };
  const handleCloseVid = async () => {
    embedLink = linkText.replace(
      "https://youtu.be/",
      "https://www.youtube.com/embed/"
    );
    setLoading(true);
    await fetch("/api/video", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: embedLink,
        unitId: props.unit._id,
      }),
    });
    setLoading(false);
    vidSetOpen(false);
  };

  const [linkText, setLinkText] = useState("");

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <Header name={props.unit.name} />
      <Sidebar course={props.course} units={props.course.units} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.videos}>
          <div className={classes.videosHeader}>
            <Typography variant="h4">Videos</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpenVid}
            >
              Add Video
            </Button>
            <Dialog open={vidOpen} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add a video, upload it to YouTube, click share, and copy
                  the link provided by clicking "Copy" or highlight and then
                  copy the link. Paste the link here
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Link goes here"
                  onChange={(e) => setLinkText(e.target.value)}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => vidSetOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCloseVid} color="primary">
                  Upload
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {unit.videos.length === 0 ? (
            <Typography variant="body1">
              There is no video content yet
            </Typography>
          ) : (
            <VideoView videos={props.unit.videos.map((v) => v.content)} />
          )}
        </div>
        <div className={classes.problems}>
          <div className={classes.problemsHeader}>
            <Typography variant="h4">Problems</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                if (!session?.user) return signIn("google");
                setOpenEditor(true);
              }}
              color="primary"
            >
              Add Problem
            </Button>
          </div>
          {unit.problems.length === 0 ? (
            <Typography variant="body1">There are no problems yet</Typography>
          ) : (
            props.unit.problems.map((p) => (
              <ProblemCard problem={p} key={p._id} />
            ))
          )}
        </div>
        <ProblemCreator
          open={openEditor}
          unitId={props.unit._id}
          onClose={() => setOpenEditor(false)}
        />
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const unitsRaw = await UnitDB.find();

  const units = await Promise.all(
    unitsRaw.map(async (u) => ({
      _id: u.id,
      name: u.name,
      course: await Course.findById(u.course),
      videos: u.videos,
      problems: u.problems,
    }))
  );

  const paths = units.map((u) => ({
    params: {
      unit: u.name.toLowerCase(),
      course: (u.course as unknown as ICourse).name.toLowerCase(),
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("help");

  const unit = await UnitDB.findOne().where({
    name: { $regex: new RegExp(params.unit as string, "i") },
  });
  if (!unit) throw new Error("ERRR");

  const course = await Course.findById(unit.course);
  if (!course) throw new Error("ERR2");

  const u = {
    _id: unit?.id,
    name: unit.name,
    course: {
      _id: course.id,
      name: course.name,
      units: course.units.map((u) => u.toString()),
    },
    videos: await Promise.all(
      unit.videos.map(async (v) => {
        const vid = await Video.findById(v);
        if (!vid) throw new Error("THEWEEW");
        return {
          authorId: vid.authorId,
          content: vid.content,
          score: vid.score,
          unitId: vid.unitId,
          created: vid.created,
        };
      })
    ),
    problems: await Promise.all(
      unit.problems.map(async (p) => {
        const prob = await Problem.findById(p);
        if (!prob) throw new Error("THEWEEW");
        return {
          _id: prob.id,
          authorId: prob.authorId,
          content: prob.content,
          solution: prob.solution,
          score: prob.score,
          unitId: prob.unitId,
          created: prob.created,
        };
      })
    ),
  };

  const c = {
    _id: course.id,
    name: course.name,
    units: await Promise.all(
      course.units.map(async (p) => {
        const u = await UnitDB.findById(p);

        if (!u) throw new Error("HELP!");
        return {
          _id: u.id,
          name: u.name,
          course: u.course.toString(),
          videos: u.videos.map((v) => v.toString()),
          problems: u.problems.map((p) => p.toString()),
        };
      })
    ),
  };
  console.log(u.course.units);

  return { props: { unit: u, course: c } };
};
