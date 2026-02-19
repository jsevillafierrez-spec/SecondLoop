// hacemos las importaciones necesarias
import './Header.css';
import { useState } from 'react';
import ModalUsuario from '../Modal-Usuario.jsx'
import usuarios from '../data/usuarios.jsx'
import productos from '../data/productos.jsx';

const Header =({search, setSearch, setResultados}) =>{

        const [estadoModalUsuario, setEstadoModalUsuario] = useState(false);
        const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(usuarios[0]);
        const handleChange = (e) => setSearch(e.target.value);

        const handleKeyPress = (e) => {
            if(e.key === "Enter") {
                e.preventDefault();

            const filtrados = productos.filter(producto =>
                producto.info.nombre.toLowerCase().includes(search.toLowerCase())
            );
            setResultados(filtrados);
        }
    };

        const openModalUsuario = (e, usuario) => {
            e.preventDefault();
            setUsuarioSeleccionado(usuario);
            setEstadoModalUsuario(true);
        };

        const closeModalUsuario = () => {
            setEstadoModalUsuario(false);
        }

    return (
        < header className="header">
            <div className="empresa">
                <h2 className="titulo">SecondLoop</h2>
            </div>

            <input className="buscador" type="text" placeholder="Buscar producto..." value={search} onChange={handleChange} onKeyPress={handleKeyPress}/>

            <div className="favorito">
                <a className= "icono-favorito" href="#favoritos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                </a>
            </div>

            <div className="usuario">
                <a className="icono-usuario" onClick={(e) => openModalUsuario(e, usuarios[0])}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="icono-logo" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                </a>
            </div>
            {estadoModalUsuario && <ModalUsuario closeModal={closeModalUsuario} usuario={usuarioSeleccionado} />}
        </header>
    )
};

export default Header;
