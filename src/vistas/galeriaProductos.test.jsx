import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import GaleriaProductos from './galeriaProductos'

const productosPagina1 = {
  datos: [
    {
      id: 10,
      nombre: 'Teclado mecánico',
      caracteristicas: 'Switch azul',
      categoria: { nombre: 'Periféricos' },
      precio: 1250,
      stock: 8,
      url: 'https://example.com/teclado.jpg',
    },
  ],
  pagination: { pages: 2 },
}

const productosPagina2 = {
  datos: [
    {
      id: 11,
      nombre: 'Memoria RAM',
      caracteristicas: '16 GB DDR5',
      categoria: { nombre: 'Memorias' },
      precio: 900,
      stock: 4,
      url: 'https://example.com/ram.jpg',
    },
  ],
  pagination: { pages: 2 },
}

function RutaActual() {
  const location = useLocation()
  return <p data-testid="ruta-actual">{location.pathname}</p>
}

function renderGaleria() {
  return render(
    <MemoryRouter initialEntries={['/productos']}>
      <Routes>
        <Route path="/productos" element={<GaleriaProductos />} />
        <Route path="/agregarproducto" element={<RutaActual />} />
        <Route path="/editarproducto/:id" element={<RutaActual />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('GaleriaProductos', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => productosPagina1,
    }))
  })

  it('consulta y presenta los productos de la primera página', async () => {
    renderGaleria()

    expect(await screen.findByText('Teclado mecánico')).toBeInTheDocument()
    expect(screen.getByText('Periféricos')).toBeInTheDocument()
    expect(screen.getByText('$1,250.00')).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/productos?page=1&&limit=6')
  })

  it('avanza a la página siguiente y carga sus productos', async () => {
    fetch
      .mockResolvedValueOnce({ json: async () => productosPagina1 })
      .mockResolvedValueOnce({ json: async () => productosPagina2 })

    renderGaleria()
    await screen.findByText('Teclado mecánico')
    fireEvent.click(screen.getByRole('button', { name: '>' }))

    expect(await screen.findByText('Memoria RAM')).toBeInTheDocument()
    expect(screen.getByText(/pagina 2 de 2/i)).toBeInTheDocument()
  })

  it('no avanza más allá de la última página', async () => {
    renderGaleria()
    await screen.findByText('Teclado mecánico')

    fireEvent.click(screen.getByRole('button', { name: '>' }))
    await screen.findByText('Memoria RAM')
    fireEvent.click(screen.getByRole('button', { name: '>' }))

    expect(screen.getByText(/pagina 2 de 2/i)).toBeInTheDocument()
  })

  it('navega al formulario para agregar un producto', async () => {
    renderGaleria()
    await screen.findByText('Teclado mecánico')

    fireEvent.click(screen.getByRole('button', { name: /agregar producto/i }))

    await waitFor(() => expect(screen.getByTestId('ruta-actual')).toHaveTextContent('/agregarproducto'))
  })

  it('navega al formulario de edición del producto seleccionado', async () => {
    renderGaleria()
    await screen.findByText('Teclado mecánico')

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))

    expect(screen.getByTestId('ruta-actual')).toHaveTextContent('/editarproducto/10')
  })
})
