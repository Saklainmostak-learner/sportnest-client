import { createContext, useContext } from "react";
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

  const createUser = async (name, email, password, photoURL) => {
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

  const googleLogin = async () => {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin,
    });
  };

  const updateUserProfile = async (name, photoURL) => {
    return await authClient.updateUser({
      name,
      image: photoURL,
    });
  };

  const logoutUser = async () => {
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

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;