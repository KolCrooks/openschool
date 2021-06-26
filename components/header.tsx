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
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    signOut: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export default function Header(props: { name: String }) {
  const [session, loading] = useSession();
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.content}>
        <Typography variant="h6" noWrap>
          {props.name}
        </Typography>
        {!session && (
          <>
            <Button color="inherit" onClick={() => signIn("google")}>
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
