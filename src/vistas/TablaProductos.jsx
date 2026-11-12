import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:3000/api/productos"

const Tarjeta = ({ nombre, carac, catego, precio, stock, url, id }) => {
    const formateador = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN', // Cambia a 'USD', 'EUR', etc.
    });

    const navigate = useNavigate()  
    
    const btnEditar = (id) => {
        navigate('/editarproducto/'+id )
    }

    const delProducto = async ()=>{
        const response = await fetch(URL+"/"+id,{
                method: 'DELETE',
                headers:{"Content-type":"application/json"},
            });
        console.log("reponse: "+response.status)
        if (response.status == 204){
            alert("Producto eliminado");
            location.href ='/productos'          
        }
    }

    const precioCadena = formateador.format(precio);
    return (
        <>
            <div className="col">
                <div className="card shadow-sm d-flex align-items-center">
                    <img className='' src={url} alt="" width="213" height="153" />
                    <div className="card-body">
                        <p className="card-text">{nombre}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary" >Ver</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>{btnEditar(id)}}>Editar</button>
                                <button type="button" className="btn btn-danger" onClick={()=>{delProducto(id)}}>Eliminar</button>
                            </div>
                            <small className="text-body-secondary">{precioCadena}</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TablaProductos() {
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

    function btnAgregar(){
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
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-3">
                {productos.map(
                    tarjeta => <Tarjeta
                        nombre={tarjeta.nombre}
                        carac={tarjeta.caracteristicas}
                        catego={tarjeta.categoria}
                        precio={tarjeta.precio}
                        stock={tarjeta.stock}
                        url={tarjeta.url}
                        id={tarjeta.id}
                        key={tarjeta.id}
                    />
                )}
            </div>
        </>
    )
}



export default TablaProductos

