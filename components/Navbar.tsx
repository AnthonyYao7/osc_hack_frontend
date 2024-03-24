import { clubs } from '../src/communities';
import styled from 'styled-components';
import { Box } from '@mui/material';


const Community = styled.a`
	color: black;
	text-decoration: none;
	padding-left: 0.5rem;
`;

const BorderBox = styled.div`
	font-size: 0.75rem;
	border-radius: 5px;
	padding: 1rem 1px 1rem 1px;
	margin: 0.25rem 0 0.25rem 0;

	&:hover {
		background-color: var(--border-color);
	}
`;

const Header = styled.header`
	font-weight: bold;
`;

export function Navbar() {
	return (
		<Box sx={{ml: '10px', pr: '10px', border: '1px solid', borderStyle: 'none solid none none', borderColor: 'var(--border-color)'}}>
			<Header>Communities</Header>
			<Box sx={{display: 'flex', flexDirection: 'column', 'alignItems': 'left'}}>
				{clubs.map((community) => (
					<BorderBox key={community}>
						<Community key={community} href={`/communities/${community}`}>
							{community}
						</Community>
					</BorderBox>
				))}
			</Box>
		</Box>
	);
}
