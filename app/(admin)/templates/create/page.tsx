"use client";

import { TemplateForm } from "@/seating-module/components/templates/TemplateForm";
import { CreateTemplateSchema } from "@/seating-module/utils/validators";
import { useRouter } from "next/navigation";

export default function CreateTemplatePage() {
  const router = useRouter();

  async function handleSubmit(values: CreateTemplateSchema) {
    await fetch("/api/templates", {
      method: "POST",
      body: JSON.stringify(values),
    });

    router.push("/templates");
  }

  return (
    <div className="seating-module p-6">
      <h1 className="text-xl font-semibold mb-6">Create Template</h1>
      <TemplateForm onSubmit={handleSubmit} />
    </div>
  );
}
