import { PictureFilled } from '@ant-design/icons';
import { Carousel, InputNumber, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import instance from '../../core/api';

const TableShoeDetail = ({ idProduct, setSelectedProductDetail, setRowKeys }) => {
  const [listProductDetail, setListProductDetail] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState(setRowKeys);

  useEffect(() => {
    setSelectedRowKeys(setRowKeys);
  }, [setRowKeys]);

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    const selectedIds = selectedRows.map(row => row.id);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedProductDetail(selectedIds);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: (<PictureFilled />),
      dataIndex: 'images',
      key: 'images',
      render: (_, record) => {
        const carouselKey = record.images.map((image) => image.imageGallery.id).join('-');

        if (record.images.length > 0) {
          return (
            <Carousel key={carouselKey} autoplay autoplaySpeed={3000} dots={false} arrows={false} style={{ width: "100px" }}>
              {record.images.map((image, index) => (
                <div key={image.imageGallery.id}>
                  <img src={image.imageGallery.url} alt={`Image ${index + 1}`} style={{ width: "100px", height: "100px", objectFit: 'contain' }} />
                </div>
              ))}
            </Carousel>
          );
        } else {
          return <span>Không có ảnh</span>;
        }
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          value={record.quantity}
          formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
          controls={false}
          disabled={true}
          style={{ color: 'black' }}
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <InputNumber
          value={record.price}
          formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
          controls={false}
          disabled={true}
          style={{ color: 'red' }}
        />
      ),
    },
  ];

  const loadData = async (idProduct) => {
    try {
      const response = await instance.get('/product-detail', {
        params: {
          shoes: idProduct,
        },
      });
      setListProductDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData(idProduct);
  }, [idProduct]);

  let stt = 1;
  const dataSource = listProductDetail.flatMap((product) =>
    product.variants.map((item, index) => ({
      index: stt++,
      key: `${product.id}-${index}`,
      id: item.id,
      name: `${product.name} [${item.color.name} - ${item.size.name}] `,
      quantity: item.quantity,
      price: item.price,
      images: item.imageProducts,
    }))
  );

  return (
    <Table
      rowKey="id"
      rowSelection={rowSelection}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default TableShoeDetail;
