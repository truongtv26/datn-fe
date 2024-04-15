import { Button, Flex, Input, Select } from 'antd'
import React, { useState } from 'react'
import { useAppContext } from '../../../provider/AppProvider';
import instance from '../../../core/api';
import { toast } from 'react-toastify';

const Status = ({ bill, setBillHistory }) => {
     const { user } = useAppContext();

     const onUpdate = (statusChange) => {
          const data = { ...statusChange, created_by: user.name }
          if (data.status_id === bill.status_id) {
               toast.error("Trạng thái đã tồn tại")
          } else {
               if (statusChange) {
                    instance.patch('order/' + bill.id, data)
                         .then((res) => {
                              if (res.status === 200) {
                                   toast.success("Cập nhật thành công")
                                   instance
                                        .get(`/bill-history/${bill.id}`)
                                        .then(({ data }) => {
                                             setBillHistory(data);
                                        })
                              }
                         })
               }
          }
     }

     let action = null

     switch (bill.status_id) {
          case 100:
               action = <Button disabled>Đang chờ thanh toán</Button>
               break;
          case 101:
               action = <Button disabled>Đang chờ xử lý</Button>
               break;
          case 102:
               action = <Flex gap={2}>
                    <Button type='default' onClick={() => {
                         if (window.confirm("Xác nhận hủy đơn hàng này")) {
                              onUpdate({
                                   status_id: 108,
                                   note: "Người bán đã hủy đơn hàng này"
                              })
                         }
                    }}>Hủy</Button>
                    <Button type='primary' onClick={() => {
                         if (window.confirm("Xác nhận đơn hàng")) {
                              onUpdate({
                                   status_id: 103,
                                   note: "Đơn hàng đang được chuẩn bị"
                              })
                         }
                    }}>Xác nhận đơn hàng</Button>
               </Flex>
               break;
          case 103:
               action = <Flex gap={2}>
                    <Button type='default' onClick={() => {
                         if (window.confirm("Xác nhận hủy đơn hàng này")) {
                              onUpdate({
                                   status_id: 108,
                                   note: "Người bán đã hủy đơn hàng này"
                              })
                         }
                    }}>Hủy</Button>
                    <Button type='primary' onClick={() => {
                         if (window.confirm("Xác nhận giao hàng")) {
                              onUpdate({
                                   status_id: 104,
                                   note: "Đơn hàng đã được vận chuyển"
                              })
                         }
                    }}>Giao hàng</Button>
               </Flex>
               break;
          case 104:
               action = <Flex gap={2}>
                    <Button onClick={() => {
                         if (window.confirm("Xác nhận giao hàng thành công")) {
                              onUpdate({
                                   status_id: 105,
                                   note: "Đơn hàng đã được giao"
                              })
                         }
                    }}>Hoàn thành</Button>
                    <Button onClick={() => {
                         if (window.confirm("Xác nhận giao hàng thất bại")) {
                              onUpdate({
                                   status_id: 106,
                                   note: "Giao hàng thất bại"
                              })
                         }
                    }}>Giao hàng thất bại</Button>
               </Flex>
               break;
          case 107:
               action = <Flex gap={2}><Button onClick={() => {
                    if (window.confirm("Xác nhận hoàn đơn hàng")) {
                         onUpdate({
                              status_id: 107,
                              note: "Người bán chấp nhận trả hàng"
                         })
                    }
               }}>Chấp nhận trả hàng</Button></Flex>
               break;
          case 108:
               action = "Đơn hàng đã được hủy"
               break;
          case 109:
               action = "Đặt hàng thất bại"
               break;
     }

     return action
}

export default Status