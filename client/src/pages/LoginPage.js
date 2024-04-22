import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form, Input, message } from 'antd'
import axios from 'axios'
import Spinners from '../components/layout/Spinners'

const LoginPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const submitHandler= async (values) => {
        try {
            setLoading(true)
            const {data} = await axios.post('/users/login', values)
            message.success("Successfully login")
            localStorage.setItem('user', JSON.stringify({...data.user,password:''}))
            setLoading(false)
            navigate('/')
        } catch (err) {
            setLoading(false)
            message.error('Invalid Credentials');
        }
    }

    useEffect(() => {
        if(localStorage.getItem('user')) {
            navigate('/')
        }
    },[navigate])
  return (
    <>
        <div className='register-page'>
            {loading && <Spinners/>}
            <Form layout= "vertical" onFinish={submitHandler}>
                <h1>Login Form</h1>
                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password'  />
                </Form.Item>
                <div className='d-flex justify-content-between' >
                    <div>
                        <div>Not a User?</div>         
                        <Link to ='/register'>Click here to register?</Link>
                    </div>
                    <div>
                        <button className='btn btn-primary' >Login</button>
                    </div>
                    
                </div>
            </Form>
        </div>
    </>
  )
}

export default LoginPage