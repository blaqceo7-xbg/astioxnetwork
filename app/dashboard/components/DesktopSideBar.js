"use client"

import React, { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg';
import { FaAngleRight } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuArrowDownToLine, LuArrowUpToLine, LuUserRoundCheck, LuUserRoundPlus, LuWallet, LuWalletCards } from 'react-icons/lu';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { GiDigDug } from 'react-icons/gi';

export const DesktopSideBar = ({tab}) => {
    
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
      <section className='w-96 h-full bg-white dark:bg-isoDark2 dark:text-white hidden md:block container md:space-y-8 mx-auto'>
        
        <div className='space-y-3 text-neutral-400'>
                <a 
                    href="/dashboard" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "assets" ? "bg-[#f4f4f7] dark:bg-isoColor2 dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <LuWallet className="text-lg" />
                    <span>Assets</span>
                  </span>
                </a>

                <a 
                    href="/dashboard/deposit" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "deposit" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <LuArrowDownToLine className="text-lg" />
                    <span>Deposit</span>
                  </span>
                </a>

                <a 
                    href="/dashboard/withdrawal" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "withdrawal" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <LuArrowUpToLine className="text-lg" />
                    <span>Withdrawal</span>
                  </span>
                </a>

                <a 
                    href="/dashboard/transactions-hist" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "transactions" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <GrTransaction className="text-lg" />
                    <span>Transactions</span>
                  </span>
                </a>

                <a 
                    href="/dashboard/mining" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "btc-mining" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <GiDigDug className="text-lg" />
                    <span>BTC Mining</span>
                  </span>
                </a>

                <a 
                    href="/dashboard/wallets" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "profile" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <LuWalletCards className="text-lg" />
                    <span>ConnectWallet</span>
                  </span>
                </a>

                <a 
                    href="/dashboard/kyc" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "kyc" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <LuUserRoundCheck className="text-lg" />
                    <span>Kyc</span>
                  </span>
                </a>

                <a 
                    href="/dashboard/rewards" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "referral" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <LuUserRoundPlus className="text-lg" />
                    <span>Referral</span>
                  </span>
                </a>

                <a 
                    href="/dashboard/settings" className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "settings" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <IoSettingsOutline className="text-lg" />
                    <span>Settings</span>
                  </span>
                </a>

                <div 
                    onClick={handleLogout}
                    className={`w-full text-base py-3 px-6 rounded-tr-2xl ${tab === "profile" ? "bg-[#f4f4f7] dark:bg-isoColor2 text-black" : ""} rounded-br-2xl font-medium flex items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark dark:hover:text-white hover:text-red-500 justify-between`}>
                  <span
                    className="flex space-x-2 justify-start items-center"
                  >
                    <RiLogoutCircleLine className="text-lg" />
                    <span>Log Out</span>
                  </span>
                </div>
        </div>

      </section>
    );
}

