import React from 'react';
import Navbar from '../Componentes/Navbar';
import { Modal } from '../Componentes/Modal';

const Layout = (props) => {
    return (
        <>
            <Navbar />
            <div className="container-fluid py-3">
                {props.children}

                {/* Modal de registro */}
                <Modal target="modalRegistro" titulo="Registro">

                </Modal>

                {/* Modal de log-in */}
                <Modal target="modalLogin" titulo="Log-in">

                </Modal>

                {/* Modal de contacto */}
                <Modal target="modalContacto" titulo="Contacto">

                </Modal>
            </div>
        </>
    );
}

export default Layout;