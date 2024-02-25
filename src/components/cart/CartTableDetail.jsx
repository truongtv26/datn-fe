import { DeleteOutlined } from '@ant-design/icons';
import { Badge, Button, Descriptions, Flex, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangeVariant from './ChangeVariant';
import ChangeQuantity from './ChangeQuantity';
import SelectCoupon from './SelectCoupon';

const CartTableDetail = ({ data, cartItemAction, setCartItemAction }) => {
	const VITE_URL = import.meta.env.VITE_URL;
	const navigate = useNavigate()

	const oldCart = JSON.parse(localStorage.getItem('cart'));

	const [cartItemSelected, setCartItemSelected] = useState([]);
	const [keySelected, setKeySelected] = useState([])
	const [couponSelected, setCouponSelected] = useState([])
	const [couponOptions, setCouponOptions] = useState([])

	const [cost, setCost] = useState({ total: 0, orders: 0, shipping: 0, shippingDiscount: 0, ordersDiscount: 0 });

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
				const currentCoupon = couponSelected.filter(item => item.variant_id === record.variant)
				return <>
					{
						Object.keys(currentCoupon).length > 0
							? <>
								<Flex gap={4} vertical>
									<div>
										{
											new Intl.NumberFormat("vi-VN", {
												style: "currency",
												currency: "VND",
											}).format(record.price * (1 - currentCoupon[0].value / 100))
										}
									</div>
									<div style={{ textDecoration: "line-through" }}>
										{
											new Intl.NumberFormat("vi-VN", {
												style: "currency",
												currency: "VND",
											}).format(record.price)
										}
									</div>
								</Flex>
							</>
							: new Intl.NumberFormat("vi-VN", {
								style: "currency",
								currency: "VND",
							}).format(record.price)
					}
				</>
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
				const currentCoupon = couponSelected.filter(item => item.variant_id === record.variant)
				return <>
					{
						Object.keys(currentCoupon).length > 0
							? <>
								<Flex gap={4} vertical>
									<div>
										{
											new Intl.NumberFormat("vi-VN", {
												style: "currency",
												currency: "VND",
											}).format(record.total * (1 - currentCoupon[0].value / 100))
										}
									</div>
									<div style={{ textDecoration: "line-through" }}>
										{
											new Intl.NumberFormat("vi-VN", {
												style: "currency",
												currency: "VND",
											}).format(record.total)
										}
									</div>
								</Flex>
							</>
							: new Intl.NumberFormat("vi-VN", {
								style: "currency",
								currency: "VND",
							}).format(record.total)
					}
				</>
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

	// chọn phiếu giảm giá khi biến thể đang được giảm giá
	useEffect(() => {
		let variantHasPromotions = [];
		data.forEach((variant, i) => {
			const promotionAvailable = variant.promotions.filter((p) => p.status === 'happenning')
			promotionAvailable.length > 0 ? variantHasPromotions.push({
				key: i,
				id: promotionAvailable[0].id,
				variant_id: variant.id,
				value: promotionAvailable[0].value,
				label: promotionAvailable[0].name,
				code: promotionAvailable[0].code
			}) : null
		})
		setCouponSelected(variantHasPromotions)

		// lọc mã giảm giá
          const finalCoupon = variantHasPromotions.reduce((accumulator, current) => {
               const existingItemIndex = accumulator.findIndex((item) => item.id === current.id);
               if (existingItemIndex !== -1) {
                    accumulator[existingItemIndex] = current;
               } else {
                    accumulator.push(current);
               }
               return accumulator;
          }, []);

		setCouponOptions(finalCoupon)
		// console.log(finalCoupon);
	}, [data, cartItemAction])

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

	// thay đổi thuộc tính sản phẩm
	const onChangeVariant = ({ key }) => {
		message.info(`Click on item ${key}`);
	};
	function convertCurrency(currency) {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(currency)
	}
	// chi phí đơn hàng
	useEffect(() => {
		const ordersDiscount = cartItemSelected.reduce((prev, item) => {
			const coupon = couponSelected.filter((c) => c.variant_id === item.variant)
			return Object.keys(coupon).length > 0 ? prev + (item.total * (coupon[0].value / 100)) : prev
		}, 0)

		setCost({
			...cost,
			orders: cartItemSelected.reduce((total, item) => { return total + item.price * item.quantity; }, 0),
			ordersDiscount: -ordersDiscount,
			shippingDiscount: -0
		})
	}, [cartItemAction, cartItemSelected])

	const items = [
		{ title: "Đơn hàng", value: convertCurrency(cost.orders) },
		{ title: "Giảm giá đơn hàng", value: convertCurrency(cost.ordersDiscount) },
		{ title: "Tạm tính", value: convertCurrency(cost.orders + cost.shipping + cost.shippingDiscount + cost.ordersDiscount) }
	];

	// xử lý chọn phiếu giảm giá
	const handlePromotionChange = (_, target) => {
		setCouponSelected(target)
		setCartItemAction(!cartItemAction)
	};

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
						couponSelected,
					}
				})
		}
	}


	const expandedRowRender = (record) => {
		return Object.keys(record.action.promotions).length > 0
			? <>
				<Flex align={"center"}>
					<SelectCoupon
						data={record}
						coupons={record.action.promotions}
						couponSelected={couponSelected}
						setCouponSelected={setCouponSelected}
						cartItemAction={cartItemAction}
						setCartItemAction={setCartItemAction}
					/>
					<Flex gap={4} wrap='wrap'>
						{record.action.promotions.map((coupon, index) => {
							return coupon.status === "happenning"
								? <Flex key={index} gap={4}>
									Phiếu giảm giá đang được sử dụng:
									<div className='coupon-code flex items-center gap-1'>
										<span>{coupon.code}</span>
										<Badge count={`-${coupon.value}%`} />
									</div>
								</Flex>
								: null
						})}
					</Flex>
				</Flex>

			</>
			: "Sản phẩm này hiện không có phiếu giảm giá"
	};


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
						Khuyến mãi đang sử dụng
						{couponOptions.length > 0 && <Select
							mode="multiple"
							allowClear
							size='Large'
							style={{
								width: '100%',
							}}
							placeholder="Chọn phiếu khuyến mãi"
							onChange={handlePromotionChange}
							defaultValue={couponOptions.map(c => c)}
							options={couponOptions}
						/>}
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