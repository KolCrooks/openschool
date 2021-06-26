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
import Video from "../components/video";


const useStyles = makeStyles((theme: Theme) =>
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

export default function VideoView(props: {videos: string[]}){
    const format = useStyles();

    return(
        <Grid container spacing={2}>
            <Grid item xs>
              <iframe
                width="800"
                height="450"
                src= {[props.videos[0]}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Grid>
            <Grid item xs>
              <GridList cellHeight={200} className={format.gridList} cols={2}>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/5Q0FlxcEEIw" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/w0b7N3n78Ok" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/bTl4PEs7rvg" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/NybHckSEQBI" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/5Q0FlxcEEIw" />
                </GridListTile>
                <GridListTile>
                  <Video vidLink="https://www.youtube.com/embed/bTl4PEs7rvg" />
                </GridListTile>
              </GridList>
            </Grid>
          </Grid>
    )
}