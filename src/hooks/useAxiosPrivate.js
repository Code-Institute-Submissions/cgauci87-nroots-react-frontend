
import { authPrivateAxios } from "../api/axiosDefaults";
import { useEffect } from "react"
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

export default function useAxiosPrivate() {
  const { accessToken, setAccessToken, csrftoken, user } = useAuth();
  const refresh = useRefreshToken();
  
  useEffect(() => {
    const requestIntercept = authPrivateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          config.headers["X-CSRFToken"] = csrftoken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = authPrivateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 ||
            error?.response?.status === 401) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const { csrfToken: newCSRFToken, accessToken: newAccessToken } =
            await refresh();
          setAccessToken(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          prevRequest.headers["X-CSRFToken"] = newCSRFToken;
          return authPrivateAxios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      authPrivateAxios.interceptors.request.eject(requestIntercept);
      authPrivateAxios.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, user]);

  return authPrivateAxios;
}
