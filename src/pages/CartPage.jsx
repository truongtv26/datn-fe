import { BellOutlined, CloseOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, Table, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const prodactCartData = [
    {
        id: 1,
        name: "Signature Wood-Fired Mushroom and Caramelized Red Onion Frozen Pizza",
        image: "https://klbtheme.com/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47.png",
        price: 1552003,
        quantity: 2,
        subtotal: "155.03"

    },
    {
        id: 2,
        name: "The Famous Grouse Finest Blended Scotch Whisky",
        image: "https://klbtheme.com/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47.png",
        price: 1231290,
        quantity: 4,
        subtotal: "11.00"

    },
    {
        id: 3,
        name: "Shower gel LE PETIT MARSEILLAIS Vanilla, 250ml",
        image: "https://klbtheme.com/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-46.png",
        price: 12389123,
        quantity: 1,
        subtotal: "2.30"

    },
]

const CartPage = () => {


    return (

        <div className="container mx-auto">

            <div className="top-content">
                <a href="">Home {`>`} </a><span>Cart</span>
            </div>

            <div className="content-cart">

                <div className="left-content">

                    <div className="freeship">

                        <p className="sucsess"><BellOutlined />   Your oder qualifies for free shipping!</p>

                        {/* <p className="danger"> <BellOutlined style={{ color: "#000" }} />   Add <span>$82.51</span> to cart and get free shipping!</p> */}

                        <div className="freeship-progress"><span></span></div>

                    </div>

                    <div className="table-cart">

                        <table>
                            <thead>
                                <tr className="title">
                                    <td></td>
                                    <td>Product</td>
                                    <td>Price</td>
                                    <td>Quantily</td>
                                    <td>Subtotal</td>
                                    <td></td>
                                </tr>
                            </thead>

                            <tbody>
                                {prodactCartData.map((productcart, index) => {
                                    return <tr className="product" key={index}>
                                        <td><img src={productcart.image} style={{ width: '100px', height: '100px' }} alt="imageProduct" /></td>
                                        <td><Link style={{ color: '#000' }} to={`product/${productcart.id}`}>{productcart.name}</Link></td>
                                        <td> <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productcart.price)}</p></td>
                                        <td>
                                            <form action="" method="post" className="form-quanlity">
                                                <div className="quanlity">

                                                    <MinusOutlined style={{ cursor: 'pointer' }} />
                                                    <input
                                                        type="text"
                                                        id="quantity_65855a72d93e9"
                                                        className="input-text qty text"
                                                        name="cart[47d1e990583c9c67424d369f3414728e][qty]"
                                                        defaultValue={productcart.quantity}
                                                        aria-label="Product quantity"
                                                        size="4"
                                                        min="0"
                                                        max=""
                                                        step="1"
                                                        placeholder=""
                                                        inputMode="numeric"
                                                        autoComplete="off"
                                                    />
                                                    <PlusOutlined style={{ cursor: 'pointer' }} />
                                                </div>
                                            </form>
                                        </td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productcart.price)}</td>
                                        <td><CloseOutlined style={{ color: '#fff', border: '1px solid red', borderRadius: '50%', backgroundColor: 'red', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }} /></td>
                                    </tr>


                                })}
                            </tbody>

                            {/* <tr className="product"> */}


                            {/* <td><img src="https://klbtheme.com/blonwe/grocery/wp-content/uploads/sites/5/2023/05/image-1-47.png" style={{ width: '100px', height: '100px' }} alt="imageProduct" /></td>
                                <td>Signature Wood-Fired Mushroom and Caramelized Red Onion Frozen Pizza</td>
                                <td>$155.03</td>
                                <td>
                                    <form action="" method="post" className="form-quanlity">
                                        <div className="quanlity">

                                            <MinusOutlined style={{ cursor: 'pointer' }} />
                                            <input
                                                type="text"
                                                id="quantity_65855a72d93e9"
                                                class="input-text qty text"
                                                name="cart[47d1e990583c9c67424d369f3414728e][qty]"
                                                value="2"
                                                aria-label="Product quantity"
                                                size="4"
                                                min="0"
                                                max=""
                                                step="1"
                                                placeholder=""
                                                inputmode="numeric"
                                                autocomplete="off"
                                            />
                                            <PlusOutlined style={{ cursor: 'pointer' }} />
                                        </div>
                                    </form>
                                </td>
                                <td>$155.03</td>
                                <td><CloseOutlined style={{ color: '#fff', border: '1px solid red', borderRadius: '50%', backgroundColor: 'red', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }} /></td>
                            </tr> */}

                            {/* {productData.map((product, index) => {
                                return <Link key={index} to={`product/${product.id}`}>
                                        
                                        <td className="image"><img src={product.image} style={{ width: '100px', height: '100px' }} alt="imageProduct" /></td>
                                        <td className="name">{product.name}</td>
                                        <td className="price">${product.price}</td>
                                        <td className="quantity">
                                            <form action="" method="post" className="form-quanlity">
                                                <div className="quanlity">

                                                    <MinusOutlined style={{ cursor: 'pointer' }} />
                                                    <input
                                                        type="text"
                                                        id="quantity_65855a72d93e9"
                                                        class="input-text qty text"
                                                        name="cart[47d1e990583c9c67424d369f3414728e][qty]"
                                                        value={product.quantity}
                                                        aria-label="Product quantity"
                                                        size="4"
                                                        min="0"
                                                        max=""
                                                        step="1"
                                                        placeholder=""
                                                        inputmode="numeric"
                                                        autocomplete="off"
                                                    />
                                                    <PlusOutlined style={{ cursor: 'pointer' }} />
                                                </div>
                                            </form>
                                        </td>
                                        <td className="subtotal">${product.subtotal}</td>
                                        <td><CloseOutlined style={{ color: '#fff', border: '1px solid red', borderRadius: '50%', backgroundColor: 'red', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }} /></td>
                                    
                                </Link>
                            })} */}


                        </table>

                        <div className="code-sale">
                            <form action="" method="post">

                                <div className="sale">
                                    <div className="couponcode">

                                        <label htmlFor="">Coupon:</label>
                                        <Input placeholder="Coupon Code" />

                                    </div>

                                    <Button type="primary">
                                        Apply Coupon
                                    </Button>
                                </div>

                                <div className="clearall">
                                    <Button type="primary">
                                        Clear All
                                    </Button>
                                </div>

                            </form>
                        </div>

                    </div>

                </div>

                <div className="right-content">
                    <div className="cart-total">
                        <div className="totals">
                            <h2>Cart Totals</h2>

                            <div className="subtotal">
                                <p>Subtotal</p>

                                <p><span>$</span>155.03</p>
                            </div>

                            <div className="shipping">
                                <p className="ship">Shipping</p>

                                <div className="data-shipping">

                                    <form action="" method="post">
                                        <label htmlFor="">Flat rate: <span>$15.00</span></label>
                                        <input type="radio" name="ship" id="" />
                                        <br />
                                        <label htmlFor="" className="local">Local pickup</label>
                                        <input type="radio" name="ship" id="" />
                                    </form>

                                    <p className="ca">Shipping to <strong>CA</strong></p>

                                    <div className="change">

                                        <a href="">Change address</a>

                                        <form action="" method="post">

                                            <p>
                                                <select name="" id="">
                                                    <option value="1">Việt Nam</option>
                                                    <option value="2">Trung Quốc</option>
                                                </select>
                                                <br />
                                                <input type="text" name="" id="" placeholder="Cty" />
                                                <br />
                                                <input type="text" name="" id="" placeholder="Postcode / ZIP" />
                                            </p>

                                            <p><Button type="primary" style={{ width: '88px', height: '42px' }}>
                                                Update
                                            </Button></p>
                                        </form>
                                    </div>

                                </div>
                            </div>

                            <div className="totalall">
                                <p>Total</p>
                                <p className="money"><span>$</span>155.03</p>
                            </div>

                            <p><Button type="primary" style={{ width: '100%', height: '42px', fontSize: '15px', fontWeight: '700', backgroundColor: '#004745', marginTop: '10px' }}>
                                <a href="">Proceed to checkout</a>
                            </Button></p>


                        </div>
                    </div>
                </div>

            </div>




            {/* <div>

                <input
                    type="text"
                    id="quantity_65855a72d93e9"
                    class="input-text qty text"
                    name="cart[47d1e990583c9c67424d369f3414728e][qty]"
                    value="2"
                    aria-label="Product quantity"
                    size="4"
                    min="0"
                    max=""
                    step="1"
                    placeholder=""
                    inputmode="numeric"
                    autocomplete="off"
                />

            </div> */}



            {/* <div className="">
			<p className="">Your order qualifies for free shipping!</p>
			<div className=""> <span style="width: 100%"></span></div>
		    </div> */}







        </div>


    )


}

export default CartPage;