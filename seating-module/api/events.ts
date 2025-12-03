import { Pool } from "pg";
import { eventValidation } from "../utils/validators";
import { ZodError } from "zod";
import { TemplateLayoutJSON } from "../lib/types";
import { saveEventSeats } from "../database/events";

export function createEvent(db: Pool) {
  return async function (req: Request): Promise<Response> {
    try {
      const parsed = eventValidation.parse(req.body);
      const { name, layoutJson } = parsed;

      const { rows } = await db.query(
        `INSERT INTO events (name, layout_json) 
        VALUES ($1, $2) RETURNING *`,
        [name, layoutJson]
      );

      const seats: TemplateLayoutJSON = JSON.parse(layoutJson);
      const result = await saveEventSeats(db, rows[0].id, seats.seats);

      if (!result.success) {
        throw result.error;
      }

      return Response.json(
        { event: rows[0], message: "Event created" },
        { status: 201 }
      );
    } catch (err) {
      console.error("Create event error", err);

      if (err instanceof ZodError) {
        return Response.json({
          error: "Validation failed",
          details: err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }

      if (err instanceof Error) {
        return Response.json({ error: err.message }, { status: 400 });
      }

      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };
}
