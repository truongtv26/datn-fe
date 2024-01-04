import React from 'react';
import { Avatar, Divider, Layout, Menu, Popover, Space, theme, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import { UserOutlined } from '@ant-design/icons';
import { useAppContext } from '../provider/AppProvider';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import Cookies from 'js-cookie';
const { Header } = Layout;
const { Text } = Typography
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

	const handleLogout = () => {
		logout().then((data) => {
			if (data.status === 200) {
				Cookies.remove('authToken')
				localStorage.removeItem('user')
				setUser({});
			}
		});
	}

	const userPopoverContent = (
		<div>
			{Object.keys(user).length
				?
				<>
					<Text strong>{user.name}</Text>
					<Divider style={{ margin: '8px 0' }} />
					{user.role === 'owner' || user.role === 'staff' ? <Link to="/admin/dashboard">Dashboard</Link> : ''}
					<Divider style={{ margin: '8px 0' }} />
					<Link to="/user-information">Profile</Link>
					<Divider style={{ margin: '8px 0' }} />
					<Link onClick={handleLogout}>Logout</Link>
				</>
				:
				<Link to="/login">Login</Link>
			}

		</div>
	);


	return (
		<Header
			style={{
				position: 'sticky',
				top: 0,
				zIndex: 1,
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: '10px',
				padding: 0,
				margin: '0 0 10px 0',
				background: 'gray',
			}}
		>
			<Menu
				theme="light"
				mode="horizontal"
				defaultSelectedKeys={['2']}
				items={items}
				style={{
					flex: 1,
					maxWidth: '50%',
				}}
			/>
			<Search
				placeholder="input search text"
				allowClear
				onSearch={onSearch}
				style={{
					flex: 1,
				}}
			/>
			<Space direction="vertical" style={{ marginRight: "12px" }}>
				<Space wrap>
					<Popover content={userPopoverContent} placement="bottomLeft" trigger="hover">
						<Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#000' }} />
					</Popover>
				</Space>
			</Space>
		</Header>

	);
};
export default HeaderSection;