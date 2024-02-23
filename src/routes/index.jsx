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
import EditProduct from '../components/admin/Product/EditProduct'
import EditProductDetail from '../components/admin/Product/EditProductDetail'
import Promotion from '../pages/promotion/Promotion'
import AddPromotion from '../pages/promotion/AddPromotion'
import PromotionDetail from '../pages/promotion/update/PromotionDetail'
import Voucher from '../pages/voucher/Voucher'
import AddVoucher from '../pages/voucher/AddVoucher'
import VoucherDetail from '../pages/voucher/VoucherDetail'
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
                    <Route path='product/:id/edit' element={<EditProduct />} />
                    <Route path='promotion' element={<Promotion />} />
                    <Route path='promotion/create' element={<AddPromotion />} />
                    <Route path='promotion/:id' element={<PromotionDetail />} />
                    <Route path='voucher' element={<Voucher />} />
                    <Route path='voucher/add' element={<AddVoucher />} />
                    <Route path='voucher/:id' element={<VoucherDetail />} />
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


