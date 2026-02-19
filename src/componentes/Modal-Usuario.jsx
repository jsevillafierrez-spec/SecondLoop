import './Modal-Usuario.css';
import DarkModeSwitch from "./DarkModeSwitch.jsx";

const ModalUsuario = ({ closeModal, usuario }) => {

    return (
        <div className="overlay-us" onClick={closeModal}>
            <div className="modal-us" onClick={(e) => e.stopPropagation()}>
                <div className="perfil-header">
                    <img className="perfil-avatar" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre)}&background=007bff&color=fff&size=64`} alt={usuario.nombre}/>
                    <div className="perfil-titulo">
                        <h2>{usuario.nombre}</h2>
                        <p className="username">@{usuario.username}</p>
                        <p className="ubicacion">{usuario.ciudad}, {usuario.pais}</p>
                    </div>
                </div>
                <hr/>
                <div className="perfil-stats">
                    <h3>Informacion del usuario</h3>
                    <div className="stat">
                        <span>Email: </span>
                        <p>{usuario.email}</p>
                    </div>
                    <div className="stat">
                        <span>Teléfono: </span>
                        <p>{usuario.telefono}</p>
                    </div>
                    <div className="stat">
                        <span>Fecha Registro: </span>
                        <p>{usuario.fecha_registro}</p>
                    </div>
                    <hr/>
                    <h3>Información SecondLoop</h3>
                    <div className="stat">
                        <span>{usuario.perfil.reputacion}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </div>
                    <div className="stat">
                        <span>Número de Compras: </span>
                        <p>{usuario.perfil.numero_compras}</p>
                    </div>
                    <div className="stat">
                        <span>Número de Ventas: </span>
                        <p>{usuario.perfil.numero_ventas}</p>
                    </div>
                </div>
                <hr/>
                <div className="perfil-descripcion">
                    <h3>Sobre mí</h3>
                    <p>{usuario.perfil.descripcion}</p>
                </div>

                <div className="botones">
                    <button className="boton-comprar" onClick={() => {closeModal()}}>
                        <a href="#productos">
                            Ver Productos
                        </a>
                    </button>
                    <button className="boton-favoritos" onClick={() => {closeModal()}}>
                        <a href="#favoritos">
                            Ver Favoritos
                        </a>
                    </button>
                </div>

                <div className="modo-oscuro">
                    <span>Selector de Tema: </span>
                    <DarkModeSwitch/>
                </div>
            </div>
        </div>
    );
};

export default ModalUsuario;
