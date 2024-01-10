import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();

const AppProvider = ({ children }) => {
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ?? {})
     const [token, setToken] = useState('');
     const VITE_URL = import.meta.env.VITE_URL
     return (
          <AppContext.Provider value={{
               user,
               setUser,
               token,
               setToken,
               VITE_URL,
          }}>

               {children}
          </AppContext.Provider>
     )
}

export default AppProvider
export const useAppContext = () => {
     return useContext(AppContext);
};