import { ContainerOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd'
import React from 'react'
import { useState } from 'react';

function BillHistory({ props }) {
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
  return (
    <>

      <Tooltip placement="top" title="In hóa đơn" >
        <Button type="primary" style={{marginRight: '8px'}} ><ContainerOutlined /></Button>
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
      </Modal>
    </>
  )
}

export default BillHistory