import connect from "@/lib/db";
import Otp from "@/lib/models/otp";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";


export const POST = async (request) => {
  await connect();
  try {
    const body = await request.json();
    const email = body.email;
    const otp = body.otp;
    const password = body.password;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Check if password are provided
        if (password === "") {
          return NextResponse.json(
            { message: "Provide login credentials" },
            { status: 400 } // BAD_REQUEST
          );
        }

    // Find the user by email, including the password
        const user = await User.findOne({ email }).select("+password");
    
        if (!user) {
          return NextResponse.json(
            { message: "You have not registered yet" },
            { status: 404 } // NOT_FOUND
          );
        }
    
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return NextResponse.json(
            { message: "The password provided is incorrect" },
            { status: 400 } // BAD_REQUEST
          );
        }

    // Check if OTP exists
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Check expiration
    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // If OTP is valid, proceed TO LOGIN

    // Generate JWT token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expiry
    });

    // Set cookies in the browser
    const cookieStore = await cookies();
    cookieStore.set("jwt", accessToken, { path: "/" });

    // Remove password from the returned user data
    const { password: userPassword, ...otherFields } = user.toObject();

    // Send success response with token and user info
    return NextResponse.json(
      {
        message: "Sign-In Successful",
        token: accessToken,
        data: user,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `jwt=${accessToken}`,
          Authorization: accessToken,
        },
      } // OK
    );
  } catch (error) {
    return NextResponse.json({ error: "Login OTP verification failed" }, { status: 500 });
  }
};
