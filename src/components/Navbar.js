import React from 'react'

const Navbar = () => {
    return (
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
}

export default Navbar
