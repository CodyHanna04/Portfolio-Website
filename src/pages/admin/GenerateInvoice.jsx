// src/pages/admin/GenerateInvoice.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../auth/firebase";
import { doc, updateDoc, collection, addDoc, Timestamp, getDoc } from "firebase/firestore";

const GenerateInvoice = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([{ description: "", amount: "" }]);
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const addItem = () => setItems([...items, { description: "", amount: "" }]);

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const total = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const projectSnap = await getDoc(doc(db, "proposals", proposalId));
        const projectData = projectSnap.exists() ? projectSnap.data() : {};

        const invoiceRef = await addDoc(collection(db, "invoices"), {
            proposalId,
            items,
            total,
            dueDate: Timestamp.fromDate(new Date(dueDate)),
            createdAt: Timestamp.now(),
            projectName: projectData.websiteGoal || "",
            clientName: projectData.businessName || "",
            userId: projectData.userId || "",
            email: projectData.email || "",
            status: "unpaid"
        });

        await updateDoc(doc(db, "proposals", proposalId), {
            invoiceId: invoiceRef.id,
            invoiceUrl: `/view-invoice/${invoiceRef.id}`,
        });

        navigate(`/admin/invoices`);
        } catch (err) {
        console.error("Error creating invoice:", err);
        setLoading(false);
        }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">🧾 Generate Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(idx, "description", e.target.value)}
              className="flex-1 p-2 bg-gray-800 rounded border border-gray-700"
              required
            />
            <input
              type="number"
              placeholder="Amount"
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
          {loading ? "Generating..." : "Generate Invoice"}
        </button>
      </form>
    </div>
  );
};

export default GenerateInvoice; 
