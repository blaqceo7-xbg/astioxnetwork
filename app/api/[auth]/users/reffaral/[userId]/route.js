import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";



// FETCH ALL REFFED USERS 
export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const refId = searchParams.get("refId");
    
    try {
    await connect();
    const referrals = await User.find({ reffedBy: refId }).select("-password");
    return NextResponse.json(referrals, { status: 200, message: "Referrals fetched", length: referrals.length });
  } catch (error) {
    return new NextResponse("Error in fetching referrals" + error.message, {
      status: 500,
    });
  }
};