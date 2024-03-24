'use client'
import * as React from 'react';
import Image from 'next/image';
import Link from'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import {deleteCookie, getCookie} from "cookies-next";
import {isAuthenticated} from "@/util";
import styled from 'styled-components';

const pages = [
  {title: 'Create Post', path: '/createPost'},
  {title: 'Create Event', path: '/createEvent'},
  {title: 'Create Club', path: '/createClub'}
];


interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
}

// Styled component for the header bar
const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid;
  border-color: var(--border-color);
`;

// Styled component for the logo and title container
const LogoTitleContainer = styled.a`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

// Styled component for the logo image
const LogoImage = styled.img`
  height: 40px; // Set the height of your logo
  margin-right: 10px;
`;

// Styled component for the profile picture
const ProfilePicture = styled.img`
  height: 50px; // Set the height of your profile picture
  width: 50px; // Set the width of your profile picture
  border-radius: 50%; // Make it round
`;

const ProfileDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 10px`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  z-index: 999;
  top: 61px;
  right: 15px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  `;

const MenutItem = styled.div`
  cursor: pointer;
  `;

function ResponsiveAppBar(props: HeaderProps) {
  const {sections} = props;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
  	setIsMenuOpen(!isMenuOpen);
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickOnMenuOption = (event: React.MouseEvent<HTMLElement>, path: string) => {
    router.push(path);
  }

  const logoutHandler = () => {
    deleteCookie('token');
    router.push('/login');
  }

  const router = useRouter();

  const loginHandler = () => {
    router.push('/login');
  }

  const profileHandler = () => {
  	router.push(`/profile/${getCookie('username')}`);
  }

  const authenticatedSettings = [
    {action: 'View Profile', handler: profileHandler},
    {action: 'Logout', handler: logoutHandler},
  ]

  const unauthenticatedSettings = [
    {action: 'Login', handler: loginHandler}
  ]

  const settings = isAuthenticated() ? authenticatedSettings : unauthenticatedSettings;

  const theme = useTheme();


  return (
	<HeaderBar>
		<LogoTitleContainer href="/">
			<LogoImage src="/logo.png" alt="logo"/>
			Club Forum
		</LogoTitleContainer>
		<ProfileDropdown onClick={toggleMenu}>
		  <Tooltip title="Open settings">
			<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
			  <Avatar src="/prayujt.png" alt="B"/>
			</IconButton>
		  </Tooltip>

		  {isMenuOpen && (<Menu>
			{settings.map((setting) => (
			  <>
			    <MenuItem key={setting.action} onClick={setting.handler}>
				  {setting.action === 'Logout' && (
				  	<Box sx={{pr: '5px', display: 'flex', justifyContent: 'center'}}>
				  		<Image src="/logout.png" width={16} height={16} alt="log out"/>
				  	</Box>
				  )}
			  	  {setting.action}
			    </MenuItem>
			  </>
			))}
		  </Menu>
		  )}
	  </ProfileDropdown>
    </HeaderBar>
  );
}

export default ResponsiveAppBar;
