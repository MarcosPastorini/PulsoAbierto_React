
import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { obtenerPrecios } from '../services/criptoService';
import type { Criptomoneda } from '../services/criptoService';
import { useFavoritosStore } from '../store/favoritosStore';

function DetalleCripto() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const valorMoneda = searchParams.get('moneda');

  const moneda: 'usd' | 'eur' | 'ars' =
    valorMoneda === 'ars' || valorMoneda === 'eur'
      ? valorMoneda
      : 'usd';

  const [cripto, setCripto] = useState<Criptomoneda | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const favoritas = useFavoritosStore((state) => state.favoritas);
  const alternarFavorita = useFavoritosStore(
    (state) => state.alternarFavorita
  );

  useEffect(() => {
    async function cargarDetalle() {
      try {
        const datos = await obtenerPrecios(moneda);

        const encontrada = datos.find(
          (moneda) => moneda.id === Number(id)
        );

        setCripto(encontrada ?? null);
      } catch {
        setError('No se pudo cargar la información.');
      } finally {
        setCargando(false);
      }
    }

    cargarDetalle();
  }, [id, moneda]);

  if (cargando) {
    return <p role="status">Cargando información...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!cripto) {
    return (
      <main>
        <h2>Criptomoneda no encontrada</h2>
        <Link to="/">Volver al inicio</Link>
      </main>
    );
  }

  return (
    <main>
      <h2>{cripto.nombre}</h2>

      <p>
        Precio: {cripto.precio} {moneda.toUpperCase()}
      </p>

      <button onClick={() => alternarFavorita(cripto.id)}>
        {favoritas.includes(cripto.id)
          ? '★ Quitar de favoritas'
          : '☆ Agregar a favoritas'}
      </button>

      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default DetalleCripto;
