import { useEffect, useState } from "react";

const API = "https://dummyjson.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  // READ
  useEffect(() => {
    fetch(`${API}?limit=10`)
      .then((r) => r.json())
      .then((d) => setProducts(d.products));
  }, []);

  // CREATE
  const addProduct = async () => {
    const res = await fetch(`${API}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, price: +form.price }),
    });
    const data = await res.json();
    setProducts([data, ...products]);
    setForm({ title: "", price: "" });
  };

  // UPDATE
  const updateProduct = async () => {
    const res = await fetch(`${API}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, price: +form.price }),
    });
    const data = await res.json();
    setProducts(products.map((p) => (p.id === editingId ? data : p)));
    setForm({ title: "", price: "" });
    setEditingId(null);
  };

  // DELETE
  const deleteProduct = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;
    editingId ? updateProduct() : addProduct();
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ title: p.title, price: String(p.price) });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products CRUD</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          className="border px-3 py-2 rounded flex-1"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border px-3 py-2 rounded w-28"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setForm({ title: "", price: "" }); }}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="border p-3 rounded flex justify-between items-center">
            <span>{p.title} — <strong>${p.price}</strong></span>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-blue-500">Edit</button>
              <button onClick={() => deleteProduct(p.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
