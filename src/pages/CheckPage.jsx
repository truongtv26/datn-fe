import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Descriptions, Flex, Form, Input, Select, Space, Table, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getCity, getDistrict, getLeadtime, getOrderFee, getOrderServices, getWard } from "../services/shipping";

const { Title } = Typography;

const CheckPage = () => {
    // trạng thái sản phẩm và mã giảm giá đã chọn
    const location = useLocation();
    const { cartItemSelected, couponSelected } = location.state || {};
    const [cost, setCost] = useState({ total: 0, orders: 0, shipping: 0, shippingDiscount: 0, ordersDiscount: 0 });

    // trạng thái form
    const [form] = Form.useForm();
    const [orderServices, setOrderServices] = useState([])
    const [leadtimeService, setLeadtimeService] = useState(null)

    // trạng thái người gửi hàng
    const [depositor, setDepositor] = useState(
        {
            city: 201, cityName: 'Hà Nội',
            district: 3440, districtName: "Quận Nam Từ Liêm",
            ward: '13005', wardName: "Phường Mỹ Đình 2",
            detail: "92"
        })

    // trạng thái thông tin người mua hàng
    const [recipient, setRecipient] = useState({});
    const [cities, setCities] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);

    // lấy thông tin tỉnh thành
    useEffect(() => {
        getCity().then(({ data }) => {
            setCities(data)
            setDistrict([])
            setRecipient({
                ...recipient,
                district: null,
            })
        })
    }, [])

    // lấy thông tin quận huyện
    useEffect(() => {
        getDistrict(recipient.city).then(({ data }) => {
            setDistrict(data)
            setWard([])
            setRecipient({
                ...recipient,
                ward: null,
            })
        })
    }, [recipient.city, cities])

    // lấy thông tin phường xã
    useEffect(() => {
        getWard(recipient.district).then(({ data }) => {
            setWard(data)
        });

        // lấy thông dịch vụ vận chuyển
        depositor && recipient && recipient.district &&
            getOrderServices({
                from_district: depositor.district,
                to_district: recipient.district
            })
                .then(({ data }) => {
                    setOrderServices(data[0])
                })
    }, [recipient.district, district])


    // lấy phí vận chuyển
    useEffect(() => {
        getOrderFee(orderServices, depositor, recipient)
            .then(({ data }) => {
                data?.total ? setCost({
                    ...cost,
                    shipping: data.total
                }) : null
            })
    }, [orderServices])

    // tính giá trị đơn hàng
    useEffect(() => {
        const ordersDiscount = cartItemSelected.reduce((prev, item) => {
            const coupon = couponSelected.filter((c) => c.variant_id === item.variant)
            return Object.keys(coupon).length > 0 ? prev + (item.total * (coupon[0].value / 100)) : prev
        }, 0)

        setCost({
            ...cost,
            orders: cartItemSelected.reduce((total, item) => { return total + item.price * item.quantity }, 0),
            ordersDiscount: -ordersDiscount,
        })
    }, [orderServices])

    // tính thời gian giao hàng dự kiến
    useEffect(() => {
        orderServices && depositor && recipient && recipient.district && recipient.ward &&
            getLeadtime(orderServices, depositor, recipient)
                .then(({ data }) => {
                    const date = new Date(data.leadtime * 1000);
                    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
                    setLeadtimeService(formattedDate)
                })
    }, [cost, recipient])
    // cập nhật thông tin giao hàng qua form
    const handleAddress = (_, value) => {
        setRecipient({
            ...recipient,
            [value.name]: value.value,
            [`${value.name}Name`]: value.label
        })
    }
    const handleDetailAddress = ({ target }) => {
        setRecipient({
            ...recipient,
            [target.name]: target.value,
        })
    }

    // validate form
    const formValidator = {
        email: (_, value) => {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            return value && !regex.test(value) ? Promise.reject('Email không hợp lệ') : Promise.resolve();
        },
        vietnamesePhonenumber: (_, value) => {
            const regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
            return value && !regex.test(value) ? Promise.reject('Số điện thoại không hợp lệ') : Promise.resolve();
        }
    }

    // Xử lý sản phẩm đã chọn
    const columnsSelected = [
        {
            name: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => <img src={record.image} alt="Product" style={{ width: '40px', height: '40px' }} />,
        },
        {
            name: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                const currentCoupon = couponSelected.filter(item => item.variant_id === record.variant)

                return (
                    <>
                        <p style={{
                            fontSize: "12px",
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 2,
                            textOverflow: 'ellipsis'
                        }}>
                            {record.name}
                        </p>
                        <Flex gap={10}>
                            {record.color.name} - {record.size.name}
                            <hr />
                            <div>
                                SL: {record.original.quantity}
                            </div>
                            <hr />
                            <div>
                                {
                                    Object.keys(currentCoupon).length > 0
                                        ? <>
                                            <Flex gap={4}>
                                                <div>
                                                    {
                                                        new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(record.original.price * record.original.quantity * (1 - currentCoupon[0].value / 100))
                                                    }
                                                </div>
                                                <div style={{ textDecoration: "line-through" }}>
                                                    {
                                                        new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(record.original.price * record.original.quantity)
                                                    }
                                                </div>
                                                {currentCoupon[0].value ? <><Badge count={`-${currentCoupon[0].value}%`} /></> : ""}
                                            </Flex>
                                        </>
                                        : new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(record.original.price * record.original.quantity)
                                }
                            </div>
                        </Flex>
                    </>
                )
            }
        }

    ];
    const dataSelected = cartItemSelected.map((item, index) => {
        return {
            key: index,
            image: item.image,
            name: item.name,
            variant: item.variant,
            color: item.color,
            size: item.size,
            original: item,
        }
    })

    const items = [
        { title: "Đơn hàng", value: convertCurrency(cost.orders) },
        { title: "Vận chuyển", value: convertCurrency(cost.shipping) },
        { title: "Giảm giá đơn hàng", value: convertCurrency(cost.ordersDiscount) },
        { title: "Giảm giá vận chuyển", value: convertCurrency(cost.shippingDiscount) },
        { title: "Tổng thanh toán", value: convertCurrency(cost.orders + cost.shipping + cost.shippingDiscount + cost.ordersDiscount) }
    ];

    // thao tác trên form
    const onFinish = () => {
        toast.success("Đặt hàng thành công!")
    };
    const onFinishFailed = () => {
        toast.error("Vui lòng kiểm tra lại thông tin!")
    };

    function convertCurrency(currency) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(currency)
    }

    return (
        <div className="container mx-auto">

            <div className="top-content">
                <a href="">Home {`>`} </a><span>Checkout</span>
            </div>

            <div className="notification">
                <p className="sucsess"><BellOutlined style={{ color: 'red' }} /> Have a coupon? Click here to enter your code</p>
            </div>

            <div className="content-cart">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{ width: "100%" }}
                >
                    <Flex gap={10}>
                        <div style={{ flex: "0 0 60%" }}>
                    <Title level={2}>Thông tin khách hàng</Title>
                            <Flex gap={10}>
                                <Form.Item
                                    name="recipient"
                                    label="Họ tên người nhận"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập họ tên"
                                        },
                                        {
                                            type: 'string',
                                            max: 50,
                                        },
                                    ]}
                                    style={{ flex: "1" }}
                                >
                                    <Input onChange={handleDetailAddress} name="recipient" placeholder="Họ tên người nhận" />

                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại người nhận"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập số điện thoại"
                                        },
                                        {
                                            validator: formValidator.vietnamesePhonenumber
                                        }
                                    ]}
                                    style={{ flex: "1" }}
                                >
                                    <Input onChange={handleDetailAddress} name="phone" placeholder="Số điện thoại người nhận" />

                                </Form.Item>
                            </Flex>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{
                                    validator: formValidator.email
                                }]}
                                style={{ flex: "1" }}
                            >
                                <Input onChange={handleDetailAddress} name="email" placeholder="Enter Email" />

                            </Form.Item>
                            <Flex gap={10}>
                                <Form.Item
                                    name="city"
                                    label="Tỉnh/Thành Phố"
                                    initialValue={""}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tỉnh/Thành Phố không được bỏ trống"
                                        }
                                    ]}
                                    style={{ flex: "1" }}
                                >
                                    <Select
                                        name="city"
                                        onChange={handleAddress}
                                        options={cities && cities.length > 0
                                            ? cities.map(city => { return { name: "city", label: city.ProvinceName, value: city.ProvinceID } })
                                            : [{ label: "Chọn Tỉnh/Thành Phố", value: "" }]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="district"
                                    label="Quận/Huyện"
                                    initialValue={""}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Quận/Huyện không được bỏ trống"
                                        }
                                    ]}
                                    style={{ flex: "1" }}
                                >
                                    <Select
                                        name="district"
                                        onChange={handleAddress}
                                        options={district && district.length > 0
                                            ? district.map(district => { return { name: "district", label: district.DistrictName, value: district.DistrictID } })
                                            : [{ label: "Chọn Quận/Huyện", value: "" }]}
                                    />

                                </Form.Item>
                                <Form.Item
                                    name="ward"
                                    label="Phường/Xã"
                                    initialValue={""}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Phường/Xã không được bỏ trống"
                                        }
                                    ]}
                                    style={{ flex: "1" }}
                                >
                                    <Select
                                        name="ward"
                                        onChange={handleAddress}
                                        options={ward && ward.length > 0
                                            ? ward.map(ward => { return { name: "ward", label: ward.WardName, value: ward.WardCode } })
                                            : [{ label: "Chọn Phường/Xã", value: "" }]}
                                    />

                                </Form.Item>
                            </Flex>
                            <Form.Item
                                name="detail"
                                label="Số nhà/Địa chỉ cụ thể"
                                rules={[{
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ cụ thể"
                                }]}
                                style={{ flex: "1" }}
                            >
                                <Input onChange={handleDetailAddress} name="detail" placeholder="Địa chỉ" />

                            </Form.Item>
                            <div
                                style={{ background: "#e9edf5", padding: "10px", borderRadius: "5px" }}
                            >
                                <span>Đơn hàng của bạn sẽ được vận chuyển từ:</span>
                                <Flex gap={5}>
                                    <strong>{depositor?.detail} - {depositor?.wardName} - {depositor?.districtName} - {depositor?.cityName}</strong> tới
                                    <strong>{recipient?.detail} - {recipient?.wardName} - {recipient?.districtName} - {recipient?.cityName}</strong>
                                </Flex>
                                <div>
                                    Vận chuyển bởi: <strong>Giao hàng nhanh</strong>
                                </div>
                                <div>
                                    Ngày nhận hàng dự tính: <strong>{leadtimeService}</strong>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Title level={2}>Thông tin đơn hàng</Title>
                            <div
                                style={{ background: "#e9edf5", padding: "10px", borderRadius: "5px" }}
                            >
                                {Object.keys(cartItemSelected).length > 0
                                    ? <Table
                                        showHeader={false}
                                        columns={columnsSelected}
                                        dataSource={dataSelected}
                                        pagination={{
                                            pageSize: 4,
                                        }}
                                    />
                                    : 'Chưa có sản phẩm nào'}

                                {Object.keys(cartItemSelected).length > 0
                                    ? <Descriptions column={1} bordered>
                                        {items.map((description, index) =>
                                            description.title ? (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={description.title}
                                                    labelStyle={{ width: '30%' }}
                                                >
                                                    {description.value}
                                                </Descriptions.Item>
                                            ) : (
                                                <div key={index}>{description.value}</div>
                                            )
                                        )}
                                    </Descriptions>
                                    : ""}
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <Form.Item>
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            Đặt hàng
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </div>
                        </div>
                    </Flex>
                </Form>
            </div>
        </div >
    )
}

export default CheckPage