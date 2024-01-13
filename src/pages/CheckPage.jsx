import { BellOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const CheckPage = () => {
    return (
        <div className="container mx-auto">

            <div className="top-content">
                <a href="">Home {`>`} </a><span>Cart</span>
            </div>

            <div className="notification">

                <p className="sucsess"><BellOutlined style={{ color:'red' }} /> Have a coupon? Click here to enter your code</p>

            </div>

            <div className="content-cart">

                <div className="left-content">

                    <div className="freeship">

                        <p className="sucsess"><BellOutlined />   Your oder qualifies for free shipping!</p>

                        {/* <p className="danger"> <BellOutlined style={{ color: "#000" }} />   Add <span>$82.51</span> to cart and get free shipping!</p> */}

                        <div className="freeship-progress"><span></span></div>

                    </div>

                    <div className="form-confirm">

                        <form action="" method="post">

                            <div className="title-form">
                                <p>Billing details</p>
                            </div>

                            <div className="name">
                                <div className="first-name">
                                    <label htmlFor="">First name * :</label>
                                    <input className="form-control" type="text" name="" id="" />
                                </div>
                                <div className="last-name">
                                    <label htmlFor="">Last name * :</label>
                                    <input className="form-control" type="text" name="" id="" />
                                </div>
                            </div>

                            <div className="information">
                                <label htmlFor="">Company name (optional)</label>
                                <input className="form-control" type="text" name="" id="" />
                            </div>

                            <div className="information">
                                <label htmlFor="">Country / Region *</label>
                                <select name="" id="" className="form-control">
                                    <option value="1">Việt Nam</option>
                                    <option value="2">Trung Quốc</option>
                                </select>
                            </div>

                            <div className="information">
                                <label htmlFor="">Street address *</label>
                                <input className="form-control" type="text" name="" id="" placeholder="House number and street name" />
                                <input className="form-control" type="text" name="" id="" placeholder="Apartment, suite, unit, etc. (optional)" />

                            </div>

                            <div className="information">
                                <label htmlFor="">Town / City *</label>
                                <input className="form-control" type="text" name="" id="" />
                            </div>

                            <div className="information">
                                <label htmlFor="">State *</label>
                                <select name="" id="" className="form-control">
                                    <option value="1">Hà Nội</option>
                                    <option value="2">TP Hồ Chí Minh</option>
                                </select>
                            </div>

                            <div className="information">
                                <label htmlFor="">ZIP Code *</label>
                                <input className="form-control" type="text" name="" id="" />
                            </div>

                            <div className="information">
                                <label htmlFor="">Phone *</label>
                                <input className="form-control" type="text" name="" id="" />
                            </div>

                            <div className="information">
                                <label htmlFor="">Email address *</label>
                                <input className="form-control" type="text" name="" id="" />
                            </div>

                            <div className="checkbox">
                                <input type="checkbox" name="" id="" /><label htmlFor="">Create an account?</label>
                            </div>

                            <div className="account">
                                <div className="information">
                                    <label htmlFor="">Account username *</label>
                                    <input className="form-control" type="text" name="" id="" placeholder="Username" />
                                </div>
                                <div className="information">
                                    <label htmlFor="">Create account password *</label>
                                    <input className="form-control" type="text" name="" id="" placeholder="Password" />
                                </div>
                            </div>

                            <div className="checkbox">
                                <input type="checkbox" name="" id="" /><label style={{ color: '15px', fontWeight: '700' }} htmlFor="">Ship to a different address?</label>
                            </div>

                            <div className="different-address">

                                <div className="name">
                                    <div className="first-name">
                                        <label htmlFor="">First name * :</label>
                                        <input className="form-control" type="text" name="" id="" />
                                    </div>
                                    <div className="last-name">
                                        <label htmlFor="">Last name * :</label>
                                        <input className="form-control" type="text" name="" id="" />
                                    </div>
                                </div>

                                <div className="information">
                                    <label htmlFor="">Company name (optional)</label>
                                    <input className="form-control" type="text" name="" id="" />
                                </div>

                                <div className="information">
                                    <label htmlFor="">Country / Region *</label>
                                    <select name="" id="" className="form-control">
                                        <option value="1">Việt Nam</option>
                                        <option value="2">Trung Quốc</option>
                                    </select>
                                </div>

                                <div className="information">
                                    <label htmlFor="">Street address *</label>
                                    <input className="form-control" type="text" name="" id="" placeholder="House number and street name" />
                                    <input className="form-control" type="text" name="" id="" placeholder="Apartment, suite, unit, etc. (optional)" />

                                </div>

                                <div className="information">
                                    <label htmlFor="">Town / City *</label>
                                    <input className="form-control" type="text" name="" id="" />
                                </div>

                                <div className="information">
                                    <label htmlFor="">State *</label>
                                    <select name="" id="" className="form-control">
                                        <option value="1">Hà Nội</option>
                                        <option value="2">TP Hồ Chí Minh</option>
                                    </select>
                                </div>

                                <div className="information">
                                    <label htmlFor="">ZIP Code *</label>
                                    <input className="form-control" type="text" name="" id="" />
                                </div>

                                <div className="information">
                                    <label htmlFor="">Phone *</label>
                                    <input className="form-control" type="text" name="" id="" />
                                </div>

                                <div className="information">
                                    <label htmlFor="">Email address *</label>
                                    <input className="form-control" type="text" name="" id="" />
                                </div>
                            </div>

                            <div className="oner">
                                <label htmlFor="">Order notes (optional)</label>
                                <textarea name="" id="" cols="30" rows="10" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                            </div>

                        </form>

                    </div>


                </div>

                <div className="right-content">

                    <div className="cart-total">

                        <div className="totals">
                            <h2>Your order</h2>

                            <div className="subtotal-checkout">
                                <p>Product</p>

                                <p>Subtotal</p>
                            </div>

                            <div className="subtotal">
                                <p>The Famous Grouse Finest  <span>× 1</span></p>

                                <p>$11.00</p>
                            </div>

                            <div className="subtotal">
                                <p>Subtotal</p>

                                <p><span>$</span>155.03</p>
                            </div>

                            <div className="shipping-checkout">
                                <p className="ship">Shipping</p>

                                <div className="data-shipping">

                                    <form action="" method="post">
                                        <label htmlFor="">Flat rate: <span>$15.00</span></label>
                                        <input type="radio" name="ship" id="" />
                                        <br />
                                        <label htmlFor="" className="local">Local pickup</label>
                                        <input type="radio" name="ship" id="" />
                                    </form>

                                    {/* <p className="ca">Shipping to <strong>CA</strong></p>

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
                                    </div> */}

                                </div>
                            </div>

                            <div className="totalall">
                                <p>Total</p>
                                <p className="money"><span>$</span>155.03</p>
                            </div>

                            <form action="" method="post" className="checkout">
                                    <div className="infor">
                                        <input type="radio" name="checkout" id="" /><label htmlFor="">Direct bank transfer</label>
                                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                    </div>

                                    <div className="infor">
                                        <input type="radio" name="checkout" id="" /><label htmlFor="">Check payments</label>
                                        <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                    </div>

                                    <div className="infor">
                                        <input type="radio" name="checkout" id="" /><label htmlFor="">Cash on delivery</label>
                                        <p>Pay with cash upon delivery.</p>
                                    </div>

                                    <p className="">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="">privacy policy</a>.</p>

                                    <div className="infor">
                                        <input type="checkbox" name="checkout" id="" /><label htmlFor="">I have read and agree to the website <a href="">terms and conditions</a> *</label>
                                        <p>Pay with cash upon delivery.</p>
                                    </div>

                            </form>

                            <p><Button type="primary" style={{ width: '100%', height: '42px', fontSize: '15px', fontWeight: '700', backgroundColor: '#004745', marginTop: '10px' }}>
                                <a href="">Place order</a>
                            </Button></p>


                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CheckPage