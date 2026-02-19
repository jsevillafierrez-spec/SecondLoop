import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer">
            <div className="informacion">
                <div className="redes">
                    <a className="enlace" href="https://github.com/jsevillafierrez-spec">
                        <img className="git" src="../../../public/github.png" alt=""/>
                    </a>
                </div>
            </div>
            <div className="derechos">
                <p>© {new Date().getFullYear()} José Damián Sevilla. Todos los derechos reservados.</p>
            </div>
            </div>
        </>
    )
}

export default Footer;