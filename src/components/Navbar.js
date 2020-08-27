import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    console.log(props.getTheUser)

    let finalNavbar = (
    <nav className="navbar navbar-expand-sm navbar-light fixed-top" style={{"background-color": "rgb(255, 255, 255)"}}>
        <a className="navbar-brand" href="/">KOKOMO</a>
        <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"><i className="fas fa-bars"></i></button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <a className="nav-link" href="/">Inicio</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signup-local">Tengo un local</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signup">Registrarme ahora</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Iniciar sesión</a>
                </li>
                
            </ul>
        </div>
    </nav>
    )

    const navbarLogin = (
        <nav class="navbar-kokomo">
        <ul>
            {/* eslint-disable-next-line */}
            <li><Link to="/" className="mdi mdi-home"></Link></li>
            {/* eslint-disable-next-line */}
            <li><Link to="/my-favourites" className="mdi mdi-heart-outline"></Link></li>
            {/* eslint-disable-next-line */}
            <li className="search-icon-menu"><Link to="/search" className="mdi mdi-magnify"></Link></li>
            {/* eslint-disable-next-line */}
            <li><Link to="/my-bookings" className="mdi mdi-calendar"></Link></li>
            {/* eslint-disable-next-line */}
            <li><Link to="/profile" className="mdi mdi-account-circle"></Link></li>
            
        </ul>
    </nav>
    )

    if(props.getTheUser !== null) {
        finalNavbar = navbarLogin
    } 

    return (
        <>
            {finalNavbar}
        </>
        
    )
}

export default Navbar
