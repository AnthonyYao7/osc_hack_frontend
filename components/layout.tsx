import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../src/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import theme from '../src/theme';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box sx={{ 
				display: 'grid', 
				gridTemplateColumns: '15px auto 15px',
				minHeight: '100vh', 
				}}>
				<Box />
				<Box >
				  {children}
			    </Box>
				<Box />
		    </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
