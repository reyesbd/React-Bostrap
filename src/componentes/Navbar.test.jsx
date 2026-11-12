import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('muestra la navegación principal', () => {
    render(<Navbar />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /productos/i })).toHaveAttribute('href', '/productos')
    expect(screen.getByRole('searchbox', { name: /search/i })).toBeInTheDocument()
  })
})
