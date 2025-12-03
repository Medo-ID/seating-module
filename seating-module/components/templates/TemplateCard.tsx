// Used to show each template in a grid.
import { Card } from "../ui/Card";
import Link from "next/link";
import { TemplateRecord } from "../../lib/types";

export function TemplateCard({ template }: { template: TemplateRecord }) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold">{template.name}</h2>
        <p className="text-sm text-gray-600 capitalize">{template.type}</p>
      </div>

      <Link
        href={`/templates/${template.id}`}
        className="mt-4 text-brand-600 hover:text-brand-700 font-medium"
      >
        View Template →
      </Link>
    </Card>
  );
}
