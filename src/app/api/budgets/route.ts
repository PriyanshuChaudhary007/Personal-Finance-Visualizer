import { NextRequest, NextResponse } from "next/server";
import { connectDB } from '@/lib/dbConnect';import Budget from "@/models/Budget";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");

  if (!month) {
    return NextResponse.json({ error: "Month is required" }, { status: 400 });
  }

  const budgets = await Budget.find({ month });
  return NextResponse.json({ budgets }, { status: 200 });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const budget = await Budget.create(body);
  return NextResponse.json(budget, { status: 201 });
}
