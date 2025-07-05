// API route for GET and POST


import connectDB from "../../../lib/dbConnect";
import Transaction from "../../../models/Transaction";

import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newTransaction = await Transaction.create({
    amount: body.amount,
    description: body.description,
    date: body.date,
    category: body.category || "Uncategorized",
  });

  return NextResponse.json(newTransaction, { status: 201 });
}
