import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import SiteDrawer from '../components/SiteDrawer'
import SiteBottom from '../components/SiteBottom'
import './BaseLayout.css'
const BaseLayout = () => {

	return (
		<>
			<div className="home">
				<SiteDrawer />
				<div id="page" className="page-content">
					<Header />
					<Outlet />
					<Footer />
					<div className="site-overlay"></div>
				</div>
				<SiteBottom />
			</div>

		</>
	)
}

export default BaseLayout