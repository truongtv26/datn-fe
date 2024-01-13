import React, { useState } from 'react';
import {
    PlusCircleFilled,
} from '@ant-design/icons';
import { Button, Input, Form, Modal } from 'antd';
import instance from '../../../core/api';
import { toast } from 'react-toastify';

const AddProductModal = ({ hanldeAddProduct }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    // xử lí thêm tên product mới
    const handleOk = (data) => {
        instance.post('/product', { name: data.name }).then(response => {
            refetch();
            form.resetFields();
            setIsModalOpen(false);
            toast.success(response.data);
        }).catch(e => {
            toast.error(e.response.data);
        })

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // lấy lại dữ liệu cho prodcut
    const refetch = () => {
        instance.get(`/product`).then(({ data }) => {
            hanldeAddProduct(data)
        });
    }

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
            >
                <PlusCircleFilled />
            </Button>
            <Modal title="Thêm giày" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} onFinish={handleOk} layout="vertical">
                    <Form.Item label={"Tên giày"} name={"name"} rules={[{ required: true, message: "Tên không được để trống!" }]}>
                        <Input placeholder="Nhập tên giày..." />
                    </Form.Item>
                    <div>
                        <Button type="primary" htmlType="submit">Thêm</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default AddProductModal