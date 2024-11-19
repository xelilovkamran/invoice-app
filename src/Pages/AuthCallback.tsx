import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "@/components/shared/loading/Loading";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const getTokens = async () => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_OAUTH_TOKEN_URL,
          {
            client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
            client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = await response.data;

        if (response.status === 200) {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/convert-token/`,
            {
              token: data.access_token,
              backend: "google-oauth2",
              client_id: import.meta.env.VITE_API_AUTH_CLIENT_ID,
              grant_type: "convert_token",
            }
          );

          if (res.status === 200) {
            const tokens = res.data;
            localStorage.setItem("access", tokens.access_token);
            localStorage.setItem("refresh", tokens.refresh_token);
            navigate("/");
          }
        }
      } catch (error) {
        toast.error("Error getting tokens");
        navigate("/sign-in");
        return;
      }
    };

    getTokens();
    // eslint-disable-next-line
  }, [searchParams]);

  return <Loading />;
}

export default AuthCallback;
