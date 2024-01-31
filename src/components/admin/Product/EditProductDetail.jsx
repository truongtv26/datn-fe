import { Button, Col, Empty, Form, InputNumber, Modal, Row, Select, Space, Tooltip } from 'antd'
import { Option } from 'antd/es/mentions';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import AddProperties from './AddProperties';
import instance from '../../../core/api';
import { EditOutlined } from '@ant-design/icons';
import EditImageModal from './EditImageModal';
import { toast } from 'react-toastify';

function EditProductDetail({ props, onSuccess }) {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listImage, setListImage] = useState([]);

    useEffect(() => {
        setListImage(props.images.map((image) => image.imageGallery.url));
    }, [props.images]);

    const showModal = () => {
        setIsModalOpen(true);
        form.setFieldsValue({
            size: props.sizeId,
            color: props.colorId,
            quantity: props.quantity,
            price: props.price,
            weight: props.weight
        })
    };
    const handleOk = (data) => {
        instance.put(`/product-detail-edit/${props.id}`, {
            data: data,
            images: listImage
        }).then(({ data }) => {
            onSuccess();
            toast.success(data);
            setIsModalOpen(false);
        }).catch((error) => {
            console.error(error);
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        instance.get("/size").then(({ data }) => {
            setSize(data);
            setLoading(false);
        })
    }, [])
    useEffect(() => {
        instance.get("/color").then(({ data }) => {
            setColor(data);
            setLoading(false);
        })
    }, [])

    // xử lí lại reload properties, product khi thêm
    const handleAddSize = (items) => {
        setSize(items);
    }
    const handleAddColor = (items) => {
        setColor(items);
    }

    // xử lí lại reload images
    const handleSelectImg = (images) => {
        setListImage(images)
    }

    return (
        <>
            <Tooltip placement="top" title="Chỉnh sửa" >
                <Button type="text" onClick={showModal} style={{ marginRight: '4px', backgroundColor: '#ffc107', color: "#fff" }}><EditOutlined /></Button>
            </Tooltip >
            <Modal title={props.productName} open={isModalOpen} onCancel={handleCancel} footer={
                <>
                    <Button type='primary' onClick={() => form.submit()} htmlType="submit">Cập nhật</Button>
                </>
            } width={800}>
                <Form layout='vertical' form={form} onFinish={handleOk}>
                    <Row gutter={24}>
                        <Col xl={8}>
                            <Form.Item label={"Kích cỡ"} name={"size"} rules={[{ required: true, message: "Kích cỡ không được để trống!" }]}>
                                <Select showSearch placeholder="Nhập kích cỡ..." optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Space className="my-2 ms-2">
                                                <AddProperties placeholder={"kích cỡ"} name={"size"} hanldeAddProperty={handleAddSize} />
                                            </Space>
                                        </>
                                    )}
                                >
                                    {size.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={8}>
                            <Form.Item label={"Màu sắc"} name={"color"} rules={[{ required: true, message: "Màu sắc không được để trống!" }]}>
                                <Select showSearch placeholder="Nhập màu sắc..." optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Space className="my-2 ms-2">
                                                <AddProperties placeholder={"màu sắc"} name={"color"} hanldeAddProperty={handleAddColor} />
                                            </Space>
                                        </>
                                    )}
                                >
                                    {color.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={8}>
                            <Form.Item label={"Đơn giá"} name={"price"} rules={[{ required: true, message: "Đơn giá không được để trống!" }]}>
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={(value) =>
                                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    parser={(value) =>
                                        value !== null && value !== undefined
                                            ? value.replace(/\$\s?|(,*)/g, "")
                                            : ""
                                    }
                                    controls={false}
                                    min={0}
                                    placeholder="Nhập giá trị đơn tối thiểu..."
                                />
                            </Form.Item>
                        </Col>
                        <Col xl={8}>
                            <Form.Item label={"Số lượng"} name={"quantity"} rules={[{ required: true, message: "Số lượng không được để trống!" }]}>
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={(value) =>
                                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    parser={(value) =>
                                        value !== null && value !== undefined
                                            ? value.replace(/\$\s?|(,*)/g, "")
                                            : ""
                                    }
                                    controls={false}
                                    min={0}
                                    placeholder="Nhập số lượng..."
                                />
                            </Form.Item>
                        </Col>
                        <Col xl={8}>
                            <Form.Item label={"Cân nặng"} name={"weight"} rules={[{ required: true, message: "Cân nặng không được để trống!" }]}>
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={(value) =>
                                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    parser={(value) =>
                                        value !== null && value !== undefined
                                            ? value.replace(/\$\s?|(,*)/g, "")
                                            : ""
                                    }
                                    controls={false}
                                    min={0}
                                    placeholder='Nhập cân nặng...'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div>
                        Hình ảnh sản phẩm:
                        {listImage.length === 0 ? (
                            <Empty description={"Không có ảnh"} />
                        ) : (
                            <Row gutter={[16, 16]}>
                                {listImage.map((image, index) => (
                                    <Col key={index} span={6}>
                                        <img
                                            src={image}
                                            alt="img"
                                            width={"100%"}
                                            height={150}
                                            style={{ objectFit: 'contain', border: '1px solid #d9d9d9', marginBottom: '12px' }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        )}
                        <div>
                            <EditImageModal colorName={props.color} oldImages={props.images} handleChange={handleSelectImg} />
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default EditProductDetail