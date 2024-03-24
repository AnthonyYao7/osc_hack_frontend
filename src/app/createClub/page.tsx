'use client'

import AuthenticatedPage from "../../../components/AuthenticatedPage";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {getCookie} from "cookies-next";
import {getAuthenticatedHeaders} from "@/util";


export default function Page() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // @ts-ignore
    if (data.get('club') == null || (data.get('club').toString().length == 0)) {
      setClubNameTooShort(true);
      return;
    }

    let resp = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + '/clubs/create', {
        method: 'POST',
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify({
          club_name: data.get('club'),
        }),
      });

    if (resp.ok) {
      router.push('/');
    } else {
      setInvalidInput(true);
    }
  }

  const [clubNameTooShort, setClubNameTooShort] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const router = useRouter();

  return (
    <AuthenticatedPage>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Create a club
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="club"
                label="Club Name"
                name="club"
                autoComplete="club"
              />
            </Grid>
          </Grid>

          {clubNameTooShort && (
            <Typography color="red" sx={{ mt: 2, mb: 1 }}>
              You must have a club name.
            </Typography>
          )}

          {invalidInput && (
            <Typography color="red" sx={{ mt: 2, mb: 1 }}>
              Invalid club name.
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>

    </AuthenticatedPage>
  )
}