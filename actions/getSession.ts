import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/pusher/auth";

export default async function getSession() {
  return await getServerSession(authOptions);
}
