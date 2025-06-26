import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { Link } from "react-router-dom";

const statusColors = {
  paid: "bg-green-600",
  pending: "bg-yellow-500",
  overdue: "bg-red-600",
};

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchInvoices = async () => {
      const snapshot = await getDocs(collection(db, "invoices"));

      const withProjectData = await Promise.all(
        snapshot.docs.map(async (invDoc) => {
          const data = invDoc.data();
          let project = {};
          if (data.proposalId) {
            const proposalRef = doc(db, "proposals", data.proposalId);
            const proposalSnap = await getDoc(proposalRef);
            if (proposalSnap.exists()) {
              project = proposalSnap.data();
            }
          }

          return {
            id: invDoc.id,
            ...data,
            projectName: data.projectName || project.websiteGoal || "Unnamed Project",
            clientName: data.clientName || project.businessName || project.email || "Unknown Client",
            userId: data.userId || project.userId || "Unknown",
            items: data.items || [],
            dueDate: data.dueDate,
          };
        })
      );

      setInvoices(withProjectData);
      setFiltered(withProjectData);
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFiltered(invoices);
    } else {
      setFiltered(invoices.filter(inv => inv.status === statusFilter));
    }
  }, [statusFilter, invoices]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
        try {
        const invoiceRef = doc(db, "invoices", id);
        const invoiceSnap = await getDoc(invoiceRef);

        if (invoiceSnap.exists()) {
            const invoiceData = invoiceSnap.data();
            const proposalId = invoiceData.proposalId;

            if (proposalId) {
            const proposalRef = doc(db, "proposals", proposalId);
            await updateDoc(proposalRef, {
                invoiceId: deleteField(),
                invoiceUrl: deleteField(),
            });
            }
        }

        await deleteDoc(invoiceRef);
        setInvoices(prev => prev.filter(inv => inv.id !== id));
        } catch (err) {
        console.error("Error deleting invoice and cleaning proposal:", err);
        }
    }
    };

  const markAsPaid = async (id) => {
    await updateDoc(doc(db, "invoices", id), { status: "paid" });
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === id ? { ...inv, status: "paid" } : inv
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">📄 Invoices</h1>

      <div className="mb-4">
        <label className="mr-2">Filter by status:</label>
        <select
          className="bg-gray-800 text-white p-2 rounded border border-gray-600"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="space-y-6">
        {filtered.map((inv) => (
          <div
            key={inv.id}
            className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-sm relative"
          >
            {/* Top section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{inv.projectName}</h2>
                <p className="text-gray-300 text-sm">
                  <strong>Client:</strong> {inv.clientName}<br />
                  <strong>User ID:</strong> {inv.userId}<br />
                  <strong>Total:</strong> ${inv.total?.toFixed(2)}<br />
                  <strong>Due:</strong>{" "}
                  {inv.dueDate?.toDate ? inv.dueDate.toDate().toLocaleDateString() : "N/A"}
                </p>

                {inv.items.length > 0 && (
                  <div className="mt-3">
                    <h3 className="font-semibold mb-1">Items:</h3>
                    <ul className="text-sm text-gray-300 list-disc list-inside">
                      {inv.items.map((item, i) => (
                        <li key={i}>
                          {item.description} — ${parseFloat(item.amount).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {inv.invoiceUrl && (
                  <p className="mt-2 text-sm">
                    <a
                      href={inv.invoiceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 underline"
                    >
                      View Invoice PDF
                    </a>
                  </p>
                )}
              </div>

              <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${statusColors[inv.status] || "bg-gray-500"}`}>
                {inv.status?.toUpperCase() || "UNKNOWN"}
              </span>
            </div>

            {/* Button row */}
            <div className="flex justify-end gap-2 mt-4">
              {inv.status !== "paid" && (
                <button
                  onClick={() => markAsPaid(inv.id)}
                  className="text-xs bg-green-700 px-2 py-1 rounded hover:bg-green-800"
                >
                  ✓ Mark Paid
                </button>
              )}
              <Link
                to={`/admin/invoices/edit/${inv.id}`}
                className="text-sm bg-sky-700 px-3 py-1.5 h-10 flex items-center justify-center rounded hover:bg-sky-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(inv.id)}
                className="text-sm bg-red-600 px-2 py-1 h-10 rounded hover:bg-red-700"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoices;
