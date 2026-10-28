import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import Loan from "@/lib/models/loan";
import nodemailer from 'nodemailer'

// FETCH USERS TRANSACTIONS
export const GET = async (req) => {
  try {
    await connect();

    // Fetch all transactions, newest first
    const transactions = await Loan.find().sort({ createdAt: -1 });

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

    const deletedTransaction = await Loan.findOneAndDelete(
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
    const { transactionID, status, type } = body;

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
    const updatedTransaction = await Loan.findOneAndUpdate(
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

    // Update user's balance based on userId from the transaction
    const userId = updatedTransaction.userId;
    const amount = updatedTransaction.amount;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          message: "User ID not found in transaction",
        }),
        { status: 404 }
      );
    }
    
    if(type === "loan" && status === "Successful") {
      const updatedUserBalance = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { balance: amount } },
        { new: true }
      );

      if (!updatedUserBalance) {
        return new NextResponse(
          JSON.stringify({
            message: "User not found in database",
          }),
          { status: 404 }
        );
      }

      const now = new Date();
    
        // Create a formatter instance
        const formatter = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
    
    
        // Send email notification
        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
          },
        });
     
        // Set up email data
        let mailOptions = {
          from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
          to: `${updatedUserBalance.email}`,
          subject: `Deposit Approval - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your deposit of ${updatedTransaction.amount} ${updatedTransaction.currency} has been successfully Approved. Thank you for using ${process.env.NEXT_PUBLIC_COMPANY_NAME}. ${formatter.format(
            now
          )}`,
          html: "",
        };
    
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);

    }

    if(type === "loan" && status === "Pending") {
      const updatedUserBalance = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { balance: -amount } },
        { new: true }
      );

      if (!updatedUserBalance) {
        return new NextResponse(
          JSON.stringify({
            message: "User not found in database",
          }),
          { status: 404 }
        );
      }

      const now = new Date();
    
        // Create a formatter instance
        const formatter = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
    
    
        // Send email notification
        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
          },
        });
     
        // Set up email data
        let mailOptions = {
          from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
          to: `${updatedUserBalance.email}`,
          subject: `Deposit Rejection - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your deposit of ${updatedTransaction.amount} ${updatedTransaction.currency} has been rejected. Thank you for using ${process.env.NEXT_PUBLIC_COMPANY_NAME}. ${formatter.format(
            now
          )}`,
          html: "",
        };
    
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);

    }

    return new NextResponse(
      JSON.stringify({
        message: "User account balance updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in updating user account" + error.message, {
      status: 500,
    });
  }
};