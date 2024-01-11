import React from 'react';
import { Badge, Dropdown, Image, Layout, Space, theme, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import {
	DownOutlined,
	DropboxOutlined,
	FacebookFilled,
	HeartOutlined,
	ShoppingCartOutlined,
	ShoppingFilled,
	ThunderboltFilled,
	TwitterCircleFilled,
	UserOutlined
} from '@ant-design/icons';
import { useAppContext } from '../provider/AppProvider';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import Cookies from 'js-cookie';
const items = new Array(3).fill(null).map((_, index) => ({
	key: String(index + 1),
	label: `nav ${index + 1}`,
}));

const onSearch = (value, _e, info) => console.log(info?.source, value);


const HeaderSection = () => {
	const { user, setUser } = useAppContext()
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const checkUser = (user) => {
		const items = [
			{
				key: '1',
				label: <Link to={'profile'}>Profile</Link>
			},
			{
				key: '0',
				label: <Link onClick={handleLogout}>Logout</Link>
			}
		];

		if (user.role === 'owner' || user.role === 'staff') {
			items.unshift({
				key: '2',
				label: <Link to={'admin/dashboard'}>Dashboard</Link>
			})
		}

		return Object.keys(user).length
			?
			<div style={{ display: 'flex', gap: '8px' }}>
				<UserOutlined style={{ fontSize: '24px' }} />
				<div style={{ textAlign: 'center', lineHeight: '12px' }}>
					<div style={{ fontSize: '12px' }}>xin chào</div>
					<div style={{
						fontWeight: 'bold',
						maxwidth: '80px',
						overflow: 'hidden',
						textWrap: 'nowrap'
					}}>
						{user.name.split(' ').slice(0, 2).join(' ')}
					</div>
				</div>
				<Dropdown
					menu={{
						items,
					}}
					trigger={['click', 'hover']}
				>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							<DownOutlined style={{ color: 'var(--primary-color)' }} />
						</Space>
					</a>
				</Dropdown>
			</div>
			:
			<Link to={'login'} style={{ color: 'var(--primary-color)' }}>
				<div style={{ display: 'flex', gap: '8px' }}>
					<UserOutlined style={{ fontSize: '24px' }} />
					<div style={{ textAlign: 'center', lineHeight: '12px' }}>
						<div style={{ fontSize: '12px' }}>Login</div>
						<div style={{ fontWeight: 'bold' }}>Account</div>
					</div>
				</div>
			</Link>
	}
	const handleLogout = () => {
		logout().then((data) => {
			if (data.status === 200) {
				Cookies.remove('authToken')
				localStorage.removeItem('user')
				setUser({});
			}
		});
	}


	return (
		<>
			<header className='header'>
				{/* top header */}
				<div className='top-header'>
					<div className='flex justify-between container mx-auto'>
						<ul className=''>
							<li><DropboxOutlined /> <strong>Track Order</strong></li>
							<li><strong>About Us</strong></li>
							<li><strong>Contact</strong></li>
							<li><strong>FAQ</strong></li>
						</ul>
						<ul>
							<li><span><ThunderboltFilled /></span> We deliver to you every day from: <strong style={{
								padding: '2px 6px',
								backgroundColor: 'var(--primary-color)',
								color: 'white',
								borderRadius: '10px',
							}}>7:00 to 20:00</strong></li>
							<li style={{ borderLeft: '1px solid gray' }}></li>
							<li><FacebookFilled /></li>
							<li><TwitterCircleFilled /></li>
							<li style={{ marginRight: '10px' }}><ShoppingFilled /></li>
						</ul>
					</div>
				</div>
				{/* main header */}
				<div className='main-header container mx-auto'>
					<div>
						<Image
							preview={false}
							maxwidth={250}
							src={'https://754969b0.rocketcdn.me/blonwe/grocery/wp-content/uploads/sites/5/2023/10/logo-grocery.png'}
						/>
					</div>
					<div className='search'>
						<Search
							placeholder="input search text"
							allowClear
							enterButton="Search"
							size="large"
							onSearch={(value) => {
								console.log(value);
							}}
							className='hidden sm:block'
						/>
					</div>
					<div>
						<ul>
							<li style={{ textAlign: 'end' }}>{checkUser(user)}</li>
							<li>
								<Badge count={10} color='var(--primary-color)' size="small">
									<HeartOutlined style={{ fontSize: '24px' }} />
								</Badge>
							</li>
							<li style={{ marginRight: '20px' }}>
								<Badge count={10} color='var(--primary-color)' size="small">
									<ShoppingCartOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
								</Badge>
							</li>
						</ul>
					</div>
				</div>
				{/* bottom header */}
				<div className='bottom-header container mx-auto'>
					<ul>
						<li><Link to={'/'}>Home</Link></li>
						<li><Link to={'/shop'}>
							<Dropdown
								menu={{
									items,
								}}
							>
								<Space>
									Shop
									<DownOutlined />
								</Space>
							</Dropdown>
						</Link></li>
						<li><Link to={'/blog'}>
							<Dropdown
								menu={{
									items,
								}}
							>
								<Space>
									Blog
									<DownOutlined />
								</Space>
							</Dropdown>
						</Link></li>
						<li><Link to={'/best-discount'}>
							<Dropdown
								menu={{
									items,
								}}
							>
								<Space>
									Best Discount
									<DownOutlined />
								</Space>
							</Dropdown>
						</Link></li>
					</ul>
				</div>
			</header>
		</>

	);
};
export default HeaderSection;