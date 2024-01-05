import { Button, Form, Input } from 'antd'
import React from 'react'
import { toast } from 'react-toastify';

function AddProperties({ name, placeholder, }) {
    const handleSubmit = (data) => {
        request.post(`/${name}`, { name: data.name }).then(response => {
            toast.success('Thêm thành công!');
        }).catch(e => {
            toast.error(e.response.data);
        })
    }
    return (
        <>
            <Form onFinish={handleSubmit} style={{ display: "flex" }}>
                <Form.Item name={"name"} rules={[{ required: true, message: "Không được để trống!" },]}>
                    <Input placeholder={`Thêm ${placeholder}`} />
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginLeft: "4px" }}>Thêm</Button>
            </Form>
        </>
    )
}

export default AddProperties