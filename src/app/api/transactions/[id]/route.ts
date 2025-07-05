import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export async function PUT(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  
  try {
    // Extract ID directly from URL - completely bypasses params warning
    const id = req.url.split('/').pop() || '';
    const body = await req.json();

    const updated = await Transaction.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectDB();

  try {
    const id = req.url.split('/').pop() || '';
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}