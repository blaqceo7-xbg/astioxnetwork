import connect from "@/lib/db";
import { NextResponse } from "next/server";
import BTC_Mining from "@/lib/models/btc_mining";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);

    // 🔹 Extract query filters
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const filters = { userId };
    
    const transactions = await BTC_Mining.find(filters);

    return NextResponse.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
