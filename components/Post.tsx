"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

export interface Post {
  post_id: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  community: string;
}

interface PostProps {
  post: Post;
}

export function PostComponent(props: PostProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href={"/posts/" + post.post_id}>
        <Card sx={{ display: "flex", border: "1px solid black" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.createdAt}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.content}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
