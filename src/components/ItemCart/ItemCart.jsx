import { useCartContext } from "../Context/CartContext";

const ItemCart = ({ product }) => {
  const { removeProduct } = useCartContext();

  return (
    <div className="itemCart">
      <img src={product.img} alt={product.title} />
      <div>
        <p>Nombre: {product.title}</p>
        <p>Cantidad: {product.quantity}</p>
        <p>Precio Unitario: $ {product.price}</p>
        <p>Sub Total: $ {product.quantity * product.price}</p>
        <button onClick={() => removeProduct(product.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default ItemCart;
