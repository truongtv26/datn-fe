import React, { useState } from 'react';
import { Button, Modal, Input  } from 'antd';
const ReturnProduct = ({selectedRowKeysLength}) => {
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
    
      <Button type="primary" onClick={showModal}>Trả hàng</Button>
      <Modal title="Xác nhận trả hàng?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p style={{marginBottom: '12px'}}>Sản phẩm bạn lựa chọn sẽ được hoàn trả</p>
        <Input placeholder="Lí do hoàn trả" />
      </Modal>
    </>
  );
};
export default ReturnProduct;