"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import GeneralLayout from "./GeneralLayout";

export default function PostsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();

  return (
    <GeneralLayout>
      <Container
        style={{
          marginTop: theme.spacing(8),
          marginBottom: theme.spacing(4),
        }}
        maxWidth="md"
      >
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Container>
    </GeneralLayout>
  );
}
