import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import BTC_Mining from "@/lib/models/btc_mining";
import nodemailer from 'nodemailer'

// FETCH USERS TRANSACTIONS
export const GET = async (req) => {
  try {
    await connect();

    // Fetch all transactions, newest first
    const transactions = await BTC_Mining.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connect();

    const deletedTransaction = await BTC_Mining.findOneAndDelete(
      { _id: id },
    );


    return new NextResponse(
      JSON.stringify({
        message: "Transaction deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in deleting transaction" + error.message, {
      status: 500,
    });
}}

// APPROVE/UNAPPROVED USER TRANSACTION & UPDATE USER BALANCE
export const PATCH = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("userId");
    const body = await req.json();
    const { transactionID, status } = body;

    if (!transactionID || !status) {
      return new NextResponse(
        JSON.stringify({ message: "Incomplete input request!" }),
        { status: 400 }
      );
    }

    if (!adminId) {
      return new NextResponse(
        JSON.stringify({
          message: "ID not found",
        }),
        { status: 400 }
      );
    }

    await connect();

    // Find the user by ID
            const admin = await User.findById({ _id: adminId });
        
            if (!admin) {
              return NextResponse.json(
                { message: "You have not registered yet" },
                { status: 404 } // NOT_FOUND
              );
            }
    
            if (admin.role !== "admin") {
              return NextResponse.json(
                { message: "You are not an Admin" },
                { status: 400 } // BAD_REQUEST
              );
            }

    // Update user's transaction status
      const updatedTransaction = await BTC_Mining.findOneAndUpdate(
        { _id: transactionID },
        { status },
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