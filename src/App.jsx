import { useEffect, useState } from "react";

const API = "https://dummyjson.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetch(`${API}?limit=10`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setForm({ title: "", price: "" });
    setEditingId(null);
  };

  // CREATE
  const handleAdd = async () => {
    if (!form.title || !form.price) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, price: Number(form.price) }),
      });
      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!form.title || !form.price) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, price: Number(form.price) }),
      });
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === editingId ? updated : p)));
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({ title: product.title, price: String(product.price) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingId ? handleUpdate() : handleAdd();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Products CRUD</h1>
      </nav>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-sm border flex gap-3 items-end"
        >
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Product title"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-28">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Price
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="0"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition disabled:opacity-50"
          >
            {saving ? "..." : editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </form>

        {/* Product List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <ul className="space-y-2">
            {products.map((product) => (
              <li
                key={product.id}
                className="bg-white px-4 py-3 rounded-lg shadow-sm border flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{product.title}</p>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(product)}
                    className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;