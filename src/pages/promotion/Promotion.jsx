import { EditOutlined, HomeOutlined, PlusCircleFilled } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Input, Radio, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../core/api'
import FormatDate from '../../utils/FormatDate'
import VoucherStatus from '../voucher/VoucherStatus'

const Promotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [statusPromotion, setStatusPromotion] = useState("");
    
    useEffect(() => {
        instance.get('/promotion', {
            params: {
                status: statusPromotion
            }
        }).then(({ data }) => {
            setPromotions(data);
        }).catch(e => {
            console.log(e);
        })
    }, [statusPromotion])

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
            title: 'Giá trị (%)',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (x) => <FormatDate date={x} />
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (x) => <FormatDate date={x} />
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
                <Link to={`/admin/promotion/${x}`}>
                    <EditOutlined style={{ padding: '8px' }} />
                </Link>
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
                        title: 'Danh sách khuyến mại',
                    },
                ]}
            />
            <Row gutter={12}>
                <Col span={8}>
                    <label className="mb-1">Tìm kiếm </label>
                    <Input
                        // onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Tìm kiếm khuyến mại theo tên, mã ..."
                    />
                </Col>
                <Col span={12}>
                    <div className="mb-1">Trạng thái</div>
                    <label className="mb-1">ㅤ</label>
                    <Radio.Group defaultValue={""} onChange={(event) => setStatusPromotion(event.target.value)}>
                        <Radio value={""}>Tất cả</Radio>
                        <Radio value={0}>Sắp diễn ra</Radio>
                        <Radio value={1}>Đang diễn ra</Radio>
                        <Radio value={2}>Đã kết thúc</Radio>
                    </Radio.Group>
                </Col>
                <Col span={4}>
                    <div className="mb-1">‍</div>
                    <Link to={"/admin/promotion/create"}>
                        <Button
                            type="primary"
                        >
                            <PlusCircleFilled />
                            Thêm khuyến mại
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Table columns={columns} dataSource={promotions} />
        </>
    )
}

export default Promotion