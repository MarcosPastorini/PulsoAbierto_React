import { z } from 'zod';

export const consultaSchema = z.object({
  busqueda: z.string()
    .trim()
    .min(2, 'Ingresá al menos 2 caracteres'),

  moneda: z.enum(['usd', 'eur', 'ars'])
});