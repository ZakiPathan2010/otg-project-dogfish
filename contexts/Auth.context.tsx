// REACT //
import React, { useEffect, useState } from "react";

// MODULES //
import { router } from "expo-router";

// ENUMS //
import { LocalStorageKeys } from "@/enums/local-storage";

// API SERVICES //
import { getUserDataRequest } from "@/services/api/user.service";

// SERVICES //
import { getDataStorage, setDataStorage } from "@/services/storage.service";

// OTHERS //
import { useCoursesContext } from "./Courses.context";

// TYPES //
import { UserData } from "@/types/user";

// Define all the state you want to share globally here
type AuthenticationState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isVerifyingUser: boolean;
};

type AuthenticationContextType = AuthenticationState & {
  setIsAuthenticated: (data: boolean) => void;
  setIsAuthLoading: (data: boolean) => void;
  logout: () => void;
  // Define setters for your other state here
};

// Create the Context
const AuthenticationContext = React.createContext <
  AuthenticationContextType | undefined
  > (undefined);

/** Init the Context */
export const useAuthenticationContext = () => {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "use Authentication Context must be used within AuthenticationProvider"
    );
  }
  return context;
};

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

/** Authentication Context */
export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  // Define Contexts
  const { setCourses } = useCoursesContext();

  // Define States
  const [isAuthenticated, setIsAuthenticated] = useState < boolean > (false);
  const [isAuthLoading, setIsAuthLoading] = useState < boolean > (false);
  const [user, setUser] = useState < UserData | null > (null);

  // Define Contexts

  // Helper Functions
  /** Logout the User */
  const logout = async () => {
    // Remove Data from Local Storage
    setDataStorage(LocalStorageKeys.AUTH_TOKEN, null);

    // Navigate to Login Page
    router.replace("/account/login");
  };

  /** Login a User */
  const loginUser = async (token: string) => {
    // Set in Local Storage
    setDataStorage(LocalStorageKeys.AUTH_TOKEN, token);

    // Make API Call to get the User and Courses Data
    getUserDataRequest(token).then((response) => {
      if (response.status_code === 200) {
        // Set the User State
        setUser(response.data.user);
        // Set the Courses State in Courses Context
        setCourses(response.data.courses);

        // Navigate to Home Page
        router.replace("/home");
      } else {
        console.log("Did not login");
      }
    }).catch((error) => {
      console.log(error);
      console.log("Did not login");
    });
  };

  /** Check if the user is logged in */
  const checkLoggedIn = async () => {
    setIsAuthLoading(true);
    const token = await getDataStorage(LocalStorageKeys.AUTH_TOKEN);

    if (token !== null) {
      router.replace("/home");
    } else {
      logout();
    }

    setIsAuthLoading(false);
  };

  // useEffect
  useEffect(() => {
    checkLoggedIn();
  }, []);

  // Add the setters to the value passed to the provider
  const value: AuthenticationContextType = {
    isAuthenticated,
    setIsAuthenticated,
    isAuthLoading: isAuthLoading,
    setIsAuthLoading: setIsAuthLoading,
    loginUser,
    logout,
    // Add your other state and setters here
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};