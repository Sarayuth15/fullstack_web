import { Product, ProductInput } from "@/types/product";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      const fieldErrors = body.errors ? Object.values(body.errors).join(", ") : "";
      message = fieldErrors || body.detail || message;
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(message);
  }
  return res.status === 204 ? (undefined as T) : res.json();
}

export const productApi = {
  list: (search = "") => request<Product[]>(`/products?search=${encodeURIComponent(search)}`),
  create: (data: ProductInput) =>
    request<Product>("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: ProductInput) =>
    request<Product>(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: number) => request<void>(`/products/${id}`, { method: "DELETE" }),
};
