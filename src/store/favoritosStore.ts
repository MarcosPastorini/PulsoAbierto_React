import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritosStore {
  favoritas: number[];
  alternarFavorita: (id: number) => void;
}

export const useFavoritosStore = create<FavoritosStore>()(
  persist(
    (set) => ({
      favoritas: [],

      alternarFavorita: (id) =>
        set((state) => ({
          favoritas: state.favoritas.includes(id)
            ? state.favoritas.filter((favorita) => favorita !== id)
            : [...state.favoritas, id]
        }))
    }),
    {
      name: 'pulso-abierto-favoritos'
    }
  )
);