import { useEffect, useState } from "react";

const API = "https://dummyjson.com/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  // Status management
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // READ - Fetch Initial Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${API}?limit=10`);
        if (!res.ok) throw new Error("Failed to fetch products.");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Reset form and edit state helper
  const resetForm = () => {
    setForm({ title: "", price: "" });
    setEditingId(null);
  };

  // CREATE
  const addProduct = async () => {
    const res = await fetch(`${API}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title.trim(),
        price: Number(form.price),
      }),
    });
    if (!res.ok) throw new Error("Failed to add product.");
    const data = await res.json();

    // Ensure local unique ID in case API returns duplicate mock IDs
    const newProduct = { ...data, id: data.id || Date.now(), isLocal: true };
    setProducts((prev) => [newProduct, ...prev]);
  };

  // UPDATE
  const updateProduct = async () => {
    const targetProduct = products.find((p) => p.id === editingId);

    let updatedData = {
      id: editingId,
      title: form.title.trim(),
      price: Number(form.price),
    };

    // If item was created locally, skip network PUT request (DummyJSON 404s on fake IDs)
    if (!targetProduct?.isLocal) {
      const res = await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          price: Number(form.price),
        }),
      });
      if (!res.ok) throw new Error("Failed to update product.");
      updatedData = await res.json();
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === editingId ? { ...p, ...updatedData } : p))
    );
  };

  // DELETE
  const deleteProduct = async (id) => {
    const targetProduct = products.find((p) => p.id === id);

    try {
      // Optimistic update for responsive UX
      setProducts((prev) => prev.filter((p) => p.id !== id));

      // Skip API request for locally created fake items
      if (!targetProduct?.isLocal) {
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete product on server.");
      }
    } catch (err) {
      // Rollback if server delete failed
      if (targetProduct) {
        setProducts((prev) => [targetProduct, ...prev]);
      }
      setError(err.message);
    }
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price || Number(form.price) < 0) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (editingId) {
        await updateProduct();
      } else {
        await addProduct();
      }

      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({ title: product.title, price: String(product.price) });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Products Manager</h1>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-500 font-bold hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Product Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          disabled={isSubmitting}
          required
          className="border border-gray-300 px-3 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <input
          type="number"
          placeholder="Price"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          disabled={isSubmitting}
          required
          className="border border-gray-300 px-3 py-2 rounded-md w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Product List */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No products found.</div>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="border border-gray-200 p-3 rounded-md flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-800">
                {p.title} — <strong className="text-gray-900">${p.price}</strong>
              </span>
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => startEdit(p)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-600 hover:underline font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}