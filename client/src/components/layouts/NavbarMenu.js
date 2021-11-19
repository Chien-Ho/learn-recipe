import React, { useState, useContext } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import { FaSignOutAlt } from 'react-icons/fa'
import logo from '../../assets/logo.jpg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const NavbarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const { authState: {
        user: { username }
    }, logout } = useContext(AuthContext)

    const logoutUser = () => {
        return logout()
    }
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand to='/dashboard' tag={Link}><img src={logo} alt="logo" width='32'
                    height='32' />Recipes</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" >
                        <NavItem>
                            <NavLink to='/dashboard' tag={Link}>Dashboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/about' tag={Link}>About</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="right-navbar">
                        <NavItem>
                            <NavLink disabled className="text-capitalize" >welcome {username}</NavLink>
                        </NavItem>
                        <Button color="info" onClick={logoutUser}>
                            <FaSignOutAlt />Logout
                        </Button>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarMenu
