import React from 'react'
import LoginForm from '../components/auth/LoginUser'
import RegisterForm from '../components/auth/RegisterUser'
import { AuthContext } from '../context/AuthContext'
import { Spinner } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { useContext } from 'react'
const Auth = ({ authRoute }) => {
    const { authState: { isLoading, isAuthenticated } } = useContext(AuthContext)

    let body
    if (isLoading) {
        body = (
            <div className="d-flex justify-content-center"><Spinner type="border" color="info" size="lg" /></div>
        )
    } else if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    } else
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </>
        )
    return (
        <div>
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-tittle">
                        <h1>Tasty Recipes</h1>
                        <h4>Cooking is easy, people make it complicated</h4>
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
