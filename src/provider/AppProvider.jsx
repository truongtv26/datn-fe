import React, { createContext, useContext, useState } from "react";
import { getUser } from "../services/auth";
import { useQuery } from "react-query";
import SkeletonUI from "../layouts/SkeletonUI";
import { ConfigProvider } from "antd";
const AppContext = createContext();
const AppProvider = ({ children }) => {
     const [user, setUser] = useState({})
     const [cartItemAction, setCartItemAction] = useState(false)
     const [wishlistAction, setWishlistAction] = useState(false);
     const { isLoading, isError } = useQuery('get_user', getUser, {
          onSuccess: (user) => setUser(user),
     });
     // console.log(isLoading);
     if (isLoading && localStorage.getItem('authToken')) {
          return null;
     }

     return (
          <AppContext.Provider value={{
               user,
               setUser,
               cartItemAction,
               setCartItemAction,
               wishlistAction,
               setWishlistAction,
          }}>
               <ConfigProvider
                    theme={{
                         components: {
                              Statistic: {
                                   contentFontSize: 16,
                              },
                         },
                    }}
               >
                    {children}
               </ConfigProvider>
          </AppContext.Provider>
     )

}

export default AppProvider
export const useAppContext = () => {
     return useContext(AppContext);
};