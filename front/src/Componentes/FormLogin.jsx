import React, { Component } from 'react';
import api from '../Funciones/api';

class FormLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: '',
            error: {
                estado: false,
                mensaje: ''
            }
        }
        this.estadoInicial = this.state;
    }

    handleChange = (event) => {
        const target = event.target;
        const valor = target.value;
        const nombreCampo = target.name;

        this.setState({
            [nombreCampo]: valor
        });
    }

    formResponse = async (e) => {
        e.preventDefault();

        try {
            this.setState({ error: { estado: false, mensaje: '' }, loading: true });
            const datos = await api('POST', 'api/login_check', this.state);

            this.setState({ loading: false });
            if (datos.token) {
                sessionStorage.setItem('token', datos.token);
                //Se reinicia formulario
                this.setState({ ...this.estadoInicial });
            } else {
                this.setState({ error: true });
                this.setState({ error: { estado: true, mensaje: 'No fue posible realizar el log-in' } });
            }
        }
        catch (error) {
            this.setState({ error: { estado: true, mensaje: 'Ocurrió un error al realizar el log-in' } });
        }
    }

    render() {
        return (
            <>
                <form className="p-4" onSubmit={this.formResponse} >
                    <div className="form-group px-4 mb-5 text-center h2">
                        <span role="img" aria-label="Ícono blog">🚀</span><br />Bloggito
                    </div>
                    <div className="form-group px-4 mb-4">
                        <input value={this.state.correo}
                            onChange={this.handleChange}
                            className="form-control text-center"
                            type="text"
                            name="username"
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                    <div className="form-group px-4 mb-5">
                        <input value={this.state.clave}
                            onChange={this.handleChange}
                            className="form-control text-center"
                            type="password"
                            name="password"
                            placeholder="Digita tu contraseña"
                            required
                            autoComplete="on"
                        />
                    </div>
                    {this.state.loading && <div className="text-center" role="alert">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </div>}

                    {this.state.error.estado && <div className="alert alert-danger text-center" role="alert">
                        {this.state.error.mensaje}
                    </div>}

                    {!this.state.loading && <div className="form-group d-flex align-items-center justify-content-center">
                        <button className="btn btn-success text-14">
                            Acceder
                        </button>
                    </div>}
                </form>
            </>
        );
    }
}
export default FormLogin;