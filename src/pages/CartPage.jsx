import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../core/api"
import CartTableDetail from "../components/cart/CartTableDetail";
import { useAppContext } from "../provider/AppProvider";

const CartPage = () => {

    const [cartItems, setCartItems] = useState([])
    const { cartItemAction, setCartItemAction } = useAppContext()

    // lấy dữ liệu giỏ hàng
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        instance.post(`/cart`, cartItems).then(({ data }) => {
            const allNull = data.every(item => item === null)
            if (!allNull) {
                setCartItems(data)
            }
        })
    }, [cartItemAction])

    return (
        <div className="container mx-auto">
            <div className="top-content">
                <a href="">Home {`>`} </a><span>Cart</span>
            </div>
            <div className="content-cart">
                {
                    Object.keys(cartItems).length > 0
                        ? <CartTableDetail data={cartItems} cartItemAction={cartItemAction} setCartItemAction={setCartItemAction} />
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
            </div>
        </div>
    )


}

export default CartPage;