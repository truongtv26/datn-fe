import { DownOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react'
import instance from '../../core/api';

const SelectCoupon = ({ data, coupons, couponSelected, setCouponSelected, cartItemAction, setCartItemAction }) => {
     // trạng thái mã giảm giá
     const [open, setOpen] = useState(false);
     const [confirmLoading, setConfirmLoading] = useState(false);
     const [modalText, setModalText] = useState('Chọn mã giảm giá');
     const [couponSelected2, setCouponSelected2] = useState({})

     // xử lý modal giảm giá
     const showModal = () => {
          setOpen(true);
     };
     const handleOk = () => {
          const coupon = [
               ...couponSelected,
               couponSelected2
          ]

          // trường hợp đã có mã giảm giá áp dụng cho biến thể được chọn => thay bằng mã giảm giá mới
          const finalCoupon = coupon.reduce((accumulator, current) => {
               const existingItemIndex = accumulator.findIndex((item) => item.variant_id === current.variant_id);
               if (existingItemIndex !== -1) {
                    accumulator[existingItemIndex] = current;
               } else {
                    accumulator.push(current);
               }
               return accumulator;
          }, []);

          setCouponSelected(finalCoupon)
          setCartItemAction(!cartItemAction)
          setOpen(false);
     };
     const handleCancel = () => {
          setOpen(false);
     };

     // lựa chọn giảm giá
     const onChangeOption = ({ target }) => {
          setCouponSelected2({
               id: target.id,
               variant_id: data.variant,
               title: target.title,
               value: target.value,
          })
     };

     return (
          <div>
               <Button type="link" onClick={showModal}>
                    {modalText} <DownOutlined />
               </Button>
               <Modal
                    title={data.action.product.name}
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
               >
                    {Object.keys(couponSelected2).length > 0
                         ?
                         <>
                              <Flex gap={4}>
                                   <div>
                                        {
                                             new Intl.NumberFormat("vi-VN", {
                                                  style: "currency",
                                                  currency: "VND",
                                             }).format(data.action.price * (1 - couponSelected2.value / 100))
                                        }
                                   </div>
                                   -
                                   <div style={{ textDecoration: "line-through" }}>
                                        {
                                             new Intl.NumberFormat("vi-VN", {
                                                  style: "currency",
                                                  currency: "VND",
                                             }).format(data.action.price)
                                        }
                                   </div>
                              </Flex>
                         </>
                         :
                         new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                         }).format(data.action.price)
                    }


                    <Flex gap={4} vertical>
                         <p >Coupons code</p>
                         <Flex gap={12}>
                              <Radio.Group options={
                                   coupons.map((coupon) => {
                                        console.log(coupon);
                                        return {
                                             id: coupon.id,
                                             title: coupon.code,
                                             label: <Flex vertical>
                                                  {coupon.name}
                                                  {coupon.code}
                                             </Flex>,
                                             value: coupon.value,
                                             disabled: coupon.status === "happenning" ? false : true,
                                        }
                                   })
                              }
                                   name="coupon"
                                   onChange={onChangeOption}
                                   optionType="button" />
                         </Flex>
                    </Flex>
               </Modal>
          </div>
     )
}

export default SelectCoupon