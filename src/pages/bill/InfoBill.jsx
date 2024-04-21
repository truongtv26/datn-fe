import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import FormatCurrency from "../../utils/FormatCurrency";
import DetailAddress from "../../components/DetailAddress";
import ChangeBillAddress from "./ChangeBillAddress";

function InfoBill({ props, handleChangeInfo }) {
    return (
        <>
            <div className="mt-3">
                <div style={{ display: 'flex', marginTop: '12px', marginBottom: '8px' }}>
                    <Title level={5} style={{ flexGrow: 1, padding: '8px' }}>Thông tin đơn hàng</Title>
                    {props.timeline == '2' | props.timeline == '4' ? (
                        <ChangeBillAddress props={props} handleChangeInfo={handleChangeInfo} />
                    ) : ''}
                </div>
                <Row gutter={24}>
                    <Col xl={7}>
                        <ul style={{ listStyleType: 'none' }}>
                            <li className="mb-2">Mã đơn hàng: <span style={{ float: 'right', color: 'red' }}>{props.code}</span></li>
                            <li className="mb-2">Loại đơn hàng: <span style={{ float: 'right', color: 'red' }}>{props.type === 'delivery' ? "Giao hàng" : "Tại quầy"}</span></li>
                            <li className="mb-2">Trạng thái:
                                <span style={{ float: 'right', color: 'red' }}>
                                    {(() => {
                                        switch (props.timeline) {
                                            case '1':
                                                return "Tạo đơn hàng";
                                            case '2':
                                                return "Chờ xác nhận";
                                            case '3':
                                                return "Xác nhận thông tin thanh toán";
                                            case '4':
                                                return "Chờ giao";
                                            case '5':
                                                return "Đang giao";
                                            case '6':
                                                return "Hoàn thành";
                                            case '7':
                                                return "Hủy";
                                            case '8':
                                                return "Hoàn 1 phần";
                                            default:
                                                return "";
                                        }
                                    })()}
                                </span>
                            </li>
                        </ul>
                    </Col>
                    <Col xl={7}>
                        <ul style={{ listStyleType: 'none' }}>
                            <li className="mb-2">Tổng tiền:
                                <span style={{ float: 'right', color: 'red' }}><FormatCurrency props={props.total_money - props.money_reduce} /></span>
                                <del style={{ color: '#ccc' }}>
                                    <span>  </span>
                                    {props.money_reduce != 0 ? (<FormatCurrency props={props.total_money} />) : ''}
                                </del>
                            </li>
                            {props.type === 'delivery' && (
                                <li className="mb-2">Phí vận chuyển: <span style={{ float: 'right', color: 'red' }}><FormatCurrency props={props.money_ship} /></span></li>
                            )}
                            <li className="mb-2">Phải thanh toán: <span style={{ float: 'right', color: 'red' }}>{props.type === 'delivery' ? <FormatCurrency props={Number(props.money_ship) + Number(props.total_money - props.money_reduce)} />
                                : <FormatCurrency props={props.total_money - props.money_reduce} />}</span></li>
                        </ul>
                    </Col>
                    <Col xl={10}>
                        <ul style={{ listStyleType: 'none' }}>
                            <li className="mb-2">Khách hàng: <span style={{ float: 'right', color: 'red' }}>{props.customer_name === null ? "Khách hàng lẻ" : props.customer_name}</span></li>
                            <li className="mb-2">Số điện thoại: <span style={{ float: 'right', color: 'red' }}>{props.phone_number === null ? "" : props.phone_number}</span></li>
                            <li className="mb-2">Địa chỉ:
                                <span style={{ float: 'right', color: 'red' }}>
                                    {props.address ? (
                                        (() => {
                                            const addressString = props.address;
                                            const addressParts = addressString.split('##');
                                            return (
                                                <>
                                                    {addressParts[0]},
                                                    {addressParts[1] ? (
                                                        <DetailAddress prov={addressParts[3]} distr={addressParts[2]} war={addressParts[1]} />
                                                    ) : null}
                                                </>
                                            );
                                        })()
                                    ) : null}
                                </span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default InfoBill;
