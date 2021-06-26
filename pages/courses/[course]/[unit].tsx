import { GetStaticPaths, GetStaticProps } from "next";
import { FullCourse, ICourse } from "../../../models/course";
import { FullUnit, IUnit } from "../../../models/unit";
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
} from "@material-ui/core";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import Add from "@material-ui/icons/Add";
import React, { useState } from "react";
import ProblemCard from "../../../components/ProblemCard";

//import Video from "../../components/video";

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
  })
);

export default function Unit(props: { unit: FullUnit; course: FullCourse }) {
  const classes = useStyles();
  const [session, loading] = useSession();
  const [openEditor, setOpenEditor] = useState(false);
  const { unit } = props;
  const [open, setOpen] = useState(false);
  const [vidOpen, vidSetOpen] = useState(false);
  const [confirmOpen, confirmSetOpen] = useState(false);
  var embedLink = "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenVid = () => {
    vidSetOpen(true);
  };
  const handleCloseVid = () => {
    vidSetOpen(false);
    console.log(linkText);
    embedLink = linkText.replace(
      "https://youtu.be/",
      "https://www.youtube.com/embed/"
    );
    console.log(embedLink);
  };

  const handleOpenConfirm = () => {
    confirmSetOpen(true);
  };

  const handleCloseConfirm = () => {
    confirmSetOpen(false);
  };

  const [linkText, setLinkText] = useState("");

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
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpenVid}
            >
              Add Video
            </Button>
            <Dialog
              open={vidOpen}
              onClose={handleCloseVid}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add a video, upload it to YouTube, click share, and copy
                  the link provided by clicking &quot Copy&quot or highlight and
                  then copy the link. Paste the link here
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
                <Button onClick={handleCloseVid} color="primary">
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
            ""
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
          {props.unit.problems.map((p) => (
            <ProblemCard problem={p} key={p._id} />
          ))}
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
