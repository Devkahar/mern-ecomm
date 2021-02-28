import React from 'react'
import "./Header.css"
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='transprant' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
            <img
              src="https://happisips.com/wp-content/uploads/2021/02/Logo.png"
              width="220"
              height="50"
              className="d-inline-block align-top"
              alt="happisips logo"
            />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto ml-auto headerLinks'>
            
              <LinkContainer to='/about'>
                <Nav.Link>
                  About US
                </Nav.Link>
              </LinkContainer>
            <LinkContainer to='/store'>
                <Nav.Link>
                  Store
                </Nav.Link>
              </LinkContainer>
            <LinkContainer to='/blog'>
                <Nav.Link>
                  Blog
                </Nav.Link>
              </LinkContainer>
              
            </Nav>
            <Nav className='ml-auto headerLinks'>
              
              
              
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username' headerLinks>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> LogIn
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' headerLinks>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/couponList'>
                    <NavDropdown.Item>Coupons</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>
                </Nav.Link>
              </LinkContainer>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
