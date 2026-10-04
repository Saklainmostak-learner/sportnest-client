import { createAuthClient } from "better-auth/react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL: API_URL,

  fetchOptions: {
    auth: {
      type: "Bearer",

      token: () => {
        return (
          localStorage.getItem(
            "sportnest_auth_token",
          ) || ""
        );
      },
    },

    onSuccess: (context) => {
      const authToken =
        context.response.headers.get(
          "set-auth-token",
        );

      if (authToken) {
        localStorage.setItem(
          "sportnest_auth_token",
          authToken,
        );
      }
    },
  },
});