import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Flex, Table } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import instance from '../../core/api';
import { useAppContext } from '../../provider/AppProvider';
import { toast } from 'react-toastify';

const WishList = ({ data = [] }) => {
     const VITE_URl = import.meta.env.VITE_URL;
     const { wishlistAction, setWishlistAction } = useAppContext()

     const handleDelete = (id) => {
          instance.delete('/wishlist/' + id)
          .then((res) => {
               if (res.status === 200) {
                    setWishlistAction(!wishlistAction)
                    toast.success("Xóa thành công!", { position: toast.POSITION.TOP_CENTER })
               } else {
                    toast.error("Xóa thất bại!", { position: toast.POSITION.TOP_CENTER })
               }
          })
          .catch((e) => {
               toast.error("Xóa thất bại!", { position: toast.POSITION.TOP_CENTER })
          })
     }

     const columns = [
          {
               title: 'Ảnh',
               dataIndex: 'image',
               key: 'image',
               render: (image) => {
                    return <img src={image} alt="" style={{ width: '60px', height: '60px' }} />
               }
          },
          {
               title: 'Sản phẩm',
               dataIndex: 'product',
               key: 'product',
          },
          {
               title: 'Hành động',
               dataIndex: 'action',
               key: 'action',
               render: (_, record) => {
                    return (
                         <Flex gap={5}>
                              <Link to={`/product/${record.slug}`}>
                                   <Button>
                                        <EyeOutlined style={{ color: "var(--primary-color)", cursor: 'pointer' }} />
                                   </Button>
                              </Link>
                              <Button onClick={() => handleDelete(record.key)}>
                                   <DeleteOutlined style={{ color: "red", cursor: 'pointer' }}/>
                              </Button>
                         </Flex>


                    )
               }
          },
     ];

     const dataSource = data.map((item) => {
          // console.log(VITE_URl+ item.product.variants[0]?.images[0]?.folder + '/' + item.product.variants[0]?.images[0]?.url);
          return {
               key: item.id,
               image: VITE_URl + 'storage/' + item.product.variants[0]?.images[0]?.folder + '/' + item.product.variants[0]?.images[0]?.url,
               product: item.product.name,
               slug: item.product.slug,
          }
     })

     return (<Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 6 }} />)
}

export default WishList