"use client";

import RootLayout from "./layout";
import ResponsiveAppBar from "./MenuButtonsAppBar";
import { Inter } from "next/font/google";
import { Box } from '@mui/material';
import { Navbar } from './Navbar';

const inter = Inter({ subsets: ["latin"] });

const sections = [
  { title: "comp-sci", url: "/communities/comp-sci" },
  { title: "pre-health", url: "/communities/pre-health" },
  {
    title: "mechanical-engineering",
    url: "/communities/mechanical-engineering",
  },
];

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <ResponsiveAppBar sections={sections} />
	  <Box sx={{display: 'grid', gridTemplateColumns: '300px auto'}}>
		  <Box sx={{mr: '10px', mt: 2}}>
			<Navbar />
		  </Box>
		  <Box>
			  <main>{children}</main>
		  </Box>
	  </Box>
    </RootLayout>
  );
}
