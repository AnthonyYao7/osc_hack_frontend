'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AuthenticationLayout from "../../../components/AuthenticationLayout";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {setCookie, getCookie} from "cookies-next";
import OurCopyright from '../../../components/OurCopyright';

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let payload = {
      username: data.get('email'),
      password: data.get('password'),
    };

    console.log(payload);

    let formBody = [];
    for (let property in payload) {
      let encodedKey = encodeURIComponent(property);
      // @ts-ignore
      let encodedValue = encodeURIComponent(payload[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    let formatted = formBody.join('&');

    let resp = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME  + '/login/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formatted,
    });

    if (resp.ok) {
      let r = await resp.json();
      let at = r['access_token']

	  setCookie('username', payload.username, {secure: true});
      setCookie('token', at, {secure: true});

      router.push('/');
    } else {
      setBadLogin(true);
    }
  };

  useEffect(() => {
    if (getCookie('token') != undefined) {
      router.push('/');
    }
  }, [])

  const [badLogin, setBadLogin] = useState(false);


  return (
    <AuthenticationLayout>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {badLogin && (
            <Typography color="red" sx={{ mt: 2, mb: 1 }}>
              The username or password was incorrect
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Don&apos;t have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <OurCopyright sx={{ mt: 5 }} />
    </AuthenticationLayout>
  );
}
