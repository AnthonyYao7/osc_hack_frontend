import { useRouter } from 'next/router'
import Typography from "@mui/material/Typography";
import * as React from "react";
import PostsPageLayout from "../../../components/PostsPageLayout";

export default function Page() {
  const router = useRouter()

  // Add logic for querying post from database

  return (
    <PostsPageLayout>
      <Typography variant="subtitle1" color="text.secondary">
        {router.query.communityID}
      </Typography>
    </PostsPageLayout>

  );
}