# Pulso Abierto

Aplicación web desarrollada con React y TypeScript que permite consultar los precios de Bitcoin, Ethereum y Solana mediante la API pública de CoinGecko. Incluye búsqueda, selección de moneda, navegación entre vistas y administración de criptomonedas favoritas.

## Tecnologías utilizadas

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Zod
- Fetch API
- Vitest
- Testing Library
- Oxlint

## Requisitos

- Node.js
- npm
- Git

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta del proyecto:

```bash
cd PulsoAbierto_React
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución en desarrollo

Para iniciar el servidor local:

```bash
npm run dev
```

Vite proporcionará una dirección local para abrir la aplicación en el navegador.

## Funcionalidades principales

- Consulta de precios de Bitcoin, Ethereum y Solana.
- Selección de moneda: USD, EUR y ARS.
- Búsqueda de criptomonedas.
- Validación del formulario mediante Zod.
- Navegación entre listado, detalle y página no encontrada.
- Administración global de favoritos mediante Zustand.
- Persistencia de favoritos mediante localStorage.
- Estados de carga, resultado, ausencia de datos y error.
- Reintento de consultas cuando ocurre un error.

## API utilizada

Se utiliza la API pública de CoinGecko:

https://api.coingecko.com/api/v3/simple/price

Los datos se solicitan mediante Fetch API y se transforman en la capa de servicios antes de entregarse a los componentes.

## Pruebas automatizadas

Para ejecutar las pruebas:

```bash
npm run test
```

Para ejecutar todas las pruebas una sola vez:

```bash
npm run test:run
```

Las pruebas verifican:

- Agregado y eliminación de favoritos.
- Respuestas exitosas del servicio.
- Manejo de errores HTTP.
- Visualización de resultados.
- Presentación de errores.
- Recuperación mediante reintento.

## Compilación

Para generar la versión productiva:

```bash
npm run build
```

## Vista previa del build

Para comprobar la versión productiva localmente:

```bash
npm run preview
```

## Análisis de código

Para ejecutar Oxlint:

```bash
npm run lint
```

## Mejora de mantenibilidad

Se identificó que la función de validación del formulario también se utilizaba para ejecutar nuevamente una consulta desde el botón de reintento, simulando un evento FormEvent.

Para mejorar la organización del código se separaron las responsabilidades:

- `validarConsulta`: valida los datos ingresados mediante Zod.
- `ejecutarConsulta`: realiza la solicitud a la API y administra los estados de carga, resultado y error.

El botón de reintento ahora utiliza directamente `ejecutarConsulta`, evitando simular un evento del formulario.

**Verificación:** después de la modificación se ejecutaron `npm run test:run` y `npm run build`. Ambos finalizaron correctamente.

## Publicación

**Repositorio GitHub:** [Pulso Abierto](https://github.com/MarcosPastorini/PulsoAbierto_React)

**Aplicación publicada en Vercel:** [Pulso Abierto](https://pulso-abierto-react-alpha.vercel.app/)