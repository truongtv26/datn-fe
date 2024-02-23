import { InputNumber } from 'antd'
import React from 'react'

const ChangeQuantity = ({ record, cartItemAction, setCartItemAction }) => {
	const cartData = JSON.parse(localStorage.getItem('cart'))

	const onChange = (value)=>{
		const newData = cartData.map((item)=>{
			if (item.variant_id === record.variant) {
				return { ...item, quantity: value}
			} else {
				return item
			}
		})
		localStorage.setItem('cart', JSON.stringify(newData))
		setCartItemAction(!cartItemAction)
	}

	return (
		<InputNumber size="small" min={1} max={record.action.quantity} defaultValue={record.quantity} onChange={onChange} />
	)
}

export default ChangeQuantity