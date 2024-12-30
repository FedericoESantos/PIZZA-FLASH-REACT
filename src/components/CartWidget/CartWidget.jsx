import { useCartContext } from "../Context/CartContext";

const CartWidget = () => {
  const { totalProducts } = useCartContext();

  return (
    <div className="cartW">
      <button>
        <img src="/carrito.png" alt="carrito" />
        <span>{totalProducts() || 0}</span>
      </button>
    </div>
  );
};

export default CartWidget;
