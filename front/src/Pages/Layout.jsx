import React from 'react';
import Navbar from '../Componentes/Navbar';
import { Modal } from '../Componentes/Modal';
import FormLogin from '../Componentes/FormLogin';
import FormRegistro from '../Componentes/FormRegistro';
import FormContacto from '../Componentes/FormContacto';

const Layout = (props) => {
    return (
        <>
            <Navbar />
            <div className="container-fluid p-0">
                {props.children}

                {/* Modal de registro */}
                <Modal target="modalRegistro" titulo="Registro">
                    <FormRegistro />
                </Modal>

                {/* Modal de log-in */}
                <Modal target="modalLogin" titulo="Log-in">
                    <FormLogin />
                </Modal>

                {/* Modal de contacto */}
                <Modal target="modalContacto" titulo="Contacto">
                    <FormContacto />
                </Modal>
            </div>
        </>
    );
}

export default Layout;