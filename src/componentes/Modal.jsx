import './Modal.css';

const Modal = ({ closeModal, trabajo, toggleFavorito, favoritos }) => {

	return (
		<>
			<div className="overlay2" id="overlay">
				<div className="modal2">
					<div className="grid">
						<div className="thumb">
							<img className="imagen-modal" src={trabajo.thumb.url} alt={trabajo.thumb.alt} />
						</div>
						<div className="info">
							<div className="head">
								<h3 className="titulo">{trabajo.info.nombre}</h3>
							</div>
							<div className="body">{trabajo.info.contenido}</div>

                            <div className="botones">
                                <button className="boton-comprar">
                                    Añadir a la Cesta
                                </button>
                                <button className="boton-favoritos" onClick={() => toggleFavorito(trabajo.id)}>
                                    {favoritos.includes(trabajo.id) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"
                                         className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                    </svg>
                                        ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                             className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                        </svg>
                                        )}
                                </button>
                            </div>
                        </div>
                        <div className="cerrar" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
