import { DeleteOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Badge, Button, Descriptions, Flex, Select, Table, Statistic, AutoComplete, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangeVariant from './ChangeVariant';
import ChangeQuantity from './ChangeQuantity';
import SelectCoupon from './SelectCoupon';
import FormatCurrency from '../../utils/FormatCurrency';
import instance from '../../core/api';
import { useAppContext } from '../../provider/AppProvider';
const { Countdown } = Statistic;

const CartTableDetail = ({ data, cartItemAction, setCartItemAction }) => {
	const VITE_URL = import.meta.env.VITE_URL;
	const navigate = useNavigate()
	const { user } = useAppContext();

	const oldCart = JSON.parse(localStorage.getItem('cart'));

	const [cartItemSelected, setCartItemSelected] = useState([]);
	const [keySelected, setKeySelected] = useState([])
	const [vouchers, setVouchers] = useState([]);
	const [voucherSelected, setVoucherSelected] = useState({});

	const [cost, setCost] = useState({ total: 0, orders: 0, shipping: 0, shippingDiscount: 0, ordersDiscount: 0, voucherDiscount: 0 });

	// lấy phiếu giảm giá
	useEffect(() => {
		instance.get('vouchers', {
			params: {
				user,
			}
		})
			.then((res) => {
				setVouchers(res.data)
			})
	}, [])
	// bảng giỏ hàng
	const columns = [
		{
			key: 'image',
			title: 'Ảnh',
			dataIndex: 'image',
			render: (_, record) => <img src={record.image} alt="Product" style={{ width: '80px', height: '60px' }} />,
		},
		{
			key: 'name',
			title: 'Tên sản phẩm',
			dataIndex: 'name',
			render: (_, record) => {
				return <Link to={`/product/${record.link}`}>{record.name}</Link>
			}
		},
		{
			key: 'variant',
			title: 'Thuộc tính',
			dataIndex: 'variant',
			render: (_, record) => {
				return <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
					<p fontSize="10">{record.color.name} - {record.size.name}</p>
					<ChangeVariant data={record} cartItemAction={cartItemAction} setCartItemAction={setCartItemAction} />
				</div>
			}
		},
		{
			key: 'price',
			title: 'Giá',
			dataIndex: 'price',
			render: (_, record) => {
				const promotion = record.action.promotions?.filter((item) => item?.status === 'happenning')[0]
				return promotion ? <>
					<div><FormatCurrency props={record.price * (1 - (promotion.value / 100))} /></div>
					<div className='old-price'>
						<FormatCurrency props={record.price} />
					</div>
				</>
					: <FormatCurrency props={record.price} />
			}
		},
		{
			key: 'quantity',
			title: 'Số lượng',
			dataIndex: 'quantity',
			render: (_, record) => <ChangeQuantity
				record={record}
				cartItemAction={cartItemAction}
				setCartItemAction={setCartItemAction} />
		},
		{
			key: 'total',
			title: 'Tổng tiền',
			dataIndex: 'total',
			render: (_, record) => {
				const promotion = record.action.promotions?.filter((item) => item?.status === 'happenning')[0]
				return promotion ?
					<>
						<div><FormatCurrency props={(record.price * (1 - (promotion.value / 100))) * record.quantity} /></div>
						<div className='old-price'>
							<FormatCurrency props={record.price * record.quantity} />
						</div>
					</> :
					<FormatCurrency props={record.price * record.quantity} />
			}
		},
		{
			key: 'action',
			title: 'Hành động',
			dataIndex: 'action',
			render: (_, record) => <Button onClick={() => {
				onDeleteCartItem(record.action)
				setCartItemAction(!cartItemAction)
			}}>
				<DeleteOutlined style={{ color: "red", cursor: 'pointer' }} />
			</Button>
		},
	];

	const cartData = data.map((cartItem, index) => {
		return {
			key: index,
			image: VITE_URL + 'storage/' + cartItem?.images[0]?.folder + '/' + cartItem?.images[0]?.url,
			name: cartItem.product.name,
			link: cartItem.product.slug,
			variant: cartItem.id,
			price: cartItem.price,
			color: cartItem.color,
			size: cartItem.size,
			quantity: oldCart[index]?.quantity,
			total: cartItem.price * oldCart[index]?.quantity,
			action: cartItem,
		}
	})

	const rowSelection = {
		onChange: (key, selectedRows) => {
			setKeySelected(key)
			setCartItemSelected(selectedRows);
		}
	};


	// cập nhật lại đơn hàng đã chọn khi có thay đổi về giá hoặc số lượng
	useEffect(() => {
		const reSelected = cartData.filter(item => keySelected.some(key => item.key === key))
		setCartItemSelected(reSelected)
	}, [cartItemAction, data])


	const onDeleteCartItem = (item) => {
		const oldCartData = JSON.parse(localStorage.getItem('cart')) || [];
		const newCartData = oldCartData.filter(oldItem => oldItem.product_id === item.product.id && oldItem.variant_id === item.id ? false : true)
		localStorage.setItem('cart', JSON.stringify(newCartData))
	};

	// sản phẩm đã chọn
	const columnsSelected = [
		{
			name: 'Image',
			dataIndex: 'image',
			key: 'image',
			render: (_, record) => <img src={record.image} alt="Product" style={{ width: '40px', height: '40px' }} />,
		},
		{
			name: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (_, record) => (
				<>
					<p style={{
						fontSize: "12px",
						display: '-webkit-box',
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						WebkitLineClamp: 2,
						textOverflow: 'ellipsis'
					}}>
						{record.name}
					</p>
					<p>{record.color.name} - {record.size.name}</p>
				</>
			),
		}

	];
	const dataSelected = cartItemSelected.map((item, index) => {
		return {
			key: index,
			image: item.image,
			name: item.name,
			variant: item.variant,
			color: item.color,
			size: item.size,
		}
	})

	function convertCurrency(currency) {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(currency)
	}
	// chi phí đơn hàng
	useEffect(() => {
		const orderDiscount = cartItemSelected.reduce((prev, item) => {
			return item.action.promotions.length > 0 && item.action.promotions[0]?.status === "happenning" ?
				prev + ((item.price * item.quantity) * (item.action.promotions[0].value / 100)) : prev;
		}, 0)

		const voucherDiscount = voucherSelected.value ? cost.orders * (voucherSelected.value / 100) : 0
		setCost({
			...cost,
			orders: cartItemSelected.reduce((total, item) => { return total + item.price * item.quantity; }, 0),
			ordersDiscount: -orderDiscount,
			voucherDiscount: -voucherDiscount,
			shippingDiscount: -0
		})
	}, [cartItemAction, cartItemSelected, voucherSelected])

	const items = [
		{ title: "Đơn hàng", value: convertCurrency(cost.orders) },
		{ title: "Giảm giá đơn hàng", value: convertCurrency(cost.ordersDiscount + cost.voucherDiscount) },
		{ title: "Tạm tính", value: convertCurrency(cost.orders + cost.shipping + cost.shippingDiscount + cost.ordersDiscount + cost.voucherDiscount) }
	];

	// xử lý đặt hàng
	const handleCheckout = (event) => {
		event.preventDefault()
		if (Object.keys(cartItemSelected).length < 1) {
			toast.error('Vui lòng chọn sản phẩm!', {
				position: toast.POSITION.TOP_CENTER,
			})
		} else {
			// điều hướng khi ấn đặt hàng
			navigate('/checkout',
				{
					state: {
						cartItemSelected,
						voucherSelected,
						oldCost: cost
					}
				})
		}
	}


	const expandedRowRender = ({ action }) => {
		const promotion = action.promotions?.filter((item) => item?.status === 'happenning')[0]
		const deadline = (new Date(promotion?.end_date)).getTime()
		return promotion &&
			<>
				<Flex vertical gap={5}>
					<Flex gap={5} align='center'>
						<div className="coupon-code"><ThunderboltOutlined />{promotion.name} <Badge count={`-${promotion.value}%`} /></div>
						còn lại <div className="coupon-code"><Countdown value={deadline} format="D Ngày H Giờ m Phút s Giây" /></div>
					</Flex>
				</Flex>
			</>
	};

	const onSelectVoucher = (name) => {
		const voucher = vouchers.find(voucher => voucher.name === name);
		if (cost.orders >= voucher.min_bill_value) {
			setVoucherSelected(voucher);
		} else {
			toast.error("Không đủ điều kiện áp dụng!")
		}
	}
	
	return (
		<>
			<div className="left-content">
				<div className="table-cart">
					<Table
						rowSelection={{
							type: "checkbox",
							...rowSelection,
						}}
						columns={columns}
						dataSource={cartData}
						pagination={{
							pageSize: 6,
						}}
						expandable={{
							expandedRowRender,
							defaultExpandAllRows: () => true,
							expandIcon: () => null,
						}}
					/>
					<div className="code-sale">
						Chọn phiếu khuyến mãi
						<AutoComplete
							onSelect={onSelectVoucher}
							style={{ width: "100%" }}
							options={vouchers.map((item) => ({
								value: item.name,
								label: (
									<>
										<ul className='list-unstyled'>
											<li style={{ fontWeight: 600 }}>{item.name} <span style={{ float: 'right', color: 'red' }}>{item.code}</span></li>
											<li>Phần trăm giảm: {item.value}% <span style={{ float: 'right' }}>Đơn tối thiểu: <span style={{ color: 'red' }}><FormatCurrency props={item.min_bill_value} /></span></span></li>
										</ul>
									</>
								),
							}))}
						>
							<Input placeholder="Tìm kiếm voucher..." />
						</AutoComplete>
					</div>
				</div>
			</div>
			<div className="right-content ">
				<div className="cart-total">
					<div className="totals">
						<h2>Sản phẩm đã chọn</h2>
						{Object.keys(cartItemSelected).length > 0
							? <Table
								showHeader={false}
								columns={columnsSelected}
								dataSource={dataSelected}
								pagination={{
									pageSize: 6,
								}}
							/>
							: 'Chưa chọn sản phẩm nào'}
						{Object.keys(cartItemSelected).length > 0
							? <Descriptions column={1} bordered>
								{items.map((description, index) =>
									description.title ? (
										<Descriptions.Item
											style={{ textWrap: 'nowrap' }}
											key={index}
											label={description.title}
											labelStyle={{ width: '30%' }}
										>
											{description.value}
										</Descriptions.Item>
									) : (
										<div key={index}>{description.value}</div>
									)
								)}
							</Descriptions>
							: ""}
						<p>
							<Button
								onClick={handleCheckout}
								type="primary" style={{ width: '100%', height: '42px', fontSize: '15px', fontWeight: '700', backgroundColor: '#004745', marginTop: '10px' }}>
								Mua hàng
							</Button>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default CartTableDetail