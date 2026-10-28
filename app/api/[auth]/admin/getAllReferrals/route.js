import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import nodemailer from 'nodemailer'

// FETCH USERS 
export const PATCH = async (req) => {
  try {
    const body = await req.json();
    const { userID, commissions } = body;
    
    if (!userID || !commissions) {
      return new NextResponse(
        JSON.stringify({ message: "Incomplete input request!" }),
        { status: 400 }
      );
    }

    await connect();

    // Update user's status
      const updatedUser = await User.findOneAndUpdate(
        { _id: userID },
        { $inc: { commissions } },
        { new: true }
      );
      if (!updatedUser) {
        return new NextResponse(
          JSON.stringify({
            message: "User not found",
          }),
          { status: 404 }
        );
      }

    return new NextResponse(
      JSON.stringify({
        message: "User account commissions updated successfully",
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