# React + Bootstrap

## Pruebas automatizadas con Vitest

El proyecto utiliza Vitest, React Testing Library, jest-dom y jsdom para probar componentes React en un entorno DOM simulado.

### Instalación

```bash
npm install
```

### Ejecutar las pruebas

```bash
# Modo interactivo
npm test

# Ejecución única (CI)
npm run test:run
```

### Cobertura

Para generar reportes de cobertura:

```bash
npm install -D @vitest/coverage-v8
npx vitest run --coverage
```

El reporte HTML se genera en `coverage/index.html`.

### Pruebas incluidas

- `Home.test.jsx`: renderizado de la vista de inicio.
- `Navbar.test.jsx`: navegación principal y búsqueda.
- `getCategoria.test.jsx`: carga asíncrona de categorías.
- `galeriaProductos.test.jsx`: carga de productos, precios, paginación y navegación a alta y edición.

Las peticiones HTTP se simulan mediante mocks de `fetch`; no se requiere ejecutar la API para estas pruebas.
