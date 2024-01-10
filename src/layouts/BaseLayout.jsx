import React from 'react';
import { Layout } from "antd"
	import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import HeaderSection from '../components/Header';
import { useAppContext } from '../provider/AppProvider';

const layoutStyles = {
	margin: ' 0 auto',
	backgroundColor: '#ffffff',
}

const BaseLayout = () => {
 	return (
		<Layout style={layoutStyles} className='w-full mx-auto'>
			<HeaderSection />
			<Content>
				<Outlet />
			</Content>
			<Footer />
		</Layout>
	)
}

export default BaseLayout