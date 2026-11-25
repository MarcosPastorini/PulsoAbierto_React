
import { Link } from 'react-router-dom';

interface TarjetaCriptoProps {
  id: number;
  nombre: string;
  precio: number;
  favorita: boolean;
  moneda: string;
  onToggle: () => void;
}

function TarjetaCripto({
  id,
  nombre,
  precio,
  favorita,
  moneda,
  onToggle
}: TarjetaCriptoProps) {
  return (
    <article className="tarjeta">
      <h3>
      <Link to={`/criptomonedas/${id}?moneda=${moneda}`}>
      {nombre}
      </Link>
      </h3>

      <p>Precio: {precio} {moneda.toUpperCase()}</p>

      <button onClick={onToggle}>
        {favorita ? '★ Quitar de favoritas' : '☆ Agregar a favoritas'}
      </button>
    </article>
  );
}

export default TarjetaCripto;
