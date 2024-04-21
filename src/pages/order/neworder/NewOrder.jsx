import { Button, Modal, Spin, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import instance from '../../../core/api';
import OrderItem from './OrderItem';
const NewOrder = ({ createNewOrder }) => {
    const [listOrder, setListOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleCreate = () => {
        instance
            .post("/bill")
            .then(({ data }) => {
                toast.success(data);
                loadOrders();
            }
            )
            .catch((e) => {
                toast.error(e.response.data);
            });
    };
    const handleDelete = (key) => {
        const bill = listOrder.find(order => order.code === key);
        Modal.confirm({
            title: "Xác nhận",
            maskClosable: true,
            content: `Xác nhận xóa đơn hàng ${bill.code}?`,
            okText: "Ok",
            cancelText: "Cancel",
            onOk: async () => {
                instance.delete(`/bill/${bill.id}`).then(({ data }) => {
                    toast.success(data);
                    loadOrders();
                }).catch(e => {
                    console.log(e);
                })
            },
        });
    }
    const loadOrders = () => {
        instance
            .get(`get-bill`).then(({ data }) => {
                setListOrder(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    let isToastShown = false;

    const updateStatusBillWhenSuccess = (id) => {
        setLoading(true)
        instance
            .put(`/bill/update-status-bill-success-vnpay/${id}`).then(({ data }) => {
                if (!isToastShown) {
                    toast.success(data);
                    isToastShown = true;
                }
                setLoading(false)
                setTimeout(() => {
                    window.location.href = 'http://localhost:5173/admin/order';
                }, 1000);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
        if (vnp_ResponseCode && vnp_ResponseCode == '00') {
            updateStatusBillWhenSuccess(Number(urlParams.get('vnp_OrderInfo')))
        } else if (vnp_ResponseCode && vnp_ResponseCode !== '00') {
            if (!isToastShown) {
                toast.error('Lưu đơn hàng không thành công');
                isToastShown = true;
            }
        }
        loadOrders();
        setLoading(false);
    }, []);
    return (
        <Spin spinning={loading}>
            <div>
                <div >
                    <Button onClick={() => handleCreate()} type="primary">Tạo mới đơn hàng</Button>
                </div>
                <div>

                </div>
            </div>
            <div className="mt-3">
                <Tabs hideAdd type="editable-card" onEdit={handleDelete}>
                    {listOrder.length > 0 && listOrder.map((order, index) => (
                        <Tabs.TabPane key={order.code} tab={`${order.code}`}>
                            <OrderItem props={order} index={index + 1} onSuccess={loadOrders} createNewOrder={createNewOrder} />
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </div>
        </Spin>
    )
}

export default NewOrder