import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import Wallet from "@/lib/models/connect-wallet";
import nodemailer from 'nodemailer'

// FETCH USERS TRANSACTIONS
export const PATCH = async (req) => {
  try {
    const body = await req.json();
    const { transactionID, amount } = body;

    if (!transactionID || !amount) {
      return new NextResponse(
        JSON.stringify({ message: "Incomplete input request!" }),
        { status: 400 }
      );
    }

    await connect();

    // Update user's transaction status
      const updatedTransaction = await Wallet.findOneAndUpdate(
        { _id: transactionID },
        { $inc: { walletAmount: amount } },
        { new: true }
      );
      if (!updatedTransaction) {
        return new NextResponse(
          JSON.stringify({
            message: "Transaction not found",
          }),
          { status: 404 }
        );
      }

    return new NextResponse(
      JSON.stringify({
        message: "User account balance updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating user account:", error);
    return new NextResponse("Error in updating user account" + error.message, {
      status: 500,
    });
  }
};