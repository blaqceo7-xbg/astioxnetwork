"use client"

import React, { useEffect, useState } from 'react'
import { IoClose, IoCloseOutline, IoGiftOutline, IoSettingsOutline } from "react-icons/io5";
import { LuArrowDownToLine, LuArrowUpToLine, LuShoppingCart, LuUserRoundPlus, LuWallet } from "react-icons/lu";
import { GrLineChart, GrTransaction } from "react-icons/gr";
import { GiAirBalloon } from 'react-icons/gi';
import { TbAirBalloon } from 'react-icons/tb';

export const Footer = ({tab}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        if (isMenuOpen === false) {
            setIsMenuOpen(true)
        } else {
            setIsMenuOpen(false)
        }
    }

    return (
        <div
            className={`bg-transparent w-full block md:hidden px-2 py-2 fixed bottom-0 right-0 left-0 ${isMenuOpen === true ? "z-40" : "z-20"} w-full`}
        >

            {/* Logo, Navigation Links, CTA Button for Desktop screens */}
            <nav
                className={`w-full h-16 px-4 bg-white flex rounded-full shadow-2xl items-center justify-between`}
            >

                <a 
                className={`flex flex-col justify-center ${tab === 'assets' ? "text-black font-medium" : "text-neutral-400"} items-center space-y-1`}
                href='/dashboard'
                >
                    <GrLineChart className={`h-6 w-6`} />
                    <span className='text-xs'>Assets</span>
                </a>

                <a 
                className={`flex flex-col justify-center ${tab === 'wallets' ? "text-black font-medium" : "text-neutral-400"} items-center space-y-1`}
                href='/dashboard/wallets'
                >
                    
                    <LuWallet className={`h-6 w-6`} />
                    <span className='text-xs'>Wallets</span>
                </a>

                <div 
                className={`flex flex-col justify-between py-2.5 h-full text-white items-center space-y-0`}
                onClick={toggleMenu}
                >
                    <div className='p-4 -mt-10 rounded-full bg-isoColor1 '>
                        <GrTransaction className={`h-5 w-5`} />
                    </div>
                    <span className='text-xs text-neutral-400'>Trade</span>
                </div>

                <a 
                className={`flex flex-col justify-center ${tab === 'airdrop' ? "text-black font-medium" : "text-neutral-400"} items-center space-y-1`}
                href='/dashboard/airdrop'
                >
                    <TbAirBalloon className={`h-6 w-6`} />
                    <span className='text-xs'>Airdrop</span>
                </a>

                <a 
                className={`flex flex-col justify-center ${tab === 'kyc' ? "text-black font-medium" : "text-neutral-400"} items-center space-y-1`}
                href='/dashboard/rewards'
                >
                    <IoGiftOutline className={`h-6 w-6`} />
                    <span className='text-xs'>Rewards</span>
                </a>
            </nav>

            <div className={`${isMenuOpen === true ? "block" : "hidden"} w-full h-full fixed z-50 top-0 bottom-0 bg-black/30 left-0 right-0`}>
                <div className={`w-full animate-slideUp absolute h-fit will-change-transform transform duration-500 transition-all ease-out bottom-0 left-0 right-0 rounded-t-2xl text-black bg-white`}>
                    <div className="rounded-2xl w-full font-semibold space-y-4 flex flex-col items-center py-10 px-8">
                        <a 
                            href="/dashboard/deposit" className={`w-full text-lg py-2 rounded-tr-2xl rounded-br-2xl flex items-center justify-between`}>
                            <span
                                className="flex space-x-4 justify-start items-center"
                            >
                                <LuArrowDownToLine className="text-2xl" />
                                <p>
                                    <span>Deposit</span>
                                    <span className='flex text-neutral-500 font-normal text-sm'>Deposit crypto and start earning</span>
                                </p>
                            </span>
                        </a>

                        <a 
                            href="/dashboard/withdrawal" className={`w-full text-lg py-2 rounded-tr-2xl rounded-br-2xl flex items-center justify-between`}>
                            <span
                                className="flex space-x-4 justify-start items-center"
                            >
                                <LuArrowUpToLine className="text-2xl" />
                                <p>
                                    <span>Withdrawal</span>
                                    <span className='flex text-neutral-500 font-normal text-sm'>Make easy withdrawal</span>
                                </p>
                            </span>
                        </a>

                        <a 
                            href="/dashboard/buy-crypto" className={`w-full text-lg py-2 rounded-tr-2xl rounded-br-2xl flex items-center justify-between`}>
                            <span
                                className="flex space-x-4 justify-start items-center"
                            >
                                <LuShoppingCart className="text-2xl" />
                                <p>
                                    <span>Buy Crypto</span>
                                    <span className='flex text-neutral-500 font-normal text-sm'>Buy cryptocurrency with credit card</span>
                                </p>
                            </span>
                        </a>

                        <a 
                            href="/dashboard/wallets" className={`w-full text-lg py-2 rounded-tr-2xl rounded-br-2xl flex items-center justify-between`}>
                            <span
                                className="flex space-x-4 justify-start items-center"
                            >
                                <LuWallet className="text-2xl" />
                                <p>
                                    <span>WalletConnect</span>
                                    <span className='flex text-neutral-500 font-normal text-sm'>Import your crypto wallet</span>
                                </p>
                            </span>
                        </a>
                    </div>

                    <div className='flex w-full pb-5 justify-center items-center'>
                        <div className='flex p-3 bg-isoColor1 text-white rounded-full' onClick={toggleMenu}><IoClose className="text-2xl" /></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

