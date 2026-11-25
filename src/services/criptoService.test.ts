import { describe, it, expect, vi, afterEach } from 'vitest';
import { obtenerPrecios } from './criptoService';

describe('obtenerPrecios', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('transforma correctamente los precios recibidos', async () => {
    const respuestaFalsa = {
      bitcoin: { usd: 90000 },
      ethereum: { usd: 3000 },
      solana: { usd: 150 }
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => respuestaFalsa
      })
    );

    const resultado = await obtenerPrecios('usd');

    expect(resultado).toEqual([
      { id: 1, nombre: 'Bitcoin', precio: 90000 },
      { id: 2, nombre: 'Ethereum', precio: 3000 },
      { id: 3, nombre: 'Solana', precio: 150 }
    ]);
  });

  it('lanza un error cuando la respuesta HTTP no es exitosa', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false
      })
    );

    await expect(obtenerPrecios('usd')).rejects.toThrow(
      'No se pudieron obtener los precios.'
    );
  });
});