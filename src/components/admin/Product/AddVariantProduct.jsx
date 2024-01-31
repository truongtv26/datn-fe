import { Button, Col, Modal, Row, Select, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import AddProperties from './AddProperties';
import instance from '../../../core/api';
import TableProduct from './TableProduct';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const { Option } = Select;

const AddVariantProduct = ({ product, variants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const data = productDetail.map((item) => ({
            product_id: item.shoe.id,
            color_id: item.color.id,
            size_id: item.size.id,
            quantity: item.quantity,
            price: item.price,
            weight: item.weight,
            listImages: item.images
        }));
        Modal.confirm({
            title: "Xác nhận",
            maskClosable: true,
            content: "Xác nhận thêm sản phẩm ?",
            okText: "Ok",
            cancelText: "Cancel",
            onOk: async () => {
                await instance.post('/add-variant', data).then(response => {
                    toast.success(response.data);
                    window.location.reload();

                }).catch(e => {
                    console.log(e);
                })
            }
        });

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAddSize = (items) => {
        setSize(items);
    }
    const handleAddColor = (items) => {
        setColor(items);
    }

    // trạng thái các trường của form khi được lựa chọn
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    // trạng thái trường được select sau khi đưa vào mảng
    const [productDetail, setProductDetail] = useState([]);

    // lấy các dữ liệu cần thiết cho form
    useEffect(() => {
        instance.get("/size").then(({ data }) => {
            setSize(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        instance.get("/color").then(({ data }) => {
            setColor(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const options = [];

        if (product != null) {
            selectedColors.forEach((colorItem) => {
                selectedSizes.forEach((sizeItem) => {
                    let option = {
                        shoe: product,
                        color: colorItem,
                        size: sizeItem,
                        price: 100000,
                        quantity: 10,
                        weight: 2000,
                    };

                    variants.forEach((variant) => {
                        if (
                            variant.color.id === colorItem.id &&
                            product.id === variant.product_id &&
                            variant.imageProducts.length > 0
                        ) {
                            option.images = variant.imageProducts.map((image) => image.imageGallery.url);
                        }
                    });

                    const variantExists = variants.some((variant) => (
                        variant.color.id === colorItem.id &&
                        variant.size.id === sizeItem.id &&
                        product.id === variant.product_id
                    ));

                    if (!variantExists) {
                        options.push(option);
                    }
                });
            });
            setProductDetail(options);
        }
    }, [selectedColors, selectedSizes, variants]);

    // xử lí lại product detail ghi thực hiện thao tác với bảng
    const handleChangeProductDetail = (items) => {
        setProductDetail(items);
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm biến thể
            </Button>
            <Modal title="Thêm biến thể" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="sm" footer={null}>
                <Spin spinning={loading}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Select
                                mode="multiple"
                                showSearch
                                onChange={async (selectedValues) => {
                                    setSelectedSizes(await Promise.all(selectedValues.map(async (item) => {
                                        const response = await instance.get(`/size/${item}`);
                                        return response.data;
                                    })))
                                }}
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn kích cỡ..."
                                optionFilterProp="children"
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Space >
                                            <AddProperties placeholder={"kích cỡ"} name={"size"} hanldeAddProperty={handleAddSize} />
                                        </Space>
                                    </>
                                )}
                            >
                                {size && size.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} md={12}>
                            <Select
                                mode="multiple"
                                onChange={async (selectedValues) => {
                                    setSelectedColors(await Promise.all(selectedValues.map(async (item) => {
                                        const response = await instance.get(`/color/${item}`);
                                        return response.data;
                                    })))
                                }}
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn màu sắc..."
                                optionFilterProp="children"
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Space >
                                            <AddProperties placeholder={"màu sắc"} name={"color"} hanldeAddProperty={handleAddColor} />
                                        </Space>
                                    </>
                                )}
                            >
                                {color && color.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    {selectedSizes.length === 0 || selectedColors.length === 0 ? (
                        ""
                    ) : (
                        <div>
                            <TableProduct props={productDetail} handleChange={handleChangeProductDetail} />
                            <Button type="primary" style={{ marginTop: "4px" }} onClick={handleOk}>Thêm sản phẩm</Button>
                        </div>
                    )}

                </Spin>
            </Modal>
        </>
    );
}

export default AddVariantProduct;
