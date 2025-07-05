"use client";

import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import DashboardSummary from "@/components/DashboardSummary";
import BudgetForm from "@/components/BudgetForm";
import BudgetComparison from "@/components/BudgetComparisonChart";
import SpendingInsights from "@/components/SpendingInsights";

export default function HomePage() {
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh((prev) => !prev); 

  return (
    <main className="min-h-screen px-4 md:px-12 py-8 flex flex-col gap-8 bg-muted">
      <h1 className="text-3xl font-bold text-center">💸 Finance Visualizer</h1>

      {/* Transaction Form */}
      <TransactionForm
        editingTransaction={editingTransaction}
        clearEdit={() => setEditingTransaction(null)}
        onSuccess={handleRefresh}
      />

      {/* Dashboard Summary Cards */}
      <DashboardSummary refresh={refresh} />

      {/* Transaction List */}
      <TransactionList
        onEdit={(tx) => setEditingTransaction(tx)}
        refresh={refresh}
      />

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <MonthlyBarChart refresh={refresh} />
        <CategoryPieChart refresh={refresh} />
      </div>

      {/* Budget Management */}
      <div className="grid md:grid-cols-2 gap-8">
        <BudgetForm onSuccess={handleRefresh} />
        <BudgetComparison refresh={refresh} />
      </div>

      {/* Spending Insights */}
      <SpendingInsights refresh={refresh} />
    </main>
  );
}
