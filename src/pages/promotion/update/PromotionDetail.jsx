import { HomeOutlined, PictureFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Empty, Form, Input, InputNumber, Modal, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import instance from '../../../core/api';
import { useParams } from 'react-router-dom';
import TableShoe from '../TableShoe';
import TableShoeDetail from '../TableShoeDetail';
const { Title } = Typography;

const AddPromotion = () => {
    const [form] = Form.useForm();
    const [promotion, setPromotion] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const [productIds, setProductIds] = useState([]);
    const [productDetail, setProductDetail] = useState([]);

    useEffect(() => {
        loadPromotion(id);
    }, [id]);

    const loadPromotion = () => {
        instance.get(`/promotion/${id}`).then(({ data }) => {
            setPromotion(data);
            form.setFieldsValue({
                code: data.code,
                name: data.name,
                value: data.value,
                start_date: data.start_date,
                end_date: data.end_date
            })
        }).catch(e => {
            console.log(e);
        })

        instance.get(`/promotion/list-shoe-id/${id}`).then(({ data }) => {
            setProductIds(data)
        }).catch(e => {
            console.log(e);
        })
        instance.get(`/promotion/list-shoe-detail-id/${id}`).then(({ data }) => {
            setProductDetail(data)
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleUpdatePromotion = (data) => {
        Modal.confirm({
            title: "Xác nhận",
            maskClosable: true,
            content: "Xác nhận cập nhật khuyến mãi?",
            okText: "Ok",
            cancelText: "Cancel",
            onOk: () => {
                if (productDetail.length > 0 && productIds.length > 0) {
                    data.productDetails = productDetail;
                    setLoading(true);
                    instance.put(`/promotion/${id}`, data)
                        .then(({ data }) => {
                            loadPromotion();
                            toast.success(data);
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
        <Spin spinning={loading}>
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
                        title: `${promotion.name}`,
                    },
                ]}
            />
            <Form onFinish={handleUpdatePromotion} layout="vertical" form={form}>
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
                                <Button type="primary" htmlType="submit">Cập nhật khuyến mại</Button>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={12}>
                        <Title level={5} style={{ marginTop: '0' }}>Danh sách sản phẩm</Title>
                        <TableShoe setProductIds={setProductIds} resetSelectedRowKeys={productIds} listShoes={productIds} />
                    </Col>
                    <Col xl={24}>
                        <>
                            {productIds.length === 0 ? '' :
                                <>
                                    <Title level={5} >Danh sách chi tiết sản phẩm</Title>
                                    <TableShoeDetail idProduct={productIds} setSelectedProductDetail={(value) => setProductDetail(value)} setRowKeys={productDetail} />
                                </>
                            }
                        </>
                    </Col>
                </Row>
            </Form >
        </Spin>
    )
}

export default AddPromotion