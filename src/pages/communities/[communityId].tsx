import { useRouter } from 'next/router';
import { CircularProgress, Container, Typography, Paper, Divider, List, ListItem, ListItemText, Box, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from "react";

import PostsPageLayout from "../../../components/PostsPageLayout";
import { Post, PostComponent } from "../../../components/Post";

export default function Page() {
    const router = useRouter()

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

                    const sortedPosts = data.sort(
                        (a: Post, b: Post) =>
                            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
                    );
                    setCommunityPosts(sortedPosts);
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

    return (
        <PostsPageLayout>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Community Posts
                </Typography>
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
        </PostsPageLayout>
    );
}
