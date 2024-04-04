import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import AdminLayout from '../layouts/AdminLayout'
import HomePage from '../pages/HomePage'
import Dashboard from '../pages/admin/Dashboard'
import OwnerPage from '../pages/admin/OwnerPage'
import PageNotFound from '../components/errors/PageNotFound'
import PrivateRoute from '../components/PrivateRoute'
import { Route, Routes } from 'react-router-dom'
import BlogPage from '../pages/BlogPage'
import BlogDetailPage from '../pages/BlogDetailPage'
import { useAppContext } from '../provider/AppProvider'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import { isUserAllowed } from '../lib/utils'
import ListProductManage from '../components/admin/Product/ListProductManage'
import AddProduct from '../components/admin/Product/AddProduct'
import EditProduct from '../components/admin/Product/EditProduct'
import EditProductDetail from '../components/admin/Product/EditProductDetail'
import ProductDetailPage from '../pages/ProductDetail'
import ListProduct from '../pages/ListProduct'
import CartPage from '../pages/CartPage'
import CheckPage from '../pages/CheckPage'
import Promotion from '../pages/promotion/Promotion'
import AddPromotion from '../pages/promotion/AddPromotion'
import PromotionDetail from '../pages/promotion/update/PromotionDetail'
import Voucher from '../pages/voucher/Voucher'
import AddVoucher from '../pages/voucher/AddVoucher'
import VoucherDetail from '../pages/voucher/VoucherDetail'
import Order from '../pages/order/Order'
import BillDetail from '../pages/bill/BillDetail'
import OrderPage from '../pages/OrderPage'
import PaymentPage from '../pages/PaymentPage'
const Routers = () => {
	const { user } = useAppContext();
	return (
		<>
			<Routes>
				{/* client route */}


				<Route path="/" element={<BaseLayout />}>
					<Route index element={<HomePage />} />
					<Route path="list-product" element={<ListProduct />} />
					<Route path="product/:slug" element={<ProductDetailPage />}/>
					<Route path="blog" element={<BlogPage />} />
					<Route path="blog/:slug" element={<BlogDetailPage />} />
					<Route path="cart" element={<CartPage />} />
					<Route path="checkout" element={<CheckPage />} />
					<Route path='order' element={<OrderPage />} />
					{/* auth */}
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path='payment' element={<PaymentPage />} />
				{/* admin route */}
				<Route
					path="admin"
					element={
						// roles có thể truy cập admin
						<PrivateRoute
							isAllowed={() => isUserAllowed(user, ["owner", "staff"])}
						>
							<AdminLayout />
						</PrivateRoute>
					}
				>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="product" element={<ListProductManage />} />
					<Route path="product/add" element={<AddProduct />} />
				</Route>

				{/* route chỉ dành cho owner */}
				<Route
					path="admin"
					element={
						<PrivateRoute isAllowed={() => isUserAllowed(user, ["owner"])}>
							<AdminLayout />
						</PrivateRoute>
					}
				>
					<Route path="owner" element={<OwnerPage />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='product' element={<ListProductManage />} />
					<Route path='product/add' element={<AddProduct />} />
					<Route path='product/:id/edit' element={<EditProduct />} />
				</Route>

				{/* route chỉ dành cho owner */}
				<Route path='admin' element={
					<PrivateRoute isAllowed={() => isUserAllowed(user, ['owner'])}>
						<AdminLayout />
					</PrivateRoute>}>
					<Route path='owner' element={<OwnerPage />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='product' element={<ListProductManage />} />
					<Route path='product/add' element={<AddProduct />} />
					<Route path='product/:id/edit' element={<EditProduct />} />
					<Route path='promotion' element={<Promotion />} />
					<Route path='promotion/create' element={<AddPromotion />} />
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
					<Route path='order' element={<Order />} />
					<Route path='bill/:id' element={<BillDetail />} />
				</Route>

				<Route path='/404' element={<PageNotFound />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes >
		</>
	)
}

export default Routers;

