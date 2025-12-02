import { z } from "zod";

// Templates
export const templateValidation = z.object({
  name: z.string().min(2).max(255),
  type: z.enum(["theater", "restaurant", "concert"]),
  layoutJson: z.record(z.any(), z.any()),
});

export type CreateTemplateSchema = z.infer<typeof templateValidation>;

// Events
export const eventsValidation = z.object({
  name: z.string().min(2).max(255),
  layoutJson: z.record(z.any(), z.any()),
});

export type CreateEventSchema = z.infer<typeof eventsValidation>;

// Seats
export const seatsValidation = z.object({
  label: z.string().min(2).max(15),
  x: z.number().positive(),
  y: z.number().positive(),
  price: z.number().positive(),
  status: z.enum(["available", "reserved", "blocked"]),
});

export type CreateSeatSchema = z.infer<typeof seatsValidation>;
