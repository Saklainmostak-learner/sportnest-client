import { createAuthClient } from "better-auth/react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL: API_URL,

  fetchOptions: {
    onSuccess: (ctx) => {
      const token =
        ctx.response.headers.get(
          "set-auth-token"
        );

      if (token) {
        localStorage.setItem(
          "sportnest_auth_token",
          token
        );
      }
    },

    auth: {
      type: "Bearer",

      token: () =>
        localStorage.getItem(
          "sportnest_auth_token"
        ) || "",
    },
  },
});