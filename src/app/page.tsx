"use client";

import Image from "next/image";
import Grid from "@mui/material/Grid";
import styles from "./page.module.css";
import ResponsiveAppBar from "../../components/MenuButtonsAppBar";
import { PostComponent, Post } from "../../components/Post";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PostsPageLayout from "../../components/PostsPageLayout";

import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/posts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!res.ok) {
          throw new Error("Data fetching failed");
        }
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up a timer to call fetchData every 5 seconds
    /* const intervalId = setInterval(fetchData, 5000); */

    // Cleanup function to clear the interval when the component unmounts
    /* return () => clearInterval(intervalId); */
  }, []);

  const theme = useTheme();

  return !isLoading ? (
    <PostsPageLayout>
      {posts.map((post: Post) => (
        <PostComponent key={post.post_id} post={post} />
      ))}
    </PostsPageLayout>
  ) : (
    <PostsPageLayout>
      <Typography variant="subtitle1" color="text.secondary">
        Loading...
      </Typography>
    </PostsPageLayout>
  );
}
