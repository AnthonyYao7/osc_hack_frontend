import { useRouter } from 'next/router';
import { CircularProgress, Container, Typography, Paper, Box, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from '@mui/icons-material/Comment';
import { useState, useEffect } from "react";
import PostsPageLayout from "../../../components/PostsPageLayout";

export interface Comment {
    comment_id: string;
    post_id: string;
    club_name: string;
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
    comments: Comment[];
    club_name: string;
}

export default function Page() {
    const router = useRouter();
    const [post, setPost] = useState<FullPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!router.isReady) return;

            const { postId } = router.query;
            setIsLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/posts/${postId}`, {
                    headers: { "Content-Type": "application/json" },
                });
                if (!res.ok) throw new Error("Data fetching failed");
                const data: FullPost = await res.json();
                setPost(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [router.isReady, router.query]);

    if (isLoading) return <CircularProgress />;
    if (!post) return <Typography variant="h6">Post not found.</Typography>;

    return (
        <PostsPageLayout>
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <IconButton onClick={() => router.back()} aria-label="back" size="large">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1, textAlign: 'center', ml: 2 }}>
                        {post.title}
                    </Typography>
                    <Chip label={post.club_name} sx={{ backgroundColor: "#f50057", color: 'white' }} />
                </Box>
                <Paper elevation={1} sx={{ padding: 3, margin: '24px 0', backgroundColor: "#fff" }}>
                    <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
                        {post.content}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                        Posted by {post.author} {post.community !== '' ? 'in ' + post.community : ''} on {new Date(post.created_at).toLocaleString()}
                    </Typography>
                </Paper>
                <Typography variant="h5" gutterBottom>
                    Comments
                </Typography>
                <List sx={{ bgcolor: 'background.paper' }}>
                    {post.comments.length > 0 ? post.comments.map((comment) => (
                        <ListItem key={comment.comment_id} alignItems="flex-start" divider sx={{ pl: 0 }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: "#f50057" }}>
                                    <CommentIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="subtitle2" component="span">
                                            {comment.author}
                                        </Typography>
                                        <Chip label={comment.club_name} size="small" sx={{ ml: 1, backgroundColor: "#f50057", color: 'white' }} />
                                    </>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body2" color="text.primary" component="span">
                                            {comment.content}
                                        </Typography>
                                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                            {new Date(comment.created_at).toLocaleString()}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    )) : <Typography sx={{ ml: 2 }}>No comments yet.</Typography>}
                </List>
            </Container>
        </PostsPageLayout>
    );
}
