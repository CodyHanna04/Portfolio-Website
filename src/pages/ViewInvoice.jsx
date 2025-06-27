// src/pages/ViewInvoice.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";

const ViewInvoice = () => {
  const { id } = useParams(); // id = invoiceId
  const [invoice, setInvoice] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceAndProposal = async () => {
      try {
        const invoiceRef = doc(db, "invoices", id);
        const invoiceSnap = await getDoc(invoiceRef);

        if (!invoiceSnap.exists()) {
          setLoading(false);
          return;
        }

        const invoiceData = invoiceSnap.data();
        setInvoice(invoiceData);

        if (invoiceData.proposalId) {
          const proposalRef = doc(db, "proposals", invoiceData.proposalId);
          const proposalSnap = await getDoc(proposalRef);
          if (proposalSnap.exists()) {
            setProposal(proposalSnap.data());
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setLoading(false);
      }
    };

    fetchInvoiceAndProposal();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading invoice...</div>;
  if (!invoice) return <div className="p-6 text-white">Invoice not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Invoice for {invoice.clientName || "Client"}</h1>
      <div className="bg-gray-900 rounded p-4 mb-6 border border-gray-700">
        <p><strong>Project:</strong> {invoice.projectName}</p>
        <p><strong>Client:</strong> {invoice.clientName || "N/A"}</p>
        <p><strong>Email:</strong> {invoice.email || "N/A"}</p>
        <p><strong>Status:</strong> {invoice.status}</p>
        <p><strong>Total:</strong> ${invoice.total}</p>
        <p><strong>Due Date:</strong> {invoice.dueDate?.toDate?.().toLocaleDateString()}</p>
      </div>

      {invoice.items?.length > 0 && (
        <div className="bg-gray-800 rounded p-4 mb-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Invoice Items</h2>
          <ul className="space-y-2">
            {invoice.items.map((item, idx) => (
              <li key={idx} className="border border-gray-700 rounded p-2">
                <p><strong>{item.description}</strong></p>
                <p>Amount: ${item.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {proposal && (
        <div className="bg-gray-800 rounded p-4 border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Proposal Info</h2>
          <p><strong>Details:</strong> {proposal.projectDetails}</p>
          <p><strong>Timeline:</strong> {proposal.timeline}</p>
          <p><strong>Budget:</strong> ${proposal.budget}</p>
        </div>
      )}
    </div>
  );
};

export default ViewInvoice;
