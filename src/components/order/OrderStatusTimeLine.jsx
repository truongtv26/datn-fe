import { Flex, Timeline } from 'antd'
import React from 'react'
import FormatDate from '../../utils/FormatDate'

const OrderStatusTimeLine = ({ data }) => {
     return (
          <Flex gap={4} vertical style={{ maxHeight: 380, overflowY: 'scroll' }}>
               <Timeline
                    items={data.map(status => {
                         return {
                              children: <>
                                   <p><strong>{status.status.status}</strong></p>
                                   <p>{status.note}</p>
                                   <p><FormatDate date={status.created_at} /></p>
                              </>
                         }
                    })}
                    style={{ marginTop: 10 }}
               />
          </Flex>
     )
}

export default OrderStatusTimeLine