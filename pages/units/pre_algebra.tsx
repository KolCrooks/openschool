import React from "react";
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
import Sidebar from "../../components/sidebar";

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

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            1. Pre-Algebra
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Typography paragraph>
          Here you will learn about pre-algebra.
        </Typography>
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/rIQeCuixzUc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
}