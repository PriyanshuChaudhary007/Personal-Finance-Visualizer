"use client";

import { useEffect, useState } from "react";

type Props = {
  onSuccess?: () => void;
  editingTransaction?: any;
  clearEdit?: () => void;
};

export default function TransactionForm({ onSuccess, editingTransaction, clearEdit }: Props) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        amount: editingTransaction.amount,
        description: editingTransaction.description,
        date: editingTransaction.date.slice(0, 10),
        category: editingTransaction.category,
      });
    }
  }, [editingTransaction]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = editingTransaction ? "PUT" : "POST";
    const url = editingTransaction
      ? `/api/transactions/${editingTransaction._id}`
      : "/api/transactions";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ amount: "", description: "", date: "", category: "" });
        onSuccess?.();
        clearEdit?.();
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <div className="flex gap-2">
       <button
        type="submit"
         disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80 cursor-pointer"
        >
  {loading ? "Saving..." : editingTransaction ? "Update" : "Add Transaction"}
</button>

        {editingTransaction && (
          <button
            type="button"
            onClick={clearEdit}
            className="text-sm underline text-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
