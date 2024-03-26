import { Flex } from 'antd';
import React, { useEffect, useState } from 'react'
import instance from '../core/api';

const PaymentPage = () => {

     const [isPayment, setIsPayment] = useState(false)
     useEffect(() => {
          const urlSearchParams = new URLSearchParams(window.location.search);
          const params = {};

          for (const [key, value] of urlSearchParams.entries()) {
               params[key] = value;
          }

          instance.post('/checking-payment', params)
               .then((res) => {
                    if (res.status === 200) {
                         setIsPayment(true)
                         setTimeout(()=>{
                              window.close()
                         }, 2000)
                    } else {
                         setIsPayment(false)
                    }
               })
               .catch((err) => {
                    console.log(err);
               })
     }, []);

     return (
          <div className="container mx-auto" style={{width: "100%", height: "100%"}}>
               <Flex vertical justify='center' align='center'>
                    {
                         isPayment ? <>Đơn hàng đã được thanh toán thành công</> : <>Chờ thanh toán</>
                    }
               </Flex>

          </div>
     )
}

export default PaymentPage