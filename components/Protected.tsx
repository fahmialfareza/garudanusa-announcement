import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import authActions from "../redux/actions/authActions";
import { useAppDispatch } from "../redux";

function Protected({ children }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    (async () => {
      try {
        if (!token) {
          dispatch(authActions.logout());
          router.push("/login");
          return;
        }

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);

        const config = {
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API}/api/v1/auth/me`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        await axios.request(config);
      } catch (error) {
        dispatch(authActions.logout());
        router.push("/login");
      }
    })();
  }, [dispatch, router, token]);

  return children;
}

export default Protected;
