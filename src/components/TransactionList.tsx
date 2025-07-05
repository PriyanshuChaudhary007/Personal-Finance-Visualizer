"use client";

import { useEffect, useState } from "react";

type Props = {
  onEdit: (transaction: any) => void;
  refresh: boolean; 
};

export default function TransactionList({ onEdit, refresh }: Props) {
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data.reverse());
  };

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchTransactions(); 
      } else {
        console.error("Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-2">
      {transactions.map((t) => (
        <div key={t._id} className="border p-3 rounded flex justify-between items-center">
          <div>
            <p className="font-medium">{t.description}</p>
            <p className="text-sm text-gray-500">
              ₹{t.amount} • {t.category} • {new Date(t.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(t)}
              className="text-sm text-blue-600 underline cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(t._id)}
              className="text-sm text-red-600 underline cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
