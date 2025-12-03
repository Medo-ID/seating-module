import { Pool } from "pg";
import { CreateSeatSchema, seatValidation } from "../utils/validators";
import { UUID } from "crypto";

type Value = (UUID | string | number | CreateSeatSchema["status"])[];

export async function getEvents(db: Pool) {
  try {
    const { rows } = await db.query(
      `SELECT 
        id,
        name,
        template_id,
        layout_json,
        created_at
      FROM events
      ORDER BY created_at DESC`
    );
    return { events: rows };
  } catch (err) {
    console.error("Fetch events error", err);
    return { error: "Internal Sever Error" };
  }
}

export async function getEvent(db: Pool, id: UUID) {
  try {
    const { rows } = await db.query(
      `SELECT 
        id,
        name,
        template_id,
        layout_json,
        created_at
      FROM events
      WHERE id = $1`,
      [id]
    );
    return { event: rows[0] };
  } catch (err) {
    console.error("Fetch event error", err);
    return { error: "Internal Sever Error" };
  }
}

export async function saveEventSeats(
  db: Pool,
  eventId: string,
  seats: CreateSeatSchema[]
) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    const values: Value = [];

    const placeholders = seats
      .map((seat, index) => {
        const parsed = seatValidation.parse(seat);
        const baseIndex = index * 5;
        values.push(
          eventId,
          parsed.label,
          parsed.x,
          parsed.y,
          parsed.price,
          parsed.status
        );
        return `(${baseIndex + 1}, ${baseIndex + 2}, ${baseIndex + 3}, 
      ${baseIndex + 4}, ${baseIndex + 5}, ${baseIndex + 6})`;
      })
      .join(", ");

    await client.query(
      `INSERT INTO seats (event_id, label, x, y, price, status)
      VALUES ${placeholders}`,
      [values]
    );

    await client.query("COMMIT");

    return { success: true };
  } catch (err) {
    await client.query("ROLLBACK");
    console.log("Save event's seats error", err);
    return { success: false, error: err };
  } finally {
    client.release();
  }
}
