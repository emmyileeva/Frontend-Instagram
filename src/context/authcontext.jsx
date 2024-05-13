import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await checkAuthUser();
      //   if (!isAuthenticated) {
      //     navigate("/sign-in");
      //   }
    };
    checkAuthentication();
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AuthContext);
