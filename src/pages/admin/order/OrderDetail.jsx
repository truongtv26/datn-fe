import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../../../core/api';
import { HomeOutlined } from '@ant-design/icons';
import { Badge, Breadcrumb, Button, Col, Flex, Form, Input, Row, Select, Table, Timeline } from 'antd';
import { getCity, getDistrict, getWard } from '../../../services/shipping';
import { toast } from 'react-toastify';
import FormatCurrency from '../../../utils/FormatCurrency';
import OrderStatusTimeLine from '../../../components/order/OrderStatusTimeLine';

const OrderDetail = () => {
     const { id } = useParams();
     const VITE_URL = import.meta.env.VITE_URL;

     const [form] = Form.useForm();
     const [orderDetail, setOrderDetail] = useState({})
     const [orderChange, setOrderChange] = useState({})
     const [orderStatus, setOrderStatus] = useState([]);
     const [orderStatusHistories, setOrderStatusHistories] = useState([])
     const [statusSelected, setStatusSelected] = useState({})
     const [isUpdate, setIsUpdate] = useState(false)

     // trạng thái người gửi hàng
     const [depositor, setDepositor] = useState(
          {
               city: 201, cityName: 'Hà Nội',
               district: 3440, districtName: "Quận Nam Từ Liêm",
               ward: '13005', wardName: "Phường Mỹ Đình 2",
               detail: "92"
          })

     const [cities, setCities] = useState([]);
     const [district, setDistrict] = useState([]);
     const [ward, setWard] = useState([]);


     useEffect(() => {
          instance.get(`admin/order/${id}/edit`)
               .then(({ data }) => {
                    const order = data;
                    setOrderDetail(data)
                    //city
                    getCity()
                         .then(({ data }) => {
                              setCities(data)
                              const city = data.filter(c => c.ProvinceID == order.recipient_city)[0]
                              // district
                              getDistrict(Number(city.ProvinceID))
                                   .then(({ data }) => {
                                        const district = data.filter(d => d.DistrictID === Number(order.recipient_district))[0]
                                        setDistrict(data)

                                        //ward
                                        getWard(Number(order.recipient_district))
                                             .then(({ data }) => {
                                                  const ward = data.filter(w => w.WardCode === order.recipient_ward)[0]
                                                  setWard(data)
                                                  setOrderDetail({
                                                       ...order,
                                                       city,
                                                       district,
                                                       ward
                                                  })
                                             })
                                   })
                         })
               })
     }, [])

     //
     useEffect(() => {
          instance.get('/admin/order-status')
               .then(({ data }) => {
                    const newStatus = data.filter(status => status.id !== 11)
                    setOrderStatus([
                         ...orderStatus,
                         ...newStatus.map((status, index) => ({ key: index + 1, label: status.status, value: status.id }))
                    ])
               })
     }, [isUpdate])

     // lấy lịch sử trạng thái đơn hàng
     useEffect(() => {
          instance.post('status-history', { order_id: id })
               .then(({ data }) => {
                    setOrderStatusHistories(data)
               })
     }, [isUpdate])

     const onStatusSelected = (_, target) => {
          setStatusSelected(target)
     }

     const handleOrderChange = (value, target) => {
     }

     const handleAddressChange = (value, target) => {
     }

     // cập nhật lịch sử trạng thái đơn hàng
     const updateOrderStatusHistory = () => {
          const orderStatusHistory = {
               order_id: orderDetail.id,
               status_id: statusSelected.value ?? orderDetail.status_id,
               note: orderChange.note
          }
          if (orderStatusHistory.order_id && orderStatusHistory.status_id) {
               if (orderDetail.status_id > orderStatusHistory.status_id) {
                    toast.error("Không thể cập nhật ngược trạng thái đơn hàng!")
               } else {
                    instance.post('update-status-history', orderStatusHistory)
                         .then((res) => {
                              setIsUpdate(!isUpdate)

                              // Kiểm tra trạng thái đơn hàng trước đó và cập nhật nếu có thay đổi
                              if (orderStatusHistory.status_id !== orderDetail.status_id) {
                                   instance.patch(`admin/order/${id}`, { status_id: orderStatusHistory.status_id })
                                        .then((data) => {
                                             // console.log(data);
                                        })
                              }
                              res.status === 201 && toast.success('Cập nhật thành công!')
                         })
               }
          } else {
               toast.error('Cập nhật thất bại!')
          }

     }

     const columns = [
          {
               title: 'Ảnh',
               dataIndex: 'image',
               key: 'image',
               render: (_, record) => <img src={record.image} alt="Product" style={{ width: '40px', height: '40px' }} />,
          },
          {
               title: 'Sản phẩm',
               dataIndex: 'name',
               key: 'name',
               render: (_, record) => {

                    return (
                         <>
                              <p style={{
                                   fontSize: "12px",
                                   display: '-webkit-box',
                                   WebkitBoxOrient: 'vertical',
                                   overflow: 'hidden',
                                   WebkitLineClamp: 2,
                                   textOverflow: 'ellipsis'
                              }}>
                                   {record.name}
                              </p>
                              <Flex gap={10}>
                                   {record.color} - {record.size}
                                   <hr />
                                   <div>
                                        SL: {record.quantity}
                                   </div>
                                   <hr />
                                   <div>
                                        <Flex gap={4}>
                                             {record.promotion !== null ? <>
                                                  {FormatCurrency(record.quantity * record.unit_price)}
                                                  -
                                                  <div style={{ textDecoration: "line-through" }}>{FormatCurrency((record.quantity * record.unit_price) / (1 - (record.promotion.value / 100)))}</div>
                                                  <Badge count={`-${record.promotion.value}%`} />
                                             </> : FormatCurrency(record.unit_price * record.quantity)}
                                        </Flex>
                                   </div>
                              </Flex>
                         </>
                    )
               }
          }

     ];

     const orderData = orderDetail.details?.map((order, index) => {
          return {
               key: index,
               image: VITE_URL + 'storage/' + order.variant.images[0]?.folder + '/' + order.variant.images[0]?.url,
               name: order.name,
               color: order.variant.color.name,
               size: order.variant.size.name,
               quantity: order.quantity,
               unit_price: order.unit_price,
               promotion: order?.promotion
          }
     })

     // validate
     const onFinish = () => {

     };

     const onFinishFailed = () => {
          toast.error("Vui lòng kiểm tra lại thông tin!")
     };

     return (
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
                         ]}
                    />
               </div>

               <div className="content-cart">
                    <Form
                         form={form}
                         layout="vertical"
                         onFinish={onFinish}
                         onFinishFailed={onFinishFailed}
                         style={{ width: "100%" }}
                    >
                         <Row gutter={[40]} justify="space-between">
                              <Col xs={24} lg={14}>
                                   {
                                        Object.keys(orderDetail).length > 0 && orderDetail.city && orderDetail.district && orderDetail.city ?
                                             <>
                                                  <div
                                                       style={{ background: "#e9edf5", padding: "10px", borderRadius: "5px", display: "flex", flexDirection: "column", gap: 5 }}
                                                  >
                                                       <div>
                                                            <strong>Thanh toán</strong>
                                                            <Flex gap={5} vertical>
                                                                 <span>Đơn hàng: <strong>{FormatCurrency(orderDetail.details.reduce((sum, item) => {
                                                                      return sum + (item.unit_price * item.quantity)
                                                                 }, 0))}</strong></span>

                                                                 <span>Vận chuyển: <strong>{FormatCurrency(orderDetail.shipping_cost)}</strong></span>
                                                                 <span>Tổng thanh toán : {orderDetail.is_payment === 1 ?
                                                                      <>
                                                                           <strong>{FormatCurrency(0)}</strong>-
                                                                           <span style={{textDecoration: 'line-through'}}>{FormatCurrency(orderDetail.shipping_cost + orderDetail.details.reduce((sum, item) => {
                                                                                return sum + (item.unit_price * item.quantity)
                                                                           }, 0))}</span>
                                                                      </> :
                                                                      <></>}</span>
                                                                 <span>Hình thức thanh toán: <strong>{orderDetail.payment.method} ({orderDetail.is_payment === 1 ? "Đã thanh toán" : "Chờ thanh toán"})</strong></span>
                                                            </Flex>
                                                       </div>
                                                       <hr />
                                                       <div>
                                                            <strong>Vận chuyển</strong>
                                                            <Flex gap={5} vertical>
                                                                 <span>Từ: <strong>{depositor?.detail} - {depositor?.wardName} - {depositor?.districtName} - {depositor?.cityName}</strong></span>
                                                                 <span>Tới: <strong>{orderDetail?.recipient_detail} - {orderDetail?.ward?.WardName} - {orderDetail?.district?.DistrictName} - {orderDetail?.city?.ProvinceName}</strong></span>
                                                            </Flex>
                                                            <div>
                                                                 Vận chuyển bởi: <strong>Giao hàng nhanh</strong>
                                                            </div>
                                                       </div>
                                                       <hr />
                                                       <div>
                                                            <Table
                                                                 columns={columns}
                                                                 dataSource={orderData}
                                                                 pagination={{
                                                                      pageSize: 4,
                                                                 }}
                                                            />
                                                       </div>
                                                  </div>
                                                  <div style={{ flex: "0 0 60%", margin: "10px 0" }}>
                                                       <Flex gap={10}>
                                                            <Form.Item
                                                                 name="recipient"
                                                                 label="Họ tên người nhận"
                                                                 initialValue={orderDetail.recipient_name}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Input disabled name="recipient" placeholder="Họ tên người nhận" />

                                                            </Form.Item>
                                                            <Form.Item
                                                                 name="phone"
                                                                 label="Số điện thoại người nhận"
                                                                 initialValue={orderDetail.recipient_phone}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Input disabled name="phone" placeholder="Số điện thoại người nhận" />

                                                            </Form.Item>
                                                       </Flex>
                                                       <Form.Item
                                                            name="email"
                                                            label="Email"
                                                            initialValue={orderDetail.recipient_email}
                                                            style={{ flex: "1" }}
                                                       >
                                                            <Input disabled name="email" placeholder="Enter Email" />

                                                       </Form.Item>
                                                       <Flex gap={10}>
                                                            <Form.Item
                                                                 name="city"
                                                                 label="Tỉnh/Thành Phố"
                                                                 initialValue={{
                                                                      label: orderDetail.city.ProvinceName,
                                                                      value: orderDetail.city.ProvinceID,
                                                                 }}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Select
                                                                      disabled
                                                                      name="city"
                                                                      onChange={handleAddressChange}
                                                                      options={cities?.map((c) => ({ label: c.ProvinceName, value: c.ProvinceID }))}
                                                                 />
                                                            </Form.Item>
                                                            <Form.Item
                                                                 name="district"
                                                                 label="Quận/Huyện"
                                                                 initialValue={{
                                                                      label: orderDetail.district.DistrictName,
                                                                      value: orderDetail.district.DistrictName,
                                                                 }}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Select
                                                                      disabled
                                                                      name="district"
                                                                      options={district?.map((dist) => ({ label: dist.DistrictName, value: dist.DistrictID }))}
                                                                 />

                                                            </Form.Item>
                                                            <Form.Item
                                                                 name="ward"
                                                                 label="Phường/Xã"
                                                                 initialValue={{
                                                                      label: orderDetail.ward.WardName,
                                                                      value: orderDetail.ward.WardCode,
                                                                 }}
                                                                 style={{ flex: "1" }}
                                                            >
                                                                 <Select
                                                                      disabled
                                                                      name="ward"
                                                                      options={ward?.map((ward) => ({ label: ward.WardName, value: ward.WardCode }))}
                                                                 />

                                                            </Form.Item>
                                                       </Flex>
                                                       <Form.Item
                                                            name="detail"
                                                            label="Số nhà/Địa chỉ cụ thể"
                                                            initialValue={orderDetail.recipient_detail}
                                                            style={{ flex: "1" }}
                                                       >
                                                            <Input disabled name="detail" placeholder="Địa chỉ" />

                                                       </Form.Item>
                                                       <Form.Item
                                                            name="note"
                                                            label="Ghi chú"
                                                            initialValue={orderDetail.recipient_note}
                                                            style={{ flex: "1" }}
                                                       >
                                                            <Input disabled name="note" placeholder="Ghi chú" />

                                                       </Form.Item>
                                                  </div>
                                             </> : <Flex justify='center' align='center'>Loading...</Flex>
                                   }
                              </Col>

                              <Col xs={24} lg={10}>
                                   <div style={{ width: "100%" }}>
                                        <div
                                             style={{ background: "#e9edf5", padding: "10px", borderRadius: "5px" }}
                                        >
                                             <Flex gap={4} vertical>
                                                  <p>Trạng thái đơn hàng</p>
                                                  {
                                                       Object.keys(orderStatus).length > 0 ?
                                                            <>
                                                                 <Select
                                                                      defaultValue={orderDetail.status_id}
                                                                      onChange={onStatusSelected}
                                                                      style={{ width: 200 }}
                                                                      options={orderStatus}
                                                                 />
                                                                 <p>Chi tiết</p>
                                                                 <Input
                                                                      name='note'
                                                                      onChange={(event) =>{
                                                                           if (event.target.value.length > 0) {
                                                                                setOrderChange({ ...orderChange, note: event.target.value })
                                                                           }
                                                                      }}
                                                                 />

                                                                 <Button
                                                                      type='primary'
                                                                      disabled={[1, 2, 9, 10].includes(orderDetail.status_id)}
                                                                      onClick={()=>{
                                                                           if (orderDetail.status_id !== 1 && orderChange?.note?.length > 0) {
                                                                                updateOrderStatusHistory()
                                                                           } else {
                                                                                toast.error("Vui lòng nhập thông tin chi tiết")
                                                                           }
                                                                      }}
                                                                 >
                                                                      {orderDetail.status_id !== 1 ? 'Cập nhật' : 'Đơn hàng này chưa thanh toán'}
                                                                 </Button>
                                                                 <p>Lịch sử trạng thái</p>
                                                                 <OrderStatusTimeLine data={orderStatusHistories}/>
                                                            </>
                                                            : <Flex justify='center' align='center'>Loading...</Flex>
                                                  }
                                             </Flex>
                                        </div>
                                   </div>
                              </Col>
                         </Row>
                    </Form>
               </div>
          </div >
     )
}

export default OrderDetail