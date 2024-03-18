import { AutoComplete, Button, Col, Divider, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import FormatCurrency from '../../../utils/FormatCurrency';
import instance from '../../../core/api';
import { toast } from 'react-toastify';

function ChooseVoucher({ onSelectVoucher, userId }) {
    const [listVoucher, setListVoucher] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const [selectedVoucher, setSelectedVoucher] = useState({});

    const loadData = (searchValue) => {
        instance.get('/get-voucher', {
            params: {
                name: searchValue,
                userId: typeof (userId) === 'number' ? userId : 0
            }
        }).then(({ data }) => {
            setListVoucher(data);
        }).catch(e => {
            console.log(e);
        });
    }


    useEffect(() => {
        loadData(searchValue)
    }, [searchValue, userId])

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const onSelect = (value) => {
        instance.get(`/find-voucher?name=${value}`).then(({ data }) => {
            onSelectVoucher(data[0]);
        }).catch(e => {
            console.log(e);
        });
    };
    return (
        <>
            <Col xl={24}>
                <AutoComplete
                    value={searchValue}
                    onChange={handleSearch}
                    onSelect={onSelect}
                    style={{ width: "100%" }}
                    options={listVoucher.map((item) => ({
                        value: item.name,
                        label: (
                            <>
                                <ul className='list-unstyled'>
                                    <li style={{ fontWeight: 600 }}>{item.name} <span style={{ float: 'right', color: 'red' }}>{item.code}</span></li>
                                    <li>Phần trăm giảm: {item.value}% <span style={{ float: 'right' }}>Đơn tối thiểu: <span style={{ color: 'red' }}><FormatCurrency props={item.min_bill_value} /></span></span></li>
                                </ul>
                            </>
                        ),
                    }))}
                >
                    <Input.Search placeholder="Tìm kiếm voucher..." />
                </AutoComplete>
            </Col>
        </>
    )
}

export default ChooseVoucher