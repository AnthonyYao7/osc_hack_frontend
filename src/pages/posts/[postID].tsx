import { useRouter } from 'next/router';
/* import GeneralLayout from "../../../components/GeneralLayout"; */
import { CircularProgress, Container, Typography, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useState, useEffect } from "react";

export interface Comment {
    comment_id: string;
    post_id: string;
    author: string;
    content: string;
    created_at: string;
}

export interface FullPost {
    post_id: string;
    author: string;
    title: string;
    content: string;
    createdAt: string;
    community: string;

    comments: Comment[]
}

export default function Page() {
    const router = useRouter()

    const [post, setPost] = useState<FullPost>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const { postID } = router.query;

            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const res = await fetch(
                        process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/posts/" + postID,
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
                    console.log(data)
                    setPost(data);
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


    if (isLoading) {
        return (
            <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!post) {
        return (
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Typography variant="h5" textAlign="center">
                    Post not found or does not exist.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                    Author: {post.author} | Community: {post.community}
                </Typography>
                <Typography variant="body1" paragraph>
                    {post.content}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
            </Paper>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Comments
            </Typography>
            <List>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <ListItem alignItems="flex-start" key={comment.comment_id}>
                            <ListItemText
                                primary={comment.author}
                                secondary={
                                    <>
                                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </Typography>
                                        {` — ${comment.content}`}
                                    </>
                                }
                            />
                            <Divider component="li" />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2">No comments yet.</Typography>
                )}
            </List>
        </Container>
    )
};
