import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { getUser, login } from '../../services/auth';
import Cookies from 'js-cookie';
import { useAppContext } from '../../provider/AppProvider';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
     const { setUser, setToken } = useAppContext()
     const [form] = Form.useForm();
     const [clientReady, setClientReady] = useState(false);
     const [errorMessage, setErrorMessage] = useState(null);
     const navigate = useNavigate()
     // To disable submit button at the beginning.
     useEffect(() => {
          setClientReady(true);
     }, []);
     const validateEmail = (rule, value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value || value.match(emailRegex)) {
               return Promise.resolve();
          }
          return Promise.reject('Email not valid');
     }
     const onFinish = (values) => {
          login(values)
               .then((response) => {
                    const { data, status, token } = response
                    if (status === 200) {
                         // login success
                         setErrorMessage('')
                         Cookies.set('authToken', token, { expires: 7 });
                         setToken(token);
                         getUser().then(data => {
                              setUser(data);
                              localStorage.setItem('user', JSON.stringify(data))
                              if (data.role === 'owner' || data.role === 'staff') {
                                   navigate("/admin/dashboard")
                              } else {
                                   navigate("/")
                              }
                         })


                    } else {
                         setErrorMessage(data.message)
                    }
               })
     };

     return (
          <Form form={form} name="vertical_login" layout="inline" onFinish={onFinish} className='mx-auto flex flex-col items-center w-[240px] sm:w-[350px] md:w-[400px]'>
               <p style={{ fontSize: '24px' }} className='mb-5' >Login</p>
               <Form.Item
                    name="email"
                    rules={[
                         {
                              required: true,
                              message: 'Please input your email!',
                         },
                         {
                              validator: validateEmail,
                         }
                    ]}
                    style={{marginBottom: '20px', width: '100%'}}
               >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
               </Form.Item>
               <Form.Item
                    name="password"
                    rules={[
                         {
                              required: true,
                              message: 'Please input your password!',
                         },
                    ]}
                    style={{width: '100%'}}
                    
               >
                    <Input
                         prefix={<LockOutlined className="site-form-item-icon" />}
                         type="password"
                         placeholder="Password"
                    />
               </Form.Item>
               <Link to={'/register'} className='self-end'>Register</Link>
               <span className='text-red-500 mb-'>{errorMessage ?? ''}</span>
               <Form.Item shouldUpdate>
                    {() => (
                         <Button
                              type="primary"
                              htmlType="submit"
                              disabled={
                                   !clientReady ||
                                   !form.isFieldsTouched(true) ||
                                   !!form.getFieldsError().filter(({ errors }) => errors.length).length
                              }
                              className='bg-[#4096FF]'
                         >
                              Log in
                         </Button>
                    )}
               </Form.Item>
          </Form>
     );
};
export default Login;