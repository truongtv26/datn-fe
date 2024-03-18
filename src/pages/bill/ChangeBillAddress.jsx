import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import instance from '../../core/api';
import GHNInfo from '../../components/GHNInfo';

const ChangeBillAddress = ({ props, handleChangeInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const [dataAddress, setDataAddress] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (props.address) {
            const addressString = props.address;
            const addressParts = addressString.split('##');
            setDataAddress({
                specific_address: addressParts[0],
                province: Number(addressParts[3]),
                district: Number(addressParts[2]),
                ward: addressParts[1]
            });
        }
    }, [props.address]);

    const calculateFee = async () => {
        try {
            const response = await instance.post(
                "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                {
                    service_id: 53320,
                    service_type_id: null,
                    to_district_id: parseInt(dataAddress.district),
                    to_ward_code: dataAddress.ward,
                    height: 50,
                    length: 20,
                    weight: 200,
                    width: 20,
                    cod_failed_amount: 2000,
                    insurance_value: 10000,
                    coupon: null,
                },
                {
                    headers: {
                        Token: "aef361b5-f26a-11ed-bc91-ba0234fcde32",
                        "Content-Type": "application/json",
                        ShopId: 124173,
                    },
                }
            );
            return response.data.data.total;
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = async (data) => {
        const feeShip = await calculateFee(); 
        Modal.confirm({
            title: "Xác nhận",
            maskClosable: true,
            content: "Xác nhận thay đổi thông tin?",
            okText: "Ok",
            cancelText: "Cancel",
            onOk: () => {
                data.address = `${data.specific_address}##${data.ward}##${data.district}##${data.province}`;
                const newData = { ...data, money_ship: feeShip }; // Use feeShip
                try {
                    instance.put(`/bill/change-info/${props.id}`, newData).then(({ data }) => {
                        toast.success(data);
                        setIsModalOpen(false);
                        handleChangeInfo()
                    }).catch((e) => {
                        console.log(e);
                        toast.error(e.response.id);
                    });
                } catch (error) {
                    console.log(error);
                    toast.error(error.response.id);
                }
            },
        });
    };

    return (
        <>
            <div className="">
                <Button
                    type="primary"
                    onClick={showModal}
                >
                    Thay đổi thông tin
                </Button>
            </div>
            <Modal
                title="Thay đổi thông tin"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={[
                    <span key="asterisk" style={{ color: 'red' }}>*</span>,
                    " Lưu ý thay đổi địa chỉ nhận hàng sẽ làm thay đổi chi phí vận chuyển"
                ]}
            >
                <Form onFinish={handleChange} layout="vertical" form={form}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                initialValue={props.customer_name}
                                label={"Tên khách hàng"}
                                name={"name"}
                                rules={[
                                    { required: true, message: "Tên không được để trống!" },
                                    {
                                        pattern: /^[^\d!@#$%^&*()_+={}\\:;"'<>,.?/`~|-]+$/,
                                        message: "Tên phải là chữ",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên khách hàng..." />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                initialValue={props.email}
                                label={"Email"}
                                name={"email"}
                                rules={[
                                    { required: true, message: "Email không được để trống!" },
                                    {
                                        pattern:
                                            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$$",
                                        message: "Email không đúng định dạng!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập email ..." />
                            </Form.Item>

                        </Col>
                        <Col span={8}>
                            <Form.Item
                                initialValue={props.phone_number}
                                label={"Số điện thoại"}
                                name={"phone_number"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Số điện thoại không được để trống!",
                                    },
                                    {
                                        pattern: "^0[0-9]{9,10}$",
                                        message: "SDT không đúng định dạng!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại ..." />
                            </Form.Item>
                        </Col>
                        <GHNInfo dataAddress={setDataAddress} prov={dataAddress?.province} distr={dataAddress?.district} war={dataAddress?.ward} />
                        <Col span={24}>
                            <Form.Item
                                initialValue={dataAddress?.specific_address}
                                label={"Địa chỉ cụ thể"}
                                name={"specific_address"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Địa chỉ cụ thể không được để trống!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập địa chỉ cụ thể ..." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item className="mt-3 float-end">
                        <Button type="primary" htmlType="submit" className="bg-warning">
                            Thay đổi thông tin
                        </Button>
                    </Form.Item>
                </Form >
            </Modal >
        </>
    )
}

export default ChangeBillAddress