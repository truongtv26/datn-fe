import { Col, Row, Form, Input, Flex, Select, Button, Table, InputNumber, Space, Badge, Radio } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import instance from '../../../core/api';
import useDebounce from '../../../hook/useDebounce';
import TextArea from 'antd/es/input/TextArea';
import { DeleteOutlined, PercentageOutlined, QrcodeOutlined } from '@ant-design/icons';
import { adminUpdateOrder, getOrderProduct } from '../../../services/order';
import FormatCurrency from '../../../utils/FormatCurrency';
import { toast } from 'react-toastify';
import { paymentExecution } from '../../../services/payment';
import BillTemplateBase from '../../bills/BillTemplateBase';

const OrderTab = ({ order, depositor }) => {
	const VITE_URL = import.meta.env.VITE_URL;
	const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

	const [form] = Form.useForm();

	// trạng thái khách hàng
	const [customers, setCustomers] = useState([])
	const [originalProducts, setOriginalProducts] = useState([])
	const [products, setProducts] = useState([])
	const [payment, setPayment] = useState([])

	const [productSelected, setProductSelected] = useState([])
	const [rowSelected, setRowSelected] = useState([])
	const [orderData, setOrderData] = useState({ user_id: null, recipient_name: "Khách lẻ", customer_payment: 0, refund: 0 })
	const [isOrderChange, setIsOrderChange] = useState(false)

	// trạng thái tìm kiếm
	const [customerSearch, setCustomerSearch] = useState("")
	const [productSearch, setProductSearch] = useState("")

	// lấy thông tin khách hàng
	const customerQuery = useDebounce(customerSearch)
	useEffect(() => {
		instance.get('admin/order-customer', {
			params: {
				query: customerQuery,
			}
		})
			.then((res) => {
				res.status === 200 ? setCustomers(res.data) : null
			})
	}, [customerQuery])

	// lấy dữ liệu sản phẩm
	const productQuery = useDebounce(productSearch)
	useEffect(() => {
		getOrderProduct(productQuery)
			.then((res) => {
				setOriginalProducts(res.data)
				const data = res.data.map((variant) => {
					const image = VITE_URL + 'storage/' + variant.images[0].folder + '/' + variant.images[0].url;
					return {
						value: variant.id,
						label: <Flex gap={10} align='center'>
							<div>
								<img src={image} alt={variant.product.name} width={40} height={30} />
							</div>
							<div>
								{variant.product.name} - [{variant.color.name} - {variant.size.name}]
							</div>
						</Flex>
					}
				})
				setProducts(data)
			})
			.catch((err) => {
				// console.log(err);
			})
	}, [productQuery])

	// lấy thôn tin thanh toán
	useEffect(() => {
		instance.get('/admin/payment-method')
			.then((res) => {
				setPayment(res.data);
			})
	}, [])

	//cập nhật thông tin đơn hàng
	useEffect(() => {
		const total = productSelected.reduce((total, product) => {
			return total + product.price * product.quantity
		}, 0)

		setOrderData({
			...orderData,
			order_id: order.id,
			recipient_city: depositor.city,
			recipient_district: depositor.district,
			recipient_ward: depositor.ward,
			recipient_detail: depositor.detail,
			recipient_note: orderData.recipient_note ?? null,
			seller_by: order.seller_by,
			total,
			discount: orderData.discount,
			discountType: orderData.discountType ?? 1,
			order_discount: orderData.discountType === 1 ? orderData.total * ((orderData.discount ?? 0) / 100) : orderData.discount,
			details: productSelected,
			return_payment: VITE_LOCAL_URL + "payment"
		})

	}, [isOrderChange, orderData.discount, productSelected])


	// Cập nhật thông tin trên form
	useEffect(() => {
		const calculatedTotal = orderData.total - (orderData.order_discount ?? 0);
		const formattedTotal = FormatCurrency(calculatedTotal);

		form.setFieldsValue({
			total: formattedTotal,
			customer_payment: FormatCurrency(orderData.customer_payment),
			refund: FormatCurrency(orderData.refund + orderData.order_discount),
		});
		// cập nhật lại số lượng khi sản phẩm được chọn
		productSelected.forEach((product) => {
			const formItemName = `item_quantity_${product.id}`;
			form.setFieldsValue({
				[formItemName]: product.quantity,
			});
		});
	}, [orderData, isOrderChange, productSelected]);

	// lưu thông tin đơn hàng khi thay đổi
	const orderChange = useDebounce(isOrderChange, 1000)
	useEffect(() => {
		if (orderData && productSelected.length > 0) {
			const data = { ...orderData, is_process: 0 }
			adminUpdateOrder(order.id, data)
				.then((res) => {
					console.log(res);
				})
		}
	}, [orderChange])

	// xử lý thôgn tin khách hàng
	const handleSelectCustomer = (value) => {
		const user = customers.filter(c => c.id === value)
		if (user.length > 0) {
			setOrderData({ ...orderData, user_id: user[0].id, recipient_name: user[0].name })
		}
		setIsOrderChange(!isOrderChange)
	}

	// tìm kiếm kách hàng
	const searchCustomers = ({ target }) => {
		setCustomerSearch(target.value)
	}

	// tìm kiếm sản phẩm
	const onProductSearch = (value) => {
		setProductSearch(value)
	}

	// xử lý sản phẩm đã chọn
	const handleProductSelected = (value) => {
		const data = originalProducts.filter((p) => p.id === Number(value));

		if (data.length > 0) {
			const newProductSelected = { ...data[0], price: data[0].price };
			const existingProductIndex = productSelected.findIndex(product => product.id === newProductSelected.id);
			// kiểm tra đợt giảm giá cho sản phẩm đã chọn
			const promotion = newProductSelected.promotions.filter(promotion => promotion?.status === "happenning")
			if (promotion.length > 0) {
				newProductSelected.price = newProductSelected.price * (1 - (promotion[0].value / 100))
			}

			// trường hợp sản phẩm đã được chọn => tăng số lượng thêm 1
			if (existingProductIndex !== -1) {
				const updatedProductSelected = [...productSelected];
				updatedProductSelected[existingProductIndex].quantity += 1;
				setProductSelected(updatedProductSelected);
			} else {
				newProductSelected.quantity = 1;
				setProductSelected([...productSelected, newProductSelected]);
			}

		}
		setIsOrderChange(!isOrderChange)
	}

	// dữ liệu sản phẩm đã chọn
	const columns = [
		{
			key: 'product',
			title: 'Sản phẩm',
			dataIndex: 'product',
			render: (product) => {
				const promotion = product.promotions.filter(promotion => promotion?.status === "happenning")
				const image = VITE_URL + 'storage/' + product.images[0].folder + '/' + product.images[0].url;
				return <Flex gap={10}>
					<div>
						<img src={image} alt={product.product.name} width={60} height={50} />
					</div>
					<div>
						{product.product.name} - [{product.color.name} - {product.size.name}] {promotion.length > 0 ? <Badge count={`-${promotion[0].value}%`} /> : null}
					</div>
				</Flex>
			}
		},
		{
			key: 'quantity',
			title: 'SL',
			dataIndex: 'quantity',
			render: (_, product) => {
				const quantity = originalProducts.filter(p => p.id === product.product.id)[0]
				const data = productSelected.filter((p) => p.id === Number(product.product.id));
				const formItemName = `item_quantity_${product.product.id}`;

				return <Form.Item
					name={formItemName}
					initialValue={data[0].quantity}
					rules={[
						{
							validator: async (_, value) => {
								if (value > quantity?.quantity) {
									throw new Error(`${quantity?.quantity} sản phẩm còn lại`);
								}
							},
						},
					]}
				>
					<InputNumber
						min={1} max={quantity?.quantity}
						onChange={(value) => {
							if (data.length > 0) {
								const newProductSelected = { ...data[0] };
								const existingProductIndex = productSelected.findIndex(product => product.id === newProductSelected.id);

								if (existingProductIndex !== -1) {
									const updatedProductSelected = [...productSelected];
									updatedProductSelected[existingProductIndex].quantity = value;
									setProductSelected(updatedProductSelected);
								}
								setIsOrderChange(!isOrderChange)
							}
						}}
					/>
				</Form.Item>
			}
		},
		{
			key: 'total',
			title: 'Tổng tiền',
			dataIndex: 'total',
			render: (value, { product }) => {
				const promotion = product.promotions.filter(promotion => promotion.status === 'happenning')

				return <>
					{FormatCurrency(value)}
					{promotion.length > 0 ? <p style={{ textDecoration: 'line-through' }}>{FormatCurrency(value / (1 - (promotion[0].value / 100)))}</p> : null}

				</>
			}
		},
		{
			key: 'action',
			title: <Button
				onClick={() => {
					const newProductSelected = productSelected.filter(p => !rowSelected.includes(p.id))
					setProductSelected(newProductSelected);
					setRowSelected([])
					setIsOrderChange(!isOrderChange)
				}}
			>
				<DeleteOutlined style={{ color: "red", cursor: 'pointer' }} />
			</Button>,
			dataIndex: 'action',
			render: (_, { product }) => <Button
				onClick={() => {
					const newProductSelected = productSelected.filter(p => p.id !== product.id)
					setProductSelected(newProductSelected)
					setIsOrderChange(!isOrderChange)
				}}
			>
				<DeleteOutlined style={{ color: "red", cursor: 'pointer' }} />
			</Button>
		}
	];

	const dataSelected = productSelected.map(product => {
		return {
			key: product.id,
			product: product,
			quantity: product.quantity,
			total: product.quantity * product.price,
		}
	});

	const rowSelection = {
		onChange: (key) => {
			setRowSelected(key)
		}
	};

	const onFinish = () => {

		if (orderData && productSelected.length > 0) {
			const data = { ...orderData, is_process: 1, finish: true };
			adminUpdateOrder(order.id, data)
				.then((res) => {
					if (res.status === 200) {
						if (res?.data?.redirect?.code == "00") {
							paymentExecution(res.data.redirect.data)
						}
						setOrderData({
							...orderData,
							bill: res.data?.bill,
						})
						toast.success("Đặt hàng thành công!")
					}
				})
		} else {
			toast.error("Vui lòng chọn sản phẩm cho đơn hàng!")
		}
	}

	const onFinishFailed = () => {
		toast.error("Kiểm tra lại thông tin!")
	}

	
	return (

		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			style={{ width: "100%" }}
		>
			<Row gutter={[40]}>
				<Col xs={24} lg={10}>
					<Title level={3}>Thông tin khách hàng</Title>

					<Flex gap={10}>
						<Form.Item
							name="customer_search"
							label="Tìm kiếm khách hàng"
							style={{ flex: "1" }}
						>
							<Input
								onChange={searchCustomers}
								name="customer_search"
								placeholder="Nhập email khách hàng" />
						</Form.Item>
						<Form.Item
							name="customer"
							label="Khách hàng"
							style={{ flex: "1" }}
							initialValue={{ label: "Khách lẻ", value: null }}
						>
							<Select
								name="customer"
								onChange={handleSelectCustomer}
								options={[{ name: "Khách lẻ", id: 0 }, ...customers].map(customer => ({ key: customer.id, label: customer.name, value: customer.id }))}
							/>
						</Form.Item>
					</Flex>
					<Flex gap={10}>
						<Form.Item
							name="order_id"
							label="Mã đơn hàng"
							style={{ flex: "1" }}
							initialValue={order.id}
						>
							<Input name='order_id' disabled />
						</Form.Item>
						<Form.Item
							name="employee"
							label="Nhân viên"
							style={{ flex: "1" }}
							initialValue={order.seller_by}
						>
							<Input name='seller_by' disabled />
						</Form.Item>
					</Flex>
					<Flex gap={10}>
						<Form.Item
							name="discount_amount"
							label="Giảm giá"
							style={{ flex: '1' }}
						>
							<Input
								type='number'
								name='discount_amount'
								min={0}
								onChange={({ target }) => {
									const inputValue = Number(target.value);

									if (orderData.discountType === 1) {
										if (inputValue > 100) {
											toast.error("Giảm giá theo % tối đa là 100%");
											setOrderData({ ...orderData, discount: 0 })
											form.setFieldsValue({ discount_amount: 0 });
										} else {
											setOrderData({
												...orderData,
												discount: inputValue,
											});
										}
									} else {
										if (inputValue > orderData.total) {
											toast.error("Giảm giá không được lớn hơn giá đơn hàng");
											form.setFieldsValue({ discount_amount: 0 });
											setOrderData({ ...orderData, discount: 0 })
										} else {
											setOrderData({
												...orderData,
												discount: inputValue,
											});
										}
									}

									setIsOrderChange(!isOrderChange);
								}}
								addonAfter={
									<Select
										defaultValue="1"
										onChange={(value) => {
											setOrderData({
												...orderData,
												discountType: Number(value),
											});
											form.setFieldsValue({ discount_amount: 0 });
											setIsOrderChange(!isOrderChange);
										}}
									>
										<Select.Option key="1" value="1">% </Select.Option>
										<Select.Option key="2" value="2">VND</Select.Option>
									</Select>
								}
							/>
						</Form.Item>
						<Form.Item
							name="total"
							label="Tổng thanh toán"
							style={{ flex: "1" }}
						>
							<Input name='total' disabled />
						</Form.Item>
					</Flex>
					<Flex gap={10}>
						{
							orderData.payment_id === 3 &&
							<>
								<Form.Item
									name="customer_payment"
									label="Tiền khách trả"
									style={{ flex: "1" }}
									rules={[
										{
										validator: async (_, value) => {
											if (value.length <= 0) {
												throw new Error(`Vui lòng nhập tiền khách trả`);
											}
										},},
										{
											required: true,
										}
									]}
								>
									<InputNumber
										onChange={(value) => {
											if (value >= orderData.total) {
												setOrderData({
													...orderData,
													customer_payment: value,
													refund: value - orderData.total,
												})
											}
										}}
										placeholder='VND'
										style={{
											width: "100%"
										}}
									/>
								</Form.Item>
								<Form.Item
									name="refund"
									label="Tiền trả lại"
									style={{ flex: "1" }}
								>
									<InputNumber
										style={{
											width: "100%"
										}} placeholder='VND' disabled />
								</Form.Item>
							</>
						}
					</Flex>

					<Flex gap={10}>
						<Form.Item
							name="note"
							label="Ghi chú"
							style={{ flex: "1" }}
							rules={[
								{
									required: orderData.discount && true,
									message: "Vui lòng ghi chú cho đơn hàng được giảm giá"
								}
							]}
						>

							<TextArea rows={4} placeholder="Ghi chú" maxLength={255}
								onChange={({ target }) => {
									setOrderData({
										...orderData,
										recipient_note: target.value,
									})
									setIsOrderChange(!isOrderChange)
								}}
							/>
						</Form.Item>
					</Flex>

					<Flex>
						<Form.Item
							name="payment"
							rules={[
								{
									required: true,
									message: "Chọn phương thức thanh toán",
								},
							]}
						>
							<Radio.Group
								onChange={({ target }) => {
									setOrderData({
										...orderData,
										payment_id: target.value,
									});
								}}
							>
								<Space direction="vertical">
									{Object.keys(payment).length > 0
										? payment.map((paymentOption, i) => (
											<Radio key={i} value={paymentOption.id}>
												{paymentOption.method}
											</Radio>
										))
										: null}
								</Space>
							</Radio.Group>
						</Form.Item>

					</Flex>

					<Flex gap={10}>
						<Form.Item>
							<Space>
								<Button type="primary" htmlType="submit">
									Đặt hàng
								</Button>
								{
									orderData.bill && <BillTemplateBase/>
								}
							</Space>
						</Form.Item>
					</Flex>

				</Col>
				<Col xs={24} lg={14}>
					<Flex justify='space-between'>
						<Title level={3}>Sản phẩm</Title>
						<Button> <QrcodeOutlined /> Tìm sản phẩm</Button>
					</Flex>

					<Flex vertical>
						<Title level={5}>Tìm kiếm sản phẩm</Title>
						<Select
							size='large'
							showSearch
							filterOption={false}
							onSearch={onProductSearch}
							onChange={handleProductSelected}
							options={products}
						/>
						<Table
							rowSelection={{
								type: "checkbox",
								...rowSelection,
								selectedRowKeys: rowSelected
							}}
							columns={columns}
							dataSource={dataSelected}
							pagination={{
								pageSize: 4,
							}}
						>

						</Table>
					</Flex>
				</Col>
			</Row>
		</Form>
	)
}

export default OrderTab