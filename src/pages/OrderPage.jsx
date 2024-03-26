import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import instance from '../core/api';
import OrderTable from '../components/order/OrderTable';

const OrderPage = () => {
	const [orderStatus, setOrderStatus] = useState([{
		id: 0,
		status: 'Tất cả'
	}]);

	const [tabAction, setTabAction] = useState(0);

	useEffect(() => {
		instance.get('order-status')
			.then(({ data }) => {
				setOrderStatus([
					...orderStatus,
					...data
				])
			})
	}, [])

	const onChange = (key) => {
		setTabAction(key)
	};
	const items = orderStatus.map((status) => {
		return {
			key: status.id,
			label: status.status,
			children: <OrderTable data={status} tabAction={tabAction} setTabAction={setTabAction}/>
		}
	})

	return (
		<div className="container mx-auto">
			<h2>Đơn hàng của bạn</h2>
			<Tabs defaultActiveKey="2" items={items} onChange={onChange} />
		</div>
	)
}

export default OrderPage