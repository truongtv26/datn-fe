import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { Typography } from 'antd';
import React from 'react'
import FormatDate from '../../../utils/FormatDate';
const { Title } = Typography;
const OrderTimeLineStatus = ({ billHistory }) => {
     console.log(billHistory);
     return (
          <Timeline minEvents={billHistory.length} placeholder >
               {
                    billHistory.map((item, index) => {
                         console.log(item);
                         return <TimelineEvent
                              color={item.status == '7' ? 'red' : "#2DC255"}
                              title={
                                   <Title level={5}>
                                        {(() => {
                                             switch (item.status_id) {
                                                  case 100:
                                                       return "Chờ thanh toán";
                                                  case 101:
                                                       return "Đang xử lý";
                                                  case 102:
                                                       return "Đặt hàng thành công";
                                                  case 103:
                                                       return "Đã xác nhận";
                                                  case 104:
                                                       return "Đang giao hàng";
                                                  case 105:
                                                       return "Giao hàng thành công";
                                                  case 106:
                                                       return "Giao hàng thất bại";
                                                  case 107:
                                                       return "Trả hàng";
                                                  case 108:
                                                       return "Hủy đơn hàng";
                                                  case 109:
                                                       return "Đặt hàng thất bại";
                                                  default:
                                                       console.log(typeof item.status_id);
                                                       return "";
                                             }
                                        })()}
                                   </Title>
                              }
                              subtitle={
                                   <>
                                        {item.note}
                                        <br />
                                        <FormatDate date={item.created_at} />
                                   </>
                              }

                         />
                    })
               }
          </Timeline>
     )
}

export default OrderTimeLineStatus