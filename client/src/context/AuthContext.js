import React, { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducer/authReducer'
import { apiUrl, TOKEN_NAME } from '../constants/authConstants'
import axios from 'axios'
import setToken from '../utils/setToken'

export const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isLoading: true,
        isAuthenticated: false,
        user: null
    })
    //authenticate

    const loadAuth = async () => {
        if (localStorage[TOKEN_NAME]) {
            setToken(localStorage[TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth`)
            console.log(response);
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {

            localStorage.removeItem(TOKEN_NAME)
            setToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }
    useEffect(() => loadAuth(), [])
    const login = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(`${TOKEN_NAME}`, response.data.accessToken)
            }
            await loadAuth()
            return response.data
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }
    const register = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if (response.data.success) {
                localStorage.setItem(`${TOKEN_NAME}`, response.data.accessToken)
            }
            await loadAuth()
            return response.data
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }
    const logout = () => {
        localStorage.removeItem(TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }
    const authContextData = { login, register, authState, logout }
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
