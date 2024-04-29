import React, { useEffect, useState } from 'react';
import { Badge, Button, Dropdown, Image, Layout, Popover, Space, theme, Typography } from 'antd';
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
import CartTable from './cart/CartTable';
import instance from '../core/api';

const items = new Array(3).fill(null).map((_, index) => ({
	key: String(index + 1),
	label: `nav ${index + 1}`,
}));

const onSearch = (value, _e, info) => console.log(info?.source, value);


const HeaderSection = () => {
	const { user, setUser, cartItemAction } = useAppContext()

	const [cart, setCart] = useState([]);

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	// Kiểm tra đăng nhập
	const checkUser = (user) => {
		const items = [
			{
				key: '1',
				label: <Link to={'profile'}>Thông tin tài khoản</Link>
			},
			{
				key: '0',
				label: <Link onClick={handleLogout}>Đăng xuất</Link>
			}
		];

		if (user.role === 'owner' || user.role === 'staff') {
			items.unshift({
				key: '2',
				label: <Link to={'admin/dashboard'}>Trang quản trị</Link>
			})
		}

		return Object.keys(user).length
			?
			<div style={{ display: 'flex', gap: '8px' }}>
				<UserOutlined style={{ fontSize: '24px' }} />
				<div style={{ textAlign: 'center', lineHeight: '12px' }}>
					<div style={{ fontSize: '12px' }}>Xin chào</div>
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
						<div style={{ fontSize: '12px' }}>Đăng nhập</div>
						{/* <div style={{ fontWeight: 'bold' }}>Account</div> */}
					</div>
				</div>
			</Link>
	}
	// xử lý đăng xuất
	const handleLogout = () => {
		logout().then((data) => {
			if (data.status === 200) {
				setUser({});
				localStorage.removeItem('authToken');
			}
		}).finally(() => {
			window.location.reload();
		})
	}

	// Xử lý dữ liệu giỏ hàng

	useEffect(() => {
		const cartItems = JSON.parse(localStorage.getItem('cart'));
		instance.post(`/cart`, cartItems).then(({ data }) => {
			setCart(data)
		})
	}, [cartItemAction])

	return (
		<>
			<header className='header'>
				{/* top header */}
				<div className='top-header'>
					<div className='flex justify-between container mx-auto'>
						<ul className=''>
							<Link to={'/order'}><DropboxOutlined /> <strong>Đơn hàng của bạn</strong></Link>
							<li><strong>Về chúng tôi</strong></li>
							<li><strong>Liên hệ</strong></li>
							<li><strong>Câu hỏi thường gặp</strong></li>
						</ul>
						<ul className=''>
							<li><span><ThunderboltFilled /></span> Chúng tôi giao hàng cho bạn mỗi ngày từ: <strong style={{
								padding: '2px 6px',
								backgroundColor: 'var(--primary-color)',
								color: 'white',
								borderRadius: '10px',
							}}>7:00 tới 20:00</strong></li>
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
							srcSet={"/logo_client.png 4x"}
						/>
					</div>
					<div className='search'>
						<Search
							placeholder="Nhập để tìm kiếm ..."
							allowClear
							enterButton="Tìm kiếm"
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
							{/* <li>
								<Badge count={10} color='var(--primary-color)' size="small">
									<HeartOutlined style={{ fontSize: '24px' }} />
								</Badge>
							</li> */}
							<li style={{ marginRight: '20px', cursor: 'pointer' }}>
								<Badge
									count={Array.isArray((JSON.parse(localStorage.getItem('cart'))))
										? (JSON.parse(localStorage.getItem('cart'))).length
										: 0}
									color='var(--primary-color)'
									size="small">
									<Popover placement="bottom" title={"Giỏ hàng"} content={<CartTable data={cart} />}>
										<ShoppingCartOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
									</Popover>
								</Badge>
							</li>
						</ul>
					</div>
				</div>
				{/* bottom header */}
				<div className='bottom-header container mx-auto'>
					<ul>
						<li><Link to={'/'}>Trang chủ</Link></li>
						<li><Link to={'/list-product'}>
							{/* <Dropdown
								menu={{
									items,
								}}
							> */}
								{/* <Space> */}
									Shop
									{/* <DownOutlined /> */}
								{/* </Space> */}
							{/* </Dropdown> */}
						</Link></li>
						{/* <li><Link to={'/blog'}>
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
						</Link></li> */}
						<li><Link to={'/best-discount'}>
							{/* <Dropdown
								menu={{
									items,
								}}
							>
								<Space> */}
									Giảm giá tốt nhất
									{/* <DownOutlined /> */}
								{/* </Space> */}
							{/* </Dropdown> */}
						</Link></li>
					</ul>
				</div>
			</header>
		</>

	);
};
export default HeaderSection;