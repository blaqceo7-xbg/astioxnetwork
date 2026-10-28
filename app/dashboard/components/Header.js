"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { IoClose, IoCloseOutline, IoGiftOutline, IoMenu, IoSettingsOutline, IoInformationCircleOutline } from "react-icons/io5";
import { LuArrowDownToLine, LuArrowUpToLine, LuSun, LuUserRoundCheck, LuUserRoundPlus, LuWallet, LuWalletCards } from "react-icons/lu";
import { IoIosMenu } from "react-icons/io";
import { CgArrowLeft, CgArrowLongLeft, CgArrowLongRight, CgProfile } from "react-icons/cg";
import { PiHeadsetLight, PiUserCircleLight } from 'react-icons/pi';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { GoBell } from 'react-icons/go';
import { RxEyeOpen } from 'react-icons/rx';
import { TfiAngleRight } from 'react-icons/tfi';
import { GrTransaction } from 'react-icons/gr';
import { MdOutlineLanguage } from 'react-icons/md';
import { FaRegFilePdf } from "react-icons/fa6";
import { BiMessageDetail } from 'react-icons/bi';
import { FaWhatsapp } from "react-icons/fa";
import { RiLogoutCircleLine, RiMoneyDollarCircleLine, RiNftLine } from 'react-icons/ri';
import { TbAirBalloon } from 'react-icons/tb';
import { FaCircleUser } from 'react-icons/fa6';
import LoadingScreen from './../loading';
import { GiDigDug, GiReceiveMoney } from 'react-icons/gi';
import ThemeToggle from '@/app/components/ThemeToggle';

export const Header = ({tab}) => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [file, setFile] = useState(user.img);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [featureNotice, setFeatureNotice] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleTransactionMessage = () => {
        setFeatureNotice(true);
      }

    const handleLogout = async () => {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
        });
  
        const data = await response.json();
  
        if (data.success) {
          // Redirect to login page
          router.push("/login");
  
          // Refresh the Next.js router/cache
          router.refresh();
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    return (
      <header
        className={`bg-white h-16 fixed dark:text-white dark:bg-isoDark text-black top-0 z-30 right-0 left-0  w-full`}
      >
      {loading === true && (<LoadingScreen />)}

        {/* Logo, Navigation Links, CTA Button for Desktop screens */}
        <nav
            className={`w-full h-20 px-4 flex items-center justify-between md:pr-12`}
        >

            <div className='hidden md:flex items-center space-x-5'>
                <div className='flex'>
                    <a href="/" className='block dark:hidden'>
                        <Image
                        src="/icons/logoMain.png"
                        alt="Astiox_logo"
                        className="-ml-6 md:-ml-0 md:w-70"
                        width={150}
                        height={0}
                        />
                    </a>
                    <a href="/" className='dark:block hidden px-8'>
                        <Image
                        src="/icons/mainLogo2.png"
                        alt="Astiox_logo"
                        className="-ml-6 md:-ml-0 md:w-10"
                        width={150}
                        height={0}
                        />
                    </a>
                </div>

                <div className='hidden text-sm items-center space-x-8 md:flex'>
                  <a href='/dashboard/mining'>BTC Mining</a>
                  <a href='/dashboard/loans'>Loans</a>
                  <a href='/dashboard/nft'>Astiox NFT</a>
                  <a href='/about'>About</a>
                  <a href='/support'>Support</a>
                </div>
            </div>

            <div
            className='flex md:hidden'
            
            >
                <div 
                className='flex md:hidden dark:text-white text-black space-x-4 items-center'
                >
                    <HiOutlineMenuAlt4  onClick={toggleMenu} className='h-6 w-6' />
                    <a href='/dashboard/settings' className='relative'>
                        <IoSettingsOutline className='h-6 w-6' />
                        <span className='flex bg-red-700 rounded-md absolute w-1.5 h-1.5 -top-1 -right-1'></span>
                    </a>
                </div>
              
            </div>

            {/* Wallet & Exchange CTA */}
            <div className="flex md:hidden p-1 rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 items-center">
                  
                  <a href='/dashboard' className={`flex items-center ${tab === "exchange" ? "text-black dark:text-white dark:bg-isoDark bg-white" : "text-neutral-500"}  space-x-2 flex-nowrap px-3 py-1 rounded-lg`}>
                      <span className='text-sm font-medium'>Exchange</span>
                  </a>
                  <a href='/dashboard/wallets' className={`flex items-center ${tab === "wallet" ? "text-black bg-white dark:text-white dark:bg-isoDark" : "text-neutral-500"}  space-x-2 flex-nowrap px-3 py-1 rounded-lg`}>
                      <span className='text-sm font-medium'>Wallet</span>
                  </a>
            </div>

            {/* Support Icon */}
            <div 
            className='flex md:hidden space-x-4 dark:text-white text-black items-center'
            >
                {/* <PiHeadsetLight className='h-6 w-6 text-black hover:text-isoColor1' /> */}
                
                <a href="https://embed.tawk.to/6aa41dad9145653445ddbd7a/1k28h7s0l" className='relative'>
                    <PiHeadsetLight className='h-6 w-6' />
                </a>
                <div className='relative'>
                    <ThemeToggle />
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-10">

              <div className="hidden md:flex items-center space-x-5">
                  <a href='/dashboard/deposit' className='w-fit flex text-base text-white dark:bg-isoColor2 dark:text-black space-x-1 items-center flex-nowrap px-3 py-2 rounded-md bg-isoColor1'>
                    <LuArrowDownToLine className='w-5 h-5' />
                    <span className='text-sm'>Deposit</span>
                  </a>
                  <a href='/dashboard/settings'>
                    <CgProfile className='w-6 h-6' />
                  </a>
                  <a href='/dashboard/wallets'>
                    <LuWallet className='w-6 h-6' />
                  </a>
                  <div>
                    <MdOutlineLanguage className='w-6 h-6' />
                  </div>
                  <a href="https://embed.tawk.to/6aa41dad9145653445ddbd7a/1k28h7s0l">
                    <BiMessageDetail className='w-6 h-6' />
                  </a>
                  <ThemeToggle />
              </div>
            </div>
        </nav>

        {/* Header for mobile screen */}
        <div
            className={` z-50 w-full top-0 bottom-0 space-y-6 right-0 left-0 will-change-transform overflow-scroll h-full transform duration-500 transition-all ease-out flex flex-col py-1 dark:text-white dark:bg-isoDark text-black bg-white ${
              isMenuOpen
                ? "block fixed translate-x-0 "
                : "translate-x-full"
            }`}
          >
            <nav
              className={`w-full h-20 z-50 absolute top-0 flex items-center px-4 justify-between`}
            >

                <div
                className='flex md:hidden'
                onClick={toggleMenu}
                >
                    <CgArrowLeft className='h-8 w-8' />
                </div>

                <div 
                className='flex md:hidden space-x-4 items-center'
                >
                    <a href="https://embed.tawk.to/6aa41dad9145653445ddbd7a/1k28h7s0l">
                        <PiHeadsetLight className='h-6 w-6 hover:text-isoColor1' />
                    </a>
                    <ThemeToggle />
                </div>
            </nav>

            <div className='pb-2 px-4 pt-12 flex space-x-2 justify-between items-center text-black border-b border-neutral-50 dark:border-neutral-800 w-full'>
                {file === "avatar.jpg" ? (
                                            <FaCircleUser className="w-24 h-24 text-black dark:text-neutral-500" />
                                        ) : (
                                            <img
                                            src={file}
                                            alt="Avatar"
                                            name="img"
                                            className="w-32 h-24 bg-neutral-700 rounded-full"
                                            />
                )}

                <a href='/dashboard/settings' className='flex flex-col justify-start w-full'>
                    <div className='flex items-center space-x-1.5'>
                        <span className='text-xs text-neutral-500'>ID: {user.username}</span>
                    </div>

                    <div className='flex flex-wrap space-y-2 justify-between w-full items-center'>
                        <h1 className='text-xl dark:text-white font-semibold'>{user.full_name}</h1>
                        <TfiAngleRight className='w-4 dark:text-isoColor2 h-4' />
                    </div>

                    {
                        user.isVerified === true ? (
                            <div className='py-1 px-2 bg-green-50 dark:bg-isoDark2 w-fit text-green-600 rounded-md text-xs'>
                                Verified
                            </div>
                        ) : (
                            <div className='py-1 px-2 bg-yellow-50 w-fit dark:bg-isoDark2 text-yellow-600 rounded-md text-xs'>
                                Regular
                            </div>
                        )
                    }
                </a>
              </div>

            <div className="w-full space-y-10">
              

              <div className='space-y-2'>
                <h5 className='font-semibold px-4 text-sm'>Shortcut</h5>
                <div className="w-full space-y-3 flex flex-wrap justify-start items-baseline px-6 gap-x-8 gap-y-4">
                            
                            <a href='/dashboard/deposit' className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <LuArrowDownToLine className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>Deposit</p>
                            </a>
                            <a href='/dashboard/withdrawal' className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <LuArrowUpToLine className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>Withdraw</p>
                            </a>
                            <a href='/dashboard/mining' className="flex relative gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <GiDigDug className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>Mining</p>
                                <span className='flex bg-blue-100 dark:bg-isoDark2 dark:text-isoColor2 rounded-full text-[10px] px-1 py-0.5 text-isoColor1 absolute -top-4 -right-4'>New</span>
                            </a>
                            
                            <a href='/dashboard/kyc' className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <LuUserRoundCheck className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>Kyc</p>
                            </a>
                            
                            <a href='/dashboard/wallets' className="flex relative gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <LuWalletCards className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>Wallets</p>
                                <span className='flex bg-blue-100 dark:bg-isoDark2 dark:text-isoColor2 rounded-full text-[10px] px-1 py-0.5 text-isoColor1 absolute -top-4 -right-4'>New</span>
                            </a>
                            <a href='/dashboard/rewards' className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <IoGiftOutline className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>Rewards</p>
                            </a>
                            <a
                            href="/docs/astiox-network1.pdf" 
                            download="Astiox_Documentation_PDF.pdf"
                            className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <FaRegFilePdf className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>PDF</p>
                            </a>
                            
                </div>
               </div>

               <div className='space-y-2'>
                <h5 className='font-semibold px-4 text-sm'>Recommend</h5>
                <div className="w-full space-y-3 flex flex-wrap justify-start items-baseline px-6 gap-x-8 gap-y-4">
                            
                            
                            
                            <a href='/dashboard/nft' className="flex relative gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <RiNftLine className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>NFT</p>
                                
                            </a>
                            <a href='/dashboard/loans' className="flex relative gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <GiReceiveMoney className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>Loans</p>
                                <span className='flex bg-blue-100 dark:bg-isoDark2 dark:text-isoColor2 rounded-full text-[10px] px-1 py-0.5 text-isoColor1 absolute -top-4 -right-4'>New</span>
                            </a>
                            <div onClick={handleTransactionMessage} className="flex relative gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white text-black p-3 ">
                                    <RiMoneyDollarCircleLine className='w-5 h-5' />
                                </span>
                                <p className='text-xs'>A - Refund</p>
                                <span className='flex bg-blue-100 dark:bg-isoDark2 dark:text-isoColor2 rounded-full text-[10px] px-1 py-0.5 text-isoColor1 absolute -top-4 -right-4'>New</span>
                            </div>
                            
                </div>
               </div>
            </div>

            <div className="w-full bg-white dark:bg-isoDark flex flex-col items-center fixed bottom-0 py-5">
              <div className="w-full flex items-center px-7 justify-between">
                <button
                    type='submit'
                    onClick={handleLogout}
                  className="rounded-full border dark:border-neutral-600 dark:text-white space-x-2 text-black hover:text-red-500 border-neutral-200 p-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full items-center"
                >
                    <div className='flex items-center text-base space-x-1'>
                      <h1 className='font-semibold'>Log Out</h1>
                    </div>
                </button>
              </div>
            </div> 

            {featureNotice === true && (
                                    <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 justify-center bg-black/50 items-center loading-modal">
                                                            <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
                                                              <div className='flex justify-center items-center rounded-full p-2 dark:bg-isoDark bg-[#f4f4f5]'><IoInformationCircleOutline className='w-16 text-black dark:text-isoColor2 h-16' /></div>
                                                
                                                              <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Notice!</h1>
                                                
                                                              <p className='text-xs text-center'>
                                                                This feature is currently under technical experiments. {process.env.NEXT_PUBLIC_COMPANY_NAME} will notify you as soon as this feature becomes official for use. Thank you.
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

        {/* Floating WhatsApp Button */}
<a
  href="https://wa.me/15304634558?text=Hello%20Astiox%20Network%2C%20I%20would%20like%20to%20speak%20with%20your%20support%20team."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with us on WhatsApp"
  className="
    fixed
    right-5
    bottom-20
    -translate-y-2/4
    z-[9999]
    group
    flex
    items-center
  "
>
  <div
    className="
      relative
      flex
      items-center
      justify-center
      w-14
      h-14
      sm:w-16
      sm:h-16
      rounded-full
      bg-[#25D366]
      text-white
      shadow-[0_10px_35px_rgba(37,211,102,0.35)]
      border-4
      border-white
      dark:border-isoDark
      transition-all
      duration-300
      ease-out
      hover:scale-110
      hover:shadow-[0_15px_45px_rgba(37,211,102,0.5)]
      active:scale-95
    "
  >
    {/* Pulsing ring */}
    <span
      className="
        absolute
        inset-0
        rounded-full
        bg-[#25D366]
        animate-ping
        opacity-20
      "
    />

    {/* WhatsApp icon */}
    <FaWhatsapp
      className="
        relative
        z-10
        text-3xl
        sm:text-4xl
      "
    />

  </div>

  {/* Desktop tooltip */}
  <span
    className="
      hidden
      sm:block
      absolute
      right-20
      whitespace-nowrap
      rounded-xl
      bg-isoDark
      dark:bg-white
      text-white
      dark:text-isoDark
      px-4
      py-2
      text-sm
      font-medium
      shadow-xl
      opacity-0
      translate-x-3
      pointer-events-none
      group-hover:opacity-100
      group-hover:translate-x-0
      transition-all
      duration-300
    "
  >
    Chat with us on WhatsApp
  </span>
</a>
        
      </header>
    );
}
