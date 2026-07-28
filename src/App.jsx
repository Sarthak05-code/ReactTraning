import { useEffect, useState, useRef } from "react";

const API = "https://dummyjson.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const formRef = useRef(null);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch products on mount
  useEffect(() => {
    fetch(`${API}?limit=12`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => showToast("Failed to fetch products", "error"))
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setForm({ title: "", price: "" });
    setEditingId(null);
  };

  // CREATE
  const handleAdd = async () => {
    if (!form.title.trim() || !form.price) return;
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
      showToast("Product added successfully!");
    } catch {
      showToast("Failed to add product", "error");
    } finally {
      setSaving(false);
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!form.title.trim() || !form.price) return;
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
      showToast("Product updated successfully!");
    } catch {
      showToast("Failed to update product", "error");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
      if (editingId === id) resetForm();
      showToast("Product deleted");
    } catch {
      showToast("Failed to delete product", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({ title: product.title, price: String(product.price) });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingId ? handleUpdate() : handleAdd();
  };

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      {/* Animated background orbs */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />

      {/* Toast notification */}
      {toast && (
        <div
          style={{
            ...styles.toast,
            ...(toast.type === "error" ? styles.toastError : styles.toastSuccess),
          }}
        >
          <span style={styles.toastIcon}>
            {toast.type === "error" ? "✕" : "✓"}
          </span>
          {toast.message}
        </div>
      )}

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <span style={styles.navLogo}>⚡</span>
            <h1 style={styles.navTitle}>Products CRUD</h1>
          </div>
          <div style={styles.navBadge}>
            {products.length} item{products.length !== 1 ? "s" : ""}
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        {/* Form Card */}
        <div ref={formRef} style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>
              {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
            </h2>
            {editingId && (
              <span style={styles.editBadge}>Editing ID: {editingId}</span>
            )}
          </div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Wireless Headphones"
                style={styles.input}
                id="product-title-input"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Price ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                style={styles.input}
                id="product-price-input"
              />
            </div>
            <div style={styles.formActions}>
              <button
                type="submit"
                disabled={saving || !form.title.trim() || !form.price}
                style={{
                  ...styles.btnPrimary,
                  ...(saving || !form.title.trim() || !form.price
                    ? styles.btnDisabled
                    : {}),
                }}
                id="product-submit-btn"
              >
                {saving ? (
                  <span style={styles.spinner}>⟳</span>
                ) : editingId ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={styles.btnCancel}
                  id="product-cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search Bar */}
        <div style={styles.searchBar}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            style={styles.searchInput}
            id="product-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={styles.searchClear}
            >
              ✕
            </button>
          )}
        </div>

        {/* Product List */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}>⟳</div>
            <p style={styles.loadingText}>Fetching products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>📦</span>
            <p style={styles.emptyText}>
              {searchQuery ? "No products match your search." : "No products found."}
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  ...styles.card,
                  ...(editingId === product.id ? styles.cardEditing : {}),
                  ...(deletingId === product.id ? styles.cardDeleting : {}),
                }}
              >
                {product.thumbnail && (
                  <div style={styles.cardImageWrap}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={styles.cardImage}
                    />
                  </div>
                )}
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{product.title}</h3>
                  {product.brand && (
                    <p style={styles.cardBrand}>{product.brand}</p>
                  )}
                  <div style={styles.cardFooter}>
                    <span style={styles.cardPrice}>
                      ${Number(product.price).toFixed(2)}
                    </span>
                    {product.rating && (
                      <span style={styles.cardRating}>
                        ⭐ {product.rating}
                      </span>
                    )}
                  </div>
                </div>
                <div style={styles.cardActions}>
                  <button
                    onClick={() => startEdit(product)}
                    style={styles.btnEdit}
                    id={`edit-product-${product.id}`}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    style={{
                      ...styles.btnDelete,
                      ...(deletingId === product.id ? styles.btnDisabled : {}),
                    }}
                    id={`delete-product-${product.id}`}
                  >
                    {deletingId === product.id ? "⟳" : "🗑️ Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Inline CSS for animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.1); }
          66% { transform: translate(25px, -30px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 40px) scale(1.08); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        input:focus {
          outline: none;
          border-color: #818cf8 !important;
          box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25) !important;
        }

        button { cursor: pointer; }
        button:disabled { cursor: not-allowed; }

        button:not(:disabled):hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        button:not(:disabled):active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

/* ─── Inline Styles ─── */
const styles = {
  wrapper: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 40%, #16213e 100%)",
    color: "#e2e8f0",
    position: "relative",
    overflow: "hidden",
  },

  // Background orbs
  bgOrb1: {
    position: "fixed",
    top: "-10%",
    left: "-5%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
    animation: "float1 20s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgOrb2: {
    position: "fixed",
    bottom: "-15%",
    right: "-10%",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
    animation: "float2 25s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgOrb3: {
    position: "fixed",
    top: "40%",
    left: "50%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
    animation: "float3 18s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 0,
  },

  // Toast
  toast: {
    position: "fixed",
    top: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 1000,
    animation: "slideDown 0.3s ease-out",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  toastSuccess: {
    background: "rgba(16, 185, 129, 0.9)",
    color: "#fff",
    border: "1px solid rgba(16, 185, 129, 0.3)",
  },
  toastError: {
    background: "rgba(239, 68, 68, 0.9)",
    color: "#fff",
    border: "1px solid rgba(239, 68, 68, 0.3)",
  },
  toastIcon: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    background: "rgba(255,255,255,0.2)",
  },

  // Nav
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(15, 12, 41, 0.8)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  navInner: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  navLogo: {
    fontSize: "24px",
  },
  navTitle: {
    fontSize: "20px",
    fontWeight: 700,
    margin: 0,
    background: "linear-gradient(135deg, #818cf8, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.02em",
  },
  navBadge: {
    background: "rgba(129, 140, 248, 0.15)",
    color: "#a5b4fc",
    padding: "4px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 500,
    border: "1px solid rgba(129, 140, 248, 0.2)",
  },

  // Main
  main: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "32px 24px 64px",
    position: "relative",
    zIndex: 1,
  },

  // Form
  formCard: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(16px)",
    borderRadius: "20px",
    padding: "28px",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "24px",
    animation: "fadeInUp 0.5s ease-out",
  },
  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: 600,
    margin: 0,
    color: "#e2e8f0",
  },
  editBadge: {
    background: "rgba(251, 191, 36, 0.15)",
    color: "#fbbf24",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 500,
    border: "1px solid rgba(251, 191, 36, 0.2)",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "flex-end",
  },
  inputGroup: {
    flex: "1 1 200px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: 500,
    color: "#94a3b8",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#e2e8f0",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  formActions: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-end",
    flex: "0 0 auto",
  },
  btnPrimary: {
    padding: "10px 24px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "inherit",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  btnCancel: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  btnDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },

  // Search
  searchBar: {
    position: "relative",
    marginBottom: "24px",
    animation: "fadeInUp 0.5s ease-out 0.1s both",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 44px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(8px)",
    color: "#e2e8f0",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  searchClear: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#94a3b8",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontFamily: "inherit",
  },

  // Loading
  loadingContainer: {
    textAlign: "center",
    padding: "64px 0",
  },
  loadingSpinner: {
    fontSize: "32px",
    animation: "spin 1s linear infinite",
    display: "inline-block",
    marginBottom: "16px",
    color: "#818cf8",
  },
  loadingText: {
    color: "#64748b",
    fontSize: "14px",
    margin: 0,
  },

  // Empty
  emptyState: {
    textAlign: "center",
    padding: "64px 0",
  },
  emptyIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "16px",
  },
  emptyText: {
    color: "#64748b",
    fontSize: "15px",
    margin: 0,
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    animation: "fadeInUp 0.5s ease-out 0.2s both",
  },

  // Card
  card: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.06)",
    overflow: "hidden",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
  },
  cardEditing: {
    border: "1px solid rgba(251, 191, 36, 0.4)",
    boxShadow: "0 0 24px rgba(251, 191, 36, 0.08)",
  },
  cardDeleting: {
    opacity: 0.5,
    transform: "scale(0.98)",
  },
  cardImageWrap: {
    width: "100%",
    height: "160px",
    overflow: "hidden",
    background: "rgba(0,0,0,0.2)",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  cardBody: {
    padding: "16px",
    flex: 1,
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 600,
    margin: "0 0 4px",
    color: "#f1f5f9",
    lineHeight: 1.3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  cardBrand: {
    fontSize: "12px",
    color: "#64748b",
    margin: "0 0 12px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    fontSize: "18px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #34d399, #6ee7b7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  cardRating: {
    fontSize: "13px",
    color: "#fbbf24",
    fontWeight: 500,
  },
  cardActions: {
    display: "flex",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  btnEdit: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    background: "transparent",
    color: "#fbbf24",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  btnDelete: {
    flex: 1,
    padding: "10px",
    border: "none",
    background: "transparent",
    color: "#f87171",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
};

export default App;
