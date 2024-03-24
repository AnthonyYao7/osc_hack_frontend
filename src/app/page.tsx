"use client";

import { PostComponent, Post } from "../../components/Post";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PostsPageLayout from "../../components/PostsPageLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import * as React from 'react';
import PagesEventsTabs from "../../components/PagesEventsTabs";


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
        const sortedPosts = data.sort(
          (a: Post, b: Post) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        setPosts(sortedPosts);
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

  useEffect(() => {
    const fetchData = async () => {

    }
  })

  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return !isLoading ? (
    <PostsPageLayout>
      <PagesEventsTabs value={value} handleChange={handleChange} />

      {value == 0 && posts.map((post: Post) => (
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
