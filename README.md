# Mobile Shop

Mini aplicación para comprar dispositivos móviles: listado de productos con buscador y vista de
detalle con selección de opciones y carrito.

## Requisitos

- Node.js 22 o superior
- npm

## Cómo ejecutarlo

```bash
npm install
npm start        # modo desarrollo en http://localhost:5173
```

| Script            | Descripción                                   |
| ----------------- | --------------------------------------------- |
| `npm start`       | Modo desarrollo                               |
| `npm run build`   | Compilación para producción en `dist/`        |
| `npm test`        | Lanzamiento de los tests                      |
| `npm run lint`    | Comprobación del código                       |
| `npm run preview` | Sirve localmente la compilación de producción |
| `npm run format`  | Formatea el código con Prettier               |

## Configuración

La URL del API se define en el archivo [`.env`](.env) con la variable `VITE_API_BASE_URL`. Para
usar otra en local, sin modificar el archivo versionado, se puede crear un `.env.local`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## Stack

- **React 19 + TypeScript**, empaquetado con **Vite**
- **React Router** para el enrutado en cliente (SPA)
- **TanStack Query** para los datos del API y su caché persistida en el navegador
- **Vitest + Testing Library + MSW** para los tests
- **ESLint + Prettier** para la calidad del código

## Hitos

1. Estructura del proyecto, herramientas y README
2. Cliente del API y caché de datos
3. Vista de listado (PLP)
4. Buscador en tiempo real
5. Vista de detalle (PDP)
6. Carrito
7. Diseño adaptativo y accesibilidad
