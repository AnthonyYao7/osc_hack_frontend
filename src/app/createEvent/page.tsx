'use client'

import AuthenticatedPage from "../../../components/AuthenticatedPage";
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
import {DatePicker, DateTimePicker, DateTimeValidationError, PickerChangeHandlerContext} from "@mui/x-date-pickers";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import {getAuthenticatedHeaders} from "@/util";


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

    // @ts-ignore
    if (data.get('community') == null || (data.get('title').toString().length == 0)) {
      setCommunityTooShort(true);
      return;
    }

    // @ts-ignore
    if (data.get('club') == null || (data.get('club').toString().length == 0)) {
      setClubTooShort(true);
      return;
    }
    let obj = {
      author: "god",
      title: data.get('title'),
      description: data.get('content'),
      community: data.get('community'),
      club_id: data.get('club'),
      event_start: startDate.toISOString(),
      event_end: endDate.toISOString()
    };

    console.log(obj);

    let resp = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + '/events/create', {
        method: 'POST',
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify(obj),
      });

    if (resp.ok) {
      router.push('/');
    } else {
      setInvalidInput(true);
      console.log(resp);
    }
  }

  const [titleTooShort, setTitleTooShort] = useState(false);
  const [clubTooShort, setClubTooShort] = useState(false);
  const [communityTooShort, setCommunityTooShort] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const router = useRouter();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleStartDateChange = (newDate: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
    if (newDate != null) {
      setStartDate(newDate);
      console.log(newDate);
    }
  }

  const handleEndDateChange = (newDate: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
    if (newDate != null) {
      setEndDate(newDate);
      console.log(newDate);
    }
  }

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
          Create your event
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                name="club"
                label="Club"
                type="club"
                id="club"
                autoComplete="club"
              />
            </Grid>
            <Grid item xs={4}>
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

            <Grid item xs={6}>
              <DemoContainer components={['DateTimePicker']}>
                <DemoItem label="Start date">
                  <DateTimePicker
                    label="Choose start date and time"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </DemoItem>
              </DemoContainer>
            </Grid>
            <Grid item xs={6}>
              <DemoContainer components={['DateTimePicker']}>
                <DemoItem label="End date">
                  <DateTimePicker
                    label="Choose end date and time"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </DemoItem>
              </DemoContainer>
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

          {clubTooShort && (
            <Typography color="red" sx={{ mt: 2, mb: 1 }}>
              You must have a club.
            </Typography>
          )}

          {communityTooShort && (
            <Typography color="red" sx={{ mt: 2, mb: 1 }}>
              You must have a community.
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
  );
}