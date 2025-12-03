import { Pool } from "pg";
import { templateValidation } from "../utils/validators";
import { ZodError } from "zod";

export function createTemplate(db: Pool) {
  return async function handler(req: Request): Promise<Response> {
    try {
      const body = await req.json();
      const parsed = templateValidation.parse(body);

      const { name, type, layoutJson } = parsed;

      const { rows } = await db.query(
        `INSERT INTO templates (name, type, layout_json) 
        VALUES ($1, $2, $3) RETURNING id`,
        [name, type, layoutJson]
      );

      return Response.json(
        { id: rows[0].id, message: `template created. id: ${rows[0]}` },
        { status: 201 }
      );
    } catch (err) {
      console.error("Create template error:", err);

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
