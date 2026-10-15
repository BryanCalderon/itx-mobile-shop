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

## Notas sobre el API

Durante el desarrollo se detectaron algunas particularidades del API, que la aplicación resuelve así:

- **El servidor se suspende cuando no recibe tráfico** y la primera petición puede tardar hasta un
  minuto. Se muestra un esqueleto de carga y, si la espera se alarga, un aviso explicándolo.
- **Añadir a la cesta siempre devuelve `count: 1`**: son las unidades añadidas, no el total de la
  cesta. Por eso el contador se acumula en el cliente y se persiste en `localStorage`, sincronizado
  entre pestañas.
- **Los datos del producto se normalizan** en un mapper: el precio llega como texto (vacío en
  algunos productos), `displayResolution` y `displaySize` vienen intercambiados, hay campos con
  erratas (`dimentions`, `secondaryCmera`) y valores que unas veces son texto y otras listas.
- **Un producto inexistente devuelve un error 500**, no un 404, así que se trata como un error de
  carga con opción de reintentar.

## Estructura

El código se organiza en capas, inspiradas en
[Feature-Sliced Design](https://feature-sliced.design/):

```
src/
├── app/                     Arranque de la aplicación: rutas, caché, proveedores y layout
├── pages/                   Vistas de cada ruta, que componen las funcionalidades
├── features/
│   ├── product-list/        Listado de productos y buscador
│   └── product-detail/      Detalle de producto y selección de opciones
├── entities/
│   ├── product/             Dominio del producto: tipos, API, mappers y consultas
│   └── cart/                Cesta: API, contador persistido y su indicador
├── components/              Componentes compartidos (migas, mensajes de estado, enlaces...)
├── api/                     Cliente HTTP, configuración y endpoints del API
├── shared/                  Utilidades genéricas y definición de rutas
└── test/                    Configuración y utilidades de los tests
```

Cada capa solo importa de las que están por debajo (`app` → `pages` → `features` → `entities` →
`components`, `api` y `shared`), y **una funcionalidad no importa de otra**: son las páginas las que
las combinan. Así cada funcionalidad se puede entender, modificar y probar de forma aislada.

### Convenciones

- **Un componente o hook por archivo.** Cada componente vive en su carpeta junto a sus estilos
  (CSS Modules) y sus tests.
- **Constantes en un `constants.ts`** dentro del módulo al que pertenecen.
- **Rutas y endpoints centralizados** en `shared/routing/paths.ts` y `api/endpoints.ts`.
- **Imports:** relativos dentro de un mismo módulo y con el alias `@/` entre módulos distintos,
  en un único bloque sin líneas en blanco y ordenados (efectos secundarios, paquetes, alias y
  relativos). No se usan archivos barril (`index.ts`) para no perjudicar el tree-shaking ni crear
  dependencias circulares.
- **Los datos del API se normalizan** en un mapper antes de llegar a la aplicación, que trabaja
  siempre con tipos propios.

Las reglas que se pueden automatizar las comprueba ESLint: dependencias entre capas, un componente
por archivo, orden de los imports, imports entre módulos con el alias y uso de APIs deprecadas.

## Hitos

1. Estructura del proyecto, herramientas y README
2. Cliente del API y caché de datos
3. Vista de listado (PLP)
4. Buscador en tiempo real
5. Vista de detalle (PDP)
6. Carrito
7. Diseño adaptativo y accesibilidad
