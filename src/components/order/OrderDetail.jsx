import { EditOutlined, HomeOutlined } from '@ant-design/icons';
import { Badge, Breadcrumb, Button, Col, Flex, Form, Input, InputNumber, Modal, Row, Select, Space, Table, Timeline } from 'antd';
import React, { useEffect, useState } from 'react'
import { getCity, getDistrict, getWard } from '../../services/shipping';
import instance from '../../core/api';
import FormatCurrency from '../../utils/FormatCurrency';
import FormatDate from '../../utils/FormatDate';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { paymentExecution } from '../../services/payment';
import OrderStatusTimeLine from './OrderStatusTimeLine';

const OrderDetail = ({ order, setTabAction, tabAction }) => {
     const VITE_URL = import.meta.env.VITE_URL
     const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL

     const navigate = useNavigate();

     const [form] = Form.useForm();
     // trạng thái modal chi tiêt
     const [isModalOpen, setIsModalOpen] = useState(false);

     // trạng thái đơn hàng
     const [orderDetail, setOrderDetail] = useState({})
     const [orderStatusHistories, setOrderStatusHistories] = useState([])
     const [products, setProducts] = useState([]);

     // trạng thái thông tin đơn hàng khi người dùng thay đổi
     const [orderChange, setOrderChange] = useState({});
     const [orderDetailChange, setOrderDetailChange] = useState([])

     // trạng thái người gửi hàng
     const [depositor, setDepositor] = useState(
          {
               city: 201, cityName: 'Hà Nội',
               district: 3440, districtName: "Quận Nam Từ Liêm",
               ward: '13005', wardName: "Phường Mỹ Đình 2",
               detail: "92"
          })

     // địa chỉ
     const [cities, setCities] = useState([]);
     const [district, setDistrict] = useState([]);
     const [ward, setWard] = useState([]);

     // lấy sản phẩm trong đơn hàng
     useEffect(() => {
          isModalOpen &&
               instance.get(`order/${order.id}`)
                    .then((res) => {
                         res.status === 200 && setProducts(res.data)
                    })
     }, [isModalOpen])

     // // lấy thông tin vận chuyển
     const address = JSON.parse(order.address_information)
     useEffect(() => {
          // city
          isModalOpen && getCity()
               .then(({ data }) => {
                    setCities(data)
                    const city = data.find(c => c.ProvinceID === Number(address.city))

                    // district
                    getDistrict(Number(city.ProvinceID))
                         .then(({ data }) => {
                              const district = data.find(d => d.DistrictID === Number(address.district))
                              setDistrict(data)

                              //ward
                              getWard(Number(district.DistrictID))
                                   .then(({ data }) => {
                                        const ward = data.find(w => w.WardCode === address.ward)
                                        setWard(data)
                                        setOrderDetail({
                                             ...order,
                                             city,
                                             district,
                                             ward,
                                             detail: address.detail
                                        })
                                   })
                         })
               })
     }, [isModalOpen])

     // lấy quận huyện khi thay dổi thành phố
     useEffect(() => {
          isModalOpen && orderChange.recipient_city &&
               getDistrict(Number(orderChange.recipient_city))
                    .then(({ data }) => {
                         setDistrict(data)
                    })
     }, [orderChange, isModalOpen])

     useEffect(() => {
          isModalOpen && orderChange.recipient_district &&
               getWard(Number(orderChange.recipient_district))
                    .then(({ data }) => {
                         setWard(data)
                    })
     }, [orderChange, isModalOpen])

     // lấy lịch sử trạng thái đơn hàng
     useEffect(() => {
          setOrderStatusHistories([...order.status_histories].reverse())
     }, [isModalOpen])

     const handleOrderChange = ({ target }) => {
          setOrderChange({
               ...orderChange,
               [target.name]: target.value
          })
     }

     const handleAddressChange = (_, target) => {
          if (target.name === 'recipient_city') {
               form.setFieldsValue({
                    district: { value: "", label: "Chọn Quận/Huyện" },
                    ward: { value: "", label: "Chọn Phường/Xã" },
               });
               setOrderChange({
                    ...orderChange,
                    [target.name]: target.value,
                    [`${target.name}_name`]: target.label,
                    recipient_district: null,
                    recipient_ward: null,
               })
          } else {
               setOrderChange({
                    ...orderChange,
                    [target.name]: target.value,
                    [`${target.name}_name`]: target.label
               })
          }

     }

     // sản phẩm đơn hàng
     const productColumns = [
          {
               title: 'Sản phẩm',
               dataIndex: 'product',
               key: 'product',
               render: (_, { product }) => {
                    const imageUrl = VITE_URL + 'storage/' + product.variant?.images[0]?.folder + '/' + product.variant?.images[0]?.url
                    return <Flex gap={10}>
                         <img src={imageUrl} alt={product.name} style={{ width: '60px', height: '40px' }} />
                         <Flex vertical gap={5}>
                              <h6>{product.variant.product.name} - [{product.variant.color.name} - {product.variant.size.name}] </h6>
                              <Flex gap={10}>
                                   <Flex vertical>
                                        <InputNumber
                                             name='product'
                                             onChange={(value) => {
                                                  const updatedOrderDetail = [...orderDetailChange];

                                                  // Kiểm tra sự tồn tại cẩu variant
                                                  const existingItemIndex = updatedOrderDetail.findIndex((item) => item.id === product.id);

                                                  // Nếu tồn tại cập nhật quantity
                                                  if (existingItemIndex !== -1) {
                                                       updatedOrderDetail[existingItemIndex] = {
                                                            id: product.id,
                                                            quantity: value
                                                       };
                                                  } else {
                                                       // Không tồn tại thêm mới
                                                       updatedOrderDetail.push({
                                                            id: product.id,
                                                            quantity: value
                                                       });
                                                  }
                                                  setOrderDetailChange(updatedOrderDetail);
                                             }}
                                             size="small"
                                             min={1}
                                             max={product.variant.quantity + product.quantity}
                                             defaultValue={product.quantity} />
                                        <h5>{product.variant.quantity} sản phẩn có sẵn</h5>
                                   </Flex>
                                   <Flex>
                                        Thành tiền: <FormatCurrency props={product.quantity * product.price} />
                                        {product.promotion !== null ? <>
                                             -
                                             <div style={{ textDecoration: "line-through" }}><FormatCurrency props={(product.quantity * product.price) / (1 - (product.promotion.value / 100))} /></div>
                                             <Badge count={`-${product.promotion.value}%`} />
                                        </> : null}
                                   </Flex>
                              </Flex>
                         </Flex>
                    </Flex>
               }
          }
     ]

     const productData = products.map((product) => ({ key: product.id, product }));

     const showModal = () => {
          setIsModalOpen(true);
     };
     const handleOk = () => {
          setIsModalOpen(false);
     };
     const handleCancel = () => {
          setIsModalOpen(false);
     };

     // validate form
     const formValidator = {
          addressRequired: (_, value) => {
               return String(value.value).length <= 0 ? Promise.reject('Không hợp lệ!') : Promise.resolve();
          },
          email: (_, value) => {
               const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
               return value && !regex.test(value) ? Promise.reject('Email không hợp lệ') : Promise.resolve();
          },
          vietnamesePhoneNumber: (_, value) => {
               const regex = /(03|05|07|08|09)+([0-9]{8})\b/
               return value && !regex.test(value) ? Promise.reject('Số điện thoại không hợp lệ') : Promise.resolve();
          }
     }

     const handlePaymentOrder = () => {
          const data = {
               id: order.code,
               amount: order.total_money,
               return_payment: VITE_LOCAL_URL + 'payment/',
          }

          if (data.id && data.amount && data.return_payment) {
               instance.post('order-payment', data)
                    .then((res) => {
                         if (res.status === 200) {
                              paymentExecution(res.data.data)
                         }
                    })
          }
     }

     const handleDeleteOrder = () => {
          if (order.status_id < 103) {
               instance.delete('/order/' + order.id)
                    .then((res) => {
                         if (res.status === 204) {
                              toast.success("Hủy đơn hàng thành công!")
                              setTimeout(() => {
                                   setIsModalOpen(!isModalOpen)
                                   setTabAction(!tabAction)
                              }, 1000)
                         } else {
                              toast.success("Có lỗi xảy ra!")
                         }
                    })
          } else {
               toast.error("Đơn hàng đã được bàn giao cho đơn vị vận chuyển")
          }
     }

     const handleReturnOrder = () => {
          instance.post("return_order/" + order.id)
          .then((res) => {
               if (res.status === 204) {
                    toast.success("Yêu cầu trả hàng thành công")
               } else {
                    toast.error("Yêu cầu trả hàng thất bại")
               }
          })
          .catch((err) => {
               toast.error("Yêu cầu trả hàng thất bại")
          })
     }

     // validate
     const onFinish = () => {
          if (Object.keys(orderChange).length > 0 || orderDetailChange.length > 0) {
               // console.log(orderChange, orderDetailChange, orderDetail);
               const address = `${orderChange.recipient_detail ?? orderDetail.detail} ${orderChange.recipient_ward_name ?? orderDetail.ward.WardName} ${orderChange.recipient_district_name ?? orderDetail.district.DistrictName} ${orderChange.recipient_city_name ?? orderDetail.city.ProvinceName}`
               const oldAddressInfo = JSON.parse(orderDetail.address_information)
               const address_information = JSON.stringify({
                    city: orderChange.recipient_city ?? oldAddressInfo.city,
                    district: orderChange.recipient_district ?? oldAddressInfo.district,
                    ward: orderChange.recipient_ward ?? oldAddressInfo.ward,
                    detail: orderChange.recipient_detail ?? oldAddressInfo.detail
               })
               // > 103 => đã giao hàng không thể thay đổi
               if (order.status_id < 103) {
                    const orderData = {
                         ...orderChange,
                         address,
                         address_information
                    }
                    instance.put(`/order/${order.id}`, { orderData, orderDetailChange })
                         .then((res) => {
                              console.log(res);
                              if (res.status === 200) {
                                   toast.success("Cập nhật đơn hàng thành công!")
                                   setTimeout(() => {
                                        setIsModalOpen(!isModalOpen)
                                   }, 1000)
                              } else {
                                   toast.error("Có lỗi sảy ra")
                              }
                         })
               } else {
                    toast.error("Đơn hàng đã được bàn giao cho đơn vị vận chuyển")
               }

          } else {
               toast.error("Vui lòng thay đổi thông tin trước khi cập nhật")
          }
     };

     const onFinishFailed = () => {
          toast.error("Vui lòng kiểm tra lại thông tin!")
     };


     return (
          <>
               <Button type="" onClick={showModal}>
                    <EditOutlined />
               </Button>
               <Modal
                    title="Chi tiết đơn hàng"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1000}
                    footer={[
                         <Button key="cancel" onClick={handleCancel}>
                              Đóng
                         </Button>
                    ]}
               >
                    <div className="container mx-auto">

                         <div className="top-content">
                              <Breadcrumb
                                   items={[
                                        {
                                             href: '',
                                             title: <HomeOutlined />,
                                        },
                                        {
                                             title: 'Chi tiết đơn hàng',
                                        },
                                        {
                                             title: "Mã đơn hàng#" + orderDetail.code,
                                        },
                                   ]}
                              />
                         </div>

                         <div className="content-cart">
                              {Object.keys(orderDetail).length > 0 && orderDetail.city && orderDetail.district && orderDetail.city ?
                                   <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        style={{ width: "100%" }}
                                   >
                                        <Row gutter={[40]} justify="space-between">
                                             <Col xs={24} lg={14}>
                                                  <div style={{ flex: "0 0 60%", margin: "10px 0" }}>
                                                       <Flex gap={10}>
                                                            <Form.Item
                                                                 name="recipient"
                                                                 label="Họ tên người nhận"
                                                                 initialValue={orderDetail.customer_name}
                                                                 rules={[
                                                                      {
                                                                           required: true,
                                                                           message: "Vui lòng nhập họ tên"
                                                                      },
                                                                      {
                                                                           type: 'string',
                                                                           max: 50,
                                                                      },
                                                                 ]}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Input
                                                                      onChange={handleOrderChange}
                                                                      name="customer_name"
                                                                      placeholder="Họ tên người nhận" />

                                                            </Form.Item>
                                                            <Form.Item
                                                                 name="phone"
                                                                 label="Số điện thoại người nhận"
                                                                 initialValue={orderDetail.phone_number}
                                                                 rules={[
                                                                      {
                                                                           required: true,
                                                                           message: "Vui lòng nhập số điện thoại"
                                                                      },
                                                                      {
                                                                           validator: formValidator.vietnamesePhoneNumber
                                                                      }
                                                                 ]}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Input
                                                                      onChange={handleOrderChange}
                                                                      name="phone_number"
                                                                      placeholder="Số điện thoại người nhận" />

                                                            </Form.Item>
                                                       </Flex>
                                                       <Form.Item
                                                            name="email"
                                                            label="Email"
                                                            initialValue={orderDetail.email}
                                                            rules={[{
                                                                 validator: formValidator.email
                                                            }]}
                                                            style={{ flex: "1" }}
                                                       >
                                                            <Input
                                                                 onChange={handleOrderChange}
                                                                 name="email"
                                                                 placeholder="Enter Email" />

                                                       </Form.Item>
                                                       <Flex gap={10}>
                                                            <Form.Item
                                                                 name="city"
                                                                 label="Tỉnh/Thành Phố"
                                                                 initialValue={{
                                                                      label: orderDetail.city.ProvinceName,
                                                                      value: orderDetail.city.ProvinceID,
                                                                 }}
                                                                 rules={[
                                                                      {
                                                                           required: true,
                                                                           message: "Tỉnh/Thành Phố không được bỏ trống"
                                                                      }
                                                                 ]}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Select
                                                                      name="city"
                                                                      onChange={handleAddressChange}
                                                                      options={cities?.map((c) => ({ name: 'recipient_city', label: c.ProvinceName, value: c.ProvinceID }))}
                                                                 />
                                                            </Form.Item>
                                                            <Form.Item
                                                                 name="district"
                                                                 label="Quận/Huyện"
                                                                 initialValue={{
                                                                      label: orderDetail.district.DistrictName,
                                                                      value: orderDetail.district.DistrictName,
                                                                 }}
                                                                 rules={[
                                                                      {
                                                                           required: true,
                                                                           message: "Quận/Huyện không được bỏ trống"
                                                                      },
                                                                      {
                                                                           validator: formValidator.addressRequired
                                                                      }
                                                                 ]}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Select
                                                                      onChange={handleAddressChange}
                                                                      name="district"
                                                                      options={district?.map((dist) => ({ name: 'recipient_district', label: dist.DistrictName, value: dist.DistrictID }))}
                                                                 />

                                                            </Form.Item>
                                                            <Form.Item
                                                                 name="ward"
                                                                 label="Phường/Xã"
                                                                 initialValue={{
                                                                      label: orderDetail.ward.WardName,
                                                                      value: orderDetail.ward.WardCode,
                                                                 }}
                                                                 rules={[
                                                                      {
                                                                           required: true,
                                                                           message: "Phường/Xã không được bỏ trống"
                                                                      },
                                                                      {
                                                                           validator: formValidator.addressRequired
                                                                      }
                                                                 ]}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Select
                                                                      onChange={handleAddressChange}
                                                                      name="ward"
                                                                      options={ward?.map((ward) => ({ name: 'recipient_ward', label: ward.WardName, value: ward.WardCode }))}
                                                                 />

                                                            </Form.Item>
                                                       </Flex>
                                                       <Form.Item
                                                            name="detail"
                                                            label="Số nhà/Địa chỉ cụ thể"
                                                            initialValue={orderDetail.detail}
                                                            rules={[{
                                                                 required: true,
                                                                 message: "Vui lòng nhập địa chỉ cụ thể"
                                                            }]}
                                                            style={{ flex: "1" }}
                                                       >
                                                            <Input
                                                                 onChange={handleOrderChange}
                                                                 name="recipient_detail"
                                                                 placeholder="Địa chỉ" />

                                                       </Form.Item>
                                                       <Form.Item
                                                            name="note"
                                                            label="Ghi chú"
                                                            initialValue={orderDetail.note}
                                                            style={{ flex: "1" }}
                                                       >
                                                            <Input
                                                                 onChange={handleOrderChange}
                                                                 name="note"
                                                                 placeholder="Ghi chú" />

                                                       </Form.Item>
                                                  </div>
                                             </Col>
                                             <Col xs={24} lg={10}>
                                                  <Flex vertical gap={14} style={{ width: "100%" }}>
                                                       <div
                                                            style={{ background: "#e9edf5", padding: "10px", borderRadius: "5px" }}
                                                       >
                                                            <h3>Trạng thái đơn hàng</h3>
                                                            <hr />
                                                            <OrderStatusTimeLine data={orderStatusHistories} />
                                                       </div>
                                                  </Flex>
                                             </Col>
                                        </Row>
                                        <Row gutter={[40]} justify="space-between">
                                             <Col xs={24} lg={14}>
                                                  <div
                                                       style={{ background: "#e9edf5", padding: "10px", borderRadius: "5px", flex: '0 0 60%' }}
                                                  >
                                                       <Table
                                                            columns={productColumns}
                                                            dataSource={productData}
                                                            pagination={{
                                                                 pageSize: 3
                                                            }}
                                                       />
                                                  </div>
                                             </Col>
                                             <Col xs={24} lg={10}>
                                                  <div
                                                       style={{ background: "#e9edf5", padding: "10px", borderRadius: "5px", display: "flex", flexDirection: "column", gap: 5 }}
                                                  >
                                                       <div>
                                                            <strong>Thanh toán</strong>
                                                            <Flex gap={5} vertical>
                                                                 <span>Đơn hàng: <strong><FormatCurrency props={Number(order.total_money) + Number(order.money_reduce)} /></strong></span>

                                                                 <span>Vận chuyển: <strong><FormatCurrency props={order.money_ship} /></strong></span>
                                                                 <span>Giảm giá: <strong><FormatCurrency props={-((Number(order.total_money) + Number(order.money_reduce) + Number(order.money_ship)) - order.total_money)} /></strong></span>
                                                                 <Flex gap={5}>Tổng thanh toán :{
                                                                      order.payment_id === 101 && order.is_payment ?
                                                                           <Flex gap={5}>
                                                                                <div>
                                                                                     <strong><FormatCurrency props={0} /></strong>
                                                                                </div>
                                                                                <div style={{ textDecoration: "line-through" }}>
                                                                                     <FormatCurrency props={order.total_money} />
                                                                                </div>
                                                                           </Flex> :
                                                                           <strong><FormatCurrency props={order.total_money} /></strong>
                                                                 }</Flex>
                                                                 <span>Hình thức thanh toán: <strong>{orderDetail.payment.method} {order.payment_id === 2 && order.status_id === 1 && <>(Chưa thanh toán)</>}</strong></span>
                                                                 <div>
                                                                      Vận chuyển bởi: <strong>Giao hàng nhanh</strong>
                                                                 </div>
                                                            </Flex>
                                                       </div>
                                                  </div>
                                             </Col>
                                        </Row>
                                        <Form.Item
                                             style={{
                                                  marginTop: 10
                                             }}
                                        >
                                             {[5].includes(order.status_id) && "Đơn hàng đã được bàn giao cho đơn vị vận chuyển!"}
                                             <Flex gap={10}>
                                                  <Space gap={10}>
                                                       {
                                                            [100, 101, 102, 103].includes(order.status_id) && <>
                                                                 <Button type="primary" htmlType="submit">
                                                                      Cập nhật
                                                                 </Button>
                                                                 {
                                                                      [100].includes(order.status_id) && <>
                                                                           <Button onClick={handlePaymentOrder} type="primary">
                                                                                Thanh toán
                                                                           </Button></>
                                                                 }
                                                                 <Button onClick={handleDeleteOrder} type="primary" danger>
                                                                      Hủy đơn hàng
                                                                 </Button></>
                                                       }
                                                       {
                                                            [105].includes(order.status_id) &&
                                                            <Button type="primary" onClick={()=>handleReturnOrder()}>
                                                                 Trả hàng
                                                            </Button>
                                                       }
                                                  </Space>
                                             </Flex>
                                        </Form.Item>
                                   </Form>
                                   : <div className="mx-auto">Loading...</div>}

                         </div>
                    </div >
               </Modal >
          </>
     )
}

export default OrderDetail