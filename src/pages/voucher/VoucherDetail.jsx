import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Form, Input, Modal, Row, Select, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserTable from '../../components/user/UserTable'
import instance from '../../core/api'
import { toast } from 'react-toastify'
const { Title } = Typography

const VoucherDetail = () => {
    const [form] = Form.useForm();
    const [userIds, setUserIds] = useState([]);
    const [resetSelectedRowKeys, setResetSelectedRowKeys] = useState(false);
    const { id } = useParams();
    const [voucher, setVoucher] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVoucher(id);
    }, [id]);

    const loadVoucher = () => {
        instance.get(`/voucher/${id}`).then(({ data }) => {
            setVoucher(data);
            setUserIds(data.users.map((user) => user.id));
            form.setFieldsValue({
                code: data.code,
                name: data.name,
                value: data.value,
                start_date: data.start_date,
                end_date: data.end_date,
                quantity: data.quantity,
                min_bill_value: data.min_bill_value,
                type: data.type
            })
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handUpadateVoucher = async (data) => {
        console.log(data);
        Modal.confirm({
            title: "Xác nhận",
            maskClosable: true,
            content: "Xác nhận cập nhật phiếu giảm giá?",
            okText: "Ok",
            cancelText: "Cancel",
            onOk: () => {
                if (data.type === 'private') {
                    if (userIds.length > 0) {
                        data.users = userIds;
                        sendVoucherRequest(data);
                    } else {
                        toast.error('Vui lòng chọn khách hàng áp dụng phiếu giảm giá');
                    }
                } else {
                    sendVoucherRequest(data);
                }
            },
        });
        function sendVoucherRequest(data) {
            instance.put(`/voucher/${id}`, data)
                .then(({ data }) => {
                    toast.success(data);
                    loadVoucher();
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e.response.data);
                    if (e.response.data.message != null) {
                        toast.error(e.response.data.message);
                    }
                });
        }
    };
    return (
        <>
            <Spin spinning={loading}>
                <Breadcrumb
                    items={[
                        {
                            href: '',
                            title: <HomeOutlined />,
                        },
                        {
                            href: '/admin/voucher',
                            title: 'Danh sách phiếu giảm giá',
                        },
                        {
                            title: `${voucher.name}`,
                        },
                    ]}
                />
                <Form onFinish={handUpadateVoucher} layout="vertical" form={form}>
                    <Row gutter={10}>
                        <Col xl={12}>
                            <Row gutter={10}>
                                <Col xl={12}>
                                    <Form.Item label={"Mã phiếu giảm giá"} name={"code"} rules={[{ required: true, message: "Mã phiếu giảm giá không được để trống!", },]}>
                                        <Input placeholder="Nhập mã phiếu giảm giá..." />
                                    </Form.Item>
                                </Col>
                                <Col xl={12}>
                                    <Form.Item label={"Tên phiếu giảm giá"} name={"name"} rules={[{ required: true, message: "Tên phiếu giảm giá không được để trống!", },]} >
                                        <Input placeholder="Nhập tên phiếu giảm giá..." />
                                    </Form.Item>
                                </Col>
                                <Col xl={12}>
                                    <Form.Item
                                        label={"Giá trị giảm"}
                                        name={"value"}
                                        rules={[
                                            { required: true, message: "Giá trị giảm không được để trống!" },
                                            {
                                                validator(_, value) {
                                                    const numericValue = Number(value);

                                                    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 99) {
                                                        return Promise.resolve();
                                                    }

                                                    return Promise.reject("Giá trị phải là một số từ 1 đến 99");
                                                },
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập phần trăm giảm..." suffix="%" />
                                    </Form.Item>
                                </Col>
                                <Col xl={12}>
                                    <Form.Item
                                        label={"Giá trị đơn tối thiếu"}
                                        name={"min_bill_value"}
                                        rules={[
                                            { required: true, message: "Giá trị đơn không được để trống!" },
                                            {
                                                validator(_, value) {
                                                    const numericValue = Number(value);

                                                    if (!isNaN(numericValue) && numericValue >= 1) {
                                                        return Promise.resolve();
                                                    }

                                                    return Promise.reject("Giá trị phải là một số từ 1");
                                                },
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập giá trị đơn tối thiểu..." suffix="VNĐ" />
                                    </Form.Item>
                                </Col>
                                <Col xl={12}>
                                    <Form.Item
                                        label={"Số lượng"}
                                        name={"quantity"}
                                        rules={[
                                            { required: true, message: "Số lượng không được để trống!" },
                                            {
                                                validator(_, value) {
                                                    const numericValue = Number(value);

                                                    if (!isNaN(numericValue) && numericValue >= 1) {
                                                        return Promise.resolve();
                                                    }

                                                    return Promise.reject("Số lượng phải là một số lớn hơn 1");
                                                },
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập số lượng..." />
                                    </Form.Item>
                                </Col>
                                <Col xl={12}>
                                    <Form.Item
                                        label="Loại phiếu giảm giá"
                                        name="type"
                                        initialValue="public"
                                    >
                                        <Select
                                            options={[
                                                {
                                                    value: 'public',
                                                    label: 'Công khai',
                                                },
                                                {
                                                    value: 'private',
                                                    label: 'Áp dụng với 1 số khách hàng',
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xl={12}>
                                    <Form.Item label={"Ngày bắt đầu"} name={"start_date"} rules={[{ required: true, message: "Ngày bắt đầu không được để trống!", },]} >
                                        <Input type="datetime-local" />
                                    </Form.Item>
                                </Col>
                                <Col xl={12}>
                                    <Form.Item label={"Ngày kết thúc"} name={"end_date"} rules={[{ required: true, message: "Ngày kết thúc không được để trống!", },]} >
                                        <Input type="datetime-local" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        <Col xl={12}>
                            <Title level={5} style={{ marginTop: '0' }}>Danh sách khách hàng</Title>
                            <UserTable setUserIds={setUserIds} resetSelectedRowKeys={resetSelectedRowKeys} listUser={userIds}></UserTable>
                        </Col>
                        <Col xl={24}>
                            <Button type="primary" htmlType="submit">Cập nhật phiếu giảm giá</Button>
                        </Col>
                    </Row>
                </Form >
            </Spin>
        </>

    )
}

export default VoucherDetail