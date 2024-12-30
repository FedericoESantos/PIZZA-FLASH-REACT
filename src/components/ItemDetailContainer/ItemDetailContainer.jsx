import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail.jsx/ItemDetail";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const ItemDetailContainer = () => {

    const [item, setItem] = useState([])
    const {id} = useParams()

    useEffect(() => {
        const queryDb = getFirestore();
        const queryDoc = doc(queryDb, "products", id);

        // getDoc(queryDoc).then((res) =>
        //     setItem(res.doc.map((res) => ({ id: res, ...res.data() })))
        // )}
        getDoc(queryDoc).then((res) =>
            setItem({ id: res.id, ...res.data() })
        );

    }, [id])
    return (
        <div>
            <ItemDetail items ={item} />
        </div>

    );
};

export default ItemDetailContainer;
