import React from 'react';

const Modal = (props) => {

    return (
        <div className="modal fade" id={props.target} tabIndex="-1" role="dialog" aria-labelledby={`${props.target}Label`} aria-hidden="true">
            <div className={`modal-dialog ${props.lg && 'modal-lg'}`} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${props.target}Label`}>{props.titulo}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    {props.textoBoton && <div className="modal-footer">
                        <button type="button" className={props.classBtnCerrar} data-dismiss="modal">Cerrar</button>
                        <button type="button" onClick={props.onClick} className={props.classBtnAccion}>{props.textoBoton}</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

function ButtonModal(props) {
    return (
        <>
            <button type="button" onClick={props.onClick} className={props.clases} data-toggle="modal" data-target={`#${props.target}`}>
                {props.children}
            </button>
        </>
    );
}
export { Modal, ButtonModal };