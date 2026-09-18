import React, { useEffect, useState } from "react";
import "./AdminProducts.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });
// جلب المنتجات من نفس مصدر الموقع (dummyjson)
useEffect(() => {
  const categories = [
    "smartphones",
    "mobile-accessories",
    "laptops",
    "tablets",
    "sunglasses",
    "sports-accessories",
  ];

  Promise.all(
    categories.map((cat) =>
      fetch(`https://dummyjson.com/products/category/${cat}`).then((res) =>
        res.json()
      )
    )
  ).then((results) => {
    // دمج كل المنتجات من كل الكاتيجوريز في مصفوفة واحدة
    const allProducts = results.flatMap((r) => r.products);
    setProducts(allProducts);
    setLoading(false);
  });
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // فتح الفورم للإضافة
  const openAddForm = () => {
    setEditId(null);
    setFormData({ title: "", price: "", category: "", image: "" });
    setShowForm(true);
  };

  // فتح الفورم للتعديل
  const openEditForm = (product) => {
    setEditId(product.id);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product. images[0],
    });
    setShowForm(true);
  };

  // حفظ (إضافة أو تعديل)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // تعديل — محليًا
      setProducts(
        products.map((p) =>
          p.id === editId ? { ...p, ...formData, price: Number(formData.price) } : p
        )
      );
    } else {
      // إضافة — محليًا
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        rating: { rate: 0, count: 0 },
      };
      setProducts([newProduct, ...products]);
    }
    setShowForm(false);
  };

  // حذف
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="admin-products">
      <div className="products-header">
        <h1>Products</h1>
        <button className="add-btn" onClick={openAddForm}>
          + Add Product
        </button>
      </div>

      {/* الفورم (يظهر عند الإضافة/التعديل) */}
      {showForm && (
        <form className="product-form" onSubmit={handleSubmit}>
          <h2>{editId ? "Edit Product" : "Add Product"}</h2>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
          <div className="form-btns">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* جدول المنتجات */}
      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.images[0]} alt={p.title} className="product-img" />
              </td>
              <td className="product-title">{p.title}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => openEditForm(p)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p.id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}