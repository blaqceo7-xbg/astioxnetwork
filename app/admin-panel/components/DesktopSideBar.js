"use client"

import React, { useEffect, useState } from 'react'
import { BiBitcoin } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaAngleRight } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';
import { IoNewspaperOutline, IoSettingsOutline } from 'react-icons/io5';
import { LuArrowDownToLine, LuArrowUpToLine, LuUserRound, LuUserRoundCheck, LuUserRoundCog, LuUserRoundPlus, LuWallet, LuWalletCards } from 'react-icons/lu';
import { PiHouse } from 'react-icons/pi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import LoadingScreen from '../loading';

export const DesktopSideBar = ({tab}) => {

    const [loading, setLoading] = useState(false);
    
    async function logout() {
        
            setLoading(true);
            
                try {
                  
                  const res = await axios.post(
                      `/api/auth/logout`,
                      {},
                      {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" }  
                      }
                    );
            
                  if (res.status === 200) {
                      router.push("/");
                  }
                } catch(err) {
                  setLoading(false);
                }
        }

    return (
      <section className='w-96 h-screen bg-isoColor1 hidden md:block container md:space-y-8 mx-auto'>
                              {loading === true && (<LoadingScreen />)}

                              <div className=' text-white'>
                                      <a href='/' className='w-full text-2xl font-bold text-white py-3 px-6 flex justify-center items-center'>
                                        Admin Panel
                                      </a>
                      
                                      
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
                                          href="/admin-panel/nft-deposit" className={`w-full text-base py-3 px-6 ${tab === "nft-deposit" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full justify-between`}>
                                      <span
                                          className="flex space-x-2 justify-start items-center"
                                      >
                                          <LuArrowDownToLine className="text-lg" />
                                          <span>NFT Deposit</span>
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
                                      
                      
                                      <p 
                                        type='submit'
                                        onClick={logout}
                                          className={`w-full text-base py-3 px-6 ${tab === "profile" ? "bg-white text-isoColor1 rounded-r-full" : ""}  flex items-center hover:bg-black/20 hover:text-white hover:rounded-r-full hover:text-red-500 justify-between`}>
                                      <span
                                          className="flex space-x-2 justify-start items-center"
                                      >
                                          <RiLogoutCircleLine className="text-lg" />
                                          <span>Log Out</span>
                                      </span>
                                      </p>
                              </div>
                      
      </section>
    );
}

