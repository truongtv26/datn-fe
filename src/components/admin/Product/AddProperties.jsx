import { Button, Form, Input } from 'antd'
import React from 'react'
import { toast } from 'react-toastify';
import instance from '../../../core/api';

function AddProperties({ name, placeholder, hanldeAddProperty }) {
    // lấy form để sau khi thêm thì reload input
    const [form] = Form.useForm();

    // xử lý thêm property
    const handleSubmit = (data) => {
        instance.post(`/${name}`, { name: data.name }).then(response => {
            refetch();
            form.resetFields();
            toast.success(response.data);
        }).catch(error => {
                toast.error(error.response.data);
        });
    }

    // lấy lại dữ liệu cho propertity
    const refetch = () => {
        instance.get(`/${name}`).then(({ data }) => {
            hanldeAddProperty(data)
        });
    }

    return (
        <>
            <Form form={form} onFinish={handleSubmit} style={{ display: "flex" }}>
                <Form.Item name={"name"} rules={[{ required: true, message: "Không được để trống!" },]}>
                    <Input placeholder={`Thêm ${placeholder}`} />
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginLeft: "4px" }}>Thêm</Button>
            </Form>
        </>
    )
}

export default AddProperties