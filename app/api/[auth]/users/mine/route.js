import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import Airdrop from "@/lib/models/airdrop";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, amount, miningRate, launchDate } = body;

    if (!userId || !amount || !miningRate || !launchDate) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const launch = new Date(launchDate);
    const now = new Date();

    const diffMs = now - launch;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    const token = await Airdrop.create({
      userId,

      // convert to Decimal128
      amount: mongoose.Types.Decimal128.fromString(amount.toString()),
      miningRate: mongoose.Types.Decimal128.fromString(
        miningRate.toString()
      ),

      launchDate: launch,

      minedDuration: {
        hours,
        minutes,
        seconds,
      },
    });

    return new NextResponse(JSON.stringify({ success: true, token }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { airdropId } = body;

    if (!airdropId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    await connect();

    const updatedAirdropToken = await Airdrop.findOneAndUpdate(
          {_id: airdropId},
          { $inc: { amount: 0.01531} },
          { new: true } // Returns the updated document
    );

    if (!updatedAirdropToken) {
          return new NextResponse(
            JSON.stringify({
              message: "User not found in the block",
            }),
            { status: 400 }
          );
    }

    return new NextResponse(
          JSON.stringify({
            message: "Block updated successfully",
            block: updatedAirdropToken,
          }),
          { status: 200 }
    );

  } catch (error) {
    return new NextResponse("Error in updating block" + error.message, {
          status: 500,
    });
  }
}
