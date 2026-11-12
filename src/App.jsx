
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Navbar from './componentes/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TablaProductos from './vistas/galeriaProductos';
import Home from './vistas/Home';
import AddProducto from './vistas/addProducto'
import EditarProducto from './vistas/editProducto'

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <main className='container'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/productos' element={<TablaProductos />}></Route>
            <Route path='/agregarproducto' element={<AddProducto />}></Route>
            <Route path='/editarproducto/:id' element={<EditarProducto/>}></Route>
          </Routes>
        </main>
      </>
    </BrowserRouter>
  )
}

export default App
