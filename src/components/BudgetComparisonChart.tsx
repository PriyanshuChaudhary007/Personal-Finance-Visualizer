"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type BudgetData = {
  category: string;
  budget: number;
  spent: number;
};

type Props = {
  refresh: boolean;
};

export default function BudgetComparison({ refresh }: Props) {
  const [data, setData] = useState<BudgetData[]>([]);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    async function fetchData() {
      const [budgetRes, txnRes] = await Promise.all([
        fetch(`/api/budgets?month=${month}`),
        fetch("/api/transactions"),
      ]);

      const budgets = await budgetRes.json();
      const transactions = await txnRes.json();

      const categorySpend: Record<string, number> = {};

      for (const txn of transactions) {
        const txnMonth = txn.date.slice(0, 7);
        if (txnMonth === month) {
          categorySpend[txn.category] =
            (categorySpend[txn.category] || 0) + txn.amount;
        }
      }

      const chartData: BudgetData[] = budgets.budgets.map((b: any) => ({
        category: b.category,
        budget: b.amount,
        spent: categorySpend[b.category] || 0,
      }));

      setData(chartData);
    }

    fetchData();
  }, [month, refresh]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Budget vs Actual</h2>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="spent" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
