import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import Transaction from "@/lib/models/transaction";

export async function GET() {
  try {
    await connect();

    const profitRate = Number(process.env.PLAN_E_DAILY_PROFIT);

    if (!Number.isFinite(profitRate)) {
      return NextResponse.json(
        { error: "Invalid PLAN_E_DAILY_PROFIT configuration" },
        { status: 500 }
      );
    }

    const deposits = await Transaction.find({
      transaction_type: "deposit",
      status: "Successful",
      "plan.plan_profit": String(profitRate),
    })
      .select("userId amount")
      .lean();

    const userProfits = new Map();

    for (const deposit of deposits) {
      if (!deposit.userId || !Number.isFinite(Number(deposit.amount))) {
        continue;
      }

      const profit = (profitRate / 100) * Number(deposit.amount);

      const userId = String(deposit.userId);

      userProfits.set(
        userId,
        (userProfits.get(userId) || 0) + profit
      );
    }

    const operations = [];

    for (const [userId, profit] of userProfits) {
      operations.push({
        updateOne: {
          filter: { _id: userId, isPlay: true, },
          update: {
            $inc: {
              earnings: profit,
              balance: profit,
            },
          },
        },
      });
    }

    if (operations.length > 0) {
      await User.bulkWrite(operations);
    }

    return NextResponse.json({
      message: "Profit distributed successfully",
      usersUpdated: operations.length,
    });
  } catch (error) {
    console.error("Profit cron error:", error);

    return NextResponse.json(
      { error: "Failed to distribute profit" },
      { status: 500 }
    );
  }
}