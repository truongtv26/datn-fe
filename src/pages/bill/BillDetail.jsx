import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Button, Carousel, Divider, Form, Modal, Table, Typography, Spin, InputNumber } from "antd";
import { toast } from "react-toastify";
import instance from "../../core/api";
import FormatCurrency from "../../utils/FormatCurrency";
import FormatDate from "../../utils/FormatDate";
import InfoBill from "./InfoBill";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import BillHistory from "./BillHistory";
import ShowProductModal from "../order/neworder/ShowProductModal";
import { PictureFilled } from "@ant-design/icons";
import PaymentHistory from "./PaymentHistory";
const { Title } = Typography;
import './timeline.css';
import Status from "../../components/admin/order/Status";
const BillDetail = () => {
    const [bill, setBill] = useState([]);
    const [billHistory, setBillHistory] = useState([]);
    const [listBillDetail, setListBillDetail] = useState([]);
    const [billStatus, setBillStatus] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const [form] = Form.useForm();

    const [value, setValue] = useState(1);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const loadBill = () => {
        instance
            .get(`/bill/${id}`)
            .then(({ data }) => {
                setBill(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const loadBillDetail = async () => {
        await instance.get(`/bill-detail/${id}`)
            .then(({ data }) => {
                setListBillDetail(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const loadBillHistory = () => {
        instance
            .get(`/bill-history/${id}`)
            .then(({ data }) => {
                setBillHistory(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const loadBillStatus = () => {
        instance.get('order-status')
            .then((res) => {
                if (res.status === 200) {
                    setBillStatus(res.data)
                }
            })
    }

    useEffect(() => {
        loadBill();
        loadBillDetail();
        loadBillHistory();
        loadBillStatus();
        setLoading(false);
    }, [id]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (data) => {
        instance.put(`/bill/change-status/${bill.id}`, {
            note: data
        }).then(({ data }) => {
            loadBill();
            loadBillHistory();
            loadBillDetail();
            form.resetFields();
            toast.success(data);
        }).catch((e) => {
            toast.error(e.response.data);
        });
    }

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const handleChangeInfo = () => {
        loadBill();
    }

    const handleChangePayment = () => {
        loadBillHistory();
    }

    const handleChangeQuantity = (value, record) => {
        setLoading(true)
        instance.put(`/bill-detail/change-quantity/${record.id}`, {
            quantity: value
        }).then(({ data }) => {
            loadBill();
            loadBillDetail();
            loadBillHistory();
            setLoading(false)
            toast.success(data);
            handleChangePayment();
        }).catch((e) => {
            console.log(e);
            toast.error(e.response.data);
        });
    }

    const onSelectChange = (newSelectedRowKeys) => {
        console.log(newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (_, record, index) => (
                index + 1
            )
        },
        {
            title: <PictureFilled />,
            dataIndex: 'images',
            key: 'images',
            render: (_, record) => {
                const carouselKey = record.images.map((image) => image.imageGallery.id).join('-');

                if (record.images.length > 0) {
                    return (
                        <Carousel key={carouselKey} autoplay autoplaySpeed={3000} dots={false} arrows={false} style={{ width: "100px" }}>
                            {record.images.map((image, index) => (
                                <div key={image.imageGallery.id}>
                                    <img src={image.imageGallery.url} alt={`Image ${index + 1}`} style={{ width: "100px", height: "100px", objectFit: 'contain' }} />
                                </div>
                            ))}
                        </Carousel>
                    );
                } else {
                    return <span>Không có ảnh</span>;
                }
            },
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => (
                <>
                    <ul style={{ listStyleType: 'none' }}>
                        <li style={{ fontWeight: 600 }}>
                            {`${record.name} [${record.color} - ${record.size}]`}
                        </li>
                        <li>Đơn giá:
                            <span style={{ color: 'red' }}> <FormatCurrency props={record.price} /></span>
                        </li>
                    </ul>
                </>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                bill.timeline == '2' || bill.timeline == '4' ? (
                    <InputNumber
                        defaultValue={quantity}
                        onChange={(value) => handleChangeQuantity(value, record)}
                        min={1}
                    />
                ) : bill.timeline == '6' ? (
                    <InputNumber
                        defaultValue={quantity}
                        min={1}
                    />
                ) : (
                    <>{quantity}</>
                )
            )
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'quantity',
            key: 'total',
            render: (quantity, record) => (
                <span style={{ textAlign: 'center', color: 'red', fontWeight: 600 }}>
                    <FormatCurrency props={(record.price * record.quantity)} />
                </span>
            )
        },
    ]


    return (
        <Spin spinning={loading}>
            <Breadcrumb
                items={[
                    {
                        href: '/admin/bill',
                        title: 'Danh sách hóa đơn',
                    },
                    {
                        title: `Hóa đơn ${bill.code}`,
                    }
                ]}
            />
            <div style={{ marginBottom: '12px' }} >
                <Timeline minEvents={billHistory.length} placeholder >
                    {billHistory.map((item, index) => (
                        <TimelineEvent
                            color={item.status == '7' ? 'red' : "#2DC255"}
                            title={
                                <Title level={5}>
                                    {(() => {
                                        switch (item.status) {
                                            case '1':
                                                return "Tạo đơn hàng";
                                            case '2':
                                                return "Chờ xác nhận";
                                            case '3':
                                                return "Xác nhận thông tin thanh toán";
                                            case '4':
                                                return "Chờ giao";
                                            case '5':
                                                return "Đang giao";
                                            case '6':
                                                return "Hoàn thành";
                                            case '7':
                                                return "Hủy";
                                            default:
                                                return "";
                                        }
                                    })()}
                                </Title>
                            }
                            subtitle={
                                <>
                                    {item.note}
                                    <br />
                                    <FormatDate date={item.created_at} />
                                </>
                            }

                        />
                    ))}
                </Timeline>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                    {
                        bill.address_information ?
                            <Status bill={bill} billStatus={billStatus}/>
                            :
                            bill.timeline != '6' ? (
                                <>
                                    {bill.timeline <= '4' ? (
                                        <>
                                            <Button type="primary" danger style={{ marginRight: '4px' }} onClick={() => handleSubmit('Đã hủy đơn hàng')}>Hủy</Button>
                                            {bill.timeline == '2' ? (
                                                <Button type="primary" onClick={() => handleSubmit('Đã xác nhận đơn hàng')}>
                                                    Xác nhận đơn hàng
                                                </Button>
                                            ) : (
                                                <Button type="primary" onClick={() => handleSubmit('Đã bàn giao cho đơn vị vận chuyển')}>
                                                    Giao hàng
                                                </Button>
                                            )}

                                        </>
                                    ) : (bill.timeline != '6' && bill.timeline != '7') ? (
                                        <Button type="primary" onClick={() => handleSubmit('Đơn hàng đã được giao thành công')}>
                                            Hoàn thành
                                        </Button>
                                    ) : null}
                                </>
                            ) : (
                                ""
                            )
                    }
                </div>
                <div className="">
                    <BillHistory props={billHistory} />
                </div>
            </div>
            <Divider />
            {/* Thông tin đơn hàng */}
            <InfoBill props={bill} handleChangeInfo={handleChangeInfo} />
            {/* Lịch sử thanh toán */}
            <PaymentHistory bill={bill} handleChangePayment={handleChangePayment} />
            {/* Thông tin đơn hàng */}
            <div style={{ display: 'flex', marginTop: '12px', marginBottom: '8px' }}>
                <Title level={5} style={{ flexGrow: 1, padding: '8px' }}>Sản phẩm</Title>
                {bill.timeline == '2' | bill.timeline == '4' ? (
                    <ShowProductModal idBill={bill.id} onClose={() => { loadBillDetail(); loadBill(); loadBillHistory(); }} />
                ) : ''}
                {
                    bill.timeline == '6' && selectedRowKeys.length > 0 ? <Button type="primary" >Trả hàng {selectedRowKeys.length} sản phẩm</Button> : ''
                }
            </div>
            <Table
                columns={columns}
                rowSelection={bill.timeline === '6' ? rowSelection : null}
                dataSource={listBillDetail.variants ? listBillDetail.variants.map((item) => ({
                    key: item.id,
                    name: item.product.name,
                    size: item.size.name,
                    color: item.color.name,
                    price: listBillDetail.bill_details.find((bill) => item.id === bill.variant_id)?.price,
                    images: item.imageProducts,
                    quantity: listBillDetail.bill_details.find((bill) => item.id === bill.variant_id)?.quantity,
                    id: listBillDetail.bill_details.find((bill) => item.id === bill.variant_id)?.id,
                })) : []}
            />
        </Spin>
    );
};

export default BillDetail;
