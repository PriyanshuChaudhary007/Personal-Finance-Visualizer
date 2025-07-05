"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  refresh: boolean;
};

type Transaction = {
  amount: number;
  category?: string;
};

type ChartData = {
  name: string;
  value: number;
};

const COLORS = [
  "#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#a855f7",
];

export default function CategoryPieChart({ refresh }: Props) {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const transactions: Transaction[] = await res.json();

      const categoryTotals: Record<string, number> = {};

      transactions.forEach((txn) => {
        const cat = txn.category || "Uncategorized";
        categoryTotals[cat] = (categoryTotals[cat] || 0) + txn.amount;
      });

      const chartFormatted: ChartData[] = Object.entries(categoryTotals).map(
        ([name, value]) => ({ name, value })
      );

      setData(chartFormatted);
    };

    fetchData();
  }, [refresh]);

  return (
    <div className="w-full max-w-3xl mt-10">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
