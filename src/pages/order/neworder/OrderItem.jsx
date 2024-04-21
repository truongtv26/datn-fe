import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Carousel, Col, Divider, Empty, Form, Input, InputNumber, Modal, Row, Spin, Switch, Table, Tooltip, Typography } from "antd";
import ShowProductModal from './ShowProductModal';
import instance from '../../../core/api';
import { CloseOutlined, CreditCardOutlined, DeleteOutlined, DollarOutlined, PictureFilled } from '@ant-design/icons';
import FormatCurrency from '../../../utils/FormatCurrency';
import { toast } from 'react-toastify';
import CustomerInfo from './CustomerInfo';
import ChooseVoucher from './ChooseVoucher';
import GHNInfo from '../../../components/GhnInfo';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
const { Title } = Typography;
const OrderItem = ({ props, onSuccess, createNewOrder }) => {
  const [loading, setLoading] = useState(true);
  const [listOrderDetail, setListOrderDetail] = useState([]);

  const [customer, setCustomer] = useState(null);
  const [totalMoney, setTotalMoney] = useState(0);

  const [typeOrder, setTypeOrder] = useState(0);

  const [voucher, setVoucher] = useState(null);
  const [moneyReduce, setMoneyReduce] = useState(0);

  const [feeShip, setFeeShip] = useState(0);
  const [form] = Form.useForm();
  const [autoFillAddress, setAutoFillAddress] = useState([]);

  const [tienKhachDua, setTienKhachDua] = useState(0);
  const [extraMoney, setExtraMoney] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState(0);
  const [note, setNote] = useState("");

  const loadListOrderDetail = async () => {
    setLoading(true);
    await instance.get(`/bill-detail`, {
      params: {
        id: props.id,
      }
    }).then(({ data }) => {
      setListOrderDetail(data);
      const calculatedTotalMoney = data.bill_details.reduce((total, item) => {
        return (total + item.quantity * item.price) - moneyReduce;
      }, 0);
      setTotalMoney(calculatedTotalMoney);
      setLoading(false);
    })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleChangeQuantity = (id, quantity) => {
    instance.put(`/bill-detail/${id}`, {
      quantity: Number(quantity)
    }).then(({ data }) => {
      toast.success(data);
      loadListOrderDetail();
    }).catch(e => {
      console.log(e);
      toast.error(e.response.data);
    })
  }
  const handleDeleteBillDetail = (id) => {
    Modal.confirm({
      title: "Xác nhận",
      maskClosable: true,
      content: "Xác nhận xóa khỏi giỏ hàng ?",
      okText: "Ok",
      cancelText: "Cancel",
      onOk: () => {
        instance.delete(`/bill-detail/${id}`).then(({ data }) => {
          toast.success(data);
          loadListOrderDetail();
        }).catch(e => {
          console.log(e);
          toast.error(e.response.data);
        })
      },
    });
  }
  const getCustomer = async (id) => {
    const customerData = await instance.get(`/customer/${id}`);
    setCustomer(customerData.data);
    setAutoFillAddress(customerData.data);
  };

  const handleSelectCustomer = (value) => {
    getCustomer(value);
  };

  const handleDeleteCustomer = () => {
    setCustomer(null);
    setAutoFillAddress([]);
    setTypeOrder(0);
  };

  useEffect(() => {
    loadListOrderDetail();
  }, [props])

  useEffect(() => {
    if (voucher !== null) {
      if (totalMoney < voucher.min_bill_value) {
        toast.error("Không đủ điều kiện!")
        setVoucher(null);
        setMoneyReduce(0)
      } else {
        toast.success("Áp dụng thành công!")
        setMoneyReduce(totalMoney / 100 * voucher?.value);
      }
    }
  }, [voucher])

  useEffect(() => {
    if (autoFillAddress !== null && typeof autoFillAddress === 'object' && !Array.isArray(autoFillAddress)) {
      caculateFee();
      form.setFieldsValue({
        name: autoFillAddress.name,
        phoneNumber: autoFillAddress.phone_number,
        specificAddress: autoFillAddress.specific_address,
        province: parseInt(autoFillAddress.province),
        district: parseInt(autoFillAddress.district),
        ward: autoFillAddress.ward
      })
    }
  }, [autoFillAddress]);


  const caculateFee = async () => {
    try {
      const response = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
          service_id: 53321,
          service_type_id: null,
          to_district_id: Number(autoFillAddress.district),
          to_ward_code: autoFillAddress.ward,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          from_district_id: 3440,
        },
        {
          headers: {
            'Token': 'e81513ff-d137-11ee-9414-ce214539f696',
            'ShopId': 4909460,
          },
        }
      );
      setFeeShip(response.data.data.total);
    } catch (error) {
      console.error("Error while calculating fee:", error);
      // Handle error here, such as showing an error message to the user
    }
  };

  const handleCreate = () => {
    const data = {};
    data.voucher = voucher === null ? null : voucher.id;
    data.customer = customer === null ? null : customer.id;
    data.type = typeOrder;
    data.customerName = customer !== null ? customer?.name : "Khách hàng lẻ";
    data.totalMoney = totalMoney;
    data.moneyReduce = moneyReduce;
    data.note = note;
    data.paymentMethod = paymentMethod;
    if (listOrderDetail.length === 0) {
      toast.error("Hãy thêm gì đó vào giỏ hàng!");
    } else {
      let confirmTitle = "Xác nhận";
      let confirmContent = "Xác nhận tạo hóa đơn?";
      let confirmOkText = "Ok";

      if (typeOrder === 0) {
        if (paymentMethod === 1 || (extraMoney !== null && extraMoney >= 0)) {
          data.timeline = 6; //hoàn thành
          if (paymentMethod === 1) {
            confirmTitle = "Xác nhận thanh toán";
            confirmContent = "Xác nhận thanh toán và tạo hóa đơn?";
          }
          Modal.confirm({
            title: confirmTitle,
            maskClosable: true,
            content: confirmContent,
            okText: confirmOkText,
            cancelText: "Cancel",
            onOk: () => {
              updateBill(data);
            },
          });
        } else {
          toast.error("Vui lòng nhập đủ tiền khách đưa!");
          return;
        }
      } else {
        data.phoneNumber = autoFillAddress.phone_number;
        data.address = typeOrder === 0 ? null : `${autoFillAddress.specific_address}##${autoFillAddress.ward}##${autoFillAddress.district}##${autoFillAddress.province}`;
        data.moneyShip = feeShip;
        data.email = autoFillAddress.email;
        data.timeline = 4; //chờ giao
        Modal.confirm({
          title: confirmTitle,
          maskClosable: true,
          content: confirmContent,
          okText: confirmOkText,
          cancelText: "Cancel",
          onOk: () => {
            updateBill(data);
          },
        });
      }
    }

    function updateBill(data) {
      instance.put(`/bill/${props.id}`, data)
        .then(({ data }) => {
          if (data.url) {
            window.location.href = data.url
          } else {
            toast.success(data);
            onSuccess();
            createNewOrder();
          }
        })
        .catch(e => {
          console.error("Error redirecting:", e); // Error handling: Log any errors
        });
    }



  }
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render(x, record, index) {
        return index + 1;
      }
    },
    {
      title: <PictureFilled />,
      dataIndex: 'images',
      key: 'images',
      render(x, record) {
        const carouselKey = record.images.map((image) => image.imageGallery.id).join('-');

        return (
          <div style={{ display: 'flex' }}>
            {record.images.length > 0 ? (
              <div style={{ position: 'relative', marginRight: '8px' }}>
                <Carousel key={carouselKey} autoplay autoplaySpeed={3000} dots={false} arrows={false} style={{ width: "100px", position: "relative" }}>
                  {record.images.map((image, index) => (
                    <div key={image.imageGallery.id}>
                      <img src={image.imageGallery.url} alt={`Image ${index + 1}`} style={{ width: "100px", height: "100px", objectFit: 'cover' }} />
                    </div>
                  ))}
                </Carousel>
                {record.discountPercent !== undefined && record.discountPercent.status === 'happenning' && (
                  <Badge count={`-${record.discountPercent.value}%`} style={{ position: 'absolute', bottom: 100, right: -10 }}>
                  </Badge>
                )}
              </div>
            ) : (
              <span style={{ marginRight: '8px', width: "100px", height: "100px" }}>Không có ảnh</span>
            )}
          </div>
        );
      }
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (x, record) => (
        <>
          <ul style={{ listStyleType: 'none' }}>
            <li style={{ fontWeight: 'bold' }}>{record.name}</li>
            <li><small>Màu: {record.color}</small></li>
            <li><small>Size: {record.size}</small></li>
            <li><small>Đơn giá: <span style={{ color: 'red' }}><FormatCurrency props={record.price} /></span></small></li>
          </ul>
        </>
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (x, record) => (
        <Form key={record.id}>
          <Form.Item initialValue={record.quantity} name={"quantity"} className="m-0 p-0">
            <Input type="number" style={{ width: "64px" }} onChange={(e) => handleChangeQuantity(record.id, e.target.value)} min={1} />
          </Form.Item>
        </Form>
      )
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (x, record) => {
        const calculateTotal = () => {
          if (record.discountPercent !== undefined && record.discountPercent.status === 'happenning') {
            return record.discountPrice * record.quantity;
          } else {
            return record.price * record.quantity;
          }
        }
        return (
          <span style={{ textAlign: 'center', color: 'red', fontWeight: 6000 }}>
            <FormatCurrency props={calculateTotal()} />
          </span>
        );
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'id',
      key: 'action',
      render: (id, record) => (
        <>
          <Tooltip placement="top" title="Xóa">
            <Button onClick={() => handleDeleteBillDetail(id)} type="primary" danger style={{ marginRight: '4px' }}><DeleteOutlined /></Button>
          </Tooltip>
        </>
      )
    },
  ]
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <Title level={5}>Đơn hàng {props.code}</Title>
        </div>
        <div style={{ marginRight: '4px' }}>
          <ShowProductModal idBill={props.id} onClose={() => { loadListOrderDetail() }} />
        </div>
      </div>
      <div style={{ boxShadow: "2px 2px 4px 4px rgba(0, 0, 0, 0.03)", marginY: "12px", padding: '8px' }}>
        <Title level={5}>Giỏ hàng</Title>
        {listOrderDetail.length === 0 ? <Empty description={"Chưa có sản phẩm"} style={{ paddingY: '20px' }} /> : (
          <>
            <Spin spinning={loading}>
              <Table dataSource={listOrderDetail.variants.map((item, index) => ({
                id: listOrderDetail.bill_details.find(
                  (bill_detail) => bill_detail.variant_id === item.id
                ).id,
                images: item.imageProducts,
                name: item.product.name,
                color: item.color.name,
                size: item.size.name,
                quantity: listOrderDetail.bill_details.find(
                  (bill_detail) => bill_detail.variant_id === item.id
                ).quantity,
                price: item.price,
                discountPrice: listOrderDetail.bill_details.find(
                  (bill_detail) => bill_detail.variant_id === item.id
                ).price,
                discountPercent: item.promotion[0],
              }))} columns={columns} className="mt-3"
                loading={loading}
                pagination={5} />
            </Spin>
          </>
        )}
      </div>
      <div style={{ boxShadow: "2px 2px 4px 4px rgba(0, 0, 0, 0.03)", marginY: '12px' }}>
        <div style={{ display: 'flex', marginY: '8px' }}>
          <div style={{ flexGrow: 1 }}>
            <Title level={5}>Thông tin khách hàng</Title>
          </div>
          {customer !== null && <Button style={{ marginRight: '4px' }} type="text" onClick={() => handleDeleteCustomer()}>
            {customer?.name}
            <Tooltip title="Loại bỏ khách hàng">
              <CloseOutlined />
            </Tooltip>
          </Button>}
          <div className="">
            <CustomerInfo handleSelect={handleSelectCustomer} />
          </div>
        </div>
        <Divider style={{ marginBottom: '12px' }} />
        <Row gutter={10}>
          <Col xl={12}>
            <ul style={{ listStyleType: 'none' }}>
              <li style={{ marginBottom: '8px' }}>Tên khách hàng: <span style={{ textAlign: 'right', fontWeight: 600 }}>{customer === null ? 'Khách hàng lẻ' : customer?.name}</span></li>
              {customer !== null && (
                <>
                  <li style={{ marginBottom: '8px' }}>Email: <span style={{ textAlign: 'right', fontWeight: 600 }}>{customer?.email}</span></li>
                  <li style={{ marginBottom: '8px' }}>Số điện thoại: <span style={{ textAlign: 'right', fontWeight: 600 }}>{customer?.phone_number}</span></li>
                </>
              )}
            </ul>
          </Col>
        </Row>
      </div>
      <div style={{ boxShadow: "2px 2px 4px 4px rgba(0, 0, 0, 0.03)" }} className="my-3 p-2 mt-4">
        <div className="d-flex">
          <div className="flex-grow-1">
            <Title level={5}>Thông tin thanh toán</Title>
          </div>
        </div>
        <Divider className="m-0 mb-3" />
        <Row gutter={10}>
          <Col xl={14}>
            {typeOrder === 0 ? '' : (
              <>
                <Form layout="vertical" form={form} onFinish={(data) => console.log(data)}>
                  <Row gutter={10}>
                    <Col xl={8}>
                      <Form.Item label="Họ và tên" required name={"name"} initialValue={autoFillAddress.name}>
                        <Input placeholder="Nhập họ và tên..." />
                      </Form.Item>
                    </Col>
                    <Col xl={8}>
                      <Form.Item label="Số điện thoại" required name={"phone_number"} initialValue={autoFillAddress.phone_number}>
                        <Input placeholder="Nhập số điện thoại..." />
                      </Form.Item>
                    </Col>
                    <Col xl={8}>
                      <Form.Item label="Email" required name={"email"} initialValue={autoFillAddress.email}>
                        <Input placeholder="Nhập email..." />
                      </Form.Item>
                    </Col>
                    <GHNInfo distr={autoFillAddress.district} prov={autoFillAddress.province} war={autoFillAddress.ward} />
                    <Col xl={16}>
                      <Form.Item label="Địa chỉ cụ thể" name={"specific_address"} initialValue={autoFillAddress.specific_address}>
                        <Input placeholder="Nhập địa chỉ cụ thể ..." />
                      </Form.Item>
                    </Col>
                    <Col xl={8}>
                      <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png"
                        alt=""
                        width={"100%"}
                      />
                    </Col>
                  </Row>
                </Form>
              </>
            )}
          </Col>
          <Col xl={10} md={24}>
            <ul style={{ listStyleType: 'none' }}>
              <li style={{ marginBottom: '8px' }}>
                {customer !== null && <><Switch onChange={(value) => {
                  setTypeOrder(value ? 1 : 0)
                }} /> Giao hàng</>}
              </li>
              <Row gutter={10}>
                <ChooseVoucher onSelectVoucher={(voucher) => setVoucher(voucher)} userId={customer ? customer.id : ''} />
              </Row>
              <li style={{ marginBottom: '8px' }}>Tạm tính: <span style={{ float: 'right', fontWeight: 600 }}><FormatCurrency props={totalMoney} /></span></li>
              {typeOrder === 1 && <li style={{ marginBottom: '8px' }}>Phí vận chuyển: <span style={{ float: 'right', fontWeight: 600 }}><FormatCurrency props={feeShip} /></span></li>}
              <li style={{ marginBottom: '8px' }}>Giảm giá: <span style={{ float: 'right', fontWeight: 600 }}><FormatCurrency props={moneyReduce} /></span></li>
              {voucher !== null && (
                <li style={{ marginBottom: '8px' }}>
                  <Tooltip>
                    <Alert message={
                      <>
                        Áp dụng thành công Voucher "{voucher?.name}"
                        <span className="float-end text-danger" style={{ float: 'right', color: 'red' }} onClick={() => {
                          setVoucher(null);
                          setMoneyReduce(0);
                        }}>
                          <Tooltip title="Bỏ chọn Voucher" >
                            <CloseOutlined />
                          </Tooltip>
                        </span>

                      </>}
                      type="success" />
                  </Tooltip>
                </li>
              )}
              <li style={{ marginBottom: '8px' }}>Tổng tiền: <span style={{ float: 'right', fontWeight: 600, color: 'red' }}><FormatCurrency props={totalMoney - moneyReduce + (typeOrder === 1 ? feeShip : 0)} /></span></li>
              {typeOrder === 0 && (
                <>
                  <li style={{ marginBottom: '8px' }}>
                    {paymentMethod == 0 ? <InputNumber
                      style={{ marginBottom: '8px', width: '100%' }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        value !== null && value !== undefined
                          ? value.replace(/\$\s?|(,*)/g, "")
                          : ""
                      }
                      controls={false}
                      min={0}
                      // suffix="VNĐ"
                      placeholder="Nhập tiền khách đưa..."
                      onChange={(e) => { setExtraMoney(e - totalMoney + moneyReduce); setTienKhachDua(e) }}
                    /> : ''}

                    {paymentMethod == 0 && totalMoney > 0 && <Alert message={tienKhachDua < totalMoney - moneyReduce ? "Vui lòng nhập đủ tiền khách đưa!" : "Khách đã đưa đủ tiền!"} type={tienKhachDua < totalMoney - moneyReduce ? "error" : "success"} />}
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    {paymentMethod === 0 && (
                      <>
                        Tiền thừa:
                        <span style={{ float: 'right', color: 'red', fontWeight: 600 }}>
                          <FormatCurrency props={extraMoney < 0 || extraMoney === null ? 0 : extraMoney} />
                        </span>
                      </>
                    )}
                  </li>
                </>
              )}
              <li style={{ marginBottom: '8px', textAlign: 'center' }}>
                <Row gutter={10}>
                  <Col xl={12} onClick={() => setPaymentMethod(0)}>
                    <div
                      style={{
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        border: '4px solid',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: paymentMethod === 0 ? '#ffc107' : '#ccc'
                      }}>
                      <DollarOutlined style={{ paddingRight: '8px' }} />
                      <span style={{ fontWeight: 600 }}>Tiền mặt</span>
                    </div>
                  </Col>
                  <Col xl={12} onClick={() => setPaymentMethod(1)}>
                    <div
                      style={{
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        border: '4px solid',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: paymentMethod === 1 ? '#ffc107' : '#ccc'
                      }}>
                      <CreditCardOutlined style={{ paddingRight: '8px' }} />
                      <span style={{ fontWeight: 600 }}>Chuyển khoản</span>
                    </div>
                  </Col>
                </Row>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <TextArea placeholder="Nhập ghi chú..." onChange={(e) => setNote(e.target.value)} />
              </li>
              <li>
                <Button type="primary" style={{ width: '100%' }} onClick={() => handleCreate()}>Tạo hóa đơn</Button>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default OrderItem