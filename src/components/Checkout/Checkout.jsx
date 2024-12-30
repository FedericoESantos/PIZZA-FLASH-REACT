// import { useState } from "react"
// import { useCartContext } from "../Context/CartContext"
// import { addDoc, collection, doc, Firestore, getDoc, getFirestore, updateDoc } from "firebase/firestore"

// const Checkout = () => {
//     const [nombre, setNombre] = useState("")
//     const [apellido, setApellido] = useState("")
//     const [telefono, setTelefono] = useState("")
//     const [mail, setMail] = useState("")
//     const [confirmarMail, setConfirmarMail] = useState("")
//     const [error, setError] = useState("")
//     const [ordenId, setOrdenId] = useState("")
//     const [mensaje, setMensaje] = useState("")

//     const { cart, totalPrice, removeProduct } = useCartContext()


//     const manejadorFormulario = (evento) => {
//         evento.preventDefault()

//         if (!nombre || !apellido || !telefono || !mail || !confirmarMail) {
//             setError("Por favor complete los campos requeridos")
//             return
//         }
//         if (mail !== confirmarMail) {
//             setError("Los emails no coinciden")
//         }

//         const total = totalPrice();
//         const orden = {
//             items: cart.map((producto) => ({
//                 id: producto.id,
//                 nombre: producto.title,
//                 cantidad: producto.quantity,
//             })),
//             total: total,
//             fecha: new Date(),
//             nombre,
//             apellido,
//             telefono,
//             mail,
//         }

//         const actualizarStock = orden.items.map(async (prodOrder) => {
//             const db = getFirestore();
//             const prodRef = doc(db, "products", prodOrder.id);

//             const productoDoc = await getDoc(prodRef);
//             const stockActual = productoDoc.data().stock;

//             if (stockActual < prodOrder.cantidad) {
//                 throw new Error(`No hay suficiente stock para el producto ${prodOrder.nombre}`);
//             }

//             return updateDoc(prodRef, {
//                 stock: stockActual - prodOrder.cantidad,
//             });
//         });

//         Promise.all(actualizarStock)


//         setNombre("")
//         setApellido("")
//         setTelefono("")
//         setMail("")
//         setConfirmarMail("")
//         setMensaje("")
//     }

//     return (
//         <div>
//             <h2>Complete el formulario para confirmar la compra</h2>

//             <form onSubmit={manejadorFormulario}>

//                 {cart.map((producto) => {
//                     <div key={producto.id}>
//                         <p>{""} {producto.nombre} {"\n" + producto.cantidad}</p>
//                         <p>{producto.precio}</p>
//                     </div>
//                 })}

//                 <div className="label">
//                     <label>Nombre: </label>
//                     <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
//                 </div>

//                 <div className="label">
//                     <label>Apellido: </label>
//                     <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
//                 </div>

//                 <div className="label">
//                     <label>Telefono:</label>
//                     <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
//                 </div>

//                 <div className="label">
//                     <label>Mail:</label>
//                     <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
//                 </div>

//                 <div className="label">
//                     <label>Confirmar Email</label>
//                     <input type="text" value={confirmarMail} onChange={(e) => setConfirmarMail(e.target.value)} />
//                 </div>

//                 {error && <p>{error}</p>}
//                 {ordenId && (
//                     <p> ¡ Gracias por tu Compra !. Tu Número de seguimiento es:
//                         <br />
//                         <strong>{""} {ordenId} {""}</strong>
//                         <br />
//                     </p>
//                 )}

//                 <div className="boton-enviar">
//                     <button type="submit">
//                         Finalizar Compra
//                     </button>
//                 </div>
//             </form>

//         </div>
//     )
// }

// export default Checkout

import { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

const Checkout = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [mail, setMail] = useState("");
    const [confirmarMail, setConfirmarMail] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");

    const { carrito, totalPrice, cleanCart } = useCartContext();

    const manejadorFormulario = async (evento) => {
        evento.preventDefault();

        // Validaciones del formulario
        if (!nombre || !apellido || !telefono || !mail || !confirmarMail) {
            setError("Por favor complete los campos requeridos");
            return;
        }
        if (mail !== confirmarMail) {
            setError("Los emails no coinciden");
            return;
        }

        const total = totalPrice();
        const orden = {
            items: carrito.map((producto) => ({
                id: producto.id,
                nombre: producto.title,
                cantidad: producto.quantity,
            })),
            total: total,
            fecha: new Date(),
            cliente: { nombre, apellido, telefono, mail },
        };

        try {
            const db = getFirestore();

            // Actualización de stock
            const actualizarStock = carrito.map(async (prodOrder) => {
                const prodRef = doc(db, "products", prodOrder.id);
                const productoDoc = await getDoc(prodRef);

                if (!productoDoc.exists()) {
                    console.error(`El producto con ID ${prodOrder.id} no existe.`);
                    throw new Error(`El producto ${prodOrder.title} no existe`);
                }

                const stockActual = productoDoc.data().stock;

                if (stockActual < prodOrder.quantity) {
                    console.error(`Stock insuficiente para el producto ${prodOrder.title}.`);
                    throw new Error(
                        `No hay suficiente stock para el producto ${prodOrder.title}`
                    );
                }

                console.log(`Actualizando stock para ${prodOrder.title}: ${stockActual} - ${prodOrder.quantity}`);

                return updateDoc(prodRef, {
                    stock: stockActual - prodOrder.quantity,
                });
            });

            // Esperar a que todas las promesas se completen
            await Promise.all(actualizarStock);

            // Crear la orden en Firebase
            const docRef = await addDoc(collection(db, "orders"), orden);
            setOrdenId(docRef.id);

            // Vaciar el carrito
            cleanCart();

            // Resetear el formulario
            setNombre("");
            setApellido("");
            setTelefono("");
            setMail("");
            setConfirmarMail("");
        }

        catch (error) {
            console.error("Error al procesar la compra:", error);
            setError("Hubo un error al procesar la compra. Inténtelo nuevamente.");
        }
    };

    return (
        <div className="formulario">
            <h2>Complete el formulario para confirmar la compra</h2>

            <form onSubmit={manejadorFormulario}>
                {carrito.map((producto) => (
                    <div key={producto.id}>
                        <p>{producto.title}</p>
                        <p>Cantidad: {producto.quantity}</p>
                        <p>Precio: ${producto.price}</p>
                    </div>
                ))}

                <div className="label">
                    <label>Nombre: </label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} placeholder="Complete su nombre"
                    />
                </div>

                <div className="label">
                    <label>Apellido: </label>
                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)} placeholder="Complete su apellido"
                    />
                </div>

                <div className="label">
                    <label>Teléfono: </label>
                    <input
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)} placeholder="Complete su telefono"
                    />
                </div>

                <div className="label">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)} placeholder="Complete su correo electrónico"
                    />
                </div>

                <div className="label">
                    <label>Confirmar Email: </label>
                    <input
                        type="email"
                        value={confirmarMail}
                        onChange={(e) => setConfirmarMail(e.target.value)} placeholder="Comnfirme su correo electrónico"
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {ordenId && (
                    <p>
                        ¡Gracias por tu compra! Tu número de seguimiento es:
                        <strong>{ordenId}</strong> <br />
                        A la brevedad nos comunicaremos contigo para coordinar la entrega, <br />
                        con el número de seguimiento.
                    </p>
                )}

                <div className="boton-enviar">
                    <button type="submit">Finalizar Compra</button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
