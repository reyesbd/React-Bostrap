import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:3000/api/productos"

const Fila = ({ nombre, carac, catego, precio, stock, url, id }) => {
    const formateador = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN', // Cambia a 'USD', 'EUR', etc.
    });
   
    const navigate = useNavigate()

    const btnEditar = (id) => {
        navigate('/editarproducto/' + id)
    }

    const delProducto = async () => {
        const response = await fetch(URL + "/" + id, {
            method: 'DELETE',
            headers: { "Content-type": "application/json" },
        });
        console.log("reponse: " + response.status)
        if (response.status == 204) {
            alert("Producto eliminado");
            location.href = '/productos'
        }
    }

    const precioCadena = formateador.format(precio);
  
    function imagen(url){
         const miimagen= document.getElementById("imgprod");
         miimagen.src=url
    }

    return (
        <>
            <tr>
                <td>{nombre}</td>
                <td>{carac}</td>
                <td>{catego}</td>
                <td>{precioCadena}</td>
                <td>{stock}</td>
                <td>
                    <button onClick={()=>{imagen(url)}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Ver imagen
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-sm btn-outline-secondary mx-2" onClick={() => { btnEditar(id) }}>Editar</button>
                    <button type="button" className="btn btn-danger" onClick={() => { delProducto(id) }}>Eliminar</button>
                </td>
            </tr>
        </>
    )
}

function galeriaProductos() {

    const [productos, setProductos] = useState([])
    const [pagina, setPagina] = useState(1)
    const [paginas, setPaginas] = useState(1)
    const navigate = useNavigate()

    const getProdutos = async (API_URL) => {
        const response = await fetch(API_URL + "?page=" + pagina + "&&limit=6")
        const fetchedProductos = await response.json()
        setProductos(fetchedProductos.datos);
        setPaginas(fetchedProductos.pagination.pages);
    }

    useEffect(() => {
        getProdutos(URL);
    }, [pagina]);

    function avanza() {
        let pag = pagina
        if (pag < paginas) {
            setPagina(pag + 1)
        }
    }
    function regresa() {
        let pag = pagina
        if (pag > 1) {
            setPagina(pag - 1)
        }
    }

    function btnAgregar() {
        navigate('/agregarproducto')
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <button className='btn btn-primary mt-3 mb-3' onClick={regresa}>&lt;</button>
                    <span className='mx-3'>pagina {pagina} de {paginas} páginas</span>
                    <button className='btn btn-primary mt-3 mb-3' onClick={avanza}>&gt;</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className='btn btn-primary' onClick={btnAgregar}>Agregar producto</button>
                </div>
            </div>
            <div className="row row-cols-1  g-3 mt-3">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Características</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Imágen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(
                            tarjeta => <Fila
                                nombre={tarjeta.nombre}
                                carac={tarjeta.caracteristicas}
                                // catego={tarjeta.categoriaId}
                                catego={tarjeta.categoria.nombre}
                                precio={tarjeta.precio}
                                stock={tarjeta.stock}
                                url={tarjeta.url}
                                id={tarjeta.id}
                            // key={tarjeta.id}
                            />
                        )}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Imagen producto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img id="imgprod" src="#" alt="imagen producto" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default galeriaProductos

