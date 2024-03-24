"use client";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PostsPageLayout from "../../components/PostsPageLayout";
import { Box, Tooltip, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect } from "react";
import * as React from "react";

import PagesEventsTabs from "../../components/PagesEventsTabs";
import { Navbar } from '../../../components/Navbar';
import { PostComponent, Post } from "../../components/Post";
import { EventComponent, Event } from "../../components/Event";

import { getAuthenticatedHeaders } from "@/util";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [affiliations, setAffiliations] = useState<
    {
      club_id: string;
      club_name: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const postsRes = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/posts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!postsRes.ok) {
          throw new Error("Data fetching failed");
        }
        const postsData = await postsRes.json();
        const sortedPosts = postsData.sort(
          (a: Post, b: Post) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        setPosts(sortedPosts);

        const eventsRes = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/events",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!eventsRes.ok) {
          throw new Error("Data fetching failed");
        }
        const eventsData = await eventsRes.json();
        const sortedEvents = eventsData["events"].sort(
          (a: Event, b: Event) =>
            new Date(b.event_start).getTime() - new Date(a.event_end).getTime(),
        );
        setEvents(sortedEvents);

        const affiliationsRes = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/login/affiliations",
          {
            method: "GET",
            headers: getAuthenticatedHeaders(),
          },
        );
        if (!affiliationsRes.ok) {
          throw new Error("Data fetching failed");
        }
        setAffiliations(await affiliationsRes.json());
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
    const fetchData = async () => {};
  });

  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return !isLoading ? (
    <PostsPageLayout>
      <PagesEventsTabs value={value} handleChange={handleChange} />

      <Box sx={{ position: "relative", mt: 3, mb: 4, width: "100%" }}>
        {" "}
        {value === 0 &&
          posts.map((post: Post) => (
            <PostComponent key={post.post_id} post={post} />
          ))}
        {value === 1 &&
          events.map((event: Event) => (
            <EventComponent
              key={event.event_id}
              event={event}
              affiliations={affiliations}
            />
          ))}
        <a
          href={value === 0 ? "/createPost" : "/createEvent"}
          style={{
            textDecoration: "none",
            position: "absolute",
            right: 0,
            top: "-28px",
            zIndex: 1,
          }}
        >
          <Tooltip
            title={value === 0 ? "Create New Post" : "Create New Event"}
            placement="left"
          >
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </a>
      </Box>
    </PostsPageLayout>
  ) : (
    <PostsPageLayout>
      <Typography variant="subtitle1" color="text.secondary">
        Loading...
      </Typography>
    </PostsPageLayout>
  );
}
