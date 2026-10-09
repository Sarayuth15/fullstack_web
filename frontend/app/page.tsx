"use client";

import { useCallback, useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import ProductTable from "@/components/ProductTable";
import { productApi } from "@/lib/api";
import { Product, ProductInput } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (term: string) => {
    try {
      setLoading(true);
      setProducts(await productApi.list(term));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(search), 250);
    return () => clearTimeout(t);
  }, [search, load]);

  const handleSubmit = async (data: ProductInput) => {
    try {
      setSaving(true);
      if (editing) await productApi.update(editing.id, data);
      else await productApi.create(data);
      setEditing(null);
      await load(search);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p: Product) => {
    if (!window.confirm(`Delete "${p.name}"?`)) return;
    try {
      await productApi.remove(p.id);
      if (editing?.id === p.id) setEditing(null);
      await load(search);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <main className="container">
      <h1>Products</h1>
      {error && <div className="alert" role="alert">{error}</div>}
      <div className="layout">
        <ProductForm
          editing={editing}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
        <section className="card">
          <input
            className="search"
            type="search"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loading ? (
            <p className="empty">Loading…</p>
          ) : (
            <ProductTable products={products} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </section>
      </div>
    </main>
  );
}
