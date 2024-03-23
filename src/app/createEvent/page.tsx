'use client'

import GeneralLayout from "../../../components/GeneralLayout";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function Page() {

  /*
  * Need:
  * Post Title,
  * Content,
  * Community
  *
  * */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // @ts-ignore
    if (data.get('title') == null || (data.get('title').toString().length == 0)) {
      setTitleTooShort(true);
      return;
    }

    let resp = await fetch(
      'http://' + process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + '/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: "god",
          title: data.get('title'),
          content: data.get('content'),
          community: data.get('community'),
        }),
      });

    if (resp.ok) {
      router.push('/');
    } else {
      setInvalidInput(true);
    }
  }

  const [titleTooShort, setTitleTooShort] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const router = useRouter();

  return (
    <GeneralLayout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Write your post
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="community"
                label="Community"
                type="community"
                id="community"
                autoComplete="community"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                name="content"
                label="Content"
                type="content"
                id="content"
                autoComplete="content"
              />
            </Grid>
          </Grid>

          {invalidInput && (
            <Typography color="red" sx={{ mt: 2, mb: 1 }}>
              The form data was invalid.
            </Typography>
          )}

          {titleTooShort && (
            <Typography color="red" sx={{ mt: 2, mb: 1 }}>
              You must have a title.
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Post
          </Button>
        </Box>
      </Box>
    </GeneralLayout>
  );
}