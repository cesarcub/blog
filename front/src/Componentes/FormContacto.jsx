import React, { Component } from 'react';
import api from '../Funciones/api';

class FormContacto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            correo: '',
            mensaje: '',
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
            this.setState({ error: { estado: false, mensaje: '' }, loading: true });

            const datos = await api('POST', 'contacto', this.state);

            this.setState({ loading: false });
            this.setState({ error: { estado: !datos.estado, mensaje: datos.respuesta } });
            if (datos.estado) {
                //Se reinicia formulario
                this.setState({ success: { estado: true, mensaje: datos.respuesta } }, () => {
                    setTimeout(() => this.setState({ ...this.estadoInicial }), 3000);
                });
            }
        }
        catch (error) {
            this.setState({ error: { estado: true, mensaje: 'Ocurrió un error al enviar el mensaje' } });
        }
    }

    render() {
        return (
            <>
                <form className="p-4" onSubmit={this.formResponse} >
                    <div className="form-group px-4 mb-4">
                        <label>Nombre</label>
                        <input value={this.state.nombre}
                            onChange={this.handleChange}
                            maxLength="60"
                            className="form-control"
                            type="text"
                            name="nombre"
                            placeholder="Ingresa tu nombre y apellido"
                            required
                        />
                    </div>
                    <div className="form-group px-4 mb-4">
                        <label>Correo</label>
                        <input value={this.state.correo}
                            onChange={this.handleChange}
                            maxLength="80"
                            className="form-control"
                            type="text"
                            name="correo"
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                    <div className="form-group px-4 mb-5">
                        <label>Mensaje</label>
                        <textarea value={this.state.mensaje}
                            onChange={this.handleChange}
                            maxLength="80"
                            className="form-control"
                            name="mensaje"
                            placeholder="Escribe tu mensaje"
                            required
                            maxLength="500"
                            autoComplete="off"
                            rows="4"
                        >
                        </textarea>
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
                        <button className="btn btn-info text-14">
                            Enviar
                        </button>
                    </div>}
                </form>
            </>
        );
    }
}
export default FormContacto;