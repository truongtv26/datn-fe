import React, { useState } from 'react';
import { Button, Modal, Input  } from 'antd';
const ReturnProduct = ({handleCreateReturnProduct}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleCreateReturnProduct(reason)
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value); 
  };
  return (
    <>
    
      <Button type="primary" onClick={showModal}>Trả hàng</Button>
      <Modal title="Xác nhận trả hàng?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p style={{marginBottom: '12px'}}>Sản phẩm bạn lựa chọn sẽ được hoàn trả</p>
        <Input placeholder="Lí do hoàn trả" value={reason} onChange={handleReasonChange} required />
      </Modal>
    </>
  );
};
export default ReturnProduct;