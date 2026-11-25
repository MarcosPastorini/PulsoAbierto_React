import { Link } from 'react-router-dom';

function NoEncontrado() {
  return (
    <main>
      <h2>404 - Página no encontrada</h2>
      <p>La página que buscás no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default NoEncontrado;