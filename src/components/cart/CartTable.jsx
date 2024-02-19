import { Button, Empty, Flex } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const CartTable = ({data}) => {

     console.log(data);

     return (
          <>
               {
                    Object.keys(data).length > 0 ?
                         <div style={{ width: "420px" }}>

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