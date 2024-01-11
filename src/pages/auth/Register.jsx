import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { getUser, register } from '../../services/auth';
import { useAppContext } from '../../provider/AppProvider';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
     const { setUser, setIsLoading } = useAppContext()

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
          setIsLoading(true);
          register(values).then((data)=> {
               if (data.status === 201) {
                    // register success
                    localStorage.setItem('authToken', data.token);
                    getUser().then(data => {
                         setUser(data);
                         navigate("/")
                    })
                    setIsLoading(false);
               } else {
                    setErrorMessage(data.data.message);
                    setIsLoading(false);
               }
          })
     };

     return (
          <Form form={form} name="vertical_login" layout="inline" onFinish={onFinish} className='mx-auto flex flex-col items-center w-[240px] sm:w-[350px] md:w-[400px]'>
               <p style={{ fontSize: '24px' }} className='mb-5' >Login</p>
               <Form.Item
                    name="name"
                    rules={[
                         {
                              required: true,
                              message: 'Please input your username!',
                         }
                    ]}
                    style={{ marginBottom: '20px', width: '100%' }}
               >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
               </Form.Item>
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
                    style={{marginBottom: '20px', width: '100%' }}
               >
                    <Input
                         prefix={<LockOutlined className="site-form-item-icon" />}
                         type="password"
                         placeholder="Password"
                    />
               </Form.Item>
               <Form.Item
                    name="password_confirmation"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                         {
                              required: true,
                              message: 'Please confirm your password!',
                         },
                         ({ getFieldValue }) => ({
                              validator(_, value) {
                                   if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                   }
                                   return Promise.reject('The passwords do not match!');
                              },
                         }),
                    ]}
                    style={{ width: '100%' }}
               >
                    <Input
                         prefix={<LockOutlined className="site-form-item-icon" />}
                         type="password"
                         placeholder="Confirm Password"
                    />
               </Form.Item>
               <Link to={'/login'} className='self-end'>Login</Link>
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
                              Register
                         </Button>
                    )}
               </Form.Item>
          </Form>
     );
};
export default Register;