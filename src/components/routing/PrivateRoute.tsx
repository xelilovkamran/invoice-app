import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Loading from "@/components/shared/loading/Loading";
import api from "@/utils/api";
import { getItem, setItem } from "@/utils/storage";

function PrivateRoute() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
    // eslint-disable-next-line
  }, []);

  const refreshToken = async () => {
    const refresh = getItem("refresh");
    if (!refresh) {
      setIsAuthorized(false);
      return;
    }

    try {
      const response = await api.post(
        "/user/token/refresh/",
        {
          refresh,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;

      if (response.status === 200) {
        setItem("access", data.access);
        setItem("refresh", data.refresh);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = getItem("access");
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    const expireTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;

    if (expireTime && expireTime < currentTime) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <Loading />;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
