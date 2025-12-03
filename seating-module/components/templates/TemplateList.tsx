"use client";
// Used on /templates page.
import { TemplateRecord } from "../../lib/types";
import { TemplateCard } from "./TemplateCard";

export function TemplateList({ templates }: { templates: TemplateRecord[] }) {
  if (templates.length === 0) {
    return <p className="text-gray-500">No templates found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} />
      ))}
    </div>
  );
}
