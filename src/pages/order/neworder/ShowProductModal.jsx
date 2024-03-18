import { useEffect, useState } from 'react'
import { Badge, Button, Carousel, Col, Form, Input, Modal, Row, Select, Table } from 'antd'
import instance from '../../../core/api';
import { toast } from 'react-toastify';

const ShowProductModal = ({ idBill, onClose }) => {
    const [formFilter] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productList, setProductList] = useState([]);

    const [listSize, setListSize] = useState([]);
    const [listColor, setListColor] = useState([]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'key',
            render(x, record, index) {
                return index + 1;
            }
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render(x, record) {
                const carouselKey = record.images.map((image) => image.imageGallery.id).join('-');

                return (
                    <div style={{ display: 'flex' }}>
                        {record.images.length > 0 ? (
                            <div style={{ position: 'relative', marginRight: '8px' }}>
                                <Carousel key={carouselKey} autoplay autoplaySpeed={3000} dots={false} arrows={false} style={{ width: "100px", position: "relative" }}>
                                    {record.images.map((image, index) => (
                                        <div key={image.imageGallery.id}>
                                            <img src={image.imageGallery.url} alt={`Image ${index + 1}`} style={{ width: "100px", height: "100px", objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </Carousel>
                                {record.discountPercent !== undefined && record.discountPercent.status === 'happenning' && (
                                    <Badge count={`-${record.discountPercent.value}%`} style={{ position: 'absolute', bottom: 100, right: -10 }}>
                                    </Badge>
                                )}
                            </div>
                        ) : (
                            <span style={{ marginRight: '8px', width: "100px", height: "100px" }}>Không có ảnh</span>
                        )}
                        <div className="">
                            <ul style={{ listStyleType: 'none' }}>
                                <li>{x}</li>
                                <li><small>Màu: {record.color}</small></li>
                                <li><small>Kích cỡ: {record.size}</small></li>
                            </ul>
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (x, record) => (
                <>
                    {record.discountPercent !== undefined && record.discountPercent.status === 'happenning' ? (
                        <>
                            <span style={{ color: 'red' }}>{formatCurrency(record.price - (record.discountPercent.value / 100 * record.price))}</span>
                            <br />
                            <span style={{ textDecoration: 'line-through', color: '#ccc' }}>{formatCurrency(record.price)}</span>
                        </>
                    ) : (
                        <span style={{ color: 'red' }}>{formatCurrency(record.price)}</span>
                    )}
                </>
            )
        },
        {
            title: 'Hành động',
            dataIndex: 'id',
            key: 'action',
            render: (id, record) => (
                <>
                    <Button type='primary' style={{ backgroundColor: '#ffc107', color: "#fff" }}
                        onClick={() => handleChoose(record)}>Chọn</Button>
                </>
            )
        },
    ]

    const loadData = () => {
        instance.get('/list-product-manage').then(({ data }) => {
            setProductList(data);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        loadData();
    }, [isModalOpen])

    const handleChoose = (shoeDetail) => {
        const data = {};
        if (shoeDetail.quantity === 0) {
            toast.error("Sản phẩm này đã hết hàng!")
        } else {
            Modal.confirm({
                title: "Xác nhận",
                maskClosable: true,
                content: "Xác nhận thêm sản phẩm ?",
                okText: "Ok",
                cancelText: "Cancel",
                onOk: () => {
                    data.variant_id = shoeDetail?.id;
                    data.bill_id = idBill;
                    shoeDetail.discountPercent !== undefined && shoeDetail.discountPercent.status === 'happenning' ? (
                        data.price = shoeDetail.price - (shoeDetail.discountPercent.value / 100 * shoeDetail.price)
                    ) : (
                        data.price = shoeDetail?.price
                    )
                    data.quantity = 1;
                    instance.post('/bill-detail', data).then(({data}) => {
                        toast.success(data);
                    }).catch(e => {
                        toast.error(e.response.data);
                    })
                },
            });
        }
    }

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm sản phẩm</Button>
            <Modal title="Danh sách sản phẩm" open={isModalOpen} onCancel={() => {
                setIsModalOpen(false);
                onClose();
            }} footer="" width={1000}>
                <Form layout='vertical' form={formFilter}>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item label="Tên sản phẩm" name={"name"}>
                                <Input placeholder='Tìm kiếm sản phẩm theo tên...' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Kích cỡ" name={"size"}>
                                <Select showSearch placeholder="Chọn kích cỡ..." optionFilterProp="children"
                                    style={{ width: "100%" }}>
                                    <Option value="">Chọn kích cỡ</Option>
                                    {listSize.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Màu sắc" name={"color"}>
                                <Select showSearch placeholder="Chọn màu sắc..." optionFilterProp="children"
                                    style={{ width: "100%" }}>
                                    <Option value="">Chọn màu sắc</Option>
                                    {listColor.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Button style={{ marginRight: '4px' }} onClick={() => {
                            formFilter.resetFields()
                        }} type='primary'>Làm mới</Button>
                        <Button htmlType='submit' type='primary'>Tìm kiếm</Button>
                    </div>
                </Form>

                <Table
                    dataSource={productList.flatMap((product) =>
                        product.variants.map((item, index) => (
                            {
                                key: `${product.name} - ${index}`,
                                id: item.id,
                                name: product.name,
                                quantity: item.quantity,
                                price: item.price,
                                weight: item.weight,
                                images: item.imageProducts || [],
                                color: item.color.name,
                                size: item.size.name,
                                discountPercent: item.promotion[0],
                            }
                        ))
                    )}
                    columns={columns}
                    className="mt-3"
                />
            </Modal>
        </>
    )
}

export default ShowProductModal