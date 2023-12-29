import React, { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, login } from '../../services/auth'
import { useAppContext } from '../../provider/AppProvider'
const Login = () => {
     const [remember, setRemember] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');
     const { user, setUser, setToken, setWebToken } = useAppContext()
     const navigate = useNavigate()

     const handleLogin = (event) => {
          event.preventDefault();
          login(user)
               .then((response) => {
                    
                    const { data, status, token } = response
                    if (status === 200) {
                         // login success
                         setErrorMessage('')
                         Cookies.set('authToken', token, { expires: 2 });
                         setToken(token);
                         getUser().then(data => {
                              setUser(data);
                              localStorage.setItem('user',  JSON.stringify(data))
                              navigate("/")
                         })
                         
                         
                    } else {
                         setErrorMessage(data.message)
                    }
               })
     }

     const onChange = (event) => {
          const { name, value } = event.target;
          const userLogin = { ...user, [name]: value }
          setUser(userLogin);
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
                                                            <Link to={'/login'} className='active'>Login</Link></li>
                                                  </ul>
                                                  <div id="customer_login" className="login-form-container">
                                                       <div className="login-form">
                                                            <p>If you have an account, sign in with your username or email address.</p>
                                                            <form onSubmit={handleLogin} className="woocommerce-form woocommerce-form-login login" method="post">

                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="username">Username or email address&nbsp;<span className="required">*</span></label>
                                                                      <input onChange={onChange} type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="email" id="username" autoComplete="username" defaultValue="" />							</p>
                                                                 <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                                      <label htmlFor="password">Password&nbsp;<span className="required">*</span></label>
                                                                      <input onChange={onChange} className="woocommerce-Input woocommerce-Input--text input-text" type="password" name="password" id="password" autoComplete="current-password" />
                                                                 </p>
                                                                 <div id="errorLogin">{errorMessage}</div>

                                                                 <div className="lost-password">
                                                                      <p className="form-row">
                                                                           <label className="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
                                                                                <input className="woocommerce-form__input woocommerce-form__input-checkbox" name="rememberme" type="checkbox" id="rememberme" defaultValue="forever" /> <span>Remember me</span>
                                                                           </label>
                                                                      </p>
                                                                      <p className="woocommerce-LostPassword lost_password">
                                                                           <a href="lost-password/index.html">Lost your password?</a>
                                                                      </p>
                                                                 </div>

                                                                 <input type="hidden" id="woocommerce-login-nonce" name="woocommerce-login-nonce" defaultValue="b2c7a959cd" /><input type="hidden" name="_wp_http_referer" defaultValue="/blonwe/grocery/my-account/" />
                                                                 <button type="submit" className="woocommerce-button button woocommerce-form-login__submit" name="login" defaultValue="Log in">Log in</button>
                                                                 <div><span>If you don't have account </span><Link to={'/register'} className='text-primary'>Register</Link></div>
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

export default Login