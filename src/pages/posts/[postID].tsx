import { useRouter } from 'next/router'
import GeneralLayout from "../../../components/GeneralLayout";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function Page() {
  const router = useRouter()

  // Add logic for querying post from database

  return (
    <GeneralLayout>
      <Typography variant="subtitle1" color="text.secondary">
        {router.query.postID}
      </Typography>
    </GeneralLayout>
  );
}