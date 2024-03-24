import { useRouter } from 'next/router';
import { CircularProgress, Typography, Paper, Box, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from '@mui/material';
import ResponsiveAppBar from '../../../components/MenuButtonsAppBar';
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import styled from 'styled-components';
import { Navbar } from '../../../components/Navbar';

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

const Welcome = styled.h1`
	font-size: 2rem;
	font-weight: bold;
`;

const Section = styled.h1`
	font-size: 1.5rem;
	font-weight: 200;
`;
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
	<>
			<ResponsiveAppBar />
			<Box sx={{display: 'grid', gridTemplateColumns: '300px auto'}}>
				<Box sx={{mr: '10px', mt: 2}}>
					<Navbar />
				</Box>
				<Box>
					<Box sx={{display: 'flex', justifyContent: 'center', pt: 2, pb: 3}}>
						<Welcome>Welcome {username}!</Welcome>
					</Box>
					<Box sx={{display: 'grid', height: '100%', gridTemplateColumns: 'auto auto'}}>
						<Box sx={{justifySelf: 'center'}}>
							<Section>Your posts</Section>
						</Box>
						<Box sx={{justifySelf: 'center'}}>
							<Section>Upcoming Events</Section>
						</Box>
					</Box>
				</Box>
				<Box />
			</Box>
		</>
		
	)
}
