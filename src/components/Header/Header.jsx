import { Link } from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"

const Header = () => {
    return (
        <div className="header">
            <img src="/logo-cocina.png" alt="logo-cocina" />
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/category/postres">Postres</Link>
                <Link to="/category/pizzas">Pizzas</Link>
                <Link to="/contacto">Contacto</Link>
            </nav>

            <div className="titulo">
                <h2>Cocina Flash</h2>
            </div>
            
            <Link to="/cart"> <CartWidget /> </Link>
        </div>
    )
}

export default Header