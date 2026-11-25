interface EstadoConsultaProps {
  cargando: boolean;
  error: string;
  mensaje: string;
  cantidadResultados: number;
  consultaRealizada: boolean;
  onReintentar: () => void;
}

function EstadoConsulta({
  cargando,
  error,
  mensaje,
  cantidadResultados,
  consultaRealizada,
  onReintentar
}: EstadoConsultaProps) {

  if (cargando) {
    return <p role="status">Cargando precios...</p>;
  }

  if (error) {
    return (
      <div>
        <p role="alert">{error}</p>
        <button onClick={onReintentar}>
          Reintentar
        </button>
      </div>
    );
  }

  if (mensaje && cantidadResultados > 0) {
    return <p role="status">{mensaje}</p>;
  }

  if (consultaRealizada && cantidadResultados === 0) {
    return <p>No hay resultados para mostrar.</p>;
  }

  if (!consultaRealizada) {
    return <p>Realizá una consulta para ver los precios.</p>;
  }

  return null;
}

export default EstadoConsulta;