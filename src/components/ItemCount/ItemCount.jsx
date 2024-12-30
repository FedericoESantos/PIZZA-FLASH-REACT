import { useEffect, useState } from "react"

const ItemCount = ({valorInicial, stock, onAdd}) => {
    const [contador, setContador] = useState(parseInt(valorInicial));

    const sumar = () => {
        setContador(contador + 1);
    }

    const restar = () => {
        setContador(contador - 1);
    }

    useEffect(() => {
        setContador(parseInt(valorInicial))
    }, [valorInicial])

    return (
        <div className="item-count">
            <button disabled={contador <= 1} onClick={restar} className="operacion">
                -
            </button>

            <span>{contador}</span>

            <button disabled={contador >= stock} onClick={sumar} className="operacion">
                +
            </button>

            <div>
                <button disabled={stock <= 0} onClick={() => onAdd(contador)} className="operacion">
                    Agregar al Carrito
                </button>
            </div>

        </div>
    )
}

export default ItemCount
