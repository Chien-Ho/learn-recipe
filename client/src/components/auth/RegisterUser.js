import React, { useState, useContext } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Alert from '../layouts/Alert'
const RegisterUser = () => {
    const { register } = useContext(AuthContext)
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [alert, setAlert] = useState(null)
    const { username, password, confirmPassword } = registerForm
    const submitForm = async event => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'mat khau khong khop' })
            setTimeout(() => setAlert(null), 2000)
        }
        try {
            const registerData = await register(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: 'dang ki khong thanh cong' })
                setTimeout(() => setAlert(null), 2000)
            }
            console.log(registerData);
        } catch (error) {
            console.log(error);
        }

    }
    const handleChange = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <div>
            <Form onSubmit={submitForm}>
                <Alert info={alert} />
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
                        onChange={handleChange}
                        required
                        value={password} />
                </FormGroup>
                <FormGroup>

                    <Input type="password" name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        value={confirmPassword} />
                </FormGroup>
                <Button>Register</Button>
                <p>ban da co tai khoan ?</p>
                <Link to='/login'>
                    <Button>Login</Button>
                </Link>
            </Form>
        </div>
    )
}

export default RegisterUser
