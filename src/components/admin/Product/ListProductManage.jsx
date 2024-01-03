import React, { useState } from 'react'
import {
    PlusCircleFilled
} from '@ant-design/icons'
import { Input, Typography, Button, Row, Col, Space, Table, Tag, Flex } from 'antd';
const { Title } = Typography;
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];
const ListProductManage = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (value) => {
        // Handle search logic here
        console.log('Searching for:', value);
    };

    return (
        <div>
            <Title level={5} style={{ margin: '0' }} >Danh sách sản phẩm</Title>
            <Flex align='end'>
                <div style={{ flexGrow: 1, marginRight: '8px' }}>
                    <p style={{ margin: '4px 0' }}>Nhập tên sản phẩm:</p>
                    <Input
                        
                        placeholder="Tìm kiếm sản phẩm theo tên..."
                        allowClear
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <Button
                    type="link"
                    href="/admin/product/add"
                    style={{ backgroundColor: '#1677ff', color: '#fff' }}
                >
                    <PlusCircleFilled />
                    Thêm sản phẩm
                </Button>
            </Flex>

            <Table dataSource={dataSource} columns={columns} />
        </div >
    )
}

export default ListProductManage