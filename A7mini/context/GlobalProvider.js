import { createContext, useContext, useEffect, useState } 
from "react";

import { useNavigation } from '@react-navigation/native'; 

import { getCurrentUser, signOut } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext
(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOut = async (navigation) => {
    try {
      await signOut();
      setIsLoggedIn(false);
      setUser(null);
      navigation.navigate('sign-in'); 
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if(res) {
          setIsLoggedIn(true);
          setUser(res)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        signOut: handleSignOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;