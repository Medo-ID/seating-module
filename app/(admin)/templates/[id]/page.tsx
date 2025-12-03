"use client";

import { TemplateRecord } from "@/seating-module/lib/types";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export default function TemplateDetails({ params }: { params: { id: UUID } }) {
  const [template, setTemplate] = useState<TemplateRecord | null>(null);

  useEffect(() => {
    fetch(`/api/templates/${params.id}`)
      .then((r) => r.json())
      .then(setTemplate);
  }, [params.id]);

  if (!template) return <p>Loading...</p>;

  return (
    <div className="seating-module p-6">
      <h1 className="text-2xl font-semibold">{template.name}</h1>
      <p className="text-gray-600 capitalize">{template.type}</p>

      <pre className="mt-4 p-4 bg-gray-100 rounded-md">
        {JSON.stringify(template.layout_json, null, 2)}
      </pre>
    </div>
  );
}
