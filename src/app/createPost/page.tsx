"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Autocomplete,
  Button,
  Box,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import AuthenticatedPage from "../../../components/AuthenticatedPage";
import { getAuthenticatedHeaders } from "@/util";

// Dummy community options for Autocomplete component
const communityOptions = [
  { label: "comp-sci", id: "comp-sci" },
  { label: "pre-med", id: "pre-med" },
  { label: "aerospace", id: "aerospace" },
];

export default function Page() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    club_name: "",
    community: "",
  });
  const [communityInput, setCommunityInput] = useState("");
  const [titleTooShort, setTitleTooShort] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const router = useRouter();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!post.title || post.title.length === 0) {
      setTitleTooShort(true);
      return;
    }

    let resp = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/posts`,
      {
        method: "POST",
        headers: getAuthenticatedHeaders(),
        body: JSON.stringify({
          ...post,
        }),
      },
    );

    if (resp.ok) {
      router.push("/"); // Or to a confirmation/message page
    } else {
      setInvalidInput(true);
    }
  };

  return (
    <AuthenticatedPage>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Write Your Post
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={post.title}
              onChange={handleChange}
            />
            <Autocomplete
              options={communityOptions}
              getOptionLabel={(option) => option.label}
              onChange={(_, newValue) => {
                setPost({ ...post, community: newValue ? newValue.id : "" });
                setCommunityInput(newValue ? newValue.id : "");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Community" margin="normal" />
              )}
            />
            <TextField
              margin="normal"
              fullWidth
              name="club_name"
              label="Club Name"
              type="text"
              id="club_name"
              value={post.club_name}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              name="content"
              label="Content"
              type="text"
              id="content"
              autoComplete="content"
              value={post.content}
              onChange={handleChange}
            />
            {titleTooShort && (
              <Typography color="error" sx={{ mt: 2 }}>
                The title must not be empty.
              </Typography>
            )}
            {invalidInput && (
              <Typography color="error" sx={{ mt: 2 }}>
                Please check your input.
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
      </Container>
    </AuthenticatedPage>
  );
}
