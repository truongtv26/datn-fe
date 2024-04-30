import React, { useEffect } from 'react'
import { useState } from 'react';
import instance from '../../core/api';
import FormatCurrency from '../../utils/FormatCurrency';
import FormatDate from '../../utils/FormatDate';
import { Badge, Button, Spin, Table, Tabs, Tag, Tooltip, Input } from 'antd';
import { ContainerOutlined, EditOutlined } from '@ant-design/icons';
const { Search } = Input;

const Bill = ({ onLoad }) => {
    const [listOrder, setListOrder] = useState([]);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadOrders = (status, searchValue) => {
        instance
            .get('bill', {
                params: { status: status }
            })
            .then(({ data }) => {
                setListOrder(data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        loadOrders(status);
    }, [onLoad, status])
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render(x, record, index) {
                return index + 1;
            }
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'SDT',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (x) => x === null ? '-' : x
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            render: (x) => x === null ? 0 : <span style={{ color: 'red', fontWeight: 600 }}><FormatCurrency props={x} /></span>
        },
        {
            title: 'Loại đơn hàng',
            dataIndex: 'type',
            key: 'type',
            render: (x) => (
                <Tag
                    color={x === 0 ? "#87d068" : "#108ee9"}
                >
                    {x === 0 ? "Tại quầy" : "Giao hàng"}
                </Tag>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (x) => <FormatDate date={x} />
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (x, record) => (
                <>
                    <Tooltip placement="top" title="Chi tiết đơn hàng">
                        <Button type="primary" href={`/admin/bill/${record.id}`} style={{ marginRight: '4px' }}>
                            <EditOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip placement="top" title="In hóa đơn" >
                        <Button type="primary" danger><ContainerOutlined /></Button>
                    </Tooltip >
                </>
            )
        },
    ];

    const items = [
        {
            key: '1',
            label: 'Tất cả',
        },
        {
            key: '2',
            label: 'Chờ xác nhận',
        },
        {
            key: '4',
            label: 'Chờ giao',
        },
        {
            key: '6',
            label: 'Hoàn thành',
        },
        {
            key: '7',
            label: 'Đã hủy',
        },
        {
            key: '8',
            label: 'Hoàn 1 phần',
        },
    ];

    const onSearch = (value) => {
        console.log(value);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Tabs defaultActiveKey="1" items={items} onChange={(key) => {
                    setStatus(key);
                }} />
                <Search
                    placeholder="Tìm kiếm ..."
                    onSearch={onSearch}
                    style={{ width: 300 }}
                />
            </div>
            <Spin spinning={loading}>
                <Table dataSource={listOrder && listOrder.map((order) => (
                    {
                        id: order.id,
                        code: order.code,
                        customer: order.customer_name,
                        phoneNumber: order.phone_number,
                        totalMoney: Number(order.total_money) + Number(order.money_ship) - Number(order.money_reduce),
                        type: order.type == 'at the counter' ? 0 : 1,
                        createAt: order.created_at
                    }
                ))} columns={columns} />
            </Spin>
        </>
    )
}

export default Bill