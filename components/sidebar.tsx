import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import AddIcon from "@material-ui/icons/Add";
import DehazeIcon from "@material-ui/icons/Dehaze";
import MultilineChartIcon from "@material-ui/icons/MultilineChart";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { IUnit } from "../models/unit";
import { useRouter } from "next/dist/client/router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { FullCourse, ICourse } from "../models/course";
import { useSession } from "next-auth/client";

const drawerWidth = 240;
const iconLabels = [
  <ChromeReaderModeIcon key={0} />,
  <PlayCircleFilledWhiteIcon key={1} />,
];

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function Sidebar(props: {
  course: ICourse | FullCourse;
  units: IUnit[];
}) {
  const classes = useStyles();
  const router = useRouter();
  const links = ["/", `/courses/${props.course.name.toLowerCase()}`];

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [session] = useSession();

  const [unitText, setUnitText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/unit/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: unitText, courseId: props.course._id }),
    });
    setLoading(false);
    setOpen(false);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />

      <List>
        {["Main Page", "Introduction"].map((text, index) => (
          <ListItem
            button
            key={text}
            component="a"
            href={links[index]}
            selected={router.pathname === links[index]}
          >
            <ListItemIcon>{iconLabels[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {props.units.map((unit, index) => (
          <ListItem
            button
            key={index}
            component="a"
            alignItems="center"
            selected={router.query.unit === unit.name.toLowerCase()}
            href={`/courses/${props.course.name.toLowerCase()}/${unit.name.toLowerCase()}`}
          >
            <ListItemText primary={unit.name} inset />
          </ListItem>
        ))}
        {session?.user?.isAdmin ? (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
              fullWidth
            >
              Add a Unit
            </Button>
            <Dialog
              open={open}
              onClose={handleSubmit}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add a Unit</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add a unit to this course please enter the new unit name
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Unit ie. Simultaneous Equations"
                  fullWidth
                  onChange={(e) => setUnitText(e.target.value)}
                />
                <Backdrop className={classes.backdrop} open={loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <></>
        )}
      </List>
    </Drawer>
  );
}
