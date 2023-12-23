import React from 'react'
import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../pages/HomePage'
import ProductDetailPage from '../pages/ProductDetailPage'
import PageNotFound from '../components/errors/PageNotFound'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const Routers = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<BaseLayout/>}>
                    <Route index element={<HomePage/>}/>

                    <Route path='product/:slug' element={<ProductDetailPage/>}/>    
                </Route>

                <Route path='*'  element={<PageNotFound/>} />
            </Routes>
               
               
        </BrowserRouter>
    </>
  )
}

export default Routers;