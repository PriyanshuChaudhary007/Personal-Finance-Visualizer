"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  refresh: boolean;
};

type Transaction = {
  amount: number;
  date: string;
};

type ChartData = {
  month: string;
  total: number;
};

function getMonthName(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short", year: "2-digit" });
}

export default function MonthlyBarChart({ refresh }: Props) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions");
      const data: Transaction[] = await res.json();

      const grouped: Record<string, number> = {};

      data.forEach((txn) => {
        const month = getMonthName(txn.date);
        grouped[month] = (grouped[month] || 0) + txn.amount;
      });

      const formatted: ChartData[] = Object.entries(grouped).map(
        ([month, total]) => ({ month, total })
      );

      setChartData(formatted);
    };

    fetchData();
  }, [refresh]);

  return (
    <div className="w-full max-w-3xl mt-10">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
