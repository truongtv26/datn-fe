import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Layout, Space } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'

const SkeletonUI = () => {
     return (
          <div style={{
               position: 'fixed',
               top: '50%',
               left: '50%',
               zIndex: 999,
               transform: 'translate(-50%, -50%)',
          }}>
               Loading...
          </div>
     )
}

export default SkeletonUI