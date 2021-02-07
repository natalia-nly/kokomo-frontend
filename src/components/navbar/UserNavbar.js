import React from 'react'
import { UserNavbarDesktopStyle, UserNavbarStyle } from './navbar'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'

const UserNavbar = () => {
  const { auth } = useAuth()
  const navbarMobile = (
    <UserNavbarStyle>
      <ul>
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
    </UserNavbarStyle>
  )

  const navbarDesktop = (
    <UserNavbarDesktopStyle className="sticky-top">
     <div className="container">
     <NavLink className="navbar-brand" to="/">
        KOKOMO
      </NavLink>
      <Nav className="ml-auto">
          <NavLink
            className="nav-item"
            to="/my-favourites"
            activeClassName="navbar-active"
          >
            <i className="mdi mdi-heart-outline mr-2" />
            Mis favoritos
          </NavLink>
          <NavLink
            className="nav-item"
            to="/my-bookings"
            activeClassName="navbar-active"
          >
            <i className="mdi mdi-calendar mr-2" />
            Mis reservas
          </NavLink>
          <NavLink
            className="nav-item"
            to="/profile"
            activeClassName="navbar-active"
          >
            <img src={auth.avatar} alt="Avatar" className="navbar-avatar"/>
            {auth.username}
          </NavLink>
          <NavLink
            className="nav-item"
            to="/notifications"
            activeClassName="navbar-active"
          >
            <i className="mdi mdi-bell-outline"/>
          </NavLink>
          
        </Nav>
     </div>
    </UserNavbarDesktopStyle>
  )
  return window.innerWidth > 1000 ? navbarDesktop : navbarMobile
}

export default UserNavbar
