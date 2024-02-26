import { Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import instance from '../../core/api';

const UserTable = ({ setUserIds, resetSelectedRowKeys, listUser }) => {
    const [userList, setUserList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        loadUsers();
    }, [resetSelectedRowKeys]);

    useEffect(() => {
        setSelectedRowKeys(listUser);
    }, [resetSelectedRowKeys, listUser]);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
    ];

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
        setUserIds(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const loadUsers = () => {
        instance.get("/users")
            .then((response) => {
                setUserList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Input placeholder="Tìm kiếm khách hàng theo tên..." onChange={(e) => setSearchValue(e.target.value)} />
            <Table
                rowKey="id"
                rowSelection={rowSelection}
                dataSource={userList}
                columns={columns}
            />
        </>
    );
};

export default UserTable;
