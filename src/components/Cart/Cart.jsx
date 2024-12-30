import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext';
import ItemCart from '../ItemCart/ItemCart';
import Links from '../pages/Links';

const Cart = () => {
  const { carrito, totalPrice } = useCartContext();

  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>
          <img className="carrito-vacio-img" src="/carrito.png" alt="carrito" />
          Carrito de Compras
          <img className="carrito-vacio-img" src="/carrito.png" alt="carrito" />
        </h2>
        <p>No hay elementos en el carrito</p>
        <p className="compra">Realiza una compra</p>
        <Links />
      </div>
    );
  }

  return (
    <div className="carrito">
      {carrito.map((product) => (
        <ItemCart key={product.id} product={product} />
      ))}

      <p>Total: $ {totalPrice()}</p>

      <Link to="/checkout">
        <button className="boton-total">Finalizar Compra</button>
      </Link>
      <Links />
    </div>
  );
};

export default Cart;