import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritosStore } from './favoritosStore';

describe('Favoritos', () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritosStore.setState({ favoritas: [] });
  });

  it('agrega una criptomoneda a favoritas', () => {
    useFavoritosStore.getState().alternarFavorita(1);

    expect(useFavoritosStore.getState().favoritas).toContain(1);
  });

  it('quita una criptomoneda de favoritas', () => {
    useFavoritosStore.getState().alternarFavorita(1);
    useFavoritosStore.getState().alternarFavorita(1);

    expect(useFavoritosStore.getState().favoritas).not.toContain(1);
  });
});