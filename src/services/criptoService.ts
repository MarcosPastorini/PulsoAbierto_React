type Moneda = 'usd' | 'eur' | 'ars';

interface PrecioCoinGecko {
  [moneda: string]: number;
}

interface RespuestaCoinGecko {
  bitcoin: PrecioCoinGecko;
  ethereum: PrecioCoinGecko;
  solana: PrecioCoinGecko;
}

export interface Criptomoneda {
  id: number;
  nombre: string;
  precio: number;
}

export async function obtenerPrecios(
  moneda: Moneda
): Promise<Criptomoneda[]> {

  const parametros = new URLSearchParams({
    ids: 'bitcoin,ethereum,solana',
    vs_currencies: moneda
  });

  const respuesta = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?${parametros}`
  );

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los precios.');
  }

  const datos: RespuestaCoinGecko = await respuesta.json();

  return [
    {
      id: 1,
      nombre: 'Bitcoin',
      precio: datos.bitcoin[moneda]
    },
    {
      id: 2,
      nombre: 'Ethereum',
      precio: datos.ethereum[moneda]
    },
    {
      id: 3,
      nombre: 'Solana',
      precio: datos.solana[moneda]
    }
  ];
}