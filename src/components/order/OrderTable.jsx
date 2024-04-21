import React, { useEffect, useState } from 'react'
import instance from '../../core/api';
import { Empty, Flex, Table } from 'antd';
import { useAppContext } from '../../provider/AppProvider';
import FormatCurrency from '../../utils/FormatCurrency';
import OrderDetail from './OrderDetail';

const OrderTable = ({ data, tabAction, setTabAction }) => {
     const { user } = useAppContext();
     const VITE_URL = import.meta.env.VITE_URL;

     const [orders, setOrders] = useState([]);

     // lấy đơn hàng
     useEffect(() => {
          instance.get('order', {
               params: {
                    status: data.id,
                    user: {
                         id: user.id,
                    },
               }
          })
               .then((res) => {
                    if (res.status === 200) {
                         setOrders(res.data)
                    }
               })
     }, [tabAction])

     const orderColumns = [
          {
               title: 'Sản phẩm',
               dataIndex: 'product',
               key: 'product',
               render: (_, record) => {
                    return <Flex gap={10}>
                         <img src={record.image} alt="Product" style={{ width: '80px', height: '60px' }} />
                         <Flex vertical gap={5}>
                              <p>{record.product}</p>
                              <p>{record.detail.length} Sản phẩm</p>
                         </Flex>
                    </Flex>
               }
          },
          {
               title: 'Tổng thanh toán',
               dataIndex: 'total',
               key: 'total',
               render: (_, { order, total }) => {
                    return order.payment_id === 101 && order.is_payment ?
                         <>
                              {
                                   <FormatCurrency props={0} />
                              }
                              <div style={{ textDecoration: "line-through" }}>
                                   <FormatCurrency props={order.total_money - order.money_reduce + Number(order.money_ship)} />
                              </div>
                         </> :
                         <FormatCurrency props={order.total_money + Number(order.money_ship) - order.money_reduce } />
               }
          },
          {
               title: 'Thanh toán',
               dataIndex: 'payment',
               key: 'payment',
          },
          {
               title: 'Trạng thái',
               dataIndex: 'status',
               key: 'status',
               render: (_, { order }) => {
                    return <Flex vertical>
                         <strong>{order.status.status}</strong>
                         <span>{order.status_histories.length > 0
                              ? order.status_histories[order.status_histories.length - 1].note : null}</span>
                    </Flex>
               }
          },
          {
               title: 'Hành động',
               dataIndex: 'action',
               key: 'action',
               render: (_, { order }) => {
                    return <><OrderDetail order={order} tabAction={tabAction} setTabAction={setTabAction}/></>
               }
          },

     ]

     const orderData = orders?.map((order) => {
          return {
               key: order.id,
               image: VITE_URL + 'storage/' + order.bill_details[0]?.variant.images[0]?.folder + '/' + order.bill_details[0]?.variant.images[0]?.url,
               product: order.bill_details[0]?.variant.product.name,
               total: order.bill_details,
               payment: order.payment.method,
               detail: order.bill_details,
               order: order,
          }
     })

     return (
          Object.keys(orders).length > 0 ?
               <Table showHeader={true} columns={orderColumns} dataSource={orderData} />
               : <Empty />
     )
}

export default OrderTable