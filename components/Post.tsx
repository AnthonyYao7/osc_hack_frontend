import {
  Card,
  CardActionArea,
  Typography,
  Box,
  Grid,
  Chip,
} from "@mui/material";

export interface Post {
  post_id: string;
  author: string;
  title: string;
  content: string;
  created_at: string;
  community: string;
  club_name: string; // Assuming club_name is now part of the Post interface
}

interface PostProps {
  post: Post;
}

export function PostComponent({ post }: PostProps) {
  const { post_id, title, content, created_at, community, club_name } = post;

  function toEDT(dateUtc: string) {
    const date = new Date(dateUtc);
    date.setHours(date.getHours() - 4);
    return date;
  }

  function timeSince(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  const relativeTime = timeSince(toEDT(created_at));

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={11} md={10} lg={9} xl={8}>
        <Card
          sx={{
            width: "100%",
            mb: 2,
            boxShadow: "none",
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <CardActionArea
            component="a"
            href={`/posts/${post_id}`}
            sx={{ p: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {community && `r/${community} ·`} {relativeTime}
              </Typography>
              <Chip
                label={club_name}
                size="small"
                sx={{
                  backgroundColor: "#f50057",
                  color: "white",
                  borderRadius: "20px",
                }}
              />
            </Box>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                mb: 2,
              }}
            >
              {content}
            </Typography>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
