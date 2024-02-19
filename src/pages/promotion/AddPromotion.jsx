import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Empty, Form, Input, InputNumber, Modal, Row, Typography } from 'antd';
import React, { useState } from 'react';
import TableShoe from './TableShoe';
import TableShoeDetail from './TableShoeDetail';
import { toast } from 'react-toastify';
import instance from '../../core/api';
const { Title } = Typography;

const AddPromotion = () => {
    const [form] = Form.useForm();
    const [productIds, setProductIds] = useState([]);
    const [productDetail, setProductDetail] = useState([]);
    const [resetSelectedRowKeys, setResetSelectedRowKeys] = useState(false);

    const handleCreatePromotion = (data) => {
        Modal.confirm({
            title: "Xác nhận",
            maskClosable: true,
            content: "Xác nhận thêm khuyến mại mới?",
            okText: "Ok",
            cancelText: "Cancel",
            onOk: () => {
                if (productDetail.length > 0) {
                    data.productDetails = productDetail;
                    instance.post('/promotion', data)
                        .then(({ data }) => {
                            toast.success(data);
                            setProductDetail([]);
                            setProductIds([]);
                            setResetSelectedRowKeys(!resetSelectedRowKeys);
                            form.resetFields();
                        })
                        .catch(e => {
                            toast.error(e.response.data);
                        });
                } else {
                    toast.error('Vui lòng chọn sản phẩm áp dụng giảm giá');
                }
            },
        });
    };

    return (
        <>
            <Breadcrumb
                items={[
                    {
                        href: '',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '/admin/promotion',
                        title: 'Danh sách khuyến mại',
                    },
                    {
                        title: 'Thêm khuyến mại',
                    },
                ]}
            />
            <Form onFinish={handleCreatePromotion} layout="vertical" form={form}>
                <Row gutter={10}>
                    <Col xl={12}>
                        <Row gutter={10}>
                            <Col xl={12}>
                                <Form.Item label={"Mã khuyến mại"} name={"code"} rules={[{ required: true, message: "Mã khuyến mại không được để trống!", },]}>
                                    <Input placeholder="Nhập mã khuyến mại..." />
                                </Form.Item>
                            </Col>
                            <Col xl={12}>
                                <Form.Item label={"Tên khuyến mại"} name={"name"} rules={[{ required: true, message: "Tên khuyến mại không được để trống!", },]} >
                                    <Input placeholder="Nhập tên khuyến mại..." />
                                </Form.Item>
                            </Col>
                            <Col xl={12}>
                                <Form.Item
                                    label={"Giá trị (%)"}
                                    name={"value"}
                                    rules={[
                                        { required: true, message: "Giá trị không được để trống!" },
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
                                    <Input placeholder="Nhập % khuyến mại..." />
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
                            <Col xl={24}>
                                <Button type="primary" htmlType="submit">Thêm khuyến mại</Button>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={12}>
                        <Title level={5} style={{ marginTop: '0' }}>Danh sách sản phẩm</Title>
                        <TableShoe setProductIds={setProductIds} resetSelectedRowKeys={resetSelectedRowKeys} />
                    </Col>
                    <Col xl={24}>
                        {productIds.length === 0 ? '' :
                            <>
                                <Title level={5} >Danh sách chi tiết sản phẩm</Title>
                                <TableShoeDetail idProduct={productIds} setSelectedProductDetail={(value) => setProductDetail(value)} />
                            </>
                        }
                    </Col>
                </Row>

            </Form >
        </>
    )
}

export default AddPromotion