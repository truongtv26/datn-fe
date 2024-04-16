import React from 'react'
import { Button, Carousel, InputNumber, Modal, Table, Tooltip, Typography } from 'antd';
import { DeleteOutlined, PictureFilled } from '@ant-design/icons';
import EditProductDetail from './EditProductDetail';
import AddVariantProduct from './AddVariantProduct';

const TableProductEdit = ({ props, product, handlePriceChange, handleWeightChange, handleQuantityChange, handleUpdateFast, selectedRowKeys, rowSelection, onSuccess }) => {
    // định nghĩa cột
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (_, record, index) => (
                index + 1
            )
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <>
                    <InputNumber value={record.quantity} formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
                        controls={false}
                        min={0}
                        onChange={(value) => handleQuantityChange(value, record.id)} />
                </>
            )
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <InputNumber value={record.price} formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
                    controls={false}
                    min={0}
                    onChange={(value) => handlePriceChange(value, record.id)} />
            )
        },
        {
            title: 'Cân nặng',
            dataIndex: 'weight',
            key: 'weight',
            render: (_, record) => (
                <InputNumber value={record.weight} formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value !== null && value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : ""}
                    controls={false}
                    min={0}
                    onChange={(value) => handleWeightChange(value, record.id)} />
            )
        },
        {
            title: <PictureFilled />,
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
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditProductDetail props={record} onSuccess={onSuccess} />
                    <Tooltip placement="bottom" title="Xóa">
                        <Button type="primary" danger><DeleteOutlined /></Button>
                    </Tooltip>
                </>
            )
        },
    ];

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                <Typography.Title level={5} style={{ margin: '0' }}>Chi tiết sản phẩm</Typography.Title>
                <div style={{marginBottom: '8px'}}>
                    <AddVariantProduct product={product} variants={props.variants}/>
                    {selectedRowKeys.length > 0 && <Button type="primary" onClick={() => handleUpdateFast()} style={{marginLeft: '4px'}}>Cập nhật { selectedRowKeys.length} sản phẩm</Button>}
                </div>
            </div>
            <Table
                columns={columns}
                rowSelection={rowSelection}
                dataSource={props && props.variants
                    ? props.variants.map((item, index) => ({
                        key: index,
                        id: item.id,
                        name: `${product.name} [${item.color.name} - ${item.size.name}] `,
                        quantity: item.quantity,
                        price: item.price,
                        weight: item.weight,
                        images: item.imageProducts,
                        productName: product.name,
                        size: item.size.name,
                        color: item.color.name,
                        sizeId: item.size.id,
                        colorId: item.color.id,
                    }))
                    : []
                }
            />
        </>
    )
}
export default TableProductEdit