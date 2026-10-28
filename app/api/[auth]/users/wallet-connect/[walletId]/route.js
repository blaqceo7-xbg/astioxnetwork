import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Wallet from "@/lib/models/connect-wallet";


export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
      const walletId = searchParams.get("walletId");
      const ObjectId = require("mongoose").Types.ObjectId;
  
      if (!walletId) {
        return new NextResponse(
          JSON.stringify({
            message: "ID not found",
          }),
          { status: 400 }
        );
      }
      if (!ObjectId.isValid(walletId)) {
        return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
          status: 400,
        });
      }

  try {
    await connect();

    // Find the user wallets by user's ID
    const wallet = await Wallet.findById({ _id: walletId }).select("-walletPhrase");

    return NextResponse.json(wallet, { status: 200, message: "Wallets fetched" });
  } catch (error) {
    return new NextResponse("Error in fetching users" + error.message, {
      status: 500,
    });
  }
};