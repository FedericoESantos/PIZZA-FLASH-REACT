import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ items }) => {
    return (

        <div className='card'>
            <img src={items.img} alt={items.title} />
            <div className='card-info'>
                <h3>{items.title}</h3>
                <p>{items.description}</p>
                <p><strong>stock <br /> {items.stock} </strong></p>
                <p><strong>$</strong>{items.price}</p>
                <p>{items.category}</p>
                {/* <p children="card-info">{items.title}</p> */}
                <Link to={"/item/" + items.id}>
                    <button className='detalle'>
                        Ver Detalle
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default Item
