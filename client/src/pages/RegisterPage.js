import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form, Input, message } from 'antd'
import axios from 'axios'
import Spinners from '../components/layout/Spinners'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const submitHandler= async (values) => {
        try {
            setLoading(true)
            await axios.post('/users/register', values)
            message.success("Successfully registered")
            setLoading(false)
            navigate('/login')
        } catch (err) {
            setLoading(false)
            message.error('Something went wrong');
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
                <h1>Register Form</h1>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password'  />
                </Form.Item>
                <div className='d-flex justify-content-between' >
                    <div>
                        <div>Already Registered?</div>         
                        <Link to ='/login'>Click here to login?</Link>
                    </div>
                    <div>
                        <button className='btn btn-primary' >Register</button>
                    </div>
                    
                </div>
            </Form>
        </div>
    </>
  )
}

export default RegisterPage