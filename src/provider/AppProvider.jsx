import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser, logout } from "../services/auth"
import Cookies from "js-cookie";
const AppContext = createContext();
const AppProvider = ({ children }) => {
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ?? {})
     const [token, setToken] = useState('');
     
     return (
          <AppContext.Provider value={{
               user,
               setUser,
               token,
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