import React from 'react'
import { Form, Button, FormGroup, Input } from 'reactstrap'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import AlertMessage from '../layouts/Alert'
const LoginUser = () => {

    const { login } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [alert, setAlert] = useState(null)
    const { username, password } = loginForm
    const submitForm = async event => {
        event.preventDefault()
        try {
            const loginData = await login(loginForm)
            console.log(loginData);
            const { message, success } = loginData
            setAlert({ type: 'danger', message: loginData.message })
            setTimeout(() => {
                setAlert(null)
            }, 2000);
            console.log(loginData);
        } catch (error) {
            console.log(error);
        }

    }
    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <>
            <Form onSubmit={submitForm} >
                <AlertMessage info={alert} />
                <FormGroup>
                    <Input type="text" name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        value={username} />
                </FormGroup>
                <FormGroup>

                    <Input type="password" name="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={handleChange} />
                </FormGroup>
                <Button  >Login</Button>
                <p>ban chua co tai khoan ?</p>
                <Link to='/register'>
                    <Button>Register</Button>
                </Link>
            </Form>
        </>
    )
}

export default LoginUser
