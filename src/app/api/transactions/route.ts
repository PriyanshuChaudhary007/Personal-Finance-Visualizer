import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import Transaction from '@/models/Transaction';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find({});
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('GET /api/transactions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newTransaction = await Transaction.create(body);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('POST /api/transactions error:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}