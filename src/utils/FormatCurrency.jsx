import React from 'react'

const FormatCurrency = ({props}) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };
    return (
        formatCurrency(props)
    )
}

export default FormatCurrency