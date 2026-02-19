import './Productos.css';

import Modal from '../Modal';
import productos from '../data/productos.jsx';
import { useState } from 'react';

const Productos = ({resultados, favoritos, toggleFavorito}) => {
	const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
	const [estadoModal, setEstadoModal] = useState(false);
	const [trabajoSelecionado, setTrabajoSelecionado] = useState(productos[0]);

    const lista = productos
        .filter((producto) => categoriaSelecionada === 'todos' || producto.categoria === categoriaSelecionada)
        .filter((producto) =>
            resultados.length > 0 ? resultados.some((r) => r.id === producto.id) : true
        );

	const handleChange = (e) => {
		const categoria = e.target.id;
		setCategoriaSelecionada(categoria);

		if (categoria === 'todos') {
			setProductosFiltrados(productos);
		} else {
			const nuevosTrabajos = productos.filter((trabajo) => {
				if (trabajo.categoria === categoria) {
					return true;
				}
			});
			setProductosFiltrados(nuevosTrabajos);
		}
	};

	const openModal = (e, id) => {
		e.preventDefault();
		setEstadoModal(true);

		const trabajo = productos.find((trabajo) => {
			if (trabajo.id === id) {
				return true;
			}
		});

		setTrabajoSelecionado(trabajo);
	};

	const closeModal = () => {
		setEstadoModal(false);
	};

	return (
		<>
			<section className="trabajos" id="productos">
				<div className="filtros">

                    <label htmlFor="todos">
                        <input
                            type="radio"
                            name="categoria"
                            id="todos"
                            onChange={handleChange}
                            checked={categoriaSelecionada === 'todos'}
                        />
                        <span className="opcion">
                            <img className="opcion-producto" src="../../../public/assets/opciones/todos.png" alt="Electronica"/>
                            <p>Todos</p>
                        </span>
                    </label>

                    <label htmlFor="electronica">
						<input
							type="radio"
							name="categoria"
							id="electronica"
							onChange={handleChange}
							checked={categoriaSelecionada === 'electronica'}
						/>
						<span className="opcion">
                            <img className="opcion-producto" src="../../../public/assets/opciones/electronico.png" alt="Electronica"/>
                            <p>Electrónica</p>
                        </span>
					</label>

					<label htmlFor="moda">
						<input
							type="radio"
							name="categoria"
							id="moda"
							onChange={handleChange}
							checked={categoriaSelecionada === 'moda'}
						/>
						<span className="opcion">
                            <img className="opcion-producto" src="../../../public/assets/opciones/moda.png" alt="Moda"/>
                            <p>Moda y Complementos</p>
                        </span>
					</label>

					<label htmlFor="hogar">
                        <input
                            type="radio"
                            name="categoria"
                            id="hogar"
                            onChange={handleChange}
                            checked={categoriaSelecionada === 'hogar'}
                        />
						<span className="opcion">
                            <img className="opcion-producto" src="../../../public/assets/opciones/hogar.png" alt="Moda"/>
                            <p>Hogar y Jardin</p>
                        </span>
					</label>

					<label htmlFor="deportes">
						<input
							type="radio"
							name="categoria"
							id="deportes"
							onChange={handleChange}
							checked={categoriaSelecionada === 'deportes'}
						/>
						<span className="opcion">
                            <img className="opcion-producto" src="../../../public/assets/opciones/deportes.png" alt="Moda"/>
                            <p>Deportes</p>
                        </span>
					</label>

					<label htmlFor="coches">
						<input
							type="radio"
							name="categoria"
							id="coches"
							onChange={handleChange}
							checked={categoriaSelecionada === 'coches'}
						/>
						<span className="opcion">
                            <img className="opcion-producto" src="../../../public/assets/opciones/coche.png" alt="Moda"/>
                            <p>Coches</p>
                        </span>
					</label>

                    <label htmlFor="animales">
                        <input
                            type="radio"
                            name="categoria"
                            id="animales"
                            onChange={handleChange}
                            checked={categoriaSelecionada === 'animales'}
                        />
                        <span className="opcion">
                            <img className="opcion-producto" src="../../../public/assets/opciones/animales.png" alt="Moda"/>
                            <p>Animales</p>
                        </span>
                    </label>

                    <label htmlFor="bebes">
                        <input
                            type="radio"
                            name="categoria"
                            id="bebes"
                            onChange={handleChange}
                            checked={categoriaSelecionada === 'bebes'}
                        />
                        <span className="opcion">
                            <img className="opcion-producto" src="../../../public/assets/opciones/bebe.png" alt="Moda"/>
                            <p>Bebés</p>
                        </span>
                    </label>

				</div>
				<div className="grid">
					{lista.length === 0 ? (
                        <div className="sin-resultados">
                            <img src="../../../public/assets/productos/encontrado.png" alt="No hay productos"/>
                        </div>
                    ) : (
                        lista.map((trabajo) => {
						return (
							<div className="trabajo" key={trabajo.id}>
								<a href="#" className="thumb" onClick={(e) => openModal(e, trabajo.id)}>
									<img loading="lazy" src={trabajo.thumb.url} alt={trabajo.thumb.alt} />
								</a>
								<div className="info">
									<div className="textos">
										<a href="#" className="nombre" onClick={(e) => openModal(e, trabajo.id)}>
											{trabajo.info.nombre}
										    <p className="categoria">{trabajo.info.categoria}</p>
                                            <br/>
                                            <p className="precio">{trabajo.info.precio}€</p>
                                        </a>
                                    </div>
                                    <div className="contenedor-btn">
                                        <button className="cesta">
                                            Añadir a la cesta
                                        </button>
                                    </div>
								</div>
							</div>
						);
					})
                )}
				</div>
			</section>

			{estadoModal && <Modal closeModal={closeModal} trabajo={trabajoSelecionado} toggleFavorito={toggleFavorito} favoritos={favoritos}/>}
		</>
	);
};

export default Productos;
