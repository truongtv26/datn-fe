import React, { createContext, useContext, useState } from "react";
import { getUser } from "../services/auth";
import { useQuery } from "react-query";
import SkeletonUI from "../layouts/SkeletonUI";
const AppContext = createContext();
const AppProvider = ({ children }) => {
     const [user, setUser] = useState({})

     const { error, isLoading } = useQuery('get_user', getUser, {
          onSuccess: (user) => setUser(user),
     });

     if (isLoading && localStorage.getItem('authToken')) {
          return null;
     }
 
     return (
          <AppContext.Provider value={{
               user,
               setUser,
          }}>
               {children}
          </AppContext.Provider>
     )

}

export default AppProvider
export const useAppContext = () => {
     return useContext(AppContext);
};