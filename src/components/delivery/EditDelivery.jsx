import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Form, Input, Modal, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getCity, getDistrict, getWard } from '../../services/shipping';
import instance from '../../core/api';

const EditDelivery = ({ data, isAction, setIsAction }) => {
	const [form] = Form.useForm();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false)

	const [delivery, setDelivery] = useState({ user_id: data.user_id });

	const [cities, setCities] = useState([]);
	const [district, setDistrict] = useState([]);
	const [ward, setWard] = useState([]);

	// lấy thông tin tỉnh thành
	useEffect(() => {
		isModalOpen &&
			getCity().then(({ data }) => {
				setCities(data)
			})
	}, [isModalOpen])

	// lấy thông tin quận huyện
	useEffect(() => {
		isModalOpen && cities && delivery.recipient_city &&
			getDistrict(delivery.recipient_city).then(({ data }) => {
				setDistrict(data)
			})
	}, [cities, delivery.recipient_city])

	// lấy thông tin phường xã
	useEffect(() => {
		isModalOpen && district && delivery.recipient_district &&
			getWard(delivery.recipient_district).then(({ data }) => {
				setWard(data)
			});
	}, [district, delivery.recipient_district])

	const handleAddress = ({ target }) => {
		setDelivery({
			...delivery,
			[target.name]: target.value,
		})
	}

	// cập nhật thông tin giao hàng qua form
	const handleAddressSelect = (_, address) => {
		if (address.name === 'recipient_city') {
			setDelivery({
				...delivery,
				[address.name]: address.value,
				[`${address.name}_name`]: address.label,
				recipient_district: undefined,
				recipient_district_name: "",
				recipient_ward: undefined,
				recipient_ward_name: ""
			})
			// đặt district và ward về mặc định
			form.setFieldsValue({
				district: { value: "", label: "Chọn Quận/Huyện" },
				ward: { value: "", label: "Chọn Phường/Xã" },
			});
		} else {
			setDelivery({
				...delivery,
				[address.name]: address.value,
				[`${address.name}_name`]: address.label
			})
		}
	}

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onDelete = () => {
		setConfirmModalOpen(true);
	}

	const handleConfirmOk = () => {
		setConfirmModalOpen(false);
		instance.delete(`delivery/${data.id}`)
			.then((res) => {
				if (res.status === 200) {
					setIsAction(!isAction)
					toast.success("Xóa thành công")
					setConfirmModalOpen(false)
				} else {
					toast.error("Xóa thất bại")
				}
			})
	};
	const handleConfirmCancel = () => {
		setConfirmModalOpen(false);
	};
	// validate form
	const formValidator = {
		addressRequired: (_, value) => {
			return String(value.value).length <= 0 ? Promise.reject('Không hợp lệ!') : Promise.resolve();
		},
		email: (_, value) => {
			const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
			return value && !regex.test(value) ? Promise.reject('Email không hợp lệ') : Promise.resolve();
		},
		vietnamesePhoneNumber: (_, value) => {
			const regex = /(03|05|07|08|09)+([0-9]{8})\b/
			return value && !regex.test(value) ? Promise.reject('Số điện thoại không hợp lệ') : Promise.resolve();
		}
	}

	// validate
	const onFinish = () => {
		instance.put(`delivery/${data.id}`, delivery)
			.then((res) => {
				res.status === 200 ? toast.success("Cập nhật thành công!") : toast.error("Có lỗi sảy ra!");
				setIsAction(!isAction)
				setIsModalOpen(false)
			})
	};

	const onFinishFailed = () => {
		toast.error("Vui lòng kiểm tra lại thông tin!")
	};


	return (
		<>
			<Modal
				open={confirmModalOpen}
				onOk={handleConfirmOk}
				onCancel={handleConfirmCancel}
			>
				"Xác nhận xóa địa chỉ này!"
			</Modal>
			<p onClick={showModal}
				style={{ border: '1px solid gray', borderRadius: 5, textWrap: 'nowrap' }}
			>Sửa</p>
			<Modal
				title="Địa chỉ của bạn (Sửa)"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={600}
				footer={false}
			>
				{
					isModalOpen &&
					<Form
						form={form}
						layout="vertical"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						style={{ width: "100%" }}
					>
						<Row justify="space-between">
							<Col style={{ width: "100%" }}>
								<Flex justify="space-between">
								</Flex>
								<Flex gap={10}>
									<Form.Item
										name="recipient"
										label="Họ tên người nhận"
										initialValue={data.recipient_name}
										rules={[
											{
												required: true,
												message: "Vui lòng nhập họ tên"
											},
											{
												type: 'string',
												max: 50,
											},
										]}
										style={{ flex: "1" }}
									>
										<Input onChange={handleAddress} name="recipient_name" placeholder="Họ tên người nhận" />

									</Form.Item>
									<Form.Item
										name="phone"
										label="Số điện thoại người nhận"
										initialValue={data.recipient_phone}
										rules={[
											{
												required: true,
												message: "Vui lòng nhập số điện thoại"
											},
											{
												validator: formValidator.vietnamesePhoneNumber
											}
										]}
										style={{ flex: "1" }}
									>
										<Input onChange={handleAddress} name="recipient_phone" placeholder="Số điện thoại người nhận" />

									</Form.Item>
								</Flex>
								<Form.Item
									name="email"
									label="Email"
									initialValue={data.recipient_email}
									rules={[{
										validator: formValidator.email
									}]}
									style={{ flex: "1" }}
								>
									<Input onChange={handleAddress} name="recipient_email" placeholder="Enter Email" />

								</Form.Item>
								<Flex gap={10}>
									<Form.Item
										name="city"
										label="Tỉnh/Thành Phố"
										initialValue={{ value: data.recipient_city, label: data.recipient_city_name }}
										rules={[
											{
												required: true,
												message: "Tỉnh/Thành Phố không được bỏ trống"
											}
										]}
										style={{ flex: "1" }}
									>
										<Select
											name="recipient_city"
											onChange={handleAddressSelect}
											options={cities && cities.length > 0
												? cities.map(city => { return { name: "recipient_city", label: city.ProvinceName, value: city.ProvinceID } })
												: [{ label: "Chọn Tỉnh/Thành Phố", value: "" }]}
										/>
									</Form.Item>
									<Form.Item
										name="district"
										label="Quận/Huyện"
										initialValue={{ value: data.recipient_district, label: data.recipient_district_name }}
										rules={[
											{
												required: true,
												message: "Quận/Huyện không được bỏ trống"
											},
											{
												validator: formValidator.addressRequired
											}
										]}
										style={{ flex: "1" }}
									>
										<Select
											name="recipient_district"
											onChange={handleAddressSelect}
											options={district && district.length > 0
												? district.map(district => { return { name: "recipient_district", label: district.DistrictName, value: district.DistrictID } })
												: [{ label: "Chọn Quận/Huyện", value: "" }]}
										/>

									</Form.Item>
									<Form.Item
										name="ward"
										label="Phường/Xã"
										initialValue={{ value: data.recipient_ward, label: data.recipient_ward_name }}
										rules={[
											{
												required: true,
												message: "Phường/Xã không được bỏ trống"
											},
											{
												validator: formValidator.addressRequired
											}
										]}
										style={{ flex: "1" }}
									>
										<Select
											name="recipient_ward"
											onChange={handleAddressSelect}
											options={ward && ward.length > 0
												? ward.map(ward => { return { name: "recipient_ward", label: ward.WardName, value: ward.WardCode } })
												: [{ label: "Chọn Phường/Xã", value: "" }]}
										/>

									</Form.Item>
								</Flex>
								<Form.Item
									name="recipient_detail"
									label="Số nhà/Địa chỉ cụ thể"
									initialValue={data.recipient_detail}
									rules={[{
										required: true,
										message: "Vui lòng nhập địa chỉ cụ thể"
									}]}
									style={{ flex: "1" }}
								>
									<Input onChange={handleAddress} name="recipient_detail" placeholder="Địa chỉ" />

								</Form.Item>

								<Form.Item>
									<Space>
										<Button key="update" type='primary' htmlType="submit">
											Cập nhật
										</Button>
										<Button key='delete' onClick={onDelete}>
											Xóa
										</Button>
										<Button key="cancel" onClick={handleCancel}>
											Đóng
										</Button>
									</Space>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				}
			</Modal>
		</>
	)
}

export default EditDelivery