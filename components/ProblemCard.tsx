import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";
import { IProblem } from "../models/problem";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  makeStyles,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { ArrowDownward, ArrowUpward, ExpandMore } from "@material-ui/icons";
import { useEffect, useState } from "react";
import useLocalStorage from "react-use-localstorage";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  content: {},
  titleHeader: { display: "flex", justifyContent: "space-between" },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export function MarkdownRenderer(props: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMathPlugin]}
      rehypePlugins={[rehypeKatex]}
    >
      {props.children}
    </ReactMarkdown>
  );
}

export default function ProblemCard(props: { problem: IProblem }) {
  const classes = useStyles();
  const [vote, _setVote] = useState("0");
  const [offset, setOffset] = useState(0);

  const setVote = (v: string) => {
    window.localStorage.setItem(props.problem._id, v);
    _setVote(v);
  };
  useEffect(() => {
    const cnt = window.localStorage.getItem(props.problem._id) || "0";
    _setVote(cnt);
    setOffset(-cnt);
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.titleHeader}>
          <Tooltip
            title={`Created: ${new Date(
              props.problem.created
            ).toLocaleDateString()}`}
            aria-label="add"
          >
            <Typography variant="h5">Problem</Typography>
          </Tooltip>
          <div>
            <Tooltip title="Upvote">
              <IconButton
                onClick={() => {
                  if (vote === "1") {
                    fetch("/api/vote/problem", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ vote: -1, id: props.problem._id }),
                    });
                    setVote("0");
                  } else {
                    fetch("/api/vote/problem", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ vote: 1, id: props.problem._id }),
                    });
                    setVote("1");
                  }
                }}
              >
                <ArrowUpward color={vote === "1" ? "primary" : undefined} />
              </IconButton>
            </Tooltip>
            <Typography variant="button">
              {props.problem.score + +vote + offset}
            </Typography>
            <Tooltip
              title="Downvote"
              onClick={() => {
                if (vote === "-1") {
                  fetch("/api/vote/problem", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ vote: 1, id: props.problem._id }),
                  });
                  setVote("0");
                } else {
                  fetch("/api/vote/problem", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ vote: -1, id: props.problem._id }),
                  });
                  setVote("-1");
                }
              }}
            >
              <IconButton>
                <ArrowDownward color={vote === "-1" ? "error" : undefined} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <MarkdownRenderer>{props.problem.content}</MarkdownRenderer>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Show Solution</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MarkdownRenderer>{props.problem.solution}</MarkdownRenderer>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
