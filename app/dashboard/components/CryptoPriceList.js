"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';
import StatsGrid from "./StatsGrid";
import { useAuth } from '@/app/context/AuthContext';
import LoadingScreen from '@/app/loading';
import axios from 'axios';

export const CryptoPriceList = () => {
    const [showCrypto, setShowCrypto] = useState(true);
    const [showTransaction, setShowTransactions] = useState(false);
    const [showStatistics, setShowStatistics] = useState(false);
    const { user } = useAuth();
    const [transactions, setTransactions] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch(`/api/crypto`)
          .then((res) => res.json())
          .then((data) => setCoins(data));
      }, []);

    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  

  useEffect(() => {
      async function fetchTransactions() {
        try {
          setLoading(true);
          const res = await axios.get(
            `/api/auth/users/transactions/tran?userId=${user._id}`,
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );

          if (res.status === 200) {
            setIsError(false);
            setTransactions(res.data.data);
            setLoading(false);
          }
        } catch(err) {
          setErrorMessage("Error!");
          setIsError(true);
          setLoading(false);
        }
      }
  
      fetchTransactions();
    }, []);
  
    // if (loading) {
    //   return <LoadingScreen />
    // }

    const handleShowCrypto = () => {
    setShowCrypto(true);
    setShowTransactions(false);
    setShowStatistics(false);
  }

  const handleShowTransaction = () => {
    setShowCrypto(false);
    setShowTransactions(true);
    setShowStatistics(false);
  }

  const handleShowStatistics = () => {
    setShowCrypto(false);
    setShowTransactions(false);
    setShowStatistics(true);
  }

    return (
      <div className="w-full flex text-black flex-col gap-y-2 px-4 container mx-auto">
              <div className="w-full flex space-x-4 items-center">
                <h4
                  onClick={handleShowCrypto}
                  className={`transition-500 cursor-pointer transition-all ease-out ${
                    showCrypto
                      ? "text-Black bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 rounded-full py-2 px-4"
                      : "text-neutral-400 py-2 px-4"
                  }`}
                >
                  Coins
                </h4>

                <h4
                  onClick={handleShowTransaction}
                  className={`transition-500 cursor-pointer transition-all ease-out ${
                    showTransaction
                      ? "text-Black bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 rounded-full py-2 px-4"
                      : "text-neutral-400 py-2 px-4"
                  }`}
                >
                  Transactions
                </h4>

                <h4
                  onClick={handleShowStatistics}
                  className={`transition-500 cursor-pointer transition-all ease-out ${
                    showStatistics
                      ? "text-Black bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 rounded-full py-2 px-4"
                      : "text-neutral-400 py-2 px-4"
                  }`}
                >
                  Statistics
                </h4>
              </div>

              {showCrypto && (
                <div className="w-full flex flex-col space-y-4 mb-14 py-5 transition-500">
                  {Array.isArray(coins) ? (
                    (coins.slice(0, 50).map((coin) => (
                    <div key={coin.symbol} className='flex w-full justify-between items-center'>
                        <div className='flex items-center px-4 space-x-2'>
                            <img
                                src={coin.logo}
                                alt={coin.name}
                                className="w-7"
                                width={50}
                                height={0}
                            />
                            <div className='space-y-1'>
                                <h2 className='font-medium text-base dark:text-white'>{coin.name}</h2>
                                <span className='text-xs text-neutral-400'>{coin.symbol}</span>
                            </div>
                        </div>

                        <div className='space-y-1 flex flex-col justify-end items-end'>
                                <h2 className={`font-medium ${coin.change24h > 0 ? "text-green-500" : "text-red-500"} text-sm`}>{coin.change24h > 0 ? "+" : ""}{coin.change24h.toFixed(2)}%</h2>
                                <span className='text-xs dark:text-white text-black'>${coin.price.toLocaleString()}</span>
                          </div>
                      </div>
                  )))
                  ) : (
                    <p  className='text-sm text-neutral-500 font-light'>Fetching Coins...</p>
                  )}
                </div>
              )}

              {showTransaction && (
                <div className="overflow-x-auto dark:bg-isoDark mb-32 dark:text-white">
                  <table className="min-w-full rounded-lg">
                    <thead className="">
                      <tr className='flex justify-start space-x-10 items-center'>
                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                          Currency/TT
                        </th>
                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                          Status
                        </th>
                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                          Duration/Profit
                        </th>
                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                          Plan
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactions != null && transactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-gray-100 odd:bg-gray-50 dark:hover:bg-isoDark2 dark:odd:bg-isoDark2 hover:rounded-xl flex space-x-10 justify-start w-fit items-center">

                          <td className='flex items-center px-4 py-2 w-32 space-x-2'>
                            {transaction.currency === "BTC" ? (
                              <Image
                                src="/icons/bitcoin.webp"
                                alt="Metagram_logo"
                                className="w-7"
                                width={50}
                                height={0}
                              />)
                              : transaction.currency === "ETH" ? (
                                <Image
                                src="/icons/ethereum.webp"
                                alt="Metagram_logo"
                                className="w-7"
                                width={50}
                                height={0}
                              />
                              )
                              : transaction.currency === "USDT" ? (
                                <Image
                                src="/icons/Tether.webp"
                                alt="Metagram_logo"
                                className="w-7"
                                width={50}
                                height={0}
                                />
                              )
                              : transaction.currency === "BNB" ? (
                                <Image
                                src="/icons/bnb-icon2_2x.webp"
                                alt="Metagram_logo"
                                className="w-7"
                                width={50}
                                height={0}
                                />
                              )
                              : transaction.currency === "XRP" ? (
                                <Image
                                src="/icons/xrp-symbol-white-128.webp"
                                alt="Metagram_logo"
                                className="w-7"
                                width={50}
                                height={0}
                                />
                                  )
                              : transaction.currency === "SOL" ? (
                                <Image
                                src="/icons/solana.webp"
                                alt="Metagram_logo"
                                className="w-7"
                                width={50}
                                height={0}
                                />
                                )
                              : (
                                <Image
                                src="/icons/Tether.webp"
                                alt="Metagram_logo"
                                className="w-7"
                                width={50}
                                height={0}
                                />
                                  )}
                            <div className='space-y-1 overflow-auto text-nowrap'>
                                <h2 className='font-medium text-base'>
                                  {transaction.currency === "BTC" ? "Bitcoin"
                                  : transaction.currency === "ETH" ? "Ethereum"
                                  : transaction.currency === "USDT" ? "Tether"
                                  : transaction.currency === "BNB" ? "Binance"
                                  : transaction.currency === "XRP" ? "Ripple"
                                  : transaction.currency === "SOL" ? "Solana"
                                  : "Tether"}
                                </h2>
                                <span className='text-xs text-neutral-400'>{transaction.transaction_type.toUpperCase()}</span>
                            </div>
                          </td>

                          <td className='space-y-1 px-4 py-2 overflow-auto text-nowrap w-32'>
                            <h2 className='font-semibold text-sm'>
                              {transaction.status === "Pending" ? "In Progress" 
                              : transaction.status === "Successful" ? "Completed"
                              : "Failed"}
                            </h2>
                            <span className='text-xs text-neutral-400'>
                              {formatter.format(new Date(transaction.createdAt))}
                            </span>
                          </td>

                          <td className={`px-4 py-2 w-32 ${transaction.transaction_type === "deposit" ? "text-green-500" : "text-red-500"} overflow-auto text-nowrap flex items-center space-x-1`}>
                            {transaction.transaction_type === "deposit" ? (<TbTriangleInvertedFilled className="w-4 h-4" />) : (<TbTriangleFilled className="w-4 h-4" />)}
                            <span>${transaction.amount.toLocaleString()}</span>
                          </td>

                          <td className='space-y-1 px-4 py-2 overflow-auto text-nowrap w-32'>
                            <h2 className='font-semibold text-sm'>{transaction.plan.plan_duration}{' '}Hours</h2>
                            <span className='text-xs text-neutral-400'>{transaction.plan.plan_profit}%</span>
                          </td>

                          <td className="px-4 py-2 w-32 flex overflow-auto text-nowrap items-center space-x-1">
                            {transaction.plan.plan_name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {showStatistics && (
                <div className="w-full h-fit py-5 transition-500 overflow-hidden">
                  <div className="mb-20">
                    <StatsGrid />
                  </div>
                </div>
              )}
      </div>
    );
}

