import Transaction from "@/lib/models/transaction";
import connect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);

    // 🔹 Extract query filters
    const userId = searchParams.get("userId"); // usually from JWT/session
    const transaction_type = searchParams.get("transaction_type"); // deposit/withdrawal
    const status = searchParams.get("status"); // pending/success/failed
    const minAmount = searchParams.get("minAmount");
    const maxAmount = searchParams.get("maxAmount");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // 🔹 Pagination
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // 🔹 Sorting
    const sortBy = searchParams.get("sortBy") || "createdAt"; // field
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1; // asc/desc

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // 🔹 Build filters dynamically
    const filters = { userId };

    if (transaction_type) filters.transaction_type = transaction_type;
    if (status) filters.status = status;
    if (minAmount || maxAmount) {
      filters.amount = {};
      if (minAmount) filters.amount.$gte = Number(minAmount);
      if (maxAmount) filters.amount.$lte = Number(maxAmount);
    }
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = new Date(startDate);
      if (endDate) filters.createdAt.$lte = new Date(endDate);
    }

    // 🔹 Fetch transactions with filters, pagination & sorting
    const transactions = await Transaction.find(filters)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    // 🔹 Get total count for pagination metadata
    const total = await Transaction.countDocuments(filters);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      totalPages,
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
