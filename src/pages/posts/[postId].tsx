import { useRouter } from 'next/router';
import { CircularProgress, Container, Typography, Paper, Divider, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";

import PostsPageLayout from "../../../components/PostsPageLayout";

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
    created_at: string;
    community: string;

    comments: Comment[]
}


export default function Page() {
    const router = useRouter()

    function handleBack() {
        router.back(); // Navigates back to the previous page in history
    }

    const [post, setPost] = useState<FullPost>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const { postId } = router.query;

            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const res = await fetch(
                        process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/posts/" + postId,
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
    if (isLoading) return <CircularProgress />;

    if (!post) return <Typography>Post not found.</Typography>;

    return (
        <PostsPageLayout>
            <Container maxWidth="md">
                <IconButton
                    onClick={handleBack}
                    aria-label="back"
                    size="large"
                    sx={{ mb: 2 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Paper elevation={0} sx={{ padding: "24px", margin: "24px 0", backgroundColor: "#f6f7f8" }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {post.content}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Posted by {post.author} {post.community && `in r/${post.community} `} on {new Date(post.created_at).toLocaleString()}
                    </Typography>
                </Paper>
                <Typography variant="h5" gutterBottom>
                    Comments
                </Typography>
                <Divider />
                <List>
                    {post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <ListItem key={comment.comment_id} alignItems="flex-start">
                                <ListItemText
                                    primary={<Typography variant="subtitle2">{comment.author}</Typography>}
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="text.primary">
                                                {comment.content}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {new Date(comment.created_at).toLocaleString()}
                                            </Typography>
                                        </>
                                    }
                                />
                                <Divider variant="inset" component="li" />
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No comments yet.</Typography>
                    )}
                </List>
            </Container>
        </PostsPageLayout>
    );
}
