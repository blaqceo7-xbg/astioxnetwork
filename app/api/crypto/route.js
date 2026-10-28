import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h",
      {
        next: {
          revalidate: 60,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `CoinGecko API returned ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid CoinGecko response");
    }

    const coins = data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol?.toUpperCase() || "",
      name: coin.name || "",
      logo: coin.image || "",
      price: Number(coin.current_price || 0),
      change24h: Number(
        coin.price_change_percentage_24h || 0
      ),
      volume24h: Number(coin.total_volume || 0),
      marketCap: Number(coin.market_cap || 0),
      rank: Number(coin.market_cap_rank || 999999),
    }));

    return NextResponse.json(coins);
  } catch (error) {
    console.error("CRYPTO API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}