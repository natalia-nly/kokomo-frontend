import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { MainNavbarStyle } from './navbar'

const MainNavbar = () => {
  return (
      
    <MainNavbarStyle
      bg="light"
      expand="lg"
      className="navbar navbar-expand-sm navbar-light sticky-top"
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        paddingBottom: 0
      }}
    >
      <NavLink className="navbar-brand" to="/">
        KOKOMO
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink
            className="nav-link"
            to="/"
            exact
            activeClassName="navbar-active-logout"
          >
            Inicio
          </NavLink>
          <NavLink
            className="nav-link"
            to="/signup-local"
            activeClassName="navbar-active-logout"
          >
            Tengo un local
          </NavLink>
          <NavLink
            className="nav-link"
            to="/signup"
            activeClassName="navbar-active-logout"
          >
            Registrarme ahora
          </NavLink>
          <NavLink
            className="nav-link"
            to="/login"
            activeClassName="navbar-active-logout"
          >
            Iniciar sesión
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </MainNavbarStyle>
  )
}

export default MainNavbar
