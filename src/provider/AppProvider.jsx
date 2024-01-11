import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/auth";
const AppContext = createContext();
const AppProvider = ({ children }) => {
     const [user, setUser] = useState({})
     const [isLoading, setIsLoading] = useState(false);

     useEffect(() =>{
          if (localStorage.getItem('authToken')) {
               getUser().then(user =>setUser(user))
          }
     },[])

     return (
          <AppContext.Provider value={{
               user,
               setUser,
               isLoading,
               setIsLoading,
          }}>

               {children}
          </AppContext.Provider>
     )
}

export default AppProvider
export const useAppContext = () => {
     return useContext(AppContext);
};