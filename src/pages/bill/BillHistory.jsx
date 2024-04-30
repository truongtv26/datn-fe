import { ContainerOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd'
import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom';
import { InputNumber, Table, Typography } from "antd";
import instance from '../../core/api';
import FormatDate from '../../utils/FormatDate';
import FormatCurrency from '../../utils/FormatCurrency';
import DetailAddress from '../../components/DetailAddress';

const { Title } = Typography;

function BillHistory({ props }) {
  const { id } = useParams();

  const [bill, setBill] = useState([]);
  const [listBillDetail, setListBillDetail] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadBill = () => {
    instance
      .get(`/bill/${id}`)
      .then(({ data }) => {
        console.log(data);
        setBill(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const loadBillDetail = async () => {
    await instance.get(`/bill-detail/${id}`)
      .then(({ data }) => {
        console.log(data);
        setListBillDetail(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    loadBill();
    loadBillDetail();
  }, [id]);

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => (
        index + 1
      )
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <>
          <ul style={{ listStyleType: 'none' }}>
            <li style={{ fontWeight: 600 }}>
              {`${record.name} [${record.color} - ${record.size}]`}
            </li>
            <li>Đơn giá:
              <span style={{ color: 'red' }}> <FormatCurrency props={record.price} /></span>
            </li>
          </ul>
        </>
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <span style={{ textAlign: 'center' }}>
          {quantity}
        </span>
      )
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'quantity',
      key: 'total',
      render: (quantity, record) => (
        <span style={{ textAlign: 'center', color: 'red', fontWeight: 600 }}>
          <FormatCurrency props={(record.price * record.quantity)} />
        </span>
      )
    },
  ]

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      <Tooltip placement="top" title="In hóa đơn" >
        <Button type="primary" style={{ marginRight: '8px' }} onClick={handlePrint}><ContainerOutlined /></Button>
      </Tooltip >
      <Button type='primary' onClick={showModal} danger>
        Chi tiết
      </Button>
      <Modal title="Chi tiết" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="" width={700}>
        {props.map((item, index) => (
          <ul style={{ listStyleType: 'none' }}>
            <li>
              {item.note}
              <span style={{ float: 'right' }}>Nhân viên xác nhận: {item.created_by}</span>
            </li>
          </ul>
        ))}
      </Modal >

      {/* Hóa đơn  */}
      <div  style={{ display: 'none' }}>
        <div ref={printRef} style={{ padding: '20px' }}>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Title level={3}>F Shoes - Hóa Đơn Bán Hàng</Title>
            <Title level={4} style={{ color: 'red' }}>{bill.code}</Title>
          </div>
          <div>
            <p><span style={{ fontWeight: 'bold' }}>Ngày mua: </span><FormatDate date={bill.created_at} /> </p>
            <p><span style={{ fontWeight: 'bold' }}>Khách hàng: </span>{bill.customer_name}</p>
            <p><span style={{ fontWeight: 'bold' }}>Địa chỉ: </span> {bill.address ? (
              (() => {
                const addressString = bill.address;
                const addressParts = addressString.split('##');
                return (
                  <>
                    {addressParts[0]},
                    {addressParts[1] ? (
                      <DetailAddress prov={addressParts[3]} distr={addressParts[2]} war={addressParts[1]} />
                    ) : null}
                  </>
                );
              })()
            ) : null}</p>
            <p><span style={{ fontWeight: 'bold' }}>Số điện thoại : </span>{bill.phone_number}</p>

          </div>
          <div>
            <Title level={5} style={{ textAlign: 'center' }}>Danh sách sản phẩm khách hàng mua</Title>
            <Table
              pagination={false}
              columns={columns}
              rowSelection={bill.timeline === '6' && listBillDetail.return_products && listBillDetail.return_products.reduce((total, item) => total + (item.price * item.quantity), 0) == 0 ? rowSelection : null}
              dataSource={listBillDetail.variants ? listBillDetail.variants.map((item) => ({
                key: listBillDetail.bill_details.find((bill) => item.id === bill.variant_id)?.id,
                name: item.product.name,
                size: item.size.name,
                color: item.color.name,
                price: listBillDetail.bill_details.find((bill) => item.id === bill.variant_id)?.price,
                images: item.imageProducts,
                quantity: listBillDetail.bill_details.find((bill) => item.id === bill.variant_id)?.quantity,
                id: listBillDetail.bill_details.find((bill) => item.id === bill.variant_id)?.id,
              })) : []}
            />
          </div>
          <div>
            <ul style={{ listStyleType: 'none', marginTop: '12px' }}>
              <li className="mb-2" style={{ fontWeight: 'bold' }}>Tổng tiền:
                <span style={{ float: 'right', color: 'red' }}><FormatCurrency props={bill.total_money - bill.money_reduce} /></span>
                <del style={{ color: '#ccc' }}>
                  <span>  </span>
                  {bill.money_reduce != 0 ? (<FormatCurrency props={bill.total_money} />) : ''}
                </del>
              </li>
              {bill.type === 'delivery' && (
                <li className="mb-2" style={{ fontWeight: 'bold' }}>Phí vận chuyển: <span style={{ float: 'right', color: 'red' }}><FormatCurrency props={bill.money_ship} /></span></li>
              )}
              <li className="mb-2" style={{ fontWeight: 'bold' }}>Phải thanh toán: <span style={{ float: 'right', color: 'red' }}>{bill.type === 'delivery' ? <FormatCurrency props={Number(bill.money_ship) + Number(bill.total_money - bill.money_reduce)} />
                : <FormatCurrency props={bill.total_money - bill.money_reduce} />}</span></li>
              <li className="mb-2" style={{ fontWeight: 'bold' }}>Trạng thái đơn hàng: <span style={{ float: 'right', color: 'red' }}>
                {(() => {
                  switch (bill.timeline) {
                    case '1':
                      return "Tạo đơn hàng";
                    case '2':
                      return "Chờ xác nhận";
                    case '3':
                      return "Xác nhận thông tin thanh toán";
                    case '4':
                      return "Chờ giao";
                    case '5':
                      return "Đang giao";
                    case '6':
                      return "Hoàn thành";
                    case '7':
                      return "Hủy";
                    case '8':
                      return "Hoàn 1 phần";
                    default:
                      return "";
                  }
                })()}
              </span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default BillHistory