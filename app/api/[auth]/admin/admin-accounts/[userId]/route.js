import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import nodemailer from 'nodemailer'

// FETCH USERS 
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

  try {
    await connect();

    // Fetch all transactions, newest first
    const users = await User.aggregate([
    {
        $addFields: {
            adminFirst: {
                $cond: [{ $eq: ["$role", "admin"] }, 0, 1]
            }
        }
    },
    {
        $sort: {
            adminFirst: 1
        }
    },
    {
        $project: {
            adminFirst: 0
        }
    }
]);

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connect();

    const deletedUser = await User.findOneAndDelete(
      { _id: id },
    );


    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in deleting user " + error.message, {
      status: 500,
    });
}}

// APPROVE/UNAPPROVED USER 
export const PATCH = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("userId");
    const body = await req.json();// Log the request body for debugging
    console.log("Request body:", body);
    const { userID, role } = body;

    

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
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { role },
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
        message: "User account updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in updating user account" + error.message, {
      status: 500,
    });
  }
};