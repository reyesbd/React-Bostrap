import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import GetCategoria from './getCategoria'

const categorias = [
  { id: 1, nombre: 'Procesadores' },
  { id: 2, nombre: 'Memorias RAM' },
]

describe('GetCategoria', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => categorias,
    }))
  })

  it('consulta las categorías y genera una opción por cada registro', async () => {
    render(<select aria-label="Categorías"><GetCategoria /></select>)

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Procesadores' })).toHaveValue('1')
    })
    expect(screen.getByRole('option', { name: 'Memorias RAM' })).toHaveValue('2')
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/categorias')
  })

  it('no muestra opciones antes de recibir la respuesta', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    render(<select aria-label="Categorías"><GetCategoria /></select>)

    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })
})
