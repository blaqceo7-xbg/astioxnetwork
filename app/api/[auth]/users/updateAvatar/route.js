import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {

    const ObjectId = require("mongoose").Types.ObjectId;
    const body = await req.json();

    const {
      img,
      userId,
    } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          message: "ID not found",
        }),
        { status: 400 }
      );
    }
    if (!img) {
      return new NextResponse(
        JSON.stringify({
          message: "Image file not found",
        }),
        { status: 400 }
      );
    }
    if (!ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
        status: 400,
      });
    }

  await connect();

  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUserAvatar = await User.findByIdAndUpdate(
      {_id: user._id},
      { 
        img,
      },
      { new: true, runValidators: true } // Returns the updated document
    );
    
    if (!updatedUserAvatar) {
        return new NextResponse(
          JSON.stringify({
            message: "User not found in database",
          }),
          { status: 404 }
        );
      }

    return new NextResponse(
      JSON.stringify({
        message: "User Avatar Updated successfully",
      }),
      { status: 200 }
    );
    
  } catch (error) {
    return new NextResponse("Error in uploading user avatar " + error.message, {
      status: 500,
    });
  }
};
