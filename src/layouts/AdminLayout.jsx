import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SlackOutlined,
  AppstoreOutlined,
  PictureFilled,
  RadarChartOutlined,
  GiftOutlined,
  DollarOutlined,
  DashboardOutlined,
  QqOutlined,
  UserAddOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Badge, Space, Avatar, Divider, Popover, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import { useAppContext } from '../provider/AppProvider';
const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
  const { user } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: 'tongQuan',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
      link: '/admin/dashboard'
    },
    {
      key: 'banHang',
      icon: <DollarOutlined />,
      label: 'Bán Hàng',
      link: '/admin/order',
    },
    {
      key: 'qlsanpham',
      icon: <AppstoreOutlined />,
      label: 'Quản lý sản phẩm',
      children: [
        {
          key: 'sanPham',
          label: 'Sản phẩm',
          icon: <SlackOutlined />,
          link: '/admin/product',
        },
        {
          key: 'thuocTinh',
          label: 'Thuộc tính sản phẩm',
          icon: <RadarChartOutlined />,
          children: [
            {
              key: 'mauSac',
              label: 'Màu Sắc',
              link: '/admin/product/color',
            },
            {
              key: 'kichCo',
              label: 'Kích Cỡ',
              link: '/admin/product/size',
            },
            {
              key: 'loaiDe',
              label: 'Đế giày',
              link: '/admin/product/meterial',
            }
          ]
        }
      ]
    },
    {
      key: 'qlTaiKhoan',
      icon: <TeamOutlined />,
      label: 'Quản lý tài khoản',
      children: [
        {
          key: 'qlNhanVien',
          label: 'Quản lý nhân viên',
          icon: <QqOutlined />,
          link: '/admin/employees',
        },
        {
          key: 'qlKhachHang',
          label: 'Quản lý khách hàng',
          icon: <UserAddOutlined />,
          link: '/admin/customers',
        }
      ]
    },
    {
      key: 'qlVoucher',
      icon: <GiftOutlined />,
      label: 'Giảm giá',
      link: '/admin/vouchers',
      children: [
        {
          key: 'qlDotGiamGia',
          label: 'Quản lý đợt giảm giá',
          link: '/admin/employees',
        },
        {
          key: 'qlPhieuGiamGia',
          label: 'Quản lý phiếu giảm giá',
          link: '/admin/customers',
        }
      ]
    },
    {
      key: 'imagesGallery',
      icon: <PictureFilled />,
      label: 'Thư viện hình ảnh',
      link: '/admin/gallery',
    },
  ]

  const userPopoverContent = (
    <div>
      <Text strong>{user.name}</Text>
      <Divider style={{ margin: '8px 0' }} />
      <Link to="/user-information">Profile</Link>
      <Divider style={{ margin: '8px 0' }} />
      <Link to="/logout">Logout</Link>
    </div>
  );
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={['1']}
        >
          {/* Logo */}
          <Link to={'/admin/dashboard'}>
            <img src="/logo.png" alt="Logo" width="80%" style={{ margin: '0 auto', display: 'block' }} />
          </Link>

          {/* Menu items */}
          {items.map(item => (
            item.children ? (
              <Menu.SubMenu key={`${item.key}_submenu`} icon={item.icon} title={item.label}>
                {item.children.map(childItem => (
                  childItem.children ? (
                    <Menu.SubMenu key={`${childItem.key}_childmenu`} icon={childItem.icon} title={childItem.label}>
                      {childItem.children.map(subChildItem => (
                        <Menu.Item key={subChildItem.key} icon={subChildItem.icon}>
                          <Link to={subChildItem.link}>{subChildItem.label}</Link>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  ) : (
                    <Menu.Item key={childItem.key} icon={childItem.icon}>
                      <Link to={childItem.link}>{childItem.label}</Link>
                    </Menu.Item>
                  )
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon} >
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            )
          ))}
        </Menu>
      </Sider>
      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              background: 'none',
              justifyContent: 'center'
            }}
          />

          <div style={{
			height: '100%',
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            alignItems: 'center',
			lineHeight: 0
          }}>
            <div>
              <Space size="large">
                <Badge count={1} size="small">
                  <BellOutlined style={{
                    padding: "4px",
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: '50%',
                    padding: '5px'
                  }} />
                </Badge>
              </Space>
            </div>
            <div>
              <Space direction="vertical" style={{ marginRight: "12px" }}>
                <Space wrap>
                  <Popover content={userPopoverContent} placement="bottomLeft" trigger="hover">
                    <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#000' }} />
                  </Popover>
                </Space>
              </Space>
            </div>
          </div>
        </Header>
        {/* Content */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        {/* Footer */}
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          F Shoes ©2023 Powered by PolyTeam
        </Footer>
      </Layout>
    </Layout >
  )
}

export default AdminLayout