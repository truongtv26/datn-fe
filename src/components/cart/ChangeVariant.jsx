import { DownOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ChangeVariant = ({ data, cartItemAction, setCartItemAction }) => {
     // trạng thái sản phẩm
     const [variant, setVariant] = useState({});
     const [optionSelected, setOptionSelected] = useState({});

     // trạng thái modal
     const [open, setOpen] = useState(false);
     const [confirmLoading, setConfirmLoading] = useState(false);
     const [modalText, setModalText] = useState('');

     // 
     const attributes = {
          colors: [...new Map(data.action.product.colors.map(color => [color.id, color])).values()],
          sizes: [...new Map(data.action.product.sizes.map(color => [color.id, color])).values()]
     }
     // sự kiện khi chọn option của sản phẩm
     const onChangeOption = ({ target }) => {
          setOptionSelected({
               ...optionSelected,
               [target.name]: target.value
          })
     };

     // lấy biến thể khi chọn thuộc tính
     useEffect(() => {
          if (optionSelected && optionSelected.size && optionSelected.color) {
               const variant = data.action.product.variants.filter((variant) =>
                    variant.size_id === Number(optionSelected.size) && variant.color_id === Number(optionSelected.color));

               variant.length > 0 ? setVariant(...variant) : setVariant({})
          }
     }, [optionSelected])

     // xử lý modal
     const showModal = () => {
          setOpen(true);
          setModalText(data.color.name + '-' + data.size.name)
     };
     const handleOk = () => {
          const cartData = JSON.parse(localStorage.getItem('cart')) || [];

          const attributeSelected = {
               ...optionSelected,
          }

          const isItemExists = cartData.filter((item) => item.color_id === attributeSelected.color
               && item.size_id === attributeSelected.size)

          if (Object.keys(isItemExists).length <= 0) {
               if (attributeSelected && attributeSelected.size && attributeSelected.color) {
                    const newCartData = cartData.map((item) => item.variant_id === data.action.id
                         ? {
                              variant_id: variant.id,
                              color_id: variant.color_id,
                              size_id: variant.size_id,
                              product_id: data.action.product.id,
                              quantity: item.quantity
                         }
                         : item)

                    localStorage.setItem('cart', JSON.stringify(newCartData))
                    toast.success("Thay đổi thuộc tính thành công!")
                    setCartItemAction(!cartItemAction);
                    setOpen(false);
               } else {
                    toast.error('Vui lòng chọn thuộc tính')
               }
          } else {
               toast.error('Sản phẩm đã tồn tại trong giỏ hàng')
          }
     };
     const handleCancel = () => {
          setOpen(false);
     };

     return (
          Object.keys([0, 1]).length > 0 ? (
               <>
                    <Button type="link" onClick={showModal}>
                         Thay đổi <DownOutlined />
                    </Button>
                    <Modal
                         title={data.name}
                         open={open}
                         onOk={handleOk}
                         confirmLoading={confirmLoading}
                         onCancel={handleCancel}
                    >
                         <p>{modalText}</p>
                         <Flex gap={4} vertical>
                              <p >Size</p>
                              <Flex gap={12}>
                                   <Radio.Group options={
                                        attributes?.sizes?.map(size => ({
                                             label: size.name,
                                             value: size.id,
                                        }))
                                   }
                                        name="size"
                                        onChange={onChangeOption}
                                        optionType="button" />
                              </Flex>
                         </Flex>
                         <Flex gap={4} vertical>
                              <p >Colors</p>
                              <Flex gap={12}>
                                   <Radio.Group options={
                                        attributes?.colors?.map(color => ({
                                             label: color.name,
                                             value: color.id,
                                        }))
                                   }
                                        name="color"
                                        onChange={onChangeOption}
                                        optionType="button" />
                              </Flex>
                         </Flex>
                    </Modal>
               </>
          ) : (
               ""
          )
     );

}

export default ChangeVariant