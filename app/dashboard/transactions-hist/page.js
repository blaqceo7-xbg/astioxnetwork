"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CgArrowLeft } from 'react-icons/cg';
import { DesktopSideBar } from './../components/DesktopSideBar';
import { Header } from './../components/Header';
import { Footer } from './../components/Footer';
import LoadingScreen from '@/app/loading';
import { useAuth } from '@/app/context/AuthContext';
import { TbTriangleInvertedFilled } from 'react-icons/tb';

export default function Page() {

  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const [showCrypto, setShowCrypto] = useState(true);
  const [loading, setLoading] = useState(false);
    const [showAssetTransactions, setShowAssetTransactions] = useState(true);
    const [showLoanTransactions, setShowLoanTransactions] = useState(false);
    const [showMiningTransactions, setShowMiningTransactions] = useState(false);
    const [showNftTransactions, setShowNftTransactions] = useState(false);
    
    const [assetTransactions, setAssetTransactions] = useState(null);
    const [loanTransactions, setLoanTransactions] = useState(null);
    const [miningTransactions, setMiningTransactions] = useState(null);
    const [nftTransactions, setNftTransactions] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  
    useEffect(() => {
      if (!user?._id) return;

      const fetchData = async () => {
        try {
          setLoading(true);

          const [
            assetRes,
            miningRes,
            loanRes,
            nftRes,
          ] = await Promise.all([
            axios.get(
              `/api/auth/users/transactions/tran?userId=${user._id}`
            ),
            axios.get(
              `/api/auth/users/mining-transactions/btc?userId=${user._id}`
            ),
            axios.get(
              `/api/auth/users/loans/loan?userId=${user._id}`
            ),
            axios.get(
              `/api/auth/users/nfts/nft?userId=${user._id}`
            ),
          ]);

          setAssetTransactions(assetRes.data.data || []);
          setMiningTransactions(miningRes.data.data || []);
          setLoanTransactions(loanRes.data.data || []);
          setNftTransactions(nftRes.data.data || []);

          setIsError(false);
        } catch (err) {
          console.error(err);
          setErrorMessage("Failed to load transactions");
          setIsError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [user]);
    

const handleShowMiningTransactions = () => {
    setShowAssetTransactions(false);
    setShowMiningTransactions(true);
    setShowLoanTransactions(false);
    setShowNftTransactions(false);
  }

  const handleShowAssetTransactions = () => {
    setShowAssetTransactions(true);
    setShowMiningTransactions(false);
    setShowLoanTransactions(false);
    setShowNftTransactions(false);
  }

  const handleShowLoanTransactions = () => {
    setShowAssetTransactions(false);
    setShowMiningTransactions(false);
    setShowLoanTransactions(true);
    setShowNftTransactions(false);
  }

  const handleShowNftTransactions = () => {
    setShowAssetTransactions(false);
    setShowMiningTransactions(false);
    setShowLoanTransactions(false);
    setShowNftTransactions(true);
  }
    

  return (
    <div className="bg-white w-full h-full dark:bg-isoDark dark:text-white text-black min-h-screen relative font-[family-name:var(--font-geist-sans)]">
     {loading === true && (<LoadingScreen tab={'signIn'} />)}
     <div className='hidden md:block w-full'>
        <Header />
     </div>

       <div className='w-full h-full min-h-screen md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"transactions"} />

          <div className='w-full h-full md:py-16 bg-none relative px-4 flex flex-col md:justify-center md:items-center container mx-auto md:px-40'>
                <div className='w-full py-5 md:py-0 flex flex-col space-y-5 md:space-y-16 '>

                <div className='flex items-center justify-center relative'>
                    <a
                                className='flex absolute left-0'
                                href='/dashboard'
                            >
                                <CgArrowLeft className='text-2xl' />
                    </a>

                    <h1 className='text-lg font-medium md:text-3xl md:font-semibold'>Transaction History</h1>
                </div>


                <div className="w-full flex text-black flex-col gap-y-2 px-4 container mx-auto">
                            <div className="w-full py-5 flex overflow-x-auto scrollbar-hide space-x-4 items-center">
                                <button
                                  onClick={handleShowAssetTransactions}
                                  className={`transition-500 flex justify-center items-center space-x-2 cursor-pointer transition-all ease-out ${
                                    showAssetTransactions
                                      ? "text-Black bg-[#f2f2f5] dark:bg-isoColor2 rounded-full py-2 px-4"
                                      : "text-neutral-400 py-2 px-4"
                                  }`}
                                >
                                  <span>Assets</span>
                                  {showAssetTransactions && <TbTriangleInvertedFilled className="text-neutral-500 dark:text-black text-xs" />}
                                </button>
                
                                <button
                                  onClick={handleShowMiningTransactions}
                                  className={`transition-500 flex justify-center items-center cursor-pointer space-x-2 transition-all ease-out ${
                                    showMiningTransactions
                                      ? "text-Black bg-[#f4f4f7] dark:bg-isoColor2 rounded-full py-2 px-4"
                                      : "text-neutral-400 py-2 px-4"
                                  }`}
                                >
                                  <span>Minings</span>
                                  {showMiningTransactions && <TbTriangleInvertedFilled className="text-neutral-500 text-xs dark:text-black" />}
                                </button>
                
                                <button
                                  onClick={handleShowLoanTransactions}
                                  className={`transition-500 flex justify-center items-center cursor-pointer space-x-2 transition-all ease-out ${
                                    showLoanTransactions 
                                      ? "text-Black bg-[#f4f4f7] dark:bg-isoColor2 rounded-full py-2 px-4"
                                      : "text-neutral-400 py-2 px-4"
                                  }`}
                                >
                                  <span>Loans</span>
                                  {showLoanTransactions && <TbTriangleInvertedFilled className="text-neutral-500 text-xs dark:text-black" />}
                                </button>

                                <button
                                  onClick={handleShowNftTransactions}
                                  className={`transition-500 flex justify-center items-center cursor-pointer space-x-2 transition-all ease-out ${
                                    showNftTransactions
                                      ? "text-Black bg-[#f4f4f7] dark:bg-isoColor2 rounded-full py-2 px-4"
                                      : "text-neutral-400 py-2 px-4"
                                  }`}
                                >
                                  <span>NFTs</span>
                                  {showNftTransactions && <TbTriangleInvertedFilled className="text-neutral-500 text-xs dark:text-black" />}
                                </button>
                            </div>
                
                            {showAssetTransactions && (
                                <div className="overflow-x-auto dark:text-white scrollbar-hide">
                                  <table className="min-w-full rounded-lg">
                                    <thead className="">
                                      <tr className='flex justify-start dark:text-neutral-400 space-x-10 items-center'>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Currency/TT
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Status
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Amount
                                        </th>
                                        <th className="px-4 py-3 text-sm w-38 text-left font-semibold">
                                          Transaction ID
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
                                      {assetTransactions != null && assetTransactions.map((transaction, index) => (
                                        <tr key={index} className="hover:bg-gray-100 dark:bg-isoDark dark:odd:bg-isoDark2 dark:hover:bg-isoDark2 dark:text-white odd:bg-gray-50 hover:rounded-xl flex space-x-10 justify-start w-fit items-center">
                
                                          <td className='flex items-center px-4 py-2 w-32 space-x-2'>
                                            {transaction.currency === "BTC" ? (
                                              <Image
                                                src="/icons/bitcoin.webp"
                                                alt="Astiox_logo"
                                                className="w-7"
                                                width={50}
                                                height={0}
                                              />)
                                              : transaction.currency === "ETH" ? (
                                                <Image
                                                src="/icons/ethereum.webp"
                                                alt="Astiox_logo"
                                                className="w-7"
                                                width={50}
                                                height={0}
                                              />
                                              )
                                              : transaction.currency === "USDT" ? (
                                                <Image
                                                src="/icons/Tether.webp"
                                                alt="Astiox_logo"
                                                className="w-7"
                                                width={50}
                                                height={0}
                                                />
                                              )
                                              : transaction.currency === "BNB" ? (
                                                <Image
                                                src="/icons/bnb-icon2_2x.webp"
                                                alt="Astiox_logo"
                                                className="w-7"
                                                width={50}
                                                height={0}
                                                />
                                              )
                                              : transaction.currency === "XRP" ? (
                                                <Image
                                                src="/icons/xrp-symbol-white-128.webp"
                                                alt="Astiox_logo"
                                                className="w-7"
                                                width={50}
                                                height={0}
                                                />
                                                  )
                                              : transaction.currency === "SOL" ? (
                                                <Image
                                                src="/icons/solana.webp"
                                                alt="Astiox_logo"
                                                className="w-7"
                                                width={50}
                                                height={0}
                                                />
                                                )
                                              : (
                                                <Image
                                                src="/icons/Tether.webp"
                                                alt="Astiox_logo"
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
                                            <TbTriangleInvertedFilled className="w- h-4" />
                                            <span>${transaction.amount.toLocaleString()}{" "}USD</span>
                                          </td>

                                          <td className="px-0 py-2 w-fit flex overflow-auto text-nowrap items-center space-x-1">
                                            {transaction.transactionID}
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

                            {showMiningTransactions && (
                                <div className="overflow-x-auto scrollbar-hide">
                                  <table className="min-w-full rounded-lg">
                                    <thead className="">
                                      <tr className='flex justify-start dark:text-neutral-400 space-x-10 items-center'>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Currency
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Status
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Amount
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Transaction ID
                                        </th>
                                      </tr>
                                    </thead>
                
                                    <tbody>
                                      {miningTransactions != null && miningTransactions.map((transaction, index) => (
                                        <tr key={index} className="dark:bg-isoDark dark:odd:bg-isoDark2 dark:hover:bg-isoDark2 dark:text-white hover:bg-gray-100 odd:bg-gray-50 hover:rounded-xl flex space-x-10 justify-start w-fit items-center">
                
                                          <td className='flex items-center px-4 py-2 w-32 space-x-2'>
                                            <Image
                                                src="/icons/bitcoin.webp"
                                                alt="Astiox_logo"
                                                className="w-7"
                                                width={50}
                                                height={0}
                                              />
                                            <div className='space-y-1 overflow-auto text-nowrap'>
                                                <h2 className='font-medium text-base'>Bitcoin</h2>
                                                <span className='text-xs text-neutral-400'>Miner</span>
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
                
                                          <td className={`px-0 py-2 w-fit text-green-500 overflow-auto text-nowrap flex items-center space-x-1`}>
                                            <TbTriangleInvertedFilled className="w- h-4" />
                                            <span>{transaction.amount?.$numberDecimal}</span>
                                          </td>
                
                                          <td className="px-0 py-2 w-52 flex overflow-auto text-nowrap items-center space-x-1">
                                            {transaction.transactionID}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                            )}

                            {showLoanTransactions && (
                                <div className="overflow-x-auto scrollbar-hide">
                                  <table className="min-w-full rounded-lg">
                                    <thead className="">
                                      <tr className='flex justify-start dark:text-neutral-400 space-x-10 items-center'>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Currency
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Status
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Amount
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Transaction ID
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
                                      {loanTransactions != null && loanTransactions.map((transaction, index) => (
                                        <tr key={index} className="dark:bg-isoDark dark:odd:bg-isoDark2 dark:hover:bg-isoDark2 dark:text-white hover:bg-gray-100 odd:bg-gray-50 hover:rounded-xl flex space-x-10 justify-start w-fit items-center">
                
                                          <td className='flex items-center px-4 py-2 w-32 space-x-2'>
                                            <Image
                                                    src="/icons/Tether.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={50}
                                                    height={0}
                                                    />
                                            <div className='space-y-1 overflow-auto text-nowrap'>
                                                <h2 className='font-medium text-base'>Tether USDT</h2>
                                                <span className='text-xs text-neutral-400'>Loan</span>
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
                
                                          <td className={`px-0 py-2 w-32 text-green-500 overflow-auto text-nowrap flex items-center space-x-1`}>
                                            <TbTriangleInvertedFilled className="w- h-4" />
                                            <span>${transaction.amount}</span>
                                          </td>
                
                                          <td className="px-0 py-2 w-32 flex overflow-auto text-nowrap items-center space-x-1">
                                            {transaction.transactionID}
                                          </td>

                                          <td className='space-y-1 px-4 py-2 overflow-auto text-nowrap w-32'>
                                            <h2 className=' font-semibold text-sm'>{transaction.plan.plan_duration}{' '}Hours</h2>
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

                            {showNftTransactions && (
                                <div className="overflow-x-auto scrollbar-hide">
                                  <table className="min-w-full rounded-lg">
                                    <thead className="">
                                      <tr className='flex justify-start dark:text-neutral-400 space-x-10 items-center'>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Currency
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Status
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Amount
                                        </th>
                                        <th className="px-4 py-3 text-sm w-32 text-left font-semibold">
                                          Transaction ID
                                        </th>
                                      </tr>
                                    </thead>
                
                                    <tbody>
                                      {nftTransactions != null && nftTransactions.map((transaction, index) => (
                                        <tr key={index} className="dark:bg-isoDark dark:odd:bg-isoDark2 dark:hover:bg-isoDark2 dark:text-white hover:bg-gray-100 odd:bg-gray-50 hover:rounded-xl flex space-x-10 justify-start w-fit items-center">
                
                                          <td className='flex items-center px-4 py-2 w-32 space-x-2'>
                                            <Image
                                                    src="/icons/Tether.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={50}
                                                    height={0}
                                                    />
                                            <div className='space-y-1 overflow-auto text-nowrap'>
                                                <h2 className='font-medium text-base'>Tether USDT</h2>
                                                <span className='text-xs text-neutral-400'>NFT</span>
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
                
                                          <td className={`px-0 py-2 w-fit text-green-500 overflow-auto text-nowrap flex items-center space-x-1`}>
                                            <TbTriangleInvertedFilled className="w- h-4" />
                                            <span>${transaction.amount}</span>
                                          </td>
                
                                          <td className="px-0 py-2 w-52 flex overflow-auto text-nowrap items-center space-x-1">
                                            {transaction.transactionID}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                            )}
                </div>

                </div>

          </div>

        </div>

        <Footer tab={`transactions`} />
    </div>
  )
}
