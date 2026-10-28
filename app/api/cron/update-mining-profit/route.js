import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connect from "@/lib/db";
import BTC_Mining from "@/lib/models/btc_mining";

const INCREMENT = 34n;
const FRACTION_BASE = 100000000n; // 10 decimal places
const BATCH_SIZE = 500;

export async function GET() {
  try {
    await connect();

    let operations = [];
    let transactionsUpdated = 0;

    // Cursor prevents all transactions from being loaded into memory
    const cursor = BTC_Mining.find({
      status: "Successful",
      amount: { $exists: true },
    })
      .select("_id amount")
      .lean()
      .cursor();

    for await (const transaction of cursor) {
      if (!transaction.amount) {
        continue;
      }

      const amountString = transaction.amount.toString();

      // Separate whole and fractional parts
      const [wholePart, fractionPart = ""] =
        amountString.split(".");

      // Always use exactly 8 decimal places
      const fraction = fractionPart
        .padEnd(8, "0")
        .slice(0, 8);

      let whole = BigInt(wholePart);
      let fractional = BigInt(fraction);

      // Add 34 to the fractional counter
      fractional += INCREMENT;

      // Handle carry into whole number
      if (fractional >= FRACTION_BASE) {
        whole += fractional / FRACTION_BASE;
        fractional %= FRACTION_BASE;
      }

      // Restore exactly 8 decimal places
      const newFraction = fractional
        .toString()
        .padStart(8, "0");

      const newAmount = `${whole}.${newFraction}`;

      operations.push({
        updateOne: {
          filter: {
            _id: transaction._id,
            status: "Successful",
          },
          update: {
            $set: {
              amount:
                mongoose.Types.Decimal128.fromString(newAmount),
            },
          },
        },
      });

      // Execute every 500 updates
      if (operations.length >= BATCH_SIZE) {
        const result = await BTC_Mining.bulkWrite(operations);

        transactionsUpdated += result.modifiedCount;

        operations = [];
      }
    }

    // Process remaining transactions
    if (operations.length > 0) {
      const result = await BTC_Mining.bulkWrite(operations);

      transactionsUpdated += result.modifiedCount;
    }

    return NextResponse.json({
      success: true,
      message: "Successful transaction amounts incremented",
      increment: "34",
      transactionsUpdated,
    });
  } catch (error) {
    console.error("Transaction profit cron error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update transaction amounts",
      },
      { status: 500 }
    );
  }
}