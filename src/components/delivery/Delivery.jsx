import { PushpinOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import AddDelivery from './AddDelivery';
import instance from '../../core/api';
import { useAppContext } from '../../provider/AppProvider';
import EditDelivery from './EditDelivery';

const Delivery = ({ recipient, setRecipient, recipientSelected, setRecipientSelected }) => {
	const { user } = useAppContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAction, setIsAction] = useState(false);

	const [deliveries, setDeliveries] = useState([])

	// lấy thông tin giao hàng
	useEffect(() => {
		isModalOpen &&
			instance.get('/delivery', {
				params: {
					user_id: user.id
				}
			})
				.then(({ data }) => {
					setDeliveries(data)
				})
	}, [isModalOpen, isAction])

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onChangeDeliverySelected = ({ target }) => {
		setRecipient({
			...recipient,
			...target.value
		})
		setRecipientSelected(!recipientSelected)
	}

	return (
		<>
			<Button onClick={showModal}>
				<PushpinOutlined />
				Địa chỉ nhận hàng
			</Button>
			<Modal
				title="Địa chỉ của bạn"
				open={isModalOpen}
				onCancel={handleCancel}
				width={600}
				footer={[
					<Button key='cancel' onClick={handleCancel}>
						Đóng
					</Button>
				]}
			>
				<Flex vertical gap={10}>
					<AddDelivery
						isAction={isAction}
						setIsAction={setIsAction}
					/>
					{deliveries.length > 0 ?
						<div>
							<Radio.Group onChange={onChangeDeliverySelected} style={{ width: "100%" }}>
								<Flex gap={10} wrap='wrap'>
									{
										deliveries?.map((delivery) => {
											return <Flex key={delivery.id} style={{ width: "calc(50% - 10px)", border: '1px solid gray', borderRadius: 4, padding: 5 }}>
												<Radio value={delivery}>
													<Flex vertical>
														<Flex justify='space-between'>
															<Flex gap={5}><p>{delivery.recipient_name}</p> | <p>{delivery.recipient_phone}</p></Flex>
															<div>
																<EditDelivery
																	data={delivery}
																	isAction={isAction}
																	setIsAction={setIsAction}
																/>
															</div>
														</Flex>
														<p>{delivery.recipient_email}</p>
														<p>{delivery.recipient_detail}</p>
														<Flex>
															<p>
																{delivery.recipient_ward_name},
																{delivery.recipient_district_name},
																{delivery.recipient_city_name}
															</p>
														</Flex>
													</Flex>
												</Radio>
											</Flex>
										})
									}
								</Flex>
							</Radio.Group>
						</div> :
						<p>Bạn chưa thêm địa chỉ nào</p>}
				</Flex>
			</Modal>
		</>
	)
}

export default Delivery