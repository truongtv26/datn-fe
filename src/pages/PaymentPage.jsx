import { Flex } from 'antd';
import React, { useEffect, useState } from 'react'
import instance from '../core/api';

let paymentCalled = false;

const PaymentPage = () => {

     const [isPayment, setIsPayment] = useState(false)
     const [paymentMessage, setPaymentMessage] = useState(null)
     const [countdown, setCountdown] = useState(5);
     useEffect(() => {
          if (!paymentCalled) {
               paymentCalled = true;

               const urlSearchParams = new URLSearchParams(window.location.search);
               const params = {};

               for (const [key, value] of urlSearchParams.entries()) {
                    params[key] = value;
               }

               instance.post('/checking-payment', params)
                    .then((res) => {
                         console.log(res);
                         if (res.status === 200) {
                              setIsPayment(true);
                              startCountdown();
                              setPaymentMessage(res.data.message)
                         } else {
                              setIsPayment(false);
                         }
                         setPaymentMessage(res.data.message)
                    })
                    .catch((err) => {
                         setPaymentMessage(err.data.message)
                    });
          }
     }, []);

     const startCountdown = () => {
          const timer = setInterval(() => {
               setCountdown((prev) => {
                    if (prev === 0) {
                         clearInterval(timer);
                         setIsPayment(false);
                         window.close()
                    }
                    return prev - 1;
               });
          }, 1000);
     };

     return (
          <div className="container mx-auto" style={{ width: "100vh", height: "100vh" }}>
               <Flex vertical justify='center' align='center' style={{ margin: "0 auto", height: "100%" }}>
                    <p style={{ fontWeight: "bold" }}>{isPayment ? paymentMessage : <>Chờ thanh toán</>}</p>
                    <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => window.close()}>Đóng</p>
                    { isPayment ? <p>Đóng trong {countdown} giây</p> : null }
               </Flex>

          </div>
     )
}

export default PaymentPage