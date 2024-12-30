import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../../ItemCount/ItemCount';
import Links from '../../pages/Links';
import { useCartContext } from '../../Context/CartContext'; 

const ItemDetail = ({ items }) => {
  const [goToCart, setGoToCart] = useState(false);
  const { addProduct } = useCartContext();

  const onAdd = (quantity) => {
    setGoToCart(true);
    addProduct(items, quantity); 
  };

  return (
    <div className="card-container">
      <div className="card2">
        <img src={items.img} alt={items.title} />
        <h3>{items.title}</h3>
        <p>{items.description}</p>
        <p>$ {items.price}</p>
        <p>Cantidad: {items.stock}</p>
      </div>

      <div className="count">
        {goToCart ? (
          <Link to="/cart" className="terminar">
            Terminar Compra
          </Link>
        ) : (
          <ItemCount stock={10} valorInicial={0} onAdd={onAdd} />
        )}
      </div>
      <Links />
    </div>
  );
};

export default ItemDetail;
