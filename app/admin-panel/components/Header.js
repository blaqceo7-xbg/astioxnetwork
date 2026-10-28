"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { IoClose, IoCloseOutline, IoGiftOutline, IoMenu, IoNewspaperOutline, IoSettingsOutline, IoSunnyOutline } from "react-icons/io5";
import { LuArrowDownToLine, LuArrowUpToLine, LuSun, LuUser, LuUserRound, LuUserRoundCheck, LuUserRoundCog, LuUserRoundPlus, LuWallet, LuWalletCards } from "react-icons/lu";
import { IoIosMenu } from "react-icons/io";
import { CgArrowLeft, CgArrowLongLeft, CgArrowLongRight, CgProfile } from "react-icons/cg";
import { PiHeadsetLight, PiHouse, PiUserCircleLight } from 'react-icons/pi';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { GoBell } from 'react-icons/go';
import { RxEyeOpen } from 'react-icons/rx';
import { TfiAngleRight } from 'react-icons/tfi';
import { GrTransaction } from 'react-icons/gr';
import { MdOutlineLanguage } from 'react-icons/md';
import { BiBitcoin, BiMessageDetail } from 'react-icons/bi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { TbAirBalloon } from 'react-icons/tb';
import { FaCircleUser } from 'react-icons/fa6';
import LoadingScreen from '../loading';
import ThemeToggle from '@/app/components/ThemeToggle';


export const Header = ({tab}) => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [file, setFile] = useState(user.img);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
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
        className={`bg-white h-16 sticky dark:bg-isoDark2 dark:text-white top-0 z-30 right-0 left-0  w-full`}
      >
      {loading === true && (<LoadingScreen />)}

        {/* Logo, Navigation Links, CTA Button for Desktop screens */}
        <nav
            className={`w-full p-4 flex items-center justify-between`}
        >

            <div className='hidden md:flex items-center px-10'>
                <div className='hidden text-sm items-center space-x-8 md:flex'>
                  <h1 className='font-semibold text-xl'>Hello, {user.full_name}</h1>
                </div>
            </div>

            <div
            className='flex md:hidden'
            
            >
                <div 
                className='flex md:hidden space-x-4 items-center'
                >
                    <HiOutlineMenuAlt4  onClick={toggleMenu} className='h-8 w-8' />
                </div>
              {/* <Image
                    src="/icons/logoMain.png"
                    alt="Metagram_logo"
                    className="-ml-7 w-28"
                    width={50}
                    height={0}
                    /> */}

                    {/* <h1 className='flex text-base font-extrabold py-2 px-3 font-sans rounded-full shadow-sm text-isoColor1'>METAGRAM</h1> */}
            </div>

            {/* Wallet & Exchange CTA */}
            <a href='/' className="flex md:hidden p-1 rounded-xl bg-[#f4f4f7] dark:bg-isoDark dark:text-white items-center">
                  <h1 className={`flex items-center space-x-2 flex-nowrap px-3 py-1 rounded-lg`}>
                      <span className='text-base font-medium'>Admin Panel</span>
                  </h1>
            </a>

            {/* Support Icon */}
            <div 
            className='flex md:hidden space-x-4 items-center'
            >
                <ThemeToggle />
            </div>

            <div className="hidden md:flex items-center space-x-10">

              <div className="hidden md:flex items-center px-10">
                  <ThemeToggle />
              </div>
            </div>
        </nav>

        {/* Header for mobile screen */}
        <div onClick={toggleMenu} className={`w-full h-full z-50 top-0 bottom-0 right-0 left-0 will-change-transform overflow-scroll h-full transform duration-500 transition-all ease-out ${
                isMenuOpen
                    ? " -translate-x-0 fixed"
                    : " -translate-x-full invisible"
                } bg-black/70`}>
            <div
                className={`flex flex-col py-1 w-80 h-full text-white bg-isoColor1`}
            >
                <div
                className={`w-full h-20 flex text-white  items-center px-4 justify-between`}
                >

                    <div className='w-full text-lg font-semibold py-3 flex justify-start items-center'>
                                <h1>Hello, {user.full_name}</h1>
                                </div>

                    <div
                    onClick={toggleMenu}
                    >
                        <IoCloseOutline className='h-8 w-8' />
                    </div>
                </div>

                <section className='w-full container md:space-y-8 mx-auto'>
                        
                        <div className=' text-white'>
                                
                
                                <a 
                                    href="/admin-panel" className={`w-full text-base py-3 px-6 ${tab === "assets" ? "bg-white text-isoColor1 rounded-r-full" : ""} flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <PiHouse className="text-lg" />
                                    <span>Dashboard</span>
                                </span>
                                </a>

                                <a 
                                    href="/admin-panel/deposit-history" className={`w-full text-base py-3 px-6 ${tab === "deposit-history" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <GrTransaction className="text-lg" />
                                    <span>Deposit History</span>
                                </span>
                                </a>
            
                                <a 
                                    href="/admin-panel/withdrawal-history" className={`w-full text-base py-3 px-6 ${tab === "withdrawal-history" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <BiBitcoin className="text-lg" />
                                    <span>Withdrawal History</span>
                                </span>
                                </a>
                
                                <a 
                                    href="/admin-panel/bitcoin-mining-deposit" className={`w-full text-base py-3 px-6 ${tab === "bitcoin-mining-deposit" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <LuArrowDownToLine className="text-lg" />
                                    <span>Bitcoin Mining Deposit</span>
                                </span>
                                </a>

                                <a 
                                    href="/admin-panel/loan-deposit" className={`w-full text-base py-3 px-6 ${tab === "loan-deposit" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <LuArrowDownToLine className="text-lg" />
                                    <span>Loan Deposit</span>
                                </span>
                                </a>

                                <a 
                                    href="/admin-panel/nft-deposit" className={`w-full text-base py-3 px-6 ${tab === "nft-deposit" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <LuArrowDownToLine className="text-lg" />
                                    <span>NFT Deposit</span>
                                </span>
                                </a>

                                <a 
                                    href="/admin-panel/connected-wallet" className={`w-full text-base py-3 px-6 ${tab === "connected-wallet" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <LuWalletCards className="text-lg" />
                                    <span>Connected Wallets</span>
                                </span>
                                </a>

                                <a 
                                    href="/admin-panel/user-accounts" className={`w-full text-base py-3 px-6 ${tab === "user-accounts" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <LuUserRound className="text-lg" />
                                    <span>User Accounts</span>
                                </span>
                                </a>
                
                                <a 
                                    href="/admin-panel/referral-history" className={`w-full text-base py-3 px-6 ${tab === "referral-history" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <LuUserRoundPlus className="text-lg" />
                                    <span>Referral History</span>
                                </span>
                                </a>
                
                                <a 
                                    href="/admin-panel/admin-accounts" className={`w-full text-base py-3 px-6 ${tab === "admin-accounts" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <LuUserRoundCog className="text-lg" />
                                    <span>Admin Accounts</span>
                                </span>
                                </a>
                                
                
                                <button
                                    type='submit' 
                                    onClick={handleLogout}
                                    className={`w-full text-base py-3 px-6 ${tab === "profile" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full hover:text-red-500 justify-between`}>
                                <span
                                    className="flex space-x-2 justify-start items-center"
                                >
                                    <RiLogoutCircleLine className="text-lg" />
                                    <span>Log Out</span>
                                </span>
                                </button>
                        </div>
                
                </section> 
            </div>
        </div>
        
      </header>
    );
}
