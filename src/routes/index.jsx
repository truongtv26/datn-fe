import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../pages/HomePage'
import ProductDetailPage from '../pages/ProductDetailPage'
import PageNotFound from '../components/errors/PageNotFound'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import AdminLayout from '../layouts/AdminLayout'
import PrivateRoute from '../components/PrivateRoute'
import { isUserAllowed } from '../lib/utils'
import Dashboard from '../pages/admin/Dashboard'
import OwnerPage from '../pages/admin/OwnerPage'
import { useAppContext } from '../provider/AppProvider'

const Routers = () => {
    const { user } = useAppContext();
    return (
        <>
            <Routes>
                {/* client route */}
                <Route path='/' element={<BaseLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='product/:slug' element={<ProductDetailPage />} />

                    {/* auth */}
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>

                {/* admin route */}
                <Route path='admin' element={
                    // roles có thể truy cập admin
                    <PrivateRoute isAllowed={() => isUserAllowed(user, ['owner', 'staff'])}>
                        <AdminLayout />
                    </PrivateRoute>
                }>

                    <Route path='dashboard' element={<Dashboard />} />

                    {/* route chỉ dành cho owner */}
                    <Route path='owner' element={
                        <PrivateRoute isAllowed={() => isUserAllowed(user, ['owner'])}>
                            
                        </PrivateRoute>}>
                        <Route index element={<OwnerPage />}></Route>
                        
                    </Route>
                </Route>

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default Routers;