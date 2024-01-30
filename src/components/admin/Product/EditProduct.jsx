import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Form, Modal, Row, Select, Space, Spin, Typography } from 'antd';
import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import instance from '../../../core/api';
import EditProductModal from './EditProductModal';
import TableProductEdit from './TableProductEdit';
import { toast } from 'react-toastify';
import FormatDate from '../../../utils/FormatDate';
import AddProperties from './AddProperties';

const EditProduct = () => {
    // lấy id trên url để tìm sản phẩm
    const { id } = useParams();

    // sản phẩm hiện tại
    const [product, setProduct] = useState({});
    // sản phẩm với các biến thể của nó
    const [listProductDetail, setListProductDetail] = useState([]);

    // chờ sever loading
    const [loading, setLoading] = useState(true);

    // danh sách sản phẩm cập nhật nhanh
    const [listUpdate, setListUpdate] = useState([]);

    // số lượng sản phẩm cập nhật
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

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

    // lấy tên sản phẩm mới cùng các trường dữ liệu cơ bản ...
    const loadData = (productId) => {
        instance.get(`/product/${productId}`).then(({ data }) => {
            setProduct(data);
            setLoading(false);
        });
    };

    // lấy dữ liệu sản phẩm với các biến thể
    const loadShoeDetail = (productId) => {
        instance.get(`/product-detail-edit/${productId}`).then(({ data }) => {
            setListProductDetail(data);
            setLoading(false);
        }).catch(e => {
            console.log(e.response.data);
        })
    };

    // xử lí lấy tên sản phẩm cùng các trường dữ liệu cơ bản ...
    useEffect(() => {
        instance.get(`/product/${id}/edit`).then(({ data }) => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    // xử lí lấy dữ liệu sản phẩm với các biến thể
    useEffect(() => {
        loadShoeDetail(id);
    }, [id]);

    // thay đổi giá
    const handlePriceChange = (value, id) => {
        const item = listProductDetail.variants.find((detail) => detail.id === id);
        const index = listUpdate.findIndex((item) => item.id === id);
        if (index !== -1) {
            listUpdate[index].price = value;
        } else {
            listUpdate.push({ id: id, quantity: item.quantity, price: value, weight: item.weight });
        }
    }

    // thay đổi số lượng
    const handleQuantityChange = (value, id) => {
        const item = listProductDetail.variants.find((detail) => detail.id === id);
        const index = listUpdate.findIndex((item) => item.id === id);
        if (index !== -1) {
            listUpdate[index].quantity = value;
        } else {
            listUpdate.push({ id: id, quantity: value, price: item.price, weight: item.weight });
        }
    }

    // thay đổi cân nặng
    const handleWeightChange = (value, id) => {
        const item = listProductDetail.variants.find((detail) => detail.id === id);
        const index = listUpdate.findIndex((item) => item.id === id);
        if (index !== -1) {
            listUpdate[index].weight = value;
        } else {
            listUpdate.push({ id: id, quantity: item.quantity, price: item.price, weight: value });
        }
    }

    // số lượng dòng được selected
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // gửi dữ liệu mới đi để cập nhật nhanh và reload lại data
    const handleUpdateFast = () => {
        Modal.confirm({
            title: "Xác nhận",
            maskClosable: true,
            content: `Xác nhận cập nhật ${selectedRowKeys.length} sản phẩm ?`,
            okText: "Ok",
            cancelText: "Cancel",
            onOk: () => {
                instance.put('/product-detail-edit/update-fast', listUpdate).then(({ data }) => {
                    toast.success(data);
                    loadShoeDetail(id);
                    setSelectedRowKeys([]);
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
                        href: '/admin/product',
                        title: 'Danh sách sản phẩm',
                    },
                    {
                        title: product.name,
                    },
                ]}
            />
            <div>
                <div style={{ backgroundColor: '#d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', marginTop: '8px' }}>
                    <Typography.Title level={5} style={{ margin: '0' }}>Thông tin sản phẩm</Typography.Title>
                    <EditProductModal props={product} onSuccess={() => { loadData(id) }} />
                </div>
                <Row gutter={24}>
                    <Col xl={8}>
                        <ul style={{ listStyleType: 'none' }}>
                            <li>
                                Người tạo: <span style={{ float: 'right', fontWeight: 'bold' }}>{product.created_by}</span>
                            </li>
                            <li>
                                Người chỉnh sửa: <span style={{ float: 'right', fontWeight: 'bold' }}>{product.updated_by}</span>
                            </li>
                        </ul>
                    </Col>
                    <Col xl={8}>
                        <ul style={{ listStyleType: 'none' }}>
                            <li>
                                Ngày tạo: <span style={{ float: 'right', fontWeight: 'bold' }}><FormatDate date={product.created_at} /></span>
                            </li>
                            <li>
                                Ngày cập nhật cuối: <span style={{ float: 'right', fontWeight: 'bold' }}><FormatDate date={product.updated_at} /></span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>

            <TableProductEdit
                props={listProductDetail}
                product={product}
                handlePriceChange={handlePriceChange}
                handleQuantityChange={handleQuantityChange}
                handleWeightChange={handleWeightChange}
                handleUpdateFast={handleUpdateFast}
                selectedRowKeys={selectedRowKeys}
                rowSelection={rowSelection}
                onSuccess={() => { loadShoeDetail(id) }}
            />
        </Spin>
    );
};

export default EditProduct;
