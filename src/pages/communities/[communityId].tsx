import { useRouter } from 'next/router';
import { IconButton, CircularProgress, Container, Typography, Paper, Divider, List, ListItem, ListItemText, Box, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import PostsPageLayout from "../../../components/PostsPageLayout";
import { Post, PostComponent } from "../../../components/Post";

export default function Page() {
    const router = useRouter()

    function handleBack() {
      router.back(); // Navigates back to the previous page in history
    }

    const [communityPosts, setCommunityPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const { communityId } = router.query;

            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const queryParams = {
                        community: communityId as string,
                    }
                    const res = await fetch(
                        process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/posts?" + new URLSearchParams(queryParams).toString(),
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
                    setCommunityPosts(data);
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
        }
    }, [router.isReady, router.query]);

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    }

    return (
        <PostsPageLayout>
          {
            value == 0 &&
            (
            <Container>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton
                  onClick={handleBack}
                  aria-label="back"
                  size="large"
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1" gutterBottom sx={{ flexGrow: 1, textAlign: 'center' }}>
                  r/{router.query.communityId}
                </Typography>
              </Box>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            communityPosts.map((post) => (
                                <ListItem key={post.post_id}>
                                    <PostComponent post={post} />
                                </ListItem>
                            ))
                        )}
            </Container>
            )}
        </PostsPageLayout>
    );
}
