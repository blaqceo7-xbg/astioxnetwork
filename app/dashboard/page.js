"use client"

import Image from 'next/image';
import React, { useState } from 'react'
import { CgArrowLongRight } from 'react-icons/cg';
import { FaAngleRight, FaCheckCircle } from 'react-icons/fa';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { IoMenu, IoCloseOutline } from 'react-icons/io5';
import { FooterCon } from '../components/Footer';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Balance } from './components/Balance';
import { CryptoPriceList } from './components/CryptoPriceList';
import { DesktopSideBar } from './components/DesktopSideBar';
import { IoGiftOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { Carousel } from 'flowbite-react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { LuWallet } from "react-icons/lu";
import LoadingScreen from './loading';
import { GiReceiveMoney } from 'react-icons/gi';
import { RiNftLine } from 'react-icons/ri';

export default function Page() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
      const handleMainMenu = () => {
        setIsShown(!isShown);
      };
  
      const [isShown2, setIsShown2] = useState(true);
      const handleMainMenu2 = () => {
        setIsShown2(!isShown2);
      };
  
      const [isShown3, setIsShown3] = useState(true);
      const handleMainMenu3 = () => {
        setIsShown3(!isShown3);
      };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

  return (
    <div className="bg-white dark:bg-isoDark dark:text-white w-full h-full text-black min-h-screen space-y-5 relative font-[family-name:var(--font-geist-sans)]">
      {loading === true && (<LoadingScreen tab={"airdrop"} />)}

     <Header tab={"exchange"} />

       <div className='w-full h-full min-h-screen pt-10 md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"assets"} />

          <div className='w-full space-y-1 py-3 md:px-20'>
            <Balance />

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

        </div>

     <Footer tab={"assets"} />
    </div>
  )
}
