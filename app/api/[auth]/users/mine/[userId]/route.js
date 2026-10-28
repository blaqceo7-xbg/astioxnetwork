import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Airdrop from "@/lib/models/airdrop";

export async function GET(req) {
 try {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    await connect();

    const airdrop = await Airdrop.findOne({userId});
    if (!airdrop) {
        return NextResponse.json({ error: "Block not found." }, { status: 404 });
    }

    if (airdrop.length < 1) {
        return new NextResponse(JSON.stringify({ blockInitiated: false, airdrop }), {
            status: 200,
        });
    }

    return new NextResponse(JSON.stringify({ blockInitiated: true, airdrop }), {
        status: 200,
    });

 } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message, blockInitiated: false }), {
      status: 500,
    });
 }
}