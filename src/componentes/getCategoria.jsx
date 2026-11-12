import React from 'react'
import { useEffect, useState } from 'react'

const  Opcion = ({ nombre, key, id })=> { 
  console.log("--"+id+"----")
  return(
    <>
       <option value={id}>{nombre}</option>
    </>
  )
}


function getCategoria() {
  const [categorias, setCategorias] = useState([])
  const URL = "http://localhost:3000/api/categorias";

  const getDatos = async (API_URL) => {
    const response = await fetch(API_URL)
    const fetchedCategorias = await response.json()
    console.log(fetchedCategorias)
    setCategorias(fetchedCategorias);
  }

  useEffect(() => {
    getDatos(URL);
  }, []);

  return (
    <>
      {categorias.map(
        catego => <Opcion
          nombre={catego.nombre}
          key={catego.id}
          id={catego.id}
        />
      )}
    </>
  )
}

export default getCategoria
