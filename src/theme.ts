'use client';
import {Roboto} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#556cd6',
      light: '#7e98f3',
      dark: '#0044b2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#19857b',
      light: '#4fb3a9',
      dark: '#005f56',
      contrastText: '#000000',
    },
  },
});

export default theme;