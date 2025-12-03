import Link from "next/link";
import { TemplateRecord } from "@/seating-module/lib/types";
import { Button } from "@/seating-module/components/ui";
import { TemplateList } from "@/seating-module/components/templates/TemplateList";
import { db } from "@/db";
import { getTemplates } from "@/seating-module/database/templates";

export default async function TemplatesPage() {
  const data = await getTemplates(db);
  const templates = data.templates as TemplateRecord[];

  return (
    <div className="seating-module p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Templates</h1>

        <Link href="/templates/create">
          <Button>Create Template</Button>
        </Link>
      </div>

      <TemplateList templates={templates} />
    </div>
  );
}
