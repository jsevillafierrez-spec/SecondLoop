import './Favorito.css';

import productos from '../data/productos.jsx';

const Favorito = ({favoritos}) => {

    const productosFavoritos = productos.filter(producto =>
        favoritos.includes(producto.id)
    );
    return (
        <>
            <div className="contenedor" id="favoritos">
                <div className="texto">
                    <h3 className="titulo">Favoritos</h3>
                </div>
                <div className="favoritos-grid">
                    {productosFavoritos.length === 0 ? (
                    <div className="productos">
                        <img src="../../../public/assets/favorito/favoritos.png" alt=""/>
                    </div>
                    ):(
                    productosFavoritos.map(producto => (
                        <div className="trabajo" key={producto.id}>
                            <a href="#" className="thumb">
                                <img loading="lazy" src={producto.thumb.url} alt={producto.thumb.alt} />
                            </a>
                            <div className="info">
                                <div className="textos">
                                    <a href="#" className="nombre">
                                        {producto.info.nombre}
                                        <p className="categoria">{producto.info.categoria}</p>
                                        <br/>
                                        <p className="precio">{producto.info.precio}€</p>
                                    </a>
                                </div>
                                <div className="contenedor-btn">
                                    <button className="cesta">
                                        Añadir a la cesta
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))
                    )}
                </div>
                <div className="btn-fav">
                    <a className="mas-productos" href="#productos">
                        Buscar en SecondLoop
                    </a>
                </div>
            </div>
        </>
    );
};

export default Favorito;