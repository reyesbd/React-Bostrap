import React from 'react'
import { useForm } from 'react-hook-form'
import AddCategoria from '../componentes/getCategoria'


function addProducto() {
    const {
            register,
            handleSubmit,
            reset,
            formState:{ errors }
          }=useForm()

    URL = 'http://127.0.0.1:3000/api/productos';

    const onEnviar = handleSubmit(async (data)=>{
        try{
            const resp = await fetch(URL,{
                method: 'POST',
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(data)
            });
            if(resp.status == 201){
               alert('Producto agregado exitosamente')
            }
        }catch(error){
            console.log(error)
        }
    });

    
    return (
        <>
            <div className="row mt-3">
                <div className="col-10 mx-auto">
                    <h2>Alta de producto</h2>
                    <form action="" onSubmit={onEnviar}>
                        <div className="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input 
                                 type="text" 
                                 class="form-control" 
                                 placeholder="Nombre producto" 
                                 {...register("nombre",{required: true})}/>
                                 {errors.nombre && <span>Se debe capturar un nombre</span>}
                        </div>
                        <div className="mb-3">
                            <label for="caracteristicas" class="form-label">Características</label>
                            <input 
                                type='text' 
                                class="form-control" 
                                placeholder='caracteristicas' 
                                {...register("caracteristicas",{required: true})}/>
                                {errors.caracteristicas && <span>Se deben capturar características</span>}                               
                        </div>
                        <div className="mb-3">
                            <label for="categoriaId" class="form-label">Categoria</label>
                            <select 
                               className="form-select" 
                               aria-label="Default select example" 
                               {...register("categoriaId",{required: true})}>
                                <option value="0">Debe seleccionar una categoría....</option>
                                {
                                    <AddCategoria />
                                }
                            </select>
                            {errors.categoriaId && <span>Se debe seleccionar una categoria</span>}                               
                        </div>
                         <div className="mb-3">
                            <label for="precio" class="form-label">Precio</label>
                            <input 
                                type='number' 
                                class="form-control" 
                                placeholder='Precio' 
                               {...register("precio",{required: true})}/>
                               {errors.precio && <span>Se debe seleccionar una categoria</span>} 
                        </div>
                        <div className="mb-3">
                            <label for="stock" class="form-label">Stock</label>
                            <input 
                                type='number' 
                                class="form-control" 
                                placeholder='Stock' 
                                {...register("stock",{required: true})}/>
                                {errors.stock && <span>Se debe seleccionar una categoria</span>}
                        </div>
                        <div className="mb-3">
                            <label for="url" class="form-label">Url imagen</label>
                            <input 
                                type='url' 
                                class="form-control" 
                                id="url"  
                                name="url" 
                                placeholder='Url imagen' 
                                {...register("url",{required: true})}/>
                                {errors.url && <span>Se debe seleccionar una categoria</span>}
                        </div>     
                        <div className="mb-3">
                            <button type='submit' className='btn btn-primary'>Guardar</button>
                        </div>                                                                  
                    </form>
                </div>
            </div>

        </>
    )
}

export default addProducto
