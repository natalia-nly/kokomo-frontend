import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  let finalNavbar = (
    <nav
      className="navbar navbar-expand-sm navbar-light fixed-top"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        paddingBottom: 0
      }}
    >
      <NavLink className="navbar-brand" to="/">
        KOKOMO
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact activeClassName="navbar-active-logout">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup-local" activeClassName="navbar-active-logout">
              Tengo un local
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup" activeClassName="navbar-active-logout">
              Registrarme ahora
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login" activeClassName="navbar-active-logout">
              Iniciar sesión
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );

  const navbarLogin = (
    <nav className="navbar-kokomo">
      <ul>
        {/* eslint-disable-next-line */}
        <li>
          <NavLink to="/" className="mdi mdi-home" ></NavLink>
        </li>
        {/* eslint-disable-next-line */}
        <li>
          <NavLink to="/my-favourites" className="mdi mdi-heart-outline"></NavLink>
        </li>
        {/* eslint-disable-next-line */}
        <li className="search-icon-menu">
          <a href="/search" className="mdi mdi-magnify" ></a>
        </li>
        {/* eslint-disable-next-line */}
        <li>
          <NavLink to="/my-bookings" className="mdi mdi-calendar"></NavLink>
        </li>
        {/* eslint-disable-next-line */}
        <li>
          <NavLink to="/profile" className="mdi mdi-account-circle"></NavLink>
        </li>
      </ul>
    </nav>
  );

  if (props.getTheUser !== null) {
    finalNavbar = navbarLogin;
  }

  return <> {finalNavbar} </>;
};

export default Navbar;
