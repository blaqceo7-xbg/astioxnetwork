import connect from "@/lib/db";
import User from "@/lib/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import nodemailer from 'nodemailer'

// FETCH USER INFO
export const GET = async (req) => {
  await connect();

  const cookieStore = await cookies(); 
  const token = cookieStore.get("jwt")?.value;
  
  try {
    
    if (!token) {
      return Response.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error();

    return new NextResponse(
      JSON.stringify({
        message: "Account retrieved successfully",
        user,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in fetching user" + error.message, {
      status: 500,
    });
  }
};

// UPDATE USER INFO
export const PATCH = async (req) => {
  await connect();

  const cookieStore = await cookies(); 
  const token = cookieStore.get("jwt")?.value;

  const body = await req.json();
  const { full_name } = body;

  try {
    if (!token) {
      return Response.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error();

    if (!user._id) {
      return new NextResponse(
        JSON.stringify({
          message: "ID not found",
        }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(user._id)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
        status: 400,
      });
    }

    if (!full_name) {
      return new NextResponse(
        JSON.stringify({ message: "Please type your full name!" }),
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      {_id: user._id},
      { 
        full_name,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found in database",
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in updating user" + error.message, {
      status: 500,
    });
  }
};