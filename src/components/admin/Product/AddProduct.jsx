import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
    HomeOutlined,
    PlusCircleFilled,
    DownOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Modal, Flex, Input, Form, Select, Col, Row, Space, Table } from 'antd';
import AddProperties from './AddProperties';

const { Option } = Select;

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}


const AddProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [product, setProduct] = useState([]);

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [productDetail, setProductDetail] = useState([]);

    const [groupByColor, setGroupByColor] = useState([]);

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
        axios.get("http://127.0.0.1:8000/api/size").then(response => {
            setSize(response.data.sizes);
        })
    }, [size])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/color").then(response => {
            setColor(response.data.colors);
        })
    }, [color])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/product").then(response => {
            setProduct(response.data.products);
        })
    }, [product])

    useEffect(() => {
        const options = [];
        selectedColors.forEach((colorItem) => {
            selectedSizes.forEach((sizeItem) => {
                const option = {
                    shoe: selectedProduct,
                    color: colorItem,
                    size: sizeItem,
                    price: 100000,
                    quantity: 10,
                    deleted: false,
                    weight: 2000,
                };
                options.push(option);
            });
        });
        setProductDetail(options);
        // console.log(options)
    }, [selectedColors, selectedSizes, selectedProduct]);

    useEffect(() => {
        const groupedProducts = {};
        productDetail.forEach((option) => {
            const colorName = option.color.data.color.name;

            if (!groupedProducts[colorName]) {
                groupedProducts[colorName] = [];
            }

            groupedProducts[colorName].push(option);
        });
        setGroupByColor(groupedProducts);
        console.log(groupByColor);
    }, [productDetail]);

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <Input
                    value={record.quantity}
                // onChange={(e) => handleInputChange(e, record.key, 'quantity')}
                />
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <Input
                    value={record.price}
                // onChange={(e) => handleInputChange(e, record.key, 'price')}
                />
            ),
        },
        {
            title: 'Cân nặng',
            dataIndex: 'weight',
            key: 'weight',
            render: (_, record) => (
                <Input
                    value={record.weight}
                // onChange={(e) => handleInputChange(e, record.key, 'weight')}
                />
            ),
        },
        // Add more columns as needed
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: () => <Space>{/* Add image rendering logic here */}</Space>,
        },
    ];

    const data = [];
    Object.entries(groupByColor).map(([key, items]) => {
        items.forEach((item, index) => {
            data.push({
                key: `${key}-${index}`,
                index: index + 1,
                productName: `${item.shoe.name} [${item.color.data.color.name}-${item.size.data.size.name}]`,
                quantity: item.quantity,
                price: item.price,
                weight: item.weight,
                // Add more fields as needed
            });
        });
    });


    return (
        <>
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
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
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
                <Button
                    type="primary"
                    onClick={showModal}
                >
                    <PlusCircleFilled />
                </Button>
                <Modal title="Thêm giày" visible={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Form onFinish={handleOk} layout="vertical">
                        <Form.Item label={"Tên giày"} name={"name"} rules={[{ required: true, message: "Tên không được để trống!" }]}>
                            <Input placeholder="Nhập tên giày..." />
                        </Form.Item>
                        <div>
                            <Button type="primary" htmlType="submit"> Thêm</Button>
                        </div>
                    </Form>
                </Modal>
            </Flex>
            <div>
                <p style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}><DownOutlined /> Thuộc tính</p>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div>
                            <p style={{ margin: '4px 0' }}>Kích cỡ:</p>
                            <Select
                                mode="multiple"
                                showSearch
                                onChange={async (selectedValues) => {
                                    setSelectedSizes(await Promise.all(selectedValues.map(async (item) => {
                                        return await axios.get(`http://127.0.0.1:8000/api/size/${item}`);
                                    })))
                                }}
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn kích cỡ..."
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Space >
                                            <AddProperties placeholder={"kích cỡ"} name={"name"} />
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
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div>
                            <p style={{ margin: '4px 0' }}>Màu sắc:</p>
                            <Select
                                mode="multiple"
                                onChange={async (selectedValues) => {
                                    setSelectedColors(await Promise.all(selectedValues.map(async (item) => {
                                        return await axios.get(`http://127.0.0.1:8000/api/color/${item}`);
                                    })))
                                }}
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn màu sắc..."
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Space >
                                            <AddProperties placeholder={"màu sắc"} name={"name"} />
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
            <div>
                <p style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}><DownOutlined /> Danh sách sản phẩm cùng loại</p>
                {selectedProduct === null || selectedProduct === undefined || selectedSizes.length === 0 || selectedColors.length === 0 ? (
                    ""
                ) : (
                    <>
                        {Object.entries(groupByColor).map(([key, items], index) => (
                            <div key={index}>
                                <p style={{ textAlign: 'center', backgroundColor: '#d9d9d9', fontWeight: 'bold', padding: '4px 0' }}>Các sản phẩm màu: {key}</p>
                                <Table columns={columns} dataSource={data} pagination={false} />
                            </div>
                        ))}
                        <Button type="primary" style={{ marginTop: "4px" }}>Thêm sản phẩm</Button>
                    </>
                )}
            </div>
        </>
    );
};

export default AddProduct;
