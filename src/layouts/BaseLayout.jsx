import React from 'react';
import { Layout, Spin } from "antd"
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import HeaderSection from '../components/Header';
import { useAppContext } from '../provider/AppProvider';
import { LoadingOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';

const layoutStyles = {
	margin: ' 0 auto',
	backgroundColor: '#ffffff',
	position: 'relative',
}

const BaseLayout = () => {
	const { isLoading } = useAppContext();

	return (
		<Layout style={layoutStyles} className='w-full mx-auto'>
			<HeaderSection />
			<Content>
				<Outlet />
			</Content>
			<Footer />
			{isLoading && <div className='is-loading'>
				<Spin
					indicator={
						<LoadingOutlined
							style={{
								fontSize: 42,
							}}
							spin
						/>
					}
				/>
			</div>}
			<ToastContainer />
		</Layout>
	)
}

export default BaseLayout