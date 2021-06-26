import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { signIn, signOut, useSession } from "next-auth/client";
import { Button } from "@material-ui/core";

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
    signOut: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

export default function Header(props: { name: String }) {
  const [session, loading] = useSession();
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          {props.name}
        </Typography>
        {!session && (
          <>
            <Button color="inherit" onClick={() => signIn()}>
              Sign in
            </Button>
          </>
        )}
        {session && (
          <span className={classes.signOut}>
            <Button
              color="inherit"
              onClick={() => signOut()}
              variant="outlined"
            >
              Sign out
            </Button>
            <Typography variant="caption">{session.user?.email}</Typography>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
}
