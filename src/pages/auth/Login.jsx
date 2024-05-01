import React, { useEffect, useState } from 'react';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { getUser, login } from '../../services/auth';
import { useAppContext } from '../../provider/AppProvider';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
     const { setUser } = useAppContext()

     const [form] = Form.useForm();
     const [isLogin, setIsLogin] = useState(false)
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
          setIsLogin(true)
          login(values)
               .then((response) => {
                    const { data, status, token } = response
                    if (status === 200) {
                         // login success
                         setErrorMessage('')
                         localStorage.setItem('authToken', token)
                         getUser().then(data => {
                              setUser(data);
                              if (data.role === 'owner' || data.role === 'staff') {
                                   window.location.href = "/admin/dashboard";
                              } else {
                                   window.location.href = "/"
                              }
                         })
                    } else {
                         setIsLogin(false)
                         setErrorMessage(data.message)
                    }
               })
     };

     return (
          <Form form={form} name="vertical_login" layout="inline" onFinish={onFinish} className='flex flex-col mx-auto items-center w-[240px] sm:w-[350px] md:w-[400px]'>
               <p style={{ fontSize: '24px' }} className='mb-5' >Đăng Nhập</p>
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
                    style={{ marginBottom: '20px', width: '100%' }}
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
                    style={{ width: '100%' }}

               >
                    <Input
                         prefix={<LockOutlined className="site-form-item-icon" />}
                         type="password"
                         placeholder="Mật khẩu"
                    />
               </Form.Item>
               <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px'}}>
               <Link to={'/register'} className='self-end' style={{marginRight: '8px'}}>Đăng ký</Link>
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
                              {isLogin && <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#fff', marginRight: '5px'}} spin />}/>}
                              Đăng nhập
                         </Button>
                    )}
               </Form.Item>
               </div>
          </Form>
     );
};
export default Login;