
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { obtenerPrecios } from './services/criptoService';

vi.mock('./services/criptoService', () => ({
  obtenerPrecios: vi.fn()
}));

describe('Consulta de criptomonedas', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('muestra los resultados cuando la consulta es exitosa', async () => {
    const usuario = userEvent.setup();

    vi.mocked(obtenerPrecios).mockResolvedValue([
      { id: 1, nombre: 'Bitcoin', precio: 90000 },
      { id: 2, nombre: 'Ethereum', precio: 3000 },
      { id: 3, nombre: 'Solana', precio: 150 }
    ]);

    render(<App />);

    await usuario.type(
      screen.getByPlaceholderText('Buscar criptomoneda...'),
      'bit'
    );

    await usuario.click(
      screen.getByRole('button', { name: 'Consultar' })
    );

    expect(
      await screen.findByText('Precios actualizados correctamente.')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Bitcoin/i)
    ).toBeInTheDocument();

    expect(obtenerPrecios).toHaveBeenCalledWith('usd');
  });

  it('muestra un error cuando falla la consulta', async () => {
    const usuario = userEvent.setup();

    vi.mocked(obtenerPrecios).mockRejectedValue(
      new Error('Error de conexión')
    );

    render(<App />);

    await usuario.type(
      screen.getByPlaceholderText('Buscar criptomoneda...'),
      'bit'
    );

    await usuario.click(
      screen.getByRole('button', { name: 'Consultar' })
    );

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent(/No se pudieron obtener los precios/i);
  });

  it('permite reintentar una consulta después de un error', async () => {
    const usuario = userEvent.setup();

    vi.mocked(obtenerPrecios)
      .mockRejectedValueOnce(new Error('Error de conexión'))
      .mockResolvedValueOnce([
        { id: 1, nombre: 'Bitcoin', precio: 90000 },
        { id: 2, nombre: 'Ethereum', precio: 3000 },
        { id: 3, nombre: 'Solana', precio: 150 }
      ]);

    render(<App />);

    await usuario.type(
      screen.getByPlaceholderText('Buscar criptomoneda...'),
      'bit'
    );

    await usuario.click(
      screen.getByRole('button', { name: 'Consultar' })
    );

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent(/No se pudieron obtener los precios/i);

    await usuario.click(
      screen.getByRole('button', { name: 'Reintentar' })
    );

    expect(
      await screen.findByText('Precios actualizados correctamente.')
    ).toBeInTheDocument();

    expect(obtenerPrecios).toHaveBeenCalledTimes(2);
  });
});
