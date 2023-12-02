import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";

export default function rootAuthCheck() {
  const router = useRouter();

  const { user } = useAuth0();

  if (!user) router.push("/begin");
}
