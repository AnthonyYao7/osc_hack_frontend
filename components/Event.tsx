import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Modal,
  Switch,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";

import { getAuthenticatedHeaders } from "@/util";

export interface Event {
  event_start: string;
  event_end: string;
  created_at: string;
  club_id: string;
  title: string;
  description: string;
  community: string;
  event_id: string;
}

interface EventProps {
  event: Event;
  affiliations: {
    club_id: string;
    club_name: string;
  }[];
}

export function EventComponent({ event, affiliations }: EventProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [interested, setInterested] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [interestedParties, setInterestedParties] = useState<
    {
      club_id: string;
      club_name: string;
      interestee: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interestedRes = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_HOSTNAME +
            "/events/" +
            event.event_id +
            "/interested",
          {
            method: "GET",
            headers: getAuthenticatedHeaders(),
          },
        );

        if (!interestedRes.ok) {
          throw new Error("Data fetching failed");
        }
        const interestedData = await interestedRes.json();
        setInterestedParties(interestedData["interested"]);
        setInterested(interestedData["am_interested"]);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [event.event_id]);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterested(event.target.checked);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAffiliationSelect = async (clubId: string) => {
    const affiliationsRes = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME +
        "/events/" +
        event.event_id +
        "/interested",
      {
        method: "POST",
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify({ club_id: clubId }),
      },
    );
    if (!affiliationsRes.ok) {
      throw new Error("Data fetching failed");
    }

    setOpenModal(false);
  };

  return (
    <Grid container justifyContent="center" my={2}>
      <Grid item xs={12} sm={11} md={10} lg={9} xl={8}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AccessTimeIcon sx={{ mr: 0.5 }} fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {formatDate(event.event_start)} - {formatDate(event.event_end)}
              </Typography>
            </Box>
            {event.community && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <GroupIcon sx={{ mr: 0.5 }} fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {event.community}
                </Typography>
              </Box>
            )}
            <Typography variant="body1" color="text.primary">
              {event.description}
            </Typography>
            {interestedParties.length > 0 && (
              <Typography sx={{ mt: 2 }} variant="body2">
                Interested Clubs:
              </Typography>
            )}
            <List dense>
              {interestedParties.map((party, index) => (
                <ListItem key={index}>
                  <ListItemText primary={party.club_name} />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions disableSpacing>
            <FormControlLabel
              control={
                <Switch checked={interested} onChange={handleToggleChange} />
              }
              label={interested ? "Interested" : "Are you interested?"}
            />
          </CardActions>
        </Card>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Which club are you representing?
            </Typography>
            <List>
              {affiliations.map((affiliation) => (
                <ListItem
                  button
                  key={affiliation.club_id}
                  onClick={() => handleAffiliationSelect(affiliation.club_id)}
                >
                  <ListItemText primary={affiliation.club_name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
}
