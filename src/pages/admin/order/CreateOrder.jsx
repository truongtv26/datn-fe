import { Col, Row, Typography, Form, Flex, Input, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane';
const { Title } = Typography;
import React, { useState } from 'react'
import OrderTab from '../../../components/admin/order/OrderTab';
import { toast } from 'react-toastify';
import { adminCreateOrder } from '../../../services/order';
import { useAppContext } from '../../../provider/AppProvider';

const CreateOrder = () => {
	const APP_URL = import.meta.env.VITE_LOCAL_URL
	const { user } = useAppContext();

	const [depositor, setDepositor] = useState({
		city: 201, cityName: 'Hà Nội',
		district: 3440, districtName: "Quận Nam Từ Liêm",
		ward: '13005', wardName: "Phường Mỹ Đình 2",
		detail: "92"
	})

	const order = {
		seller_by: user.name,
		recipient_name: 'default',
		recipient_phone: 'default',
		recipient_city: depositor.city,
		recipient_district: depositor.district,
		recipient_ward: depositor.ward,
		recipient_detail: depositor.detail,
		shipping_by: "Tại cửa hàng",
		shipping_cost: 0,
		payment_id: 3, // 3 thanh toán bằng tiền mặt
		status_id: 3, // 3. Chờ xác nhận
	}

	const [tabIndex, setTabIndex] = useState("1")

	const panes = [];

	const [tabs, setTabs] = useState({
		activeKey: "1",
		panes,
	})

	const onChange = (activeKey) => {
		setTabs({
			...tabs,
			activeKey: activeKey,
		});
	};

	const onEdit = (targetKey, action) => {

		if (action === 'add') {

			if (tabs.panes.length < 8) {
				// tạo đơn hàng 	
				adminCreateOrder(order)
					.then((res) => {
						if (res.status === 200) {
							// tạo tab đơn hàng
							setTabIndex(Number(tabIndex) + 1)
							const newPanes = tabs.panes;
							newPanes.push({
								title: "Đơn hàng " + res?.data?.id,
								content: <OrderTab order={res.data} depositor={depositor}/>,
								key: String(tabIndex),
							})
							const activeKey = String(tabIndex);
							setTabs({ panes: newPanes, activeKey });
						} else {
							toast.error("Có lỗi sảy ra khi tạo đơn hàng")
						}
					})

			} else {
				toast.error("Tối đa " + tabs.panes.length + " đơn hàng")
			}

		} else if (action === 'remove') {
			const paneIndex = tabs.panes.findIndex(pane => pane.key === targetKey);

			if (paneIndex >= 0) {
				const newPanes = tabs.panes.filter(pane => pane.key !== targetKey);
				setTabs({ panes: newPanes, activeKey: newPanes[newPanes.length - 1]?.key ?? "0" });
			}
		}

	};

	return (
		<>
			<Tabs
				onChange={onChange}
				activeKey={tabs.activeKey}
				type="editable-card"
				onEdit={onEdit}
				items={tabs?.panes.map(pane => {
					return {
						key: pane.key,
						label: pane.title,
						children: pane.content
					}
				})}
			>
			</Tabs>

		</>
	)
}

export default CreateOrder;