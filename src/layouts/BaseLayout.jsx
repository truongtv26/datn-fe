import React from 'react'
import './BaseLayoutCss.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import SiteDrawer from '../components/SiteDrawer'
import SiteBottom from '../components/SiteBottom'


const BaseLayout = () => {

	return (
		<>
			<SiteDrawer />
			<div id="page" className="page-content">
				<Header />
				<main>
					<Outlet />
				</main>
				<Footer />
				<div className="site-overlay"></div>
			</div>
			<SiteBottom />
		</>
	)
}

export default BaseLayout