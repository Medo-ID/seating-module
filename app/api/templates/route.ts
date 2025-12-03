import { db } from "@/db";
import { createTemplate } from "@/seating-module/api/templates";

export const POST = createTemplate(db);
