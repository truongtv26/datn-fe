import { Button, Col, Form, Input, InputNumber, Modal, Row, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import FormatCurrency from "../../utils/FormatCurrency";
import FormatDate from "../../utils/FormatDate";
import instance from "../../core/api";
import { CreditCardOutlined, DollarOutlined } from "@ant-design/icons";

function PaymentHistory({ bill, handleChangePayment, returnMoney }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [method, setMethod] = useState(0);

    const [form] = Form.useForm();
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
        loadPaymentMethod();
    }, [bill])

    const loadPaymentMethod = () => {
        instance.get(`/payment-history/${bill.id}`).then(({ data }) => {
            setPaymentMethod(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleCreatePaymentMethod = (data) => {
        data.methodPayment = method;
        data.bill_id = bill.id;

        if (Number(data.total_money) < Number(bill.total_money) + Number(bill?.money_ship) - Number(bill?.money_reduce)) {
            toast.error("Vui lòng nhập đủ tiền!");
        } else if (data.return_money != undefined && Number(data.return_money) != 0 && Number(data.return_money) != Number(returnMoney)) {
            toast.error("Vui lòng nhập đúng tiền!");
        } else {
            instance.post(`/payment-history`, data).then(({ data }) => {
                loadPaymentMethod();
                toast.success(data);
                setIsModalOpen(false);
                handleChangePayment()
            }).catch((error) => {
                console.error(error);
                toast.error(error.response.data);
            });
        }

    }

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
            title: 'Số tiền',
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            render: (x) => (x != null ? <FormatCurrency props={x} /> : '-')
        },
        {
            title: 'Thời gian',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (x) => (<FormatDate date={x} />)
        },
        {
            title: 'Mã giao dịch',
            dataIndex: 'tradingCode',
            key: 'tradingCode',
            render: (x, record) => (x != null ? record.tradingCode : '-')
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'method',
            key: 'method',
            render: (x, record) => (
                <>{x == 'pay' ? "Thanh toán" : 'Hoàn tiền'}</>
            )
        },
        {
            title: 'Nhân viên xác nhận',
            dataIndex: 'createBy',
            key: 'createBy',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
        },
    ]
    return (
        <>
            <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={5} style={{ padding: '8px', margin: 0, flexGrow: 1 }}>Lịch sử thanh toán</Title>
                    <div style={{ padding: '12px' }}>
                        {paymentMethod?.length === 0 ? (
                            <>
                                {bill.timeline !== '7' && bill.timeline !== '6' && bill.timeline !== '8' && (
                                    <Button type="primary" onClick={showModal}>
                                        Xác nhận thanh toán
                                    </Button>
                                )}

                            </>
                        ) : (
                            bill.timeline === '8' && (
                                <Button type="primary" onClick={showModal}>
                                    Xác nhận hoàn tiền
                                </Button>
                            )
                        )}
                        <Modal
                            title={bill.timeline === '8' ? 'Xác nhận hoàn tiền' : 'Xác nhận thanh toán'}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={
                                <>
                                    <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                                    <Button onClick={() => form.submit()} type="primary">Thanh toán</Button>
                                </>
                            }
                        >
                            <Form layout="vertical" form={form} onFinish={handleCreatePaymentMethod}>
                                {method === 0 && bill.timeline !== '8' ? (
                                    <Form.Item
                                        label="Tiền khách đưa"
                                        name="total_money"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Tiền khách đưa không được để trống!",
                                            },
                                        ]}
                                        initialValue={Number(bill.total_money) + Number(bill.money_ship) - Number(bill.money_reduce)}
                                    >
                                        <InputNumber
                                            defaultValue={Number(bill.total_money) + Number(bill.money_ship) - Number(bill.money_reduce)}
                                            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
                                            addonAfter='VNĐ'
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                ) : method === 1 && bill.timeline !== '8' ? (
                                    <>
                                        <Form.Item label="Mã giao dịch" name={"trading_code"} rules={[{ required: true, message: "Mã giao dịch không được để trống!", },]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name={"total_money"}  initialValue={Number(bill.total_money) + Number(bill.money_ship) - Number(bill.money_reduce)} hidden>
                                        </Form.Item>
                                    </>
                                ) : null}
                                {bill.timeline === '8' && (
                                    <Form.Item
                                        label="Tiền hoàn trả"
                                        name="return_money"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Tiền hoàn trả không được để trống!",
                                            },
                                        ]}
                                        initialValue={returnMoney}
                                    >
                                        <InputNumber
                                            defaultValue={returnMoney}
                                            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
                                            addonAfter='VNĐ'
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                )}

                                <Form.Item label="Ghi chú" name="note" rules={[{ required: true, message: "Ghi chú không được để trống!", },]}>
                                    <TextArea />
                                </Form.Item>
                                {bill.timeline !== '8' ?
                                    <Row gutter={10} className="mt-3">
                                        <Col xl={12} onClick={() => setMethod(0)}>
                                            <div
                                                style={{
                                                    paddingTop: '8px',
                                                    paddingBottom: '8px',
                                                    border: '4px solid',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderColor: method === 0 ? '#ffc107' : '#ccc'
                                                }}>
                                                <DollarOutlined style={{ paddingRight: '8px' }} />
                                                <span style={{ fontWeight: 600 }}>Tiền mặt</span>
                                            </div>
                                        </Col>
                                        <Col xl={12} onClick={() => setMethod(1)}>
                                            <div
                                                style={{
                                                    paddingTop: '8px',
                                                    paddingBottom: '8px',
                                                    border: '4px solid',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderColor: method === 1 ? '#ffc107' : '#ccc'
                                                }}>
                                                <CreditCardOutlined style={{ paddingRight: '8px' }} />
                                                <span style={{ fontWeight: 600 }}>Chuyển khoản</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    : ''}

                            </Form>
                        </Modal>
                    </div>
                </div>
                <Table columns={columns} pagination={false} dataSource={paymentMethod.map((item) => ({
                    totalMoney: item.total_money,
                    createAt: item.created_at,
                    trading_code: item.trading_code,
                    createBy: item.created_by,
                    note: item.note,
                    tradingCode: item.trading_code,
                    method: item.method
                }))} />
            </div>
        </>
    );
}

export default PaymentHistory;
