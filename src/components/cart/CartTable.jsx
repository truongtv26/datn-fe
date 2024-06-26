import { DeleteOutlined } from '@ant-design/icons';
import { Button, Empty, Flex, Table } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../provider/AppProvider';



const CartTable = ({ data }) => {
     const VITE_URL = import.meta.env.VITE_URL;
     const { cartItemAction, setCartItemAction } = useAppContext()

     const columns = [
          {
               title: 'Hình ảnh',
               dataIndex: 'image',
               key: 'image',
               render: (_, record) => <img src={record.image} alt="Product" style={{ width: '50px', height: '50px' }} />,
          },
          {
               title: 'Tên sản phẩm',
               dataIndex: 'name',
               key: 'name',
               render: (_, record) => <Link to={`/product/${record.link}`}>{record.name} [{record.color} - {record.size}]</Link>,
          },
          {
               title: 'Giá',
               dataIndex: 'price',
               key: 'price',
               render: (_, record) => {
                    return <Flex gap={4}>
                         {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                         }).format(record.price)}
                         <DeleteOutlined onClick={()=>{onDeleteCartItem(record)}} style={{color: "red", cursor: "pointer"}}/>
                    </Flex>
               }
          },
     ]

     const cartData = data.map((cartItem, index) => {
          return {
               key: index,
               id: cartItem.id,
               product_id: cartItem.product.id,
               image: VITE_URL + "storage/" + cartItem?.images[0]?.folder + "/" + cartItem?.images[0]?.url,
               name: cartItem.product.name,
               link: cartItem.product.slug,
               price: cartItem.price,
               color: cartItem.color.name,
               size: cartItem.size.name,
          }
     })

     const onDeleteCartItem = (item) => {
          console.log(item);
		const oldCartData = JSON.parse(localStorage.getItem('cart')) || [];
		const newCartData = oldCartData.filter(oldItem => oldItem.product_id === item.product_id && oldItem.variant_id === item.id ? false : true)
		localStorage.setItem('cart', JSON.stringify(newCartData))
          setCartItemAction(!cartItemAction)
	};


     return (
          <>
               {
                    Object.keys(data).length > 0 ?
                         <div style={{ width: "420px", height: "400px", overflowY: "scroll" }}>
                              <Table columns={columns} dataSource={cartData} pagination={false} />
                         </div>
                         :
                         <div>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                         </div>
               }
               <Link to={"/cart"}>
                    <Button type="primary"
                         style={{
                              width: '100%',
                              background: 'var(--primary-color)',
                         }}
                    >
                         Truy cập giỏ hàng
                    </Button>
               </Link>
          </>
     )
}

export default CartTable