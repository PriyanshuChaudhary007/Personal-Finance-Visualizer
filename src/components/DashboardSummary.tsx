"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Summary = {
  total: number;
  mostRecent?: string;
};

type Props = {
  refresh: boolean;
};

export default function DashboardSummary({ refresh }: Props) {
  const [summary, setSummary] = useState<Summary>({ total: 0 });

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        const total = data.reduce((sum: number, t: any) => sum + Number(t.amount), 0);
        const mostRecent = data.length > 0 ? data[data.length - 1].description : "None";
        setSummary({ total, mostRecent });
      });
  }, [refresh]);

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">
          <span className="font-semibold text-gray-800">Total Expenses:</span>{" "}
          ₹{summary.total}
        </p>
        <p className="text-muted-foreground">
          <span className="font-semibold text-gray-800">Last Transaction:</span>{" "}
          {summary.mostRecent}
        </p>
      </CardContent>
    </Card>
  );
}
