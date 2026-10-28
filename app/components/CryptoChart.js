"use client";

import { useEffect, useRef } from "react";
import React from 'react'

export default function CryptoChart() {

    useEffect(() => {
    if (document.getElementById("tradingview-script")) return;

    const script = document.createElement("script");
    script.id = "tradingview-script";
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      // eslint-disable-next-line no-undef
      new TradingView.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "15",
        timezone: "Etc/UTC",
        theme: "light",
        style: "3",
        locale: "en",
        container_id: "tradingview_container",
      });
    };

    document.body.appendChild(script);
  }, []);

    return (
        <div className='w-full container mx-auto px-5 md:px-40'>
            
            <div className='bg-gradient-to-b text-center space-y-5 flex flex-col items-center justify-center from-[#2ABBFE] to-[#0500FF] text-white items-center rounded-3xl px-5 py-7 md:p-20'>

                <h3 className="text-5xl font-semibold">One Platform, Millions of Assets</h3>

                <p className="">As a leading self-custody multi-chain platform, we support millions of assets across 100+ blockchains. From Bitcoin, Ethereum, and Solana, to Cosmos, Optimism, and much more.</p>

                <div className="h-[500px] w-full rounded-3xl">
                    <div
                        id="tradingview_container"
                        
                        className="h-full w-full rounded-3xl"
                    ></div>
                </div>
            </div>

        </div>
    )
}
