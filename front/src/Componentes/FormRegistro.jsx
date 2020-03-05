import React, { Component } from 'react';
import api from '../Funciones/api';

class FormRegistro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            password: '',
            passwordConfirm: '',
            loading: '',
            error: {
                estado: false,
                mensaje: ''
            },
            success: {
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
            if (this.state.password === this.state.passwordConfirm) {
                this.setState({ error: { estado: false, mensaje: '' }, loading: true });

                const datos = await api('POST', 'register', this.state);

                this.setState({ loading: false });
                this.setState({ error: { estado: !datos.estado, mensaje: datos.respuesta } });
                if (datos.estado) {
                    //Se reinicia formulario
                    this.setState({ success: { estado: true, mensaje: datos.respuesta } }, () => {
                        setTimeout(() => this.setState({ ...this.estadoInicial }), 5000);
                    });
                }
            }
            else {
                this.setState({ error: { estado: true, mensaje: 'La contraseña y la confirmación, deben coincidir' } });
            }

        }
        catch (error) {
            this.setState({ error: { estado: true, mensaje: 'Ocurrió un error al realizar el registro' } });
        }
    }

    render() {
        return (
            <>
                <form className="p-4" onSubmit={this.formResponse} >
                    <div className="form-group px-4 mb-4">
                        <label>Nombre</label>
                        <input value={this.state.name}
                            onChange={this.handleChange}
                            maxLength="60"
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Ingresa tu nombre y apellido"
                            required
                        />
                    </div>
                    <div className="form-group px-4 mb-4">
                        <label>Correo (será tu usuario de ingreso)</label>
                        <input value={this.state.username}
                            onChange={this.handleChange}
                            maxLength="80"
                            className="form-control"
                            type="text"
                            name="username"
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                    <div className="form-group px-4 mb-4">
                        <label>Contraseña</label>
                        <input value={this.state.password}
                            onChange={this.handleChange}
                            maxLength="80"
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Digita tu contraseña"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group px-4 mb-5">
                        <label>Confirmación de contraseña</label>
                        <input value={this.state.passwordConfirm}
                            onChange={this.handleChange}
                            maxLength="80"
                            className="form-control"
                            type="password"
                            name="passwordConfirm"
                            placeholder="Confirma tu contraseña"
                            required
                            autoComplete="off"
                        />
                    </div>
                    {this.state.loading && <div className="text-center" role="alert">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </div>}

                    {this.state.success.estado && <div className="alert alert-success text-center" role="alert">
                        {this.state.success.mensaje}
                    </div>}

                    {this.state.error.estado && <div className="alert alert-danger text-center" role="alert">
                        {this.state.error.mensaje}
                    </div>}

                    {!this.state.loading && <div className="form-group d-flex align-items-center justify-content-center">
                        <button className="btn btn-primary text-14">
                            Registrarse
                        </button>
                    </div>}
                </form>
            </>
        );
    }
}
export default FormRegistro;