import { Pool } from "pg";
import { templateValidation } from "../lib/validators";
import { ZodError } from "zod";
import { UUID } from "crypto";

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

export function getTemplates(db: Pool) {
  return async function handler(): Promise<Response> {
    try {
      const { rows } = await db.query(
        `SELECT 
          id, 
          name, 
          type, 
          layout_json -> rows AS rows, 
          layout_json -> cols AS cols,
          created_at  
        FROM templates
        ORDER BY created_at DESC`
      );
      return Response.json(rows, { status: 200 });
    } catch (err) {
      console.error("Get templates error:", err);
      return Response.json(
        { error: "Failed to fetch templates" },
        { status: 500 }
      );
    }
  };
}

export function getTemplate(db: Pool) {
  return async function handler(id: UUID): Promise<Response> {
    try {
      const { rows } = await db.query(
        `SELECT id, name, type, layout_json, created_at 
        FROM templates WHERE id = $1`,
        [id]
      );

      if (!rows[0]) {
        return Response.json({ error: "Template not foud" }, { status: 404 });
      }
      return Response.json(rows[0], { status: 200 });
    } catch (err) {
      console.error("Get template error", err);
      return Response.json(
        { error: "Failed to fetch template" },
        { status: 500 }
      );
    }
  };
}
