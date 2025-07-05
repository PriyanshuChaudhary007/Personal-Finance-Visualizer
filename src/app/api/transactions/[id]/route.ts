import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();

  try {
    const body = await req.json();
    const updated = await Transaction.findByIdAndUpdate(context.params.id, body, {
      new: true,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();

  try {
    await Transaction.findByIdAndDelete(context.params.id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}
