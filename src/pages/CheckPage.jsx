import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Descriptions, Flex, Form, Input, Radio, Row, Select, Space, Table, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCity, getDistrict, getLeadtime, getOrderFee, getOrderServices, getWard } from "../services/shipping";
import { useAppContext } from "../provider/AppProvider";
import { getPaymentMethod, paymentExecution } from "../services/payment";
import { createOrder } from "../services/order";
import Delivery from "../components/delivery/Delivery";
import FormatCurrency from "../utils/FormatCurrency";

const { Title } = Typography;

const CheckPage = () => {

    const APP_URL = import.meta.env.VITE_LOCAL_URL;
    const { user } = useAppContext()
    // trạng thái sản phẩm và mã giảm giá đã chọn
    const location = useLocation();
    const { cartItemSelected, voucherSelected, oldCost } = location.state || {};
    console.log(oldCost);
    const navigate = useNavigate();
    const [cost, setCost] = useState(oldCost);
    const [paymentMethod, setPaymentMethod] = useState([])
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
    const [recipientSelected, setRecipientSelected] = useState(false);
    const [cities, setCities] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);

    // lấy thông tin tỉnh thành
    useEffect(() => {
        getCity().then(({ data }) => {
            setCities(data)
            setRecipient({
                ...recipient,
                district: null,
            })
        })
    }, [])

    // lấy thông tin quận huyện
    useEffect(() => {
        recipient.recipient_city &&
            getDistrict(recipient.recipient_city).then(({ data }) => {
                setDistrict(data)
                setRecipient({
                    ...recipient,
                    ward: null,
                })
            })
    }, [recipient.recipient_city, cities])

    // lấy thông tin phường xã
    useEffect(() => {
        recipient.recipient_district &&
            getWard(recipient.recipient_district).then(({ data }) => {
                const wards = data !== null ? data : []
                setWard(wards)
            });

    }, [recipient.recipient_district, district])

    useEffect(() => {
        // lấy thông dịch vụ vận chuyển
        depositor && recipient.recipient_district &&
            getOrderServices({
                from_district: depositor.district,
                to_district: recipient.recipient_district
            })
                .then(({ data }) => {
                    setOrderServices(data[0])
                })
    }, [district, recipientSelected, recipient])

    // lấy phí vận chuyển
    useEffect(() => {
        orderServices.service_id && depositor && depositor.district && recipient && recipient.district && recipient.ward
        getOrderFee(orderServices, depositor, recipient)
            .then(({ data }) => {
                const shippingCost = data?.total ? data.total : 0;
                setCost(prevCost => ({ ...prevCost, shipping: shippingCost }))
            })
    }, [orderServices, recipient, recipientSelected])

    // tính thời gian giao hàng dự kiến
    useEffect(() => {
        if (orderServices.service_id && recipient.recipient_district && recipient.recipient_ward) {
            getLeadtime(orderServices, depositor, recipient)
                .then(({ data }) => {
                    const date = new Date(data?.leadtime * 1000);
                    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
                    setLeadtimeService(formattedDate)
                })
        } else {
            setLeadtimeService("")
        }

    }, [cost, recipient, recipientSelected])

    // lấy thông tin thanh toán
    useEffect(() => {
        getPaymentMethod()
            .then((data) => {
                setPaymentMethod(data)
            })
    }, [])

    // điền thông tin khi người dùng chọn địa chỉ
    useEffect(() => {
        form.setFieldsValue({
            recipient_name: recipient.recipient_name,
            recipient_phone: recipient.recipient_phone,
            recipient_email: recipient.recipient_email,
            recipient_city: recipient.recipient_city ? { value: recipient.recipient_city, label: recipient.recipient_city_name } : "",
            recipient_district: recipient.recipient_district ? { value: recipient.recipient_district, label: recipient.recipient_district_name } : "",
            recipient_ward: recipient.recipient_ward ? { value: recipient.recipient_ward, label: recipient.recipient_ward_name } : "",
            recipient_detail: recipient.recipient_detail
        })
    }, [recipientSelected])

    // cập nhật thông tin giao hàng qua form
    const handleAddress = (_, address) => {
        if (address.name === 'recipient_city') {
            setRecipient({
                ...recipient,
                [address.name]: address.value,
                [`${address.name}_name`]: address.label,
                recipient_district: undefined,
                recipient_district_name: "",
                recipient_ward: undefined,
                recipient_ward_ame: ""
            })
            // đặt district và ward về mặc định
            form.setFieldsValue({
                recipient_district: { value: "", label: "Chọn Quận/Huyện" },
                recipient_ward: { value: "", label: "Chọn Phường/Xã" },
            });
        } else {
            setRecipient({
                ...recipient,
                [address.name]: address.value,
                [`${address.name}_name`]: address.label
            })
        }
    }

    const handleDetailAddress = ({ target }) => {
        setRecipient({
            ...recipient,
            [target.name]: target.value,
            [`${target.name}_name`]: target.label
        })
    }

    // validate form
    const formValidator = {
        addressRequired: (_, value) => {
            return String(value.value).length <= 0 ? Promise.reject('Không hợp lệ!') : Promise.resolve();
        },
        email: (_, value) => {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            return value && !regex.test(value) ? Promise.reject('Email không hợp lệ') : Promise.resolve();
        },
        vietnamesePhoneNumber: (_, value) => {
            const regex = /(03|05|07|08|09)+([0-9]{8})\b/
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
                const promotion = record.promotions?.filter((item) => item?.status === 'happenning')[0]
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
                                    promotion ?
                                        <Flex gap={5}>
                                            <div><FormatCurrency props={(record.original.price * (1 - (promotion.value / 100))) * record.original.quantity} /></div>
                                            <div className='old-price'>
                                                <FormatCurrency props={record.original.price * record.original.quantity} />
                                            </div>
                                            <div><Badge count={`-${promotion.value}%`} /></div>
                                        </Flex>
                                        : <FormatCurrency props={record.original.price} />
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
            promotions: item.action.promotions
        }
    })

    const items = [
        { title: "Đơn hàng", value: <FormatCurrency props={cost.orders} /> },
        { title: "Vận chuyển", value: <FormatCurrency props={cost.shipping} /> },
        {
            title: "Giảm giá đơn hàng", value: voucherSelected ? <>
                <p>
                    Khuyến mãi: <FormatCurrency props={-cartItemSelected.reduce((prev, item) => {
                        return item.action?.promotions?.length > 0 && item.action.promotions[0]?.status === "happenning" ?
                            prev + ((item.price * item.quantity) * (item.action.promotions[0].value / 100)) : prev;
                    }, 0)} />
                </p>
                <p>
                    Phiếu giảm giá: <FormatCurrency props={cost.voucherDiscount} />
                </p>
                <p>
                    Tổng: <FormatCurrency props={cost.ordersDiscount + cost.voucherDiscount} />
                </p>
            </> :
                <FormatCurrency props={cost.ordersDiscount} />
        },
        { title: "Giảm giá vận chuyển", value: <FormatCurrency props={cost.shippingDiscount} /> },
        { title: "Tổng thanh toán", value: <FormatCurrency props={cost.orders + cost.shipping + cost.shippingDiscount + cost.ordersDiscount + cost.voucherDiscount} /> }
    ];

    // validate
    const onFinish = () => {
   
        const order_details = cartItemSelected.map((item) => {
            const promotion = item.action.promotions.length > 0 && item.action.promotions[0]?.status === "happenning" ?
                item.action.promotions[0] : null

            return {
                variant_id: item.variant,
                price: promotion ? item.price * (1 - (promotion.value / 100)) : item.price,
                quantity: item.quantity,
                promotion_id: promotion?.id ?? null,
            }
        })

        const order = {
            customer_id: user.id ?? null,
            customer_name: recipient.recipient_name,
            phone_number: recipient.recipient_phone,
            email: recipient.recipient_email,
            address_information: JSON.stringify({
                city: recipient.recipient_city,
                district: recipient.recipient_district,
                ward: recipient.recipient_ward,
                detail: recipient.recipient_detail,
            }),
            address:`${recipient.recipient_detail} ${recipient.recipient_ward_name} ${recipient.recipient_district_name} ${recipient.recipient_city_name}`,
            note: recipient.recipient_note,
            shipping_by: "Giao hàng nhanh",
            money_ship: cost.shipping,
            payment: recipient.payment,
            return_payment: APP_URL + 'payment/',
            money_reduce: cost.orders - (cost.orders + cost.shipping + cost.shippingDiscount + cost.ordersDiscount + cost.voucherDiscount),
            total_money: cost.orders + cost.shipping + cost.shippingDiscount + cost.ordersDiscount + cost.voucherDiscount,
            voucher_id: voucherSelected.id ?? null,
            order_details,
        }
   
        recipient.payment ?
            createOrder(order)
                .then((response) => {
                    if (response?.status === 201) {
                        toast.success("Đặt hàng thành công!")
                        if (response?.data?.redirect?.code == "00") {
                            paymentExecution(response.data.redirect.data)
                        }
                        navigate('/order')
                    } else {
                        toast.error(response.message.message)
                    }
                })
                .catch((error) => {
                    toast.error("Đặt hàng thất bại!");
                })
            : toast.error("Vui lòng chọn phương thức thanh toán!")

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
                    <Row gutter={[40]} justify="space-between">
                        <Col xs={24} lg={14}>
                            <div style={{ flex: "0 0 60%" }}>
                                <Flex justify="space-between">
                                    <Title level={2}>Thông tin khách hàng</Title>
                                    {user.id && <Delivery
                                        recipient={recipient}
                                        setRecipient={setRecipient}
                                        recipientSelected={recipientSelected}
                                        setRecipientSelected={setRecipientSelected}
                                    />}
                                </Flex>
                                <Flex gap={10}>
                                    <Form.Item
                                        name="recipient_name"
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
                                        <Input
                                            onChange={handleDetailAddress}
                                            name="recipient_name"
                                            placeholder="Họ tên người nhận" />

                                    </Form.Item>
                                    <Form.Item
                                        name="recipient_phone"
                                        label="Số điện thoại người nhận"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập số điện thoại"
                                            },
                                            {
                                                validator: formValidator.vietnamesePhoneNumber
                                            }
                                        ]}
                                        style={{ flex: "1" }}
                                    >
                                        <Input onChange={handleDetailAddress} name="phone" placeholder="Số điện thoại người nhận" />

                                    </Form.Item>
                                </Flex>
                                <Form.Item
                                    name="recipient_email"
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
                                        name="recipient_city"
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
                                                ? cities.map(city => { return { name: "recipient_city", label: city.ProvinceName, value: city.ProvinceID } })
                                                : [{ label: "Chọn Tỉnh/Thành Phố", value: "" }]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="recipient_district"
                                        label="Quận/Huyện"
                                        initialValue={""}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Quận/Huyện không được bỏ trống"
                                            },
                                            {
                                                validator: formValidator.addressRequired
                                            }
                                        ]}
                                        style={{ flex: "1" }}
                                    >
                                        <Select
                                            name="recipient_district"
                                            onChange={handleAddress}
                                            options={district && district.length > 0
                                                ? district.map(district => { return { name: "recipient_district", label: district.DistrictName, value: district.DistrictID } })
                                                : [{ label: "Chọn Quận/Huyện", value: "" }]}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        name="recipient_ward"
                                        label="Phường/Xã"
                                        initialValue={""}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Phường/Xã không được bỏ trống"
                                            },
                                            {
                                                validator: formValidator.addressRequired
                                            }
                                        ]}
                                        style={{ flex: "1" }}
                                    >
                                        <Select
                                            name="ward"
                                            onChange={handleAddress}
                                            options={ward && ward.length > 0
                                                ? ward.map(ward => { return { name: "recipient_ward", label: ward.WardName, value: ward.WardCode } })
                                                : [{ label: "Chọn Phường/Xã", value: "" }]}
                                        />

                                    </Form.Item>
                                </Flex>
                                <Form.Item
                                    name="recipient_detail"
                                    label="Số nhà/Địa chỉ cụ thể"
                                    rules={[{
                                        required: true,
                                        message: "Vui lòng nhập địa chỉ cụ thể"
                                    }]}
                                    style={{ flex: "1" }}
                                >
                                    <Input onChange={handleDetailAddress} name="recipient_detail" placeholder="Địa chỉ" />

                                </Form.Item>
                                <Form.Item
                                    name="recipient_note"
                                    label="Ghi chú"
                                    style={{ flex: "1" }}
                                >
                                    <Input onChange={handleDetailAddress} name="recipient_note" placeholder="Ghi chú" />

                                </Form.Item>
                                <div
                                    style={{ background: "#e9edf5", padding: "10px", borderRadius: "5px" }}
                                >
                                    <span>Đơn hàng của bạn sẽ được vận chuyển từ:</span>
                                    <Flex gap={5} vertical>
                                        <strong>{depositor?.detail} - {depositor?.wardName} - {depositor?.districtName} - {depositor?.cityName}</strong> tới
                                        <strong>{recipient?.recipient_detail} - {recipient?.recipient_ward_name} - {recipient?.recipient_district_name} - {recipient?.recipient_city_name}</strong>
                                    </Flex>
                                    <div>
                                        Vận chuyển bởi: <strong>Giao hàng nhanh</strong>
                                    </div>
                                    <div>
                                        Ngày nhận hàng dự tính: <strong>{leadtimeService}</strong>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={10}>
                            <div style={{ width: "100%" }}>
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

                                    {/* phuong thức thanh toán */}
                                    <p>Thanh toán</p>
                                    <Form.Item>
                                        <Radio.Group onChange={({ target }) => {
                                            setRecipient({
                                                ...recipient,
                                                payment: target.value
                                            })
                                        }}>
                                            <Space direction="vertical">
                                                {
                                                    Object.keys(paymentMethod).length > 0
                                                        ? paymentMethod.map((payment, i) => <Radio key={i} value={payment}>{payment.method}</Radio>) : null
                                                }
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
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
                        </Col>
                    </Row>
                </Form>
            </div>
        </div >
    )
}

export default CheckPage