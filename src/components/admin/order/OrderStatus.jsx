import { Badge } from 'antd'
import React from 'react'

const OrderStatus = ({ data }) => {
     return (
          // vàng
          [1,2,3,8].includes(data.status_id) ? <Badge count={data.status} style={{ backgroundColor: '#f2d916' }}></Badge> :
          // đỏ
          [7,9,10].includes(data.status_id) ? <Badge count={data.status} style={{ backgroundColor: '#fa1919' }}></Badge> :
          // xanh
          <Badge count={data.status} style={{ backgroundColor: '#02f54b' }}></Badge>
     )
}

export default OrderStatus