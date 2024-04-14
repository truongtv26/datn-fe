import { AutoComplete, Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import instance from '../../../core/api';
import { toast } from 'react-toastify';
import GHNInfo from '../../../components/GhnInfo';

const CustomerInfo = ({ handleSelect }) => {
    const [customerData, setCustomerData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const [dataAddress, setDataAddress] = useState(null);

    const handleSearch = (value) => {
        setSearchValue(value);
        loadCustomer(value);
    };

    const onSelect = (value) => {
        setSearchValue("");
        handleSelect(value);
    };
    const loadCustomer = (value) => {
        instance
            .get("/customer", {
                name: value,
            })
            .then(({ data }) => {
                setCustomerData(data);
            });
    };

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
        loadCustomer("");
    }, []);

    const handleAddCustomer = (data) => {
        Modal.confirm({
            title: "Xác nhận",
            maskClosable: true,
            content: "Xác nhận thêm khách hàng ?",
            okText: "Ok",
            cancelText: "Cancel",
            onOk: () => {
                instance.post("/customer", data).then(({ data }) => {
                    toast.success(data);
                    setIsModalOpen(false);
                    form.resetFields();
                    loadCustomer("");
                }).catch((e) => {
                    console.log(e);
                    toast.error(e.response.id);
                });
            },
        });
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1, marginRight: '4px' }}>
                    <AutoComplete
                        value={searchValue}
                        onChange={handleSearch}
                        onSelect={onSelect}
                        style={{ width: "300px" }}
                        options={customerData.map((customer) => ({
                            value: customer.id,
                            label: (
                                <>
                                    <div className="">
                                        {customer.name}
                                        <br />
                                        {customer.phone_number}
                                    </div>
                                </>
                            ),
                        }))}
                    >
                        <Input.Search placeholder="Tìm kiếm khách hàng..." />
                    </AutoComplete>
                </div>
                <div className="">
                    <Button
                        type="primary"
                        onClick={showModal}
                    >
                        Thêm mới KH
                    </Button>
                </div>
            </div>

            <Modal
                title="Khách hàng mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer=""
            >
                <Form onFinish={handleAddCustomer} layout="vertical" form={form}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
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
                        <GHNInfo dataAddress={setDataAddress} />
                        <Col span={24}>
                            <Form.Item
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
                            Thêm khách hàng
                        </Button>
                    </Form.Item>
                </Form >
            </Modal >
        </>
    )
}

export default CustomerInfo