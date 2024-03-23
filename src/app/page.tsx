'use client'

import Image from "next/image";
import Grid from '@mui/material/Grid';
import styles from "./page.module.css";
import ResponsiveAppBar from "../../components/MenuButtonsAppBar";
import Post from "../../components/Post";
import Container from "@mui/material/Container";
import {useTheme} from "@mui/material/styles";
import PostsPageLayout from "../../components/PostsPageLayout";

const sections = [
  { title: 'Computer Science', url: '#'},
  { title: 'Pre Health', url: '#'},
  { title: 'Mechanical Engineering', url: '#'}
]

const posts = [
  { date: "09/11/2001",
    description: "what happened?",
    image: "puppy.jpg",
    imageLabel: "ff",
    title: "This is awesome",
    postID: "12nfd89"},
  { date: "09/12/2001",
    description: "This happened?",
    image: "puppy.jpg",
    imageLabel: "ff",
    title: "This is not awesome",
    postID: "12nfd90" },
  { date: "09/12/2001",
    description: "This happened?",
    image: "puppy.jpg",
    imageLabel: "ff",
    title: "This is not awesome",
    postID: "12nfd91"}
]

export default function Home() {
  const theme = useTheme();

  return (
    <PostsPageLayout>
      {/* TODO: Query database and get list of posts */}
      {posts.map((post) => (
        <Post key={post.postID} post={post}/>
      ))}
    </PostsPageLayout>
  );
}
