import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../pages/HomePage'
import ProductDetailPage from '../pages/ProductDetailPage'
import PageNotFound from '../components/errors/PageNotFound'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import AppProvider from '../provider/AppProvider'
import BlogPage from '../pages/BlogPage'
const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <AppProvider >
                    <Routes>
                        <Route path='/' element={<BaseLayout />}>
                            <Route index element={<HomePage />} />

                            <Route path='product/:slug' element={<ProductDetailPage />} />
                            <Route path='blog/:slug' element={<BlogPage/>}></Route>

                            {/* auth */}
                            <Route path='login' element={<Login />} />
                            <Route path='register' element={<Register />} />
                        </Route>

                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                </AppProvider>
            </BrowserRouter>
        </>
    )
}

export default Routers;