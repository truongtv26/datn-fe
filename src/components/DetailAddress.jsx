import React from 'react'
import { useState, useEffect } from 'react';
import instance from '../core/api';

function DetailAddress({ prov, distr, war }) {
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const configApi = {
        headers: {
            Token: "aef361b5-f26a-11ed-bc91-ba0234fcde32",
            "Content-Type": "application/json",
            ShopId: 124173,
        },
    };

    useEffect(() => {
        instance
            .get(
                "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
                configApi
            )
            .then((response) => {
                setProvince(response.data.data.find((item) => item.ProvinceID === parseInt(prov)).ProvinceName)
            })
            .catch((e) => {
                console.log(e);
            });

        instance
            .get(
                `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${prov}`,
                configApi
            )
            .then((response) => {
                setDistrict(response.data.data.find((item) => item.DistrictID === parseInt(distr)).DistrictName);
            })
            .catch((e) => {
                console.log(e);
            });
        instance
            .get(
                `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${distr}`,
                configApi
            )
            .then((response) => {
                setWard(response.data.data.find((item) => item.WardCode === war).WardName);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [distr, prov, war]);
    return (
        <>
            {`${ward}, ${district}, ${province}`}
        </>
    )
}

export default DetailAddress;