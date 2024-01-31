import React, { useEffect, useState } from 'react';
import {
  DownOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Table, InputNumber, Input, Button, Empty } from 'antd';
import { toast } from 'react-toastify';
import AddImageModal from './AddImageModal';

const TableProduct = ({ props, handleChange }) => {
  // từ props truyện xuống sẽ xử lí state này để show ra bảng
  const [groupByColor, setGroupByColor] = useState([]);
  // thực hiện phân loại
  useEffect(() => {
    const groupedProducts = {};
    props.forEach((option) => {
      const colorName = option.color.name;

      if (!groupedProducts[colorName]) {
        groupedProducts[colorName] = [];
      }

      groupedProducts[colorName].push(option);
    });
    setGroupByColor(groupedProducts);
  }, [props]);

  // định nghĩa cột
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, record) => (
        <InputNumber
          defaultValue={record.quantity}
          formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
          onChange={(value) => handleChangeQuantity(value, record)}
          min={1}
        />
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <InputNumber
          defaultValue={record.price}
          formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
          onChange={(e) => handleChangePrice(e, record)}
        />
      ),
    },
    {
      title: 'Cân nặng',
      dataIndex: 'weight',
      key: 'weight',
      render: (_, record) => (
        <InputNumber
          defaultValue={record.weight}
          formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
          onChange={(e) => handleChangeWeight(e, record)}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'deleteBtn',
      key: 'deleteBtn',
      render: (_, record) => (
        <Button type="primary" danger size="small" onClick={() => handleDeleteGroupByColor(record)} >
          <DeleteOutlined />
        </Button >
      ),
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (_, record, index) => ({

        children: index === 0 ? <AddImageModal colorName={record.colorName} handleChange={handleImageSelect} images={record.images && record.images.length > 0 ? record.images : []} /> : null,
        props: {
          rowSpan: index === 0 ? groupByColor[record.colorName].length : 0,
        },
      }),
    },
  ];

  // xử lí thay đổi số lượng
  const handleChangeQuantity = (value, record, index) => {
    if (value < 1) {
      toast.error('Số lượng phải >= 1!');
    } else {
      const updatedGroupByColor = { ...groupByColor };

      updatedGroupByColor[record.colorName] = updatedGroupByColor[record.colorName].map((item, index) =>
        index === record.index - 1 ? { ...item, quantity: value } : item
      );

      // xử lí dữ liệu product detail trong component cha
      handleChange(
        Object.values({
          ...groupByColor,
          [record.colorName]: [...updatedGroupByColor[record.colorName]],
        }).flat()
      );
    }
  };

  // xử lí thay đổi giá
  const handleChangePrice = (e, record) => {
    const value = parseInt(e.target.value);
    if (value < 1 || isNaN(value)) {
      toast.error('Đơn giá không hợp lệ!');
    } else {
      const updatedGroupByColor = { ...groupByColor };

      updatedGroupByColor[record.colorName] = updatedGroupByColor[record.colorName].map((item, index) =>
        index === record.index - 1 ? { ...item, price: value } : item
      );

      // xử lí dữ liệu product detail trong component cha
      handleChange(
        Object.values({
          ...groupByColor,
          [record.colorName]: [...updatedGroupByColor[record.colorName]],
        }).flat()
      );
    }
  };

  // xử lí thay đổi cân nặng
  const handleChangeWeight = (e, record) => {
    const value = parseInt(e.target.value);
    if (value < 1 || isNaN(value)) {
      toast.error('Cân nặng không hợp lệ!');
    } else {
      const updatedGroupByColor = { ...groupByColor };

      updatedGroupByColor[record.colorName] = updatedGroupByColor[record.colorName].map((item, index) =>
        index === record.index - 1 ? { ...item, weight: value } : item
      );

      // xử lí dữ liệu product detail trong component cha
      handleChange(
        Object.values({
          ...groupByColor,
          [record.colorName]: [...updatedGroupByColor[record.colorName]],
        }).flat()
      );
    }
  };

  // xử lí xóa sản phẩm
  const handleDeleteGroupByColor = (record) => {
    const updatedGroupByColor = { ...groupByColor };

    updatedGroupByColor[record.colorName] = updatedGroupByColor[record.colorName].filter(
      (_, index) => index !== record.index - 1
    );

    /**
     * xử lí dữ liệu show tại bảng 
     * đoạn này xóa đi thì có thể vẫn chạy như thường vì component cha reload 
     * kéo theo thằng con này cũng reload nhưng nếu có thời gian thì nên quay lại đây update
     * tương tự việc thay đổi cân nặng, giá, số lượng cũng vậy
     * phải nhìn được set state ở đây thì mới hiểu được handleChange và nhìn ra hanldeChange
     * thì phần này thành thừa có thể lược bỏ
     */
    setGroupByColor(updatedGroupByColor);

    // xử lí dữ liệu product detail trong component cha
    handleChange(
      Object.values({
        ...groupByColor,
        [record.colorName]: [...updatedGroupByColor[record.colorName]],
      }).flat()
    );
    toast.success('Xóa thành công!');
  };

  // xử lí hiển thị ảnh được chọn và đẩy dữ liệu lên add product
  const handleImageSelect = (colorName, files) => {
    const updatedGroupByColor = { ...groupByColor };

    const updatedItems = updatedGroupByColor[colorName];

    for (let i = 0; i < updatedItems.length; i++) {
      updatedItems[i] = { ...updatedItems[i], images: files };
    }

    handleChange(
      Object.values({
        ...groupByColor,
        [colorName]: [...updatedItems],
      }).flat()
    );
  };


  return (
    <>
      <p style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
        <DownOutlined /> Danh sách sản phẩm cùng loại
      </p>
      {Object.entries(groupByColor).map(([key, items], index) => (
        <div key={index}>
          <p
            style={{
              textAlign: 'center',
              backgroundColor: '#d9d9d9',
              fontWeight: 'bold',
              padding: '4px 0',
            }}
          >
            Các sản phẩm màu: {key}
          </p>
          <Table
            dataSource={items.map((item, index) => ({
              key: `${key} - ${index}`,
              colorName: key,
              index: index + 1,
              productName: `${item.shoe.name} [${item.color.name}-${item.size.name}]`,
              quantity: item.quantity,
              price: item.price,
              weight: item.weight,
              images: item.images || []
            }))}
            columns={columns}
            pagination={false}
          />
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            {items.length > 0 && items[0].images !== undefined && items[0].images.length !== 0 ? (
              items[0].images.map((image, index) => (
                <img
                  src={image}
                  width={100}
                  height={100}
                  alt=""
                  key={index}
                  style={{ objectFit: 'cover', marginRight: '8px' }}
                />
              ))
            ) : (
              <Empty description={"Không có ảnh"} style={{ margin: "8px 0" }} />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default TableProduct;