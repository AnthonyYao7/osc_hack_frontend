import { useRouter } from 'next/router';
import { CircularProgress, Container, Typography, Paper, Box, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from '@mui/icons-material/Comment';
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import PostsPageLayout from "../../../components/PostsPageLayout";

export interface Club {
	club_id: string;
	club_name: string;
	descrtiption: string;
	owner: string;
}

export interface User {
	user_id: string;
	username: string;
	affiliations: Club[];
}

export default function Page() {
	const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
	const { username } = router.query;

    useEffect(() => {
        const fetchUser = async () => {
            if (!router.isReady) return;

			console.log(username);
            setIsLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/events/user?username=${username}`, {
                    headers: { "accept": "application/json",  "Authorization": `Bearer ${getCookie('token')}` },
                });
                if (!res.ok) throw new Error("Data fetching failed");
                const data: User = await res.json();
				console.log(data);
				setUser(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [router.isReady, router.query]);

    if (isLoading) return <CircularProgress />;
    if (!user) return <Typography variant="h6">User not found.</Typography>;
	return (
		<h1>Welcome {username}!</h1>
		)
}
