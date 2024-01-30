import React, { useState } from 'react';
import { Button, Form, Input, Modal, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import instance from '../../../core/api';
import { toast } from 'react-toastify';
const EditProductModal = ({ props, onSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (data) => {
        instance.put(`/product/${props.id}`, data).then((response) => {
            toast.success(response.data);
            onSuccess();
            setIsModalOpen(false);
        }).catch(e => {
            toast.error(e.response.data);
        })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Tooltip title="Chỉnh sửa sản phẩm">
                <Button type="primary" onClick={showModal}>
                    <EditOutlined />
                </Button>
            </Tooltip >
            <Modal title="Chỉnh sửa sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form onFinish={handleOk} layout="vertical" initialValues={{
                    name: props.name,
                }}>
                    <Form.Item label={"Tên giày"} name={"name"} rules={[{ required: true, message: "Tên không được để trống!" }]}>
                        <Input placeholder="Nhập tên giày..." />
                    </Form.Item>
                    <div>
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default EditProductModal