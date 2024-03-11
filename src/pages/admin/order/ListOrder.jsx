import { DeleteOutlined, EditOutlined, HomeOutlined, PlusCircleFilled } from '@ant-design/icons'
import { Badge, Breadcrumb, Button, Col, Dropdown, Flex, Input, Radio, Row, Select, Space, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../../core/api'
import OrderStatus from '../../../components/admin/order/OrderStatus'
import FormatCurrency from '../../../utils/FormatCurrency'

const ListOrder = () => {
	// trạng thái đơn hàng
	const [orders, setOrders] = useState([]);
	const [orderStatus, setOrderStatus] = useState([{ key: 0, label: "Tất cả", value: 0 }]);
	const [statusSelected, setStatusSelected] = useState({ key: 0, label: "Tất cả", value: 0 })
	const [orderTypeSelected, setOrderTypeSelected] = useState({ key: 0, label: 'Tất cả', value: 0 })

	const columns = [
		{
			title: '#',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Sản phẩm',
			dataIndex: 'product',
			key: 'product',
		},
		{
			title: 'Khách hàng',
			dataIndex: 'recipient',
			key: 'recipient',
		},
		{
			title: 'Tổng thanh toán',
			dataIndex: 'total',
			key: 'total',
			render: (value, record) => {
				return FormatCurrency(value)
			}
		},
		{
			title: 'Hình thức thanh toán',
			dataIndex: 'payment',
			key: 'payment',
			render: (value, record) => {
				return <Flex vertical justify='center' align='center'>
					<Badge count={value.method} style={{ backgroundColor: "#b7b8b6" }} />
					{record.payment.id === 2 && record.is_payment ?
						<Badge count={"Đã thanh toán"} style={{ backgroundColor: '#02f54b' }} /> : null}
				</Flex>
			}
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (_, record) => {
				return <OrderStatus data={record} />
			}
		},
		{
			title: 'Hành động',
			dataIndex: 'id',
			key: 'id',
			render: (id, record) => {

				return [1, 2].includes(record.payment.id) ?
					<Tooltip placement="bottom" title="Sửa">
						<Link to={`/admin/order/${id}`}>
							<Button type="primary" style={{ marginRight: '4px', backgroundColor: '#ffc107', color: "#fff" }}>
								<EditOutlined />
							</Button>
						</Link>
					</Tooltip> :
					<Tooltip placement="bottom" title="Sửa">
						<Link to={`/admin/order/${id}/offline`}>
							<Button type="primary" style={{ marginRight: '4px', backgroundColor: '#ffc107', color: "#fff" }}>
								<EditOutlined />
							</Button>
						</Link>
					</Tooltip>
			}
		},
	]

	const orderData = orders.map((order, index) => {

		return {
			key: index,
			id: order.id,
			product: order.details[0]?.name ?? "Đơn hàng ảo",
			quantity: order.details.reduce((sum, item) => { return sum + item.quantity }, 0),
			total: order.details.reduce((sum, item) => { return sum + (item.quantity * item.unit_price) }, 0) + order.shipping_cost,
			payment: order.payment,
			status: order.status.status,
			status_id: order.status.id,
			recipient: order.recipient_name,
			is_payment: order.is_payment,
		}
	})

	// lấy trạng thái đơn hàng
	useEffect(() => {
		instance.get('order-status')
			.then(({ data }) => {
				setOrderStatus([
					...orderStatus,
					...data.map((status, index) => ({ key: index + 1, label: status.status, value: status.id }))
				])
			})
	}, [])

	// lấy đơn hàng
	useEffect(() => {
		instance.get('admin/order', {
			params: {
				status: statusSelected.value,
				type: orderTypeSelected.value
			}
		})
			.then(({ data }) => {
				setOrders(data)
			})
	}, [statusSelected, orderTypeSelected])

	const onStatusSelected = (_, target) => {
		setStatusSelected(target)
	}

	const onTypeSelected = (_, target) => {
		setOrderTypeSelected(target);
	}

	const items = [
		{
			label: <Link to={"/admin/order/generate"}>Tại cửa hàng</Link>,
			key: '0',
		},
		{
			label: <Link to={"/admin/order/online-generate"}>Online</Link>,
			key: '1',
		}
	];

	return (
		<>
			<Breadcrumb
				items={[
					{
						href: '',
						title: <HomeOutlined />,
					},
					{
						title: 'Danh sách đơn hàng',
					},
				]}
			/>
			<Row gutter={12}>
				<Col span={8}>
					<label className="mb-1">Tìm kiếm </label>
					<Input
						placeholder="Tìm kiếm đơn hàng theo mã"
					/>
				</Col>
				<Col span={6}>
					<div className="mb-1">Hình thức</div>
					<Select
						defaultValue={0}
						onChange={onTypeSelected}
						style={{ width: 220 }}
						options={[
							{
								key: 0,
								label: "Tất cả",
								value: 0,
							},
							{
								key: 1,
								label: "Tại Website",
								value: 1,
							},
							{
								key: 2,
								label: "Tại cửa hàng",
								value: 2,
							}
						]}
					/>
				</Col>
				<Col span={6}>
					<div className="mb-1">Trạng thái</div>
					<Select
						defaultValue={0}
						onChange={onStatusSelected}
						style={{ width: 220 }}
						options={orderStatus}
					/>
				</Col>
				<Col span={4}>
					<div className="mb-1">‍</div>
					<Dropdown
						menu={{
							items,
						}}
						trigger={['click']}
					>
						<a onClick={(e) => e.preventDefault()}>
							<Space>
								<Button type='primary'><PlusCircleFilled />Tạo đơn hàng</Button>
							</Space>
						</a>
					</Dropdown>
				</Col >
			</Row >
			<Table columns={columns} dataSource={orderData} pagination={{
				pageSize: 10,
			}} />
		</>
	)
}

export default ListOrder