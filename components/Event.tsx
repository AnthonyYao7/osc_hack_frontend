import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface Event {
  startDateTime: dayjs.Dayjs;
  endDateTime: dayjs.Dayjs;
  club_id: string;
  title: string;
  description: string;
  community: string;
  event_id: string;
};

interface EventProps {
  event: Event;
}

export default function EventComponent (props: EventProps) {
  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href={"/events/" + props.event.event_id}>
        <Card sx={{ display: "flex", border: "1px solid black" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {props.event.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {props.event.startDateTime.format("MM-DD-YYYYTHH:mm") + '-' + props.event.endDateTime.format("MM-DD-YYYYTHH:mm")}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {props.event.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

