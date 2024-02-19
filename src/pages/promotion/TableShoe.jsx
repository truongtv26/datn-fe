import React, { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import instance from '../../core/api';

const TableShoe = ({ setProductIds, resetSelectedRowKeys  }) => {
    const [productList, setProductList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        loadShoe();
    }, []);

    useEffect(() => {
        setSelectedRowKeys([]);
    }, [resetSelectedRowKeys]);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setProductIds(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const loadShoe = () => {
        instance.get("/list-product-manage")
            .then((response) => {
                setProductList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Input placeholder="Tìm kiếm sản phẩm theo tên..." onChange={(e) => setSearchValue(e.target.value)} />
            <Table
                rowKey="id"
                rowSelection={rowSelection}
                dataSource={productList}
                columns={columns}
            />
        </>
    );
};

export default TableShoe;
