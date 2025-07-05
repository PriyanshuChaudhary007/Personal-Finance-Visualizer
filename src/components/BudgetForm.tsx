"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BudgetForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    month: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ category: "", amount: "", month: "" });
        onSuccess?.();
      }
    } catch (err) {
      console.error("Error saving budget", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      <Input
        name="category"
        placeholder="Category (e.g. Food)"
        value={form.category}
        onChange={handleChange}
        required
      />
      <Input
        type="number"
        name="amount"
        placeholder="Budget Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <Input
        type="month"
        name="month"
        value={form.month}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="cursor-pointer" disabled={loading}>
        {loading ? "Saving..." : "Set Budget"}
      </Button>
    </form>
  );
}
