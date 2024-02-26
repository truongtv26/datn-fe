import { DeleteOutlined, EditOutlined, HomeOutlined, PlusCircleFilled } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Input, Radio, Row, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VoucherStatus from './VoucherStatus'
import instance from '../../core/api'

const Voucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [statusVoucher, setStatusVoucher] = useState("");

    useEffect(() => {
        instance.get('/voucher', {
            params: {
                status: statusVoucher
            }
        }).then(({ data }) => {
            setVouchers(data);
        }).catch(e => {
            console.log(e);
        })
    }, [statusVoucher])
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Đơn tối thiếu',
            dataIndex: 'min_bill_value',
            key: 'min_bill_value',
        },
        {
            title: 'Giảm (%)',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (x) => <VoucherStatus status={x} />
        },
        {
            title: 'Hành động',
            dataIndex: 'id',
            key: 'id',
            render: (x) => (
                <>
                    <Tooltip placement="bottom" title="Sửa">
                        <Link to={`/admin/voucher/${x}`}>
                            <Button type="primary" style={{ marginRight: '4px', backgroundColor: '#ffc107', color: "#fff" }}>
                                <EditOutlined />
                            </Button>
                        </Link>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Xóa">
                        <Button type="primary" danger><DeleteOutlined /></Button>
                    </Tooltip>
                </>

            )
        },
    ]
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        href: '',
                        title: <HomeOutlined />,
                    },
                    {
                        title: 'Danh sách phiếu giảm giá',
                    },
                ]}
            />
            <Row gutter={12}>
                <Col span={8}>
                    <label className="mb-1">Tìm kiếm</label>
                    <Input
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Tìm kiếm giảm giá theo tên, mã ..."
                    />
                </Col>
                <Col span={12}>
                    <div className="mb-1">Trạng thái</div>
                    <label className="mb-1">ㅤ</label>
                    <Radio.Group
                        defaultValue={""}
                        onChange={(event) => {
                            setStatusVoucher(event.target.value);
                        }}
                    >
                        <Radio value={""}>Tất cả</Radio>
                        <Radio value={0}>Sắp diễn ra</Radio>
                        <Radio value={1}>Đang diễn ra</Radio>
                        <Radio value={2}>Đã kết thúc</Radio>
                    </Radio.Group>
                </Col>

                <Col span={4}>
                    <div className="mb-1">‍</div>
                    <Link to={"/admin/voucher/add"}>
                        <Button
                            type="primary"
                            className="bg-warning"
                            style={{ textAlign: "center" }}
                        >
                            <PlusCircleFilled />Thêm phiếu giảm giá
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Table columns={columns} dataSource={vouchers} />
        </>
    )
}

export default Voucher