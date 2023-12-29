import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../services/auth'
const Register = () => {

     const [userRegister, setUserRegister] = useState({})

     const handleRegistration = () => {
          register()
               .then((data) => {
                    console.log(data);
               })
     }

     const onChange = (event) => {
          const { name, value } = event.target;
          const userData = { ...user, [name]: value }
          setUserRegister(userData);
     }
     return (
          <div id="main" className="site-primary">
               <div id="content" className="site-content">
                    <div id="content" className="my-account-page site-content">
                         <div className="container">
                              <nav className="woocommerce-breadcrumb"><ul><li><a href="https://klbtheme.com/blonwe/grocery">Home</a></li><li>My account</li></ul></nav>
                              <div className="woocommerce"><div className="woocommerce-notices-wrapper"></div>


                                   <div className="site-login has-register">
                                        <div className="site-login-inner">
                                             <div className="site-login-overflow">
                                                  <ul className="login-page-tab">
                                                       <li>
                                                            <Link to={'/register'} className='active'>Register</Link></li>
                                                  </ul>
                                                  <div id="customer_login" className="login-form-container">
                                                       <div className="login-form">
                                                            <p>There are many advantages to creating an account: the payment process is faster, shipment tracking is possible and much more.</p>
                                                            <form method="post" className="woocommerce-form woocommerce-form-register register"  >

                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="reg_username">Username&nbsp;<span className="required">*</span></label>
                                                                      <input type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="username" id="reg_username" autoComplete="username" />									</p>


                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="reg_email">Email address&nbsp;<span className="required">*</span></label>
                                                                      <input type="email" className="woocommerce-Input woocommerce-Input--text input-text" name="email" id="reg_email" autoComplete="email" />								</p>


                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="reg_password">Password&nbsp;<span className="required">*</span></label>
                                                                      <input type="password" className="woocommerce-Input woocommerce-Input--text input-text" name="password" id="reg_password" autoComplete="new-password" />
                                                                 </p>
                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="reg_password">Confirm Password&nbsp;<span className="required">*</span></label>
                                                                      <input type="password" className="woocommerce-Input woocommerce-Input--text input-text" name="confirm_password" id="reg_password" autoComplete="new-password" />
                                                                 </p>


                                                                 <div className="woocommerce-privacy-policy-text"><p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="../privacy-policy-2/index.html" className="woocommerce-privacy-policy-link" target="_blank">privacy policy</a>.</p>
                                                                 </div>
                                                                 <p className="woocommerce-form-row form-row">
                                                                      <input type="hidden" id="woocommerce-register-nonce" name="woocommerce-register-nonce" defaultValue="e1a3280ffb" /><input type="hidden" name="_wp_http_referer" defaultValue="/blonwe/grocery/my-account/" />
                                                                      <button type="submit" className="woocommerce-Button woocommerce-button button woocommerce-form-register__submit" name="register" defaultValue="Register">Register</button>
                                                                 </p>
                                                            </form>
                                                       </div>
                                                       <div className="register-form"></div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                              </div>
                         </div>
                    </div>

               </div>
          </div>
     )
}

export default Register