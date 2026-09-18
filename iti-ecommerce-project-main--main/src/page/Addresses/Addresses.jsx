import { useContext, useState } from "react";
import { CartContext } from "../../components/context/CartContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import "./addresses.css";

function Addresses() {
  const { addresses, addAddress, updateAddress, removeAddress } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", address: "", city: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ name: "", address: "", city: "", phone: "" });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, form);
      toast.success("Address updated");
    } else {
      addAddress(form);
      toast.success("Address added");
    }
    resetForm();
  };

  const handleEdit = (addr) => {
    setForm({ name: addr.name, address: addr.address, city: addr.city, phone: addr.phone });
    setEditingId(addr.id);
  };

  const handleDelete = (id) => {
    removeAddress(id);
    toast.error("Address removed");
    if (editingId === id) resetForm();
  };

  return (
    <div className="addresses_page">
      <div className="container">
        <h1>My Addresses</h1>

        <form onSubmit={handleSubmit} className="address_form">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          <div className="form_actions">
            <button type="submit" className="btn">{editingId ? "Update Address" : "Add Address"}</button>
            {editingId && (
              <button type="button" className="btn secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>

        <div className="addresses_list">
          {addresses.length === 0 ? (
            <p>No saved addresses yet.</p>
          ) : (
            addresses.map((addr) => (
              <div className="address_card" key={addr.id}>
                <div>
                  <strong>{addr.name}</strong> — {addr.phone}
                  <p>{addr.address}, {addr.city}</p>
                </div>
                <div className="address_actions">
                  <span onClick={() => handleEdit(addr)}><FaEdit /></span>
                  <span onClick={() => handleDelete(addr.id)}><FaTrash /></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Addresses;