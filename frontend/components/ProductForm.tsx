"use client";

import { FormEvent, useEffect, useState } from "react";
import { Product, ProductInput } from "@/types/product";

interface Props {
  editing: Product | null;
  saving: boolean;
  onSubmit: (data: ProductInput) => void;
  onCancel: () => void;
}

const empty = { name: "", description: "", price: "", quantity: "" };

export default function ProductForm({ editing, saving, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState(empty);

  useEffect(() => {
    setValues(
      editing
        ? {
            name: editing.name,
            description: editing.description ?? "",
            price: String(editing.price),
            quantity: String(editing.quantity),
          }
        : empty
    );
  }, [editing]);

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: values.name,
      description: values.description,
      price: Number(values.price),
      quantity: Number(values.quantity),
    });
    if (!editing) setValues(empty);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editing ? "Edit product" : "Add product"}</h2>
      <label>
        Name
        <input value={values.name} onChange={set("name")} maxLength={120} required />
      </label>
      <label>
        Description
        <textarea value={values.description} onChange={set("description")} maxLength={500} rows={3} />
      </label>
      <div className="row">
        <label>
          Price
          <input type="number" min="0" step="0.01" value={values.price} onChange={set("price")} required />
        </label>
        <label>
          Quantity
          <input type="number" min="0" step="1" value={values.quantity} onChange={set("quantity")} required />
        </label>
      </div>
      <div className="actions">
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "Saving…" : editing ? "Update" : "Create"}
        </button>
        {editing && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
