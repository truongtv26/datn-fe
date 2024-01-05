import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import AdminLayout from '../layouts/AdminLayout'
import HomePage from '../pages/HomePage'
import ProductDetailPage from '../pages/ProductDetailPage'
import Dashboard from '../pages/admin/Dashboard'
import OwnerPage from '../pages/admin/OwnerPage'
import PageNotFound from '../components/errors/PageNotFound'
import PrivateRoute from '../components/PrivateRoute'
import { Route, Routes } from 'react-router-dom'
import BlogPage from '../pages/BlogPage'
import { useAppContext } from '../provider/AppProvider'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import { isUserAllowed } from '../lib/utils'
import ListProductManage from '../components/admin/Product/ListProductManage'
import AddProduct from '../components/admin/Product/AddProduct'
const Routers = () => {
    const { user } = useAppContext();
    return (
        <>
            <Routes>
                {/* client route */}
                
                <Route path='/' element={<BaseLayout />}>
                    <Route index element={<HomePage />} />

                    <Route path='product/:slug' element={<ProductDetailPage />} />
                    <Route path='blog/:slug' element={<BlogPage />} />

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
                    <Route path='product' element={<ListProductManage />} />
                    <Route path='product/add' element={<AddProduct />} />
                </Route>

                {/* route chỉ dành cho owner */}
                <Route path='admin' element={
                        <PrivateRoute isAllowed={() => isUserAllowed(user, ['owner'])}>
                            <AdminLayout />
                        </PrivateRoute>}>
                        <Route path='owner' element={<OwnerPage />} />

                </Route>

                <Route path='/404' element={<PageNotFound />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default Routers;