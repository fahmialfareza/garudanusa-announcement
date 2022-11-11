import { useEffect } from "react";
import { useRouter } from "next/router";

import authActions from "../redux/actions/authAction";
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

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/auth/me`,
          {
            method: "GET",
            headers,
          }
        );
        if (!response.ok) {
          dispatch(authActions.logout());
          router.push("/login");
          return;
        }
      } catch (error) {
        dispatch(authActions.logout());
        router.push("/login");
      }
    })();
  }, [dispatch, router, token]);

  return children;
}

export default Protected;
