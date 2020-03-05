import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonModal } from './Modal';
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/"><span role="img" aria-label="Ícono blog">🚀</span> Bloggito</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#menu-principal"
                    aria-controls="menu-principal"
                    aria-expanded="false"
                    aria-label="Menú de navegación"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="menu-principal" className="collapse navbar-collapse">
                    <div className="navbar-nav mr-auto">
                        <NavLink to="/" className="nav-item nav-link" activeClassName="active">Home</NavLink>
                        <NavLink to="/blog" className="nav-item nav-link" activeClassName="active">Blog</NavLink>
                        <ButtonModal clases="nav-item nav-link btn" target="modalContacto">Contacto</ButtonModal>
                    </div>
                    <div className="navbar-nav">
                        <ButtonModal clases="nav-item nav-link btn" target="modalRegistro"><i className="fas fa-user-edit"></i> Regístrate</ButtonModal>
                        <ButtonModal clases="nav-item nav-link btn" target="modalLogin"><i className="fas fa-user-astronaut"></i> Log-in</ButtonModal>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;