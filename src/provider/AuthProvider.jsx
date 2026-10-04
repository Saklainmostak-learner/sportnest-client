import {
  createContext,
  useContext,
} from "react";

import { authClient } from "../lib/auth-client";

export const AuthContext =
  createContext(null);

const AuthProvider = ({ children }) => {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  const user = session?.user || null;

  const createUser = async (
    name,
    email,
    password,
    photoURL,
  ) => {
    return await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
  };

  const loginUser = async (
    email,
    password,
  ) => {
    const result =
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: (ctx) => {
            const token =
              ctx.response.headers.get(
                "set-auth-token",
              );

            if (token) {
              localStorage.setItem(
                "sportnest_auth_token",
                token,
              );
            }
          },
        },
      );

    await refetch();

    return result;
  };

  const googleLogin = async (
    destination = "/",
  ) => {
    const safeDestination =
      destination.startsWith("/")
        ? destination
        : "/";

    return await authClient.signIn.social({
      provider: "google",

      callbackURL: `${
        window.location.origin
      }${safeDestination}`,
    });
  };

  const updateUserProfile = async (
    name,
    photoURL,
  ) => {
    return await authClient.updateUser({
      name,
      image: photoURL,
    });
  };

  const logoutUser = async () => {
    try {
      return await authClient.signOut();
    } finally {
      localStorage.removeItem(
        "sportnest_auth_token",
      );
    }
  };

  const authInfo = {
    user,
    session,
    loading: isPending,
    error,
    refetch,
    createUser,
    loginUser,
    googleLogin,
    updateUserProfile,
    logoutUser,
  };

  return (
    <AuthContext.Provider
      value={authInfo}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);

export default AuthProvider;