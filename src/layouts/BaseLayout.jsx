import React from 'react';
import { Layout } from "antd"
	import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import HeaderSection from '../components/Header';

const layoutStyles = {
	margin: ' 0 auto',
	backgroundColor: '#ffffff',
}

const BaseLayout = () => {
	

	return (
		<Layout style={layoutStyles} className='container'>
			<HeaderSection />
			<Content>
				<Outlet />
			</Content>
			<Footer />
		</Layout>
	)
}

export default BaseLayout