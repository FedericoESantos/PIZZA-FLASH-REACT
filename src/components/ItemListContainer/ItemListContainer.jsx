import Carrusel from "../Carrusel/carrusel";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList/ItemList";
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";
import Links from "../pages/Links";
import { useEffect, useState } from "react";

const ItemListContainer = (props) => {
  const [items, setItems] = useState([]); // Cambiado de "item" a "items" para mayor claridad
  const { id } = useParams();

  useEffect(() => {
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, "products");

    const fetchData = async () => {
      try {
        if (id) {
          // Filtrar productos por categoría
          const queryFilter = query(queryCollection, where("category", "==", id));
          const querySnapshot = await getDocs(queryFilter);
          setItems(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } else {
          // Obtener todos los productos
          const querySnapshot = await getDocs(queryCollection);
          setItems(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      } catch (error) {
        console.error("Error al obtener productos de Firebase:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="greeting">
      <Carrusel />
      <hr />
      <h4>{props.greeting}</h4>
      <hr className="hr" />
      <ItemList items={items} />
      <Links />
    </div>
  );
};

export default ItemListContainer;
