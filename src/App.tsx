
import { useState } from 'react';
import type { FormEvent } from 'react';
import './App.css';
import ListaCripto from './components/ListaCripto';
import { consultaSchema } from './schemas/consultaSchema';
import { obtenerPrecios } from './services/criptoService';
import type { Criptomoneda } from './services/criptoService';
import EstadoConsulta from './components/EstadoConsulta';
import { useFavoritosStore } from './store/favoritosStore';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import DetalleCripto from './pages/DetalleCripto';
import NoEncontrado from './pages/NoEncontrado';

function App() {
  const [moneda, setMoneda] = useState<'usd' | 'eur' | 'ars'>('usd');
  const [busqueda, setBusqueda] = useState('');
  const [errorBusqueda, setErrorBusqueda] = useState('');
  const [errorMoneda, setErrorMoneda] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [criptomonedas, setCriptomonedas] = useState<Criptomoneda[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [consultaRealizada, setConsultaRealizada] = useState(false);

  const criptomonedasFiltradas = criptomonedas.filter((cripto) =>
    cripto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const favoritas = useFavoritosStore((state) => state.favoritas);

const alternarFavorita = useFavoritosStore(
  (state) => state.alternarFavorita
);

async function ejecutarConsulta() {
  setErrorBusqueda('');
  setErrorMoneda('');
  setMensaje('');
  setError('');
  setCargando(true);

  try {
    const datos = await obtenerPrecios(moneda);
    setCriptomonedas(datos);
    setConsultaRealizada(true);
    setMensaje('Precios actualizados correctamente.');
  } catch {
    setError('No se pudieron obtener los precios. Intentá nuevamente.');
    setConsultaRealizada(true);
  } finally {
    setCargando(false);
  }
}

function validarConsulta(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const resultado = consultaSchema.safeParse({
    busqueda,
    moneda
  });

  if (!resultado.success) {
    const errores = resultado.error.issues;

    setErrorBusqueda(
      errores.find((error) => error.path[0] === 'busqueda')?.message ?? ''
    );

    setErrorMoneda(
      errores.find((error) => error.path[0] === 'moneda')?.message ?? ''
    );

    setMensaje('');
    return;
  }

  ejecutarConsulta();
}

  return (
    <BrowserRouter>
      <header>
        <h1>Pulso Abierto</h1>
        <p>Consulta de precios de criptomonedas</p>

        <nav>
          <Link to="/">Inicio</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h2>Consultar precios</h2>

              <form onSubmit={validarConsulta}>
                <button type="submit" disabled={cargando}>
                  {cargando ? 'Consultando...' : 'Consultar'}
                </button>

                <input
                  type="text"
                  placeholder="Buscar criptomoneda..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />

                {errorBusqueda && (
                  <p role="alert">{errorBusqueda}</p>
                )}

                <label htmlFor="moneda">Moneda:</label>

                <select
                  id="moneda"
                  value={moneda}
                  onChange={(e) => {
                    const valor = e.target.value;
                    if (valor === 'usd' || valor === 'eur' || valor === 'ars') {
                      setMoneda(valor);
                    }
                  }}
                >
                  <option value="usd">Dólares (USD)</option>
                  <option value="eur">Euros (EUR)</option>
                  <option value="ars">Pesos argentinos (ARS)</option>
                </select>

                {errorMoneda && (
                  <p role="alert">{errorMoneda}</p>
                )}

                
              </form>

              <EstadoConsulta
                cargando={cargando}
                error={error}
                mensaje={mensaje}
                cantidadResultados={criptomonedasFiltradas.length}
                consultaRealizada={consultaRealizada}
                onReintentar={ejecutarConsulta}
              />

              {criptomonedas.length > 0 && (
              <ListaCripto
                criptomonedas={criptomonedasFiltradas}
                favoritas={favoritas}
                alternarFavorita={alternarFavorita}
                moneda={moneda}
              />
            )}
            </main>
          }
        />

        <Route
          path="/criptomonedas/:id"
          element={<DetalleCripto />}
        />

        <Route
          path="*"
          element={<NoEncontrado />}
        />
      </Routes>

      <footer>
        <p>Datos proporcionados por CoinGecko</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
