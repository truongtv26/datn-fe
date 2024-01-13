import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import instance from './../../../core/api';
import {
    HomeOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Select, Col, Row, Space, Spin, Modal } from 'antd';
import AddProperties from './AddProperties';
import AddProductModal from './AddProductModal';
import TableProduct from './TableProduct';
import { toast } from 'react-toastify';

const { Option } = Select;

const AddProduct = () => {
    const navigate = useNavigate();

    // trạng thái các state ban đầu khi mới vào form
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    // trạng thái các trường của form khi được lựa chọn
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // trạng thái trường được select sau khi đưa vào mảng
    const [productDetail, setProductDetail] = useState([]);

    // lấy các dữ liệu cần thiết cho form
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
    useEffect(() => {
        instance.get("/product").then(({ data }) => {
            setProduct(data);
            setLoading(false);
        })
    }, [])

    // xử lí các trường được select
    useEffect(() => {
        const options = [];
        selectedProduct != null && selectedColors.forEach((colorItem) => {
            selectedSizes.forEach((sizeItem) => {
                const option = {
                    shoe: selectedProduct,
                    color: colorItem,
                    size: sizeItem,
                    price: 100000,
                    quantity: 10,
                    weight: 2000,
                };
                options.push(option);
            });
        });
        setProductDetail(options);
        // console.log(options)
    }, [selectedColors, selectedSizes, selectedProduct]);

    // xử lí lại product detail ghi thực hiện thao tác với bảng
    const handleChangeProductDetail = (items) => {
        setProductDetail(items);
    }

    // xử lí lại reload properties, product khi thêm
    const handleAddSize = (items) => {
        setSize(items);
    }
    const handleAddColor = (items) => {
        setColor(items);
    }
    const handleAddProductQuickly = (items) => {
        setProduct(items);
    }

    // xử lí thêm sản phẩm vào database
    const handleCreate = () => {
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
                await instance.post('/variant', data).then(response => {
                    toast.success(response.data);
                    navigate("/admin/product");
                }).catch(e => {
                    console.log(e);
                })
            },
        });
    }

    return (
        <Spin spinning={loading}>
            <Breadcrumb
                items={[
                    {
                        href: '',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '',
                        title: 'Danh sách sản phẩm',
                    },
                    {
                        title: 'Thêm sản phẩm',
                    },
                ]}
            />

            <Flex align='end'>
                <div style={{ flexGrow: 1, marginRight: '8px' }}>
                    <p style={{ margin: '4px 0' }}>Tên sản phẩm:</p>
                    <Select
                        showSearch
                        onChange={(value) => {
                            setSelectedProduct(product.find(item => item.id === value))
                        }}
                        style={{
                            width: '100%',
                        }}
                        placeholder="Nhập tên giày..."
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                    >
                        {product && product.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>

                </div>
                <AddProductModal hanldeAddProduct={handleAddProductQuickly} />
            </Flex>

            <div>
                <p style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}><DownOutlined /> Thuộc tính</p>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <div>
                            <p style={{ margin: '4px 0' }}>Kích cỡ:</p>
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
                                )}>
                                {size && size.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div>
                            <p style={{ margin: '4px 0' }}>Màu sắc:</p>
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
                                )}>
                                {color && color.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                </Row>
            </div>

            {selectedProduct === null || selectedSizes.length === 0 || selectedColors.length === 0 ? (
                ""
            ) : (
                <div>
                    <TableProduct props={productDetail} handleChange={handleChangeProductDetail} />
                    <Button type="primary" style={{ marginTop: "4px" }} onClick={handleCreate}>Thêm sản phẩm</Button>
                </div>
            )}
        </Spin>
    );
};

export default AddProduct;
