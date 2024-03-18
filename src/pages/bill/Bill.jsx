import React, { useEffect } from 'react'
import { useState } from 'react';
import instance from '../../core/api';
import FormatCurrency from '../../utils/FormatCurrency';
import FormatDate from '../../utils/FormatDate';
import { Badge, Button, Spin, Table, Tabs, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ContainerOutlined, EditOutlined } from '@ant-design/icons';

const Bill = ({ onLoad }) => {
    const [listOrder, setListOrder] = useState([]);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [tabs, setTabs] = useState([]);

    const loadOrders = (status, searchValue) => {
        instance
            .get(`bill`, {
                params: {
                    status: status
                }
            }).then(({ data }) => {
                setListOrder(data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });

        // instance.get('/bill/statistic-bill-status').then(response => {
        //     setTabs(response);
        // }).catch(e => { console.log(e); })
    };

    useEffect(() => {
        loadOrders();
    }, [onLoad])
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
                        <Button type="primary" danger ><ContainerOutlined /></Button>
                    </Tooltip >
                </>
            )
        },
    ];
    // const items = [
    //     ...tabs.map(item => ({
    //         key: item.status,
    //         label: <Badge count={item.totalCount} offset={[8, 0]} size="small">{item.statusName}</Badge>,
    //     })),
    // ];
    return (
        <>
            {/* <Tabs defaultActiveKey={1} items={items} tabBarGutter={74} onChange={(key) => {
                setStatus(key);
            }} /> */}
            <Spin spinning={loading}>
                <Table dataSource={listOrder.map((order) => (
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