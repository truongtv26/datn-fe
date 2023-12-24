import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../services/auth"
import Cookies from "js-cookie";
const AppContext = createContext();
const AppProvider = ({ children }) => {
     const [user, setUser] = useState({})
     const [token, setToken] = useState('');

     useEffect(()=> {
          if (Cookies.get('authToken')) {
               getUser()
               .then((data) =>{
                    setUser(data)
               })
          }
     }, [token])

     return (
          <AppContext.Provider value={{
               user,
               setUser,
               setToken,
          }}>


               {children}
          </AppContext.Provider>
     )
}

export default AppProvider
export const useAppContext = () => {
     return useContext(AppContext);
};