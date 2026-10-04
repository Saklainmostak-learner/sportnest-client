import { createContext, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { authClient } from "../lib/auth-client";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  const user = session?.user || null;

  const jwtCreatedForUser = useRef(null);

  useEffect(() => {
    const createJwtCookie = async () => {
      if (!user?.email) return;

      if (jwtCreatedForUser.current === user.email) {
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {},
          {
            withCredentials: true,
          },
        );

        jwtCreatedForUser.current = user.email;
      } catch (error) {
        console.error(
          "JWT cookie creation failed:",
          error.response?.data?.message || error.message,
        );
      }
    };

    createJwtCookie();
  }, [user?.email]);

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

  const loginUser = async (email, password) => {
    return await authClient.signIn.email({
      email,
      password,
    });
  };

  const googleLogin = async (destination = "/") => {
    const safeDestination = destination.startsWith("/") ? destination : "/";

    return await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}${safeDestination}`,
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
    jwtCreatedForUser.current = null;

    return await authClient.signOut();
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
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);

export default AuthProvider;