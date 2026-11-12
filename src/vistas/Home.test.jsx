import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('muestra el encabezado de inicio', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: /inicio del sitio/i })).toBeInTheDocument()
  })
})
