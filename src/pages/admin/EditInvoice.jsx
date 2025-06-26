// src/pages/admin/EditInvoice.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../auth/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      const snapshot = await getDoc(doc(db, "invoices", invoiceId));
      if (snapshot.exists()) {
        const data = snapshot.data();
        setItems(data.items);
        setDueDate(data.dueDate?.toDate().toISOString().split("T")[0]);
      }
      setLoading(false);
    };
    fetchInvoice();
  }, [invoiceId]);

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { description: "", amount: "" }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
  const total = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "invoices", invoiceId), {
      items,
      total,
      dueDate: new Date(dueDate),
    });
    navigate(-1);
  };

  if (loading) return <div className="p-6 text-white">Loading invoice...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <input
              type="text"
              value={item.description}
              onChange={(e) => updateItem(idx, "description", e.target.value)}
              className="flex-1 p-2 bg-gray-800 rounded border border-gray-700"
              required
            />
            <input
              type="number"
              value={item.amount}
              onChange={(e) => updateItem(idx, "amount", e.target.value)}
              className="w-28 p-2 bg-gray-800 rounded border border-gray-700"
              required
            />
            <button type="button" onClick={() => removeItem(idx)} className="text-red-400 hover:underline">
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addItem} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          + Add Item
        </button>

        <div>
          <label className="block mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 bg-gray-800 rounded border border-gray-700"
            required
          />
        </div>

        <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>

        <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditInvoice;
