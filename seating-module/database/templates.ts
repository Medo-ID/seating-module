import { UUID } from "crypto";
import { Pool } from "pg";

export async function getTemplates(db: Pool) {
  try {
    const { rows } = await db.query(
      `SELECT 
        id, 
        name, 
        type, 
        layout_json,
        created_at  
      FROM templates
      ORDER BY created_at DESC`
    );
    return { templates: rows };
  } catch (err) {
    console.error("Get templates error:", err);
    return { templates: [] };
  }
}

export async function getTemplate(db: Pool, id: UUID) {
  try {
    const { rows } = await db.query(
      `SELECT id, name, type, layout_json, created_at 
        FROM templates WHERE id = $1`,
      [id]
    );

    if (!rows[0]) {
      return { error: "Template not foud" };
    }
    return { template: rows[0] };
  } catch (err) {
    console.error("Get template error", err);
    return { error: "Failed to fetch template" };
  }
}
