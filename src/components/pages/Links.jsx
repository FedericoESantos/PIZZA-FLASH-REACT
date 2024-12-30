import { Link } from "react-router-dom"

const Links = () => {
  return (
    <div className="links">
        <Link to={"/"} className="links-img"><img src="/iconos/hogar.png" alt="home" />HOME</Link>
        <Link to={"/category/pizzas"}><img src="/iconos/pizza.png" alt="pizza" />PIZZAS</Link>
        <Link to={"/category/postres"}><img src="/iconos/postre.png" alt="postre" />POSTRES</Link>

    </div>
  )
}

export default Links
