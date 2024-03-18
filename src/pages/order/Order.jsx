import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Tabs, Typography } from "antd";
import NewOrder from './neworder/NewOrder';
import Bill from '../bill/Bill';
const { Title } = Typography;
const Order = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [createNewOrder, setCreateNewOrder] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const createNewOrderSuccess = () => {
    setCreateNewOrder(!createNewOrder)
  }

  const items = [
    {
      key: '1',
      label: `Tạo mới`,
      children: <NewOrder createNewOrder={createNewOrderSuccess} />,
    },
    {
      key: '2',
      label: `Danh sách hóa đơn`,
      children: <Bill onLoad={createNewOrder} />,
    }
  ];

  return (
    <>
      <Title style={{ margin: '0' }} level={5}>Quản lý đơn hàng</Title>
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
    </>
  );
}

export default Order