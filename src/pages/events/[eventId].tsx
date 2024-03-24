import {useRouter} from "next/router";
import {Comment} from "@/pages/posts/[postId]";

export interface FullPost {
  event_id: string;
  club_id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  community: string;

  comments: Comment[]
}

export default function Page() {
  const router = useRouter()

  const eventId = router.query;

}