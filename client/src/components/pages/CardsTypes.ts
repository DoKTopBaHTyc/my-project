import { z } from 'zod';

export const AirCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number().or(z.promise(z.number())),
  button: z.string(),
});

export type AirCard = z.infer<typeof AirCardSchema>;

export type ProductCard = {
  id: number;
  name: string;
  image: string;
  price: number;
  button: string;
};
