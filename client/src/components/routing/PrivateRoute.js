import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Spinner } from 'reactstrap'
import { Route, Redirect } from 'react-router-dom'
import NavbarMenu from '../layouts/NavbarMenu'
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authState: { isLoading, isAuthenticated } } = useContext(AuthContext)
    if (isLoading) {
        return <Spinner color="warning" />
    }
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <>
                        <NavbarMenu />
                        <Component {...rest} {...props} />
                    </>
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    )
}

export default PrivateRoute
