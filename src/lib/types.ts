import { UUID } from "crypto";

export type TemplateRecord = {
  id: UUID;
  name: string;
  type: "theater" | "restaurant" | "concert";
  layout_json: object;
  created_at: string;
};
