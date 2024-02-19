import { Button, Empty, Flex, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



const CartTable = ({ data }) => {

     const VITE_URL = import.meta.env.VITE_URL;
     console.log(data);
     const columns = [
          {
               title: 'Image',
               dataIndex: 'image',
               key: 'image',
               render: (text, record) => <img src={record.image} alt="Product" style={{ width: '50px', height: '50px' }} />,
          },
          {
               title: 'Name',
               dataIndex: 'name',
               key: 'name',
               render: (text, record) => <Link to={`/product/${record.link}`}>{record.name}</Link>,
          },
          {
               title: 'Price',
               dataIndex: 'price',
               key: 'price',
          },
     ]

     const cartData = data.map((cartItem, index)=>{
          return {
               key: index,
               image: VITE_URL+ "storage/" + cartItem?.images[0]?.folder + "/" + cartItem?.images[0]?.url,
               name: cartItem.product.name,
               link: cartItem.product.slug,
               price: new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
               }).format(cartItem.price)
          }
     })


     return (
          <>
               {
                    Object.keys(data).length > 0 ?
                         <div style={{ width: "420px", height:"400px", overflowY: "scroll" }}>
                              <Table columns={columns} dataSource={cartData} pagination={false}/>
                         </div>
                         :
                         <div>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                         </div>
               }
               <Button type="primary"
                    style={{
                         width: '100%',
                         background: 'var(--primary-color)',
                    }}
               >
                    <Link to={"/cart"}>Truy cập giỏ hàng</Link>
               </Button>
          </>
     )
}

export default CartTable