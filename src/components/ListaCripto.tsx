import TarjetaCripto from './TarjetaCripto';

interface Criptomoneda {
  id: number;
  nombre: string;
  precio: number;
}

interface ListaCriptoProps {
  criptomonedas: Criptomoneda[];
  favoritas: number[];
  moneda: string;
  alternarFavorita: (id: number) => void;
}



function ListaCripto({
  criptomonedas,
  favoritas,
  moneda,
  alternarFavorita
}: ListaCriptoProps) {
  return (
    <div>
      {criptomonedas.map((cripto) => (
        <TarjetaCripto
          key={cripto.id}
          nombre={cripto.nombre}
          precio={cripto.precio}
          favorita={favoritas.includes(cripto.id)}
          onToggle={() => alternarFavorita(cripto.id)}
          id={cripto.id}
          moneda={moneda}
        />
      ))}
    </div>
  );
}

export default ListaCripto;