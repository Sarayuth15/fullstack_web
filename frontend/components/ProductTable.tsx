import { Product } from "@/types/product";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) return <p className="empty">No products found.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Qty</th>
          <th aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td data-label="Name"><strong>{p.name}</strong></td>
            <td data-label="Description">{p.description || "—"}</td>
            <td data-label="Price">${Number(p.price).toFixed(2)}</td>
            <td data-label="Qty">{p.quantity}</td>
            <td className="actions">
              <button className="btn" onClick={() => onEdit(p)}>Edit</button>
              <button className="btn danger" onClick={() => onDelete(p)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
