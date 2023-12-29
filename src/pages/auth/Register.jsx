import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, register } from '../../services/auth'
import Joi from 'joi'
import { useAppContext } from '../../provider/AppProvider'
import Cookies from 'js-cookie'
const Register = () => {

     const {setToken, setUser} = useAppContext();
     const [userRegister, setUserRegister] = useState({})
     const navigate = useNavigate()

     const registerSchema = Joi.object({
          name: Joi.string().min(5).max(255).required().messages({
               "any.required": "{{#label}} không được bỏ trống",
               "string.empty": "{{#label}} không được bỏ trống",
               "string.min": "Tối thiểu {#limit} ký tự",
               "string.max": "Tối đa {#limit} ký tự",
          }),
          email: Joi.string().max(255).email({ tlds: { allow: false } }).required().messages({
               "any.required": "{{#label}} không được bỏ trống",
               "string.empty": "{{#label}} không được bỏ trống",
               "string.email": "Email không hợp lệ",
               "string.max": "Tối đa {#limit} ký tự",
          }),
          password: Joi.string().min(8).required().messages({
               "any.required": "Trường này không được để trống",
               "string.min": "Tối thiểu {#limit} ký tự",
          }),
          password_confirmation: Joi.string().min(8).valid(Joi.ref('password')).required().messages({
               "any.required": "Trường này không được để trống",
               "any.only": "Mật khẩu không khớp",
          }),
     })

     const handleRegistration = (event) => {
          event.preventDefault()
          const validationResult = registerSchema.validate(userRegister, { abortEarly: false });
          
          if (validationResult.error) {
               document.querySelectorAll("span[class*='-error']").forEach(error => {error.innerHTML = ''})
               validationResult.error.details.forEach(error => {
                    let input = error.context.label
                    document.querySelector(`.${input}-error`).innerHTML = `${error.message}`
               })
          } else {
               document.querySelectorAll("span[class*='-error']").forEach(error => {error.innerHTML = ''})
               register(userRegister).then((data)=> {
                    if (data.status === 201) {
                         // register success
                         Cookies.set('authToken', data.token, { expires: 2 });
                         setToken(data.token);
                         getUser().then(data => {
                              setUser(data);
                              localStorage.setItem('user',  JSON.stringify(data))
                              navigate("/")
                         })
                    } else {
                         document.querySelector('.general-error').innerHTML = data.data.message;
                    }
               })
          }
     }

     const onChange = (event) => {
          const { name, value } = event.target;
          const userData = { ...userRegister, [name]: value }
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
                                                            <form onSubmit={handleRegistration} method="post" className="woocommerce-form woocommerce-form-register register"  >

                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="reg_username">Username&nbsp;<span className="required">*</span></label>
                                                                      <input onChange={onChange} type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="name" id="reg_username" autoComplete="username" />				
                                                                      <span className='name-error text-danger'></span>				
                                                                 </p>


                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="reg_email">Email address&nbsp;<span className="required">*</span></label>
                                                                      <input onChange={onChange} type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="email" id="reg_email" autoComplete="email" />
                                                                      <span className='email-error text-danger'></span>	
                                                                 </p>


                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="reg_password">Password&nbsp;<span className="required">*</span></label>
                                                                      <input onChange={onChange} type="password" className="woocommerce-Input woocommerce-Input--text input-text" name="password" id="reg_password" autoComplete="new-password" />
                                                                      <span className='password-error text-danger'></span>	
                                                                 </p>
                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="reg_password">Confirm Password&nbsp;<span className="required">*</span></label>
                                                                      <input onChange={onChange} type="password" className="woocommerce-Input woocommerce-Input--text input-text" name="password_confirmation" id="reg_password" autoComplete="new-password" />
                                                                      <span className='password_confirmation-error text-danger'></span>
                                                                 </p>


                                                                 <div className="woocommerce-privacy-policy-text"><p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="../privacy-policy-2/index.html" className="woocommerce-privacy-policy-link" target="_blank">privacy policy</a>.</p>
                                                                 </div>
                                                                 <span className='general-error text-danger'></span>
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