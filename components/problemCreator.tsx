import {
  Dialog,
  AppBar,
  IconButton,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Slide,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FunctionsIcon from "@material-ui/icons/Functions";
import { TransitionProps } from "@material-ui/core/transitions";
import React, { useState } from "react";
import ReactMde from "react-mde";
import { MarkdownRenderer } from "./ProblemCard";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    problemCreator: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    MDE: {
      width: "75%",
    },
  })
);
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ProblemCreator(props: {
  open: boolean;
  onClose: () => {};
}) {
  const classes = useStyles();
  const { open, onClose } = props;
  const [problemEditorTab, setProblemEditorTab] = useState<"write" | "preview">(
    "write"
  );
  const [problemEditorVal, setProblemEditorVal] = useState("");
  const [problemEditorTab2, setProblemEditorTab2] = useState<
    "write" | "preview"
  >("write");
  const [problemEditorVal2, setProblemEditorVal2] = useState("");
  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      scroll="paper"
      open={open}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => onClose()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Create Problem
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => {
              onClose();
            }}
          >
            Submit
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.problemCreator}>
        <Typography variant="h5">Problem</Typography>
        <ReactMde
          value={problemEditorVal}
          classes={{ reactMde: classes.MDE }}
          commands={{
            math: {
              // eslint-disable-next-line react/display-name
              icon: () => (
                <FunctionsIcon aria-label="Math" fontSize="inherit" />
              ),
              execute(opts) {
                if (!opts.textApi.getState().selectedText)
                  opts.textApi.replaceSelection("$$\n\n$$");
                else {
                  opts.textApi.replaceSelection(
                    `$${opts.textApi.getState().selectedText}$`
                  );
                }
              },
            },
          }}
          onChange={setProblemEditorVal}
          selectedTab={problemEditorTab}
          onTabChange={setProblemEditorTab}
          toolbarCommands={[["bold", "italic", "math"]]}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<MarkdownRenderer>{markdown}</MarkdownRenderer>)
          }
        />
        <Typography variant="h5">Solution</Typography>
        <ReactMde
          value={problemEditorVal2}
          classes={{ reactMde: classes.MDE }}
          commands={{
            math: {
              // eslint-disable-next-line react/display-name
              icon: () => (
                <FunctionsIcon aria-label="Math" fontSize="inherit" />
              ),
              execute(opts) {
                if (!opts.textApi.getState().selectedText)
                  opts.textApi.replaceSelection("$$\n\n$$");
                else {
                  opts.textApi.replaceSelection(
                    `$${opts.textApi.getState().selectedText}$`
                  );
                }
              },
            },
          }}
          onChange={setProblemEditorVal2}
          selectedTab={problemEditorTab2}
          onTabChange={setProblemEditorTab2}
          toolbarCommands={[["bold", "italic", "math"]]}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<MarkdownRenderer>{markdown}</MarkdownRenderer>)
          }
        />
      </div>
    </Dialog>
  );
}
