import { z } from "zod";

// Templates
export const templateValidation = z.object({
  name: z.string().min(2).max(255),
  type: z.enum(["theater", "restaurant", "concert"]),
  rows: z.number().positive(),
  cols: z.number().positive(),
  defaultPrice: z.number().positive(),
  layoutJson: z.string().optional(),
});

export const createTemplateValidation = templateValidation.pick({
  name: true,
  type: true,
  layoutJson: true,
});

export type InitialTemplateSchema = z.infer<typeof templateValidation>;
export type CreateTemplateSchema = z.infer<typeof createTemplateValidation>;

// Events
export const eventValidation = z.object({
  name: z.string().min(2).max(255),
  templateId: z.uuid(),
  layoutJson: z.string(),
});

export type CreateEventSchema = z.infer<typeof eventValidation>;

// Seats
export const seatValidation = z.object({
  label: z.string().min(2).max(15),
  x: z.number().positive(),
  y: z.number().positive(),
  price: z.number().positive(),
  status: z.enum(["available", "reserved", "blocked"]),
});

export type CreateSeatSchema = z.infer<typeof seatValidation>;
