import { Button, Flex, Input, Select } from 'antd'
import React, { useState } from 'react'
import { useAppContext } from '../../../provider/AppProvider';
import instance from '../../../core/api';
import { toast } from 'react-toastify';

const Status = ({ bill, billStatus }) => {
     const [statusChange, setStatusChange] = useState({});
     const { user } = useAppContext();
     const onSelect = (value, target) => {
          setStatusChange({
               ...statusChange,
               [target.name]: target.value,
          })
      };

     const onInput = (event) => {
          setStatusChange({
               ...statusChange,
               [event.target.name]: event.target.value
          })
     }

     const onUpdate = () => {
          const data = {...statusChange, created_by: user.name}
          if (statusChange) {
               instance.patch('order/' + bill.id, data)
                    .then((res) => {
                         if (res.status === 200) {
                              toast.success("Cập nhật thành công")
                         }
                    })
          }
     }
     return (
          billStatus.length > 0 &&
          <Flex gap={10} align='end'>
               <div>
                    <p>Trạng thái đơn hàng <span style={{ color: "red" }}>*</span></p>
                    <Select
                         style={{ width: 200 }}
                         onChange={onSelect}
                         defaultValue={bill.status_id}
                         options={billStatus.map((status, index) => ({ key: index + 1, label: status.status, value: status.id, name: "status_id" }))}
                    />
               </div>
               <div>
                    <p>Chi tiết <span style={{ color: "red" }}>*</span></p>
                    <Input
                         name='note'
                         style={{ width: "400px" }}
                         onChange={onInput}
                    />
               </div>

               <Button
                    type='primary'
                    onClick={onUpdate}
               >
                    Cập nhật
               </Button>
          </Flex>
     )
}

export default Status