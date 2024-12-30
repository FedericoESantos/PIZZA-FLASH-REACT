import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header.jsx'
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx'
import Contacto from './components/pages/Contacto.jsx'

import Carru from './components/carru.jsx'
import Error from './components/Error.jsx'
import CartProvider from './components/Context/CartContext.jsx'
import Cart from './components/Cart/Cart.jsx'
import Checkout from './components/Checkout/Checkout.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <CartProvider>

          <Header />  {/* Esto es el navbar */}
          <hr />
          {/* Aca van las rutas de navegacion */}
          <Routes>
            <Route  path={'/'} element={<ItemListContainer greeting="Nuestros Productos" />} />
            <Route  path={'/category/:id'} element={<ItemListContainer />} />

            <Route  path={'/item/:id'} element={<ItemDetailContainer />} />
            <Route  path={'/cart'} element={<Cart />} />
            <Route  path={'/contacto'} element={<Contacto />} />
            <Route  path={'*'} element={<Error />} />
            <Route path={"/checkout"} element={<Checkout />} />
          </Routes>

        </CartProvider>
        <Carru />
      </BrowserRouter>

    </>
  )
}

export default App

