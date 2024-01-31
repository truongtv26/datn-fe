import React, { useEffect, useState } from 'react'
import {
    PlusCircleFilled,
    EditOutlined
} from '@ant-design/icons'
import { Input, Typography, Button, Table, Flex, Switch, Radio, Spin } from 'antd';
import instance from '../../../core/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const ListProductManage = () => {
    // trạng thái ban đầu ô search
    const [searchText, setSearchText] = useState('');

    // danh sách sản phẩm lần đầu
    const [productList, setProductList] = useState([]);

    // trạng thái sản phẩm lần đầu
    const [statusProduct, setStatusProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // định nghĩa cột
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (_, record) => (
                <Switch
                    checked={record.is_active}
                    onChange={() => {
                        handleChangeStatus(!record.is_active, record.id)
                    }}
                />
            ),
        },
        {
            title: 'Thao tác',
            dataIndex: 'Thao tác',
            key: 'Thao tác',
            render: (_, record) => (
                <Link to={`/admin/product/${record.id}/edit`}><EditOutlined style={{ padding: '8px' }} /></Link>
            )
        },
    ];

    // xử lí data trên input search
    const handleSearch = (value) => {
        console.log('Searching for:', value);
    };

    // xử lí thay đổi nhanh trạng thái của sản phẩm
    const handleChangeStatus = (value, id) => {
        instance.put("/product/change-status", {
            status: value,
            id: id
        }).then(({ data }) => {
            loadData();
            toast.success(data);
        })
    };

    // lấy các dữ liệu cần thiết cho table
    const loadData = () => {
        instance.get("/list-product-manage", {
            params: {
                status: statusProduct
            }
        }).then(({ data }) => {
            setLoading(false);
            setProductList(data);
        })
    }
    useEffect(() => {
        loadData();
    }, [statusProduct])
    return (
        <div>
            <Title level={5} style={{ margin: '0' }} >Danh sách sản phẩm</Title>
            <Flex align='end'>
                <div style={{ flexGrow: 1, marginRight: '8px' }}>
                    <p style={{ margin: '4px 0' }}>Nhập tên sản phẩm:</p>
                    <Input

                        placeholder="Tìm kiếm sản phẩm theo tên..."
                        allowClear
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <Button
                    type="link"
                    href="/admin/product/add"
                    style={{ backgroundColor: '#1677ff', color: '#fff' }}
                >
                    <PlusCircleFilled />
                    Thêm sản phẩm
                </Button>
            </Flex>
            <div>
                <p style={{ margin: '4px 0' }}>Trạng thái</p>
                <Radio.Group defaultValue={null} onChange={(event) => setStatusProduct(event.target.value)}>
                    <Radio value={null}>Tất cả</Radio>
                    <Radio value={true}>Đang bán</Radio>
                    <Radio value={false}>Ngừng bán</Radio>
                </Radio.Group>
            </div>
            <Spin spinning={loading}>
                <Table
                    dataSource={productList.map((item, index) => {
                        const variantsCopy = [...item.variants];
                        const quantity = variantsCopy.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
                        return {
                            id: item.id,
                            index: ++index,
                            name: item.name,
                            quantity: quantity,
                            is_active: item.is_active
                        };
                    })}
                    columns={columns}
                />
            </Spin>
        </div >
    )
}

export default ListProductManage