import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavbarKokomoStyle } from "../../styles/NavbarKokomoStyle";
import useAuth from "../../hooks/useAuth";

const NavbarKokomo = (props) => {
  const {auth} = useAuth()
  let finalNavbar = (
    <Navbar
      bg="light"
      expand="lg"
      className="navbar navbar-expand-sm navbar-light fixed-top"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        paddingBottom: 0,
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
    </Navbar>
  );

  const navbarLogin = (
    <NavbarKokomoStyle>
      <ul>
        {/* eslint-disable-next-line */}
        <li>
          <NavLink
            to="/"
            className="mdi mdi-home"
            exact
            activeClassName="navbar-active-login"
          >
            <span>
              <i className="fas fa-circle dot-kokomo"></i>
            </span>
          </NavLink>
        </li>
        {/* eslint-disable-next-line */}
        <li>
          <NavLink
            to="/my-favourites"
            className="mdi mdi-heart-outline"
            activeClassName="navbar-active-login"
          >
            <span>
              <i className="fas fa-circle dot-kokomo"></i>
            </span>
          </NavLink>
        </li>
        {/* eslint-disable-next-line */}
        <li className="search-icon-menu">
          <NavLink
            to="/search"
            className="mdi mdi-magnify"
            activeClassName="navbar-active-login"
          >
            <span>
              <i className="fas fa-circle dot-kokomo"></i>
            </span>
          </NavLink>
        </li>
        {/* eslint-disable-next-line */}
        <li>
          <NavLink
            to="/my-bookings"
            className="mdi mdi-calendar"
            activeClassName="navbar-active-login"
          >
            <span>
              <i className="fas fa-circle dot-kokomo"></i>
            </span>
          </NavLink>
        </li>
        {/* eslint-disable-next-line */}
        <li>
          <NavLink
            to="/profile"
            className="mdi mdi-account-circle"
            activeClassName="navbar-active-login"
          >
            <span>
              <i className="fas fa-circle dot-kokomo"></i>
            </span>
          </NavLink>
        </li>
      </ul>
    </NavbarKokomoStyle>
  );

  if (auth !== undefined) {
    finalNavbar = navbarLogin;
  }

  return <> {finalNavbar} </>;
};

export default NavbarKokomo;
