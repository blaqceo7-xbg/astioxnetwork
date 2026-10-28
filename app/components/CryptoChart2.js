"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CryptoList({ onSelect }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(`/api/coins`)
      .then(res => res.json())
      .then(setCoins);
  }, []);

  return (
    <div className='w-full relative container mx-auto md:px-40'>
            
            <div className='bg-gradient-to-b relative z-20 text-center space-y-5 flex flex-col items-center justify-center from-[#2ABBFE] to-[#0500FF] text-white items-center rounded-3xl px-5 py-7 md:p-20'>

                <h3 className="text-5xl font-semibold">One Platform, Millions of Assets</h3>

                <p className="">As a leading self-custody multi-chain investment platform, we support millions of assets across 100+ blockchains. From Bitcoin, Ethereum, and Solana, to Cosmos, Optimism, and much more.</p>

                <div className="h-[500px] w-full overflow-scroll bg-white dark:bg-isoDark rounded-3xl">
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {coins.map((coin) => (
                            <a
                            href="/dashboard/deposit"
                            key={coin.id}
                            
                            className="flex items-center text-black dark:text-white gap-3 p-3 rounded-xl hover:bg-black/20 hover:backdrop-blur-lg hover:text-white"
                            >
                            <Image
                                src={coin.image}
                                alt={coin.name}
                                width={32}
                                height={32}
                            />
                            <span>{coin.symbol.toUpperCase()}</span>
                            </a>
                        ))}
                    </div>

                </div>

                <div className="text-2xl font-semibold w-full flex flex-col space-y-7 pt-5 justify-center items-center md:justify-between md:flex-row">
                    <p>40K+ Assets</p>
                    <p>600K+ Wallets</p>
                     <p>100+ Blockchains</p>
                </div>
            </div>

            <div className='space-y-10 px-5 py-20 rounded-3xl text-black relative z-10 -mt-10 bg-gradient-to-b from-[#fef3ad] to-[#ffadfd] md:p-20'>
                        <h1 className='text-4xl font-semibold text-center md:text-5xl'>Browse a world of Cryptocurrencies</h1>
            
                        <p className='text-center text-lg'>Access Coins and Blockchains opportunities via our online platform.</p>
            
                        <div className='bg-white dark:bg-isoDark dark:text-white flex flex-col-reverse gap-y-10 text-black items-center rounded-3xl p-5 md:gap-x-28 md:flex-row md:p-0'>
            
                            <div className='w-full flex md:p-10 flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>
            
                                <h3 className='text-3xl font-semibold md:text-4xl'>Deposit cryptocurrencies easily from exchanges</h3>
            
                                <p className='md:text-lg'>Take control of your crypto. Avoid complicated steps and deposit directly to your wallet from exchanges like Binance and Coinbase.</p>
            
                                <a href="/dashboard/deposit" className='text-isoColor1 dark:border-isoColor2 dark:text-isoColor2 border border-isoColor1 font-medium rounded-full py-4 px-8'>Get started with deposits</a>
            
                            </div>
            
                            <div className=' rounded-3xl bg-[#d9d9d9] md:bg-transparent'>
                                <a href="/dashboard/deposit">
                                    <Image
                                    src="/img/hand_mobile_app.avif"
                                    alt="hand_mobile"
                                    className="w-[1000px]"
                                    width={200}
                                    height={0}
                                    />
                                </a>
                            </div>
            
                        </div>
            </div>

            <div className='space-y-10 px-5 rounded-3xl py-20 text-black -mt-10 bg-gradient-to-b from-[#fef365] to-[#47ff92] md:p-20'>
                        <h1 className='text-4xl font-semibold text-center md:text-5xl'>Zero personal tracking</h1>
            
                        <p className='text-center text-lg'>We secure your wallet, but don't control or have access to your private keys or secret phrase - only you do.</p>
            
                        <div className="flex flex-col space-y-7">

                            <div className='bg-white dark:bg-isoDark flex flex-col-reverse gap-y-10 text-black items-center rounded-3xl p-5 md:gap-x-28 md:flex-row md:px-0 md:py-10'>
            
                                <div className='w-full flex md:p-10 dark:text-white flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>
                
                                    <h3 className='text-2xl font-semibold md:text-3xl'>True ownership of your crypto assets</h3>
                
                                    <p className='md:text-lg'>We secure your wallet, but don't control or have access to your private keys or secret phrase - only you do.</p>
                
                                    <a href="/dashboard/deposit" className='text-white bg-isoColor1 dark:bg-isoColor2 dark:text-black font-medium rounded-full py-4 px-8'>Get Started</a>
                
                                </div>
                
                                <div className="md:pr-28">
                                    <a href="#">
                                        <Image
                                        src="/img/raw.0acff7b3.svg"
                                        alt="padlock"
                                        className="md:w-[700px]"
                                        width={200}
                                        height={0}
                                        />
                                    </a>
                                </div>
            
                            </div>

                            <div className="flex flex-col space-y-5 md:flex-row md:justify-between md:items-baseline md:flex-nowrap md:gap-x-10">

                                <div className='bg-white dark:bg-isoDark dark:text-white text-black items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-5 flex-col space-y-7 justify-start items-center'>
                    
                                        <h3 className='text-2xl font-semibold text-start md:text-2xl'>Added security with encryption</h3>
                    
                                        <Image
                                            src="/img/raw.323e03ee.svg"
                                            alt="padlock"
                                            className="md:w-32"
                                            width={200}
                                            height={0}
                                            />
                    
                                        <p className='md:text-sm'>Use our Encrypted Cloud Backup for increased wallet security.</p>
                    
                                    </div>

                                </div>

                                <div className='bg-white dark:bg-isoDark dark:text-white text-black items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-5 flex-col space-y-7 justify-start items-center'>
                    
                                        <h3 className='text-2xl font-semibold text-start md:text-2xl'>Zero personal tracking</h3>
                    
                                        <Image
                                            src="/img/raw.16e2b8fb.svg"
                                            alt="shield"
                                            className="md:w-32"
                                            width={200}
                                            height={0}
                                            />
                    
                                        <p className='md:text-sm'>We don't track any personal information, including your IP address or balances.</p>
                    
                                    </div>

                                </div>

                                <div className='bg-white dark:bg-isoDark dark:text-white text-black items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-5 flex-col space-y-7 justify-start items-center'>
                    
                                        <h3 className='text-2xl font-semibold text-start md:text-2xl'>Proactive alerts for risky transactions</h3>
                    
                                        <Image
                                            src="/img/raw.f17c90c5.svg"
                                            alt="flag"
                                            className="md:w-32"
                                            width={200}
                                            height={0}
                                            />
                    
                                        <p className='md:text-sm'>Stay safe with alerts for risky address and dApp connections.</p>
                    
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="flex justify-center items-center">
                            <a href='privacy' className='text-black border w-fit border-black dark:bg-isoDark dark:text-isoColor2 font-medium rounded-full py-4 flex text-center px-8'>Learn more about privacy & security</a>
                        </div>
            </div>

        </div>
  );
}
