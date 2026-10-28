import connect from "@/lib/db";
import Otp from "@/lib/models/otp";
import { NextResponse } from "next/server";


export const POST = async (request) => {
  await connect();
  try {
    const body = await request.json();
    const email = body.email;
    const otp = body.otp;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
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

    // OTP is valid, allow progress
    return NextResponse.json({ message: "OTP successfully verified!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "OTP verification failed" }, { status: 500 });
  }
};
