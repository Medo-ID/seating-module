"use client";
// Used for both create and edit forms.
import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import {
  CreateTemplateSchema,
  InitialTemplateSchema,
} from "../../utils/validators";

type TemplateFormProps = {
  onSubmit: (v: CreateTemplateSchema) => Promise<void>;
  initial?: Partial<InitialTemplateSchema>;
  submitText?: string;
};

export function TemplateForm({
  onSubmit,
  initial = {},
  submitText = "Create Template",
}: TemplateFormProps) {
  const [name, setName] = useState(initial.name ?? "");
  const [type, setType] = useState(initial.type ?? "theater");
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [defaultPrice, setDefaultPrice] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const layoutJson = JSON.stringify({
      rows,
      cols,
      defaultPrice,
      seats: [],
      createdAt: new Date().toISOString(),
      createdBy: "admin",
    });

    await onSubmit({ name, type, layoutJson });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Template Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <Select
          value={type}
          onChange={(e) =>
            setType(e.target.value as "theater" | "restaurant" | "concert")
          }
          options={["theater", "restaurant", "concert"]}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rows</label>
          <Input
            type="number"
            min={1}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cols</label>
          <Input
            type="number"
            min={1}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Default Price
          </label>
          <Input
            type="number"
            min={0}
            value={defaultPrice}
            onChange={(e) => setDefaultPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {submitText}
      </Button>
    </form>
  );
}
