# Mobile Shop

Mini aplicación para comprar dispositivos móviles, desarrollada como SPA con React y TypeScript.

**Demo:** https://bryan-itx-mobile-shop.netlify.app

> El API se aloja en un servidor que se suspende sin tráfico, así que la primera carga puede tardar
> hasta un minuto.

- **Listado de productos** con buscador en tiempo real por marca y modelo, adaptado a cualquier
  resolución con un máximo de cuatro productos por fila.
- **Detalle de producto** con imagen, características y selección de almacenamiento y color.
- **Cesta** con el número de productos en la cabecera, persistido entre recargas.
- **Caché en cliente** de los datos del API durante una hora.

## Requisitos

- Node.js 22 o superior
- npm

## Cómo ejecutarlo

```bash
npm install
npm start        # modo desarrollo en http://localhost:5173
```

| Script                  | Descripción                                      |
| ----------------------- | ------------------------------------------------ |
| `npm start`             | Modo desarrollo                                  |
| `npm run build`         | Compilación para producción en `dist/`           |
| `npm run preview`       | Sirve localmente la compilación de producción    |
| `npm test`              | Tests unitarios y de integración                 |
| `npm run test:watch`    | Tests en modo observación                        |
| `npm run test:coverage` | Tests con informe de cobertura                   |
| `npm run test:e2e`      | Tests end-to-end y de accesibilidad en navegador |
| `npm run lint`          | Comprobación del código                          |
| `npm run format`        | Formatea el código con Prettier                  |

## Configuración

La URL del API se define en el archivo [`.env`](.env) con la variable `VITE_API_BASE_URL`. Para
usar otra en local, sin modificar el archivo versionado, se puede crear un `.env.local`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## Stack

- **React 19 + TypeScript** en modo estricto, empaquetado con **Vite**
- **React Router** para el enrutado en cliente
- **TanStack Query** para los datos del API y su caché persistida en el navegador
- **CSS Modules** con variables de diseño, sin librerías de componentes
- **Vitest, Testing Library y MSW** para los tests unitarios y de integración
- **Playwright y axe** para los tests end-to-end y de accesibilidad
- **ESLint y Prettier** para la calidad del código

## Caché de datos

Los datos del API se gestionan con TanStack Query, configurado en
[`app/queryClient.ts`](src/app/queryClient.ts):

- Cada respuesta se guarda al recibirla y se considera vigente durante **una hora** (`staleTime`).
  Pasado ese tiempo, se revalida contra el API la próxima vez que se necesita.
- La caché se **persiste en `localStorage`** (`maxAge` de una hora), así que sobrevive a las
  recargas de página. Se descarta al publicar una nueva versión de la aplicación.
- Las peticiones simultáneas a un mismo recurso se agrupan en una sola, y los errores de servidor o
  de red se reintentan dos veces.

## Decisiones de diseño

- **La búsqueda se guarda en la URL** (`?search=...`): se conserva al entrar en un producto y
  volver, y se puede compartir. Filtra sin distinguir mayúsculas ni tildes y exige todas las
  palabras escritas, en la marca o en el modelo.
- **"Volver al listado" regresa a la página anterior**, con la búsqueda y el scroll que tenía. Si se
  llegó al detalle desde un enlace externo, lleva al inicio.
- **Si solo hay una opción de almacenamiento o color, viene seleccionada**, y el botón de añadir se
  habilita cuando están elegidas todas.
- **El orden del detalle sigue el boceto**: descripción y, debajo, las acciones. En pantallas
  anchas, las características se muestran en dos columnas y la imagen queda fija al desplazarse,
  para acercar las acciones sin alterar ese orden.
- **El resultado de añadir a la cesta se notifica** debajo de la cabecera, junto al contador.

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

## Tests

- **Unitarios y de integración** (Vitest, Testing Library y MSW): cubren la lógica (mappers,
  filtrado, caché, contador de la cesta) y cada vista renderizando la aplicación completa, con el
  API simulado a nivel de red. La cobertura supera el 95 % y tiene umbrales mínimos configurados.
- **End-to-end** (Playwright): recorren los flujos principales sobre la compilación de producción,
  en escritorio y en móvil. Incluyen comprobaciones que solo un navegador real puede hacer, como
  escribir rápido en el buscador sin perder caracteres.
- **Accesibilidad** (axe): cada vista se audita contra las pautas WCAG 2.2 AA.

Antes de lanzar los tests end-to-end por primera vez hay que instalar el navegador:

```bash
npx playwright install chromium
```

## Accesibilidad

- HTML semántico: landmarks, encabezados jerárquicos, listas y listas de definiciones.
- Selectores de opciones construidos sobre radios nativos, utilizables con teclado.
- Enlace para saltar al contenido y foco en el contenido principal al cambiar de página.
- Regiones vivas que anuncian el número de resultados, la cesta y las notificaciones.
- Respeto a la preferencia de movimiento reducido.

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
├── components/              Componentes compartidos (migas, notificaciones, mensajes de estado...)
├── api/                     Cliente HTTP, configuración y endpoints del API
├── shared/                  Utilidades genéricas y definición de rutas
└── test/                    Configuración y utilidades de los tests
e2e/                         Tests end-to-end y de accesibilidad
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

El historial de commits sigue estos hitos:

1. Estructura del proyecto, herramientas y README
2. Cliente del API y caché de datos
3. Vista de listado (PLP)
4. Buscador en tiempo real
5. Vista de detalle (PDP)
6. Organización en entidades y funcionalidades
7. Cesta
8. Diseño adaptativo, accesibilidad y tests end-to-end

## Posibles mejoras

- **Página de cesta** con los productos añadidos, si el API ofreciera un endpoint para consultarla.
- **Integración continua** que ejecute lint, tests y build en cada cambio.
- **Internacionalización** de los textos, hoy escritos en español en los componentes.
- **Imágenes de mayor resolución**: las del API son de 160 × 212 píxeles, lo que limita su tamaño
  en el detalle.
