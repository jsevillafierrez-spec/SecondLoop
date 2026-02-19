//import { useState } from 'react'
import './normalize.css'
import Header from "./componentes/layout/Header.jsx"
import Productos from "./componentes/layout/Productos.jsx";
import Contacto from "./componentes/layout/Contacto.jsx";
import Footer from "./componentes/layout/Footer.jsx";
import { useState } from 'react';
import Favorito from "./componentes/layout/Favorito.jsx";


function App() {
        const [search, setSearch] = useState("");
        const [resultados, setResultados] = useState([]);
        const [favoritos, setFavoritos] = useState([]);

        const toggleFavorito = (id) => {
            setFavoritos(prev => {
            const nuevo = prev.includes(id)
            ? prev.filter(favId => favId !==id)
            :[...prev, id]

            console.log("Favoritos Actuales:", nuevo);
            return nuevo;
            });
        };

        return(
        <>
            <div className="contendor">
                <Header search={search} setSearch={setSearch} setResultados={setResultados}/>
                <Productos search={search} resultados={resultados} favoritos={favoritos} toggleFavorito={toggleFavorito} />
                <Favorito favoritos={favoritos}/>
                <Contacto/>
                <Footer/>
            </div>
        </>
    )

}

export default App
