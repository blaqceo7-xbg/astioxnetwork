"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoClose, IoCloseOutline, IoMenu } from "react-icons/io5";
import { CgArrowLongRight } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { FaAngleRight } from 'react-icons/fa';


export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
      <header
        className={`bg-white fixed top-0 bottom-0 right-0 left-0  w-full`}
      >

        {/* Logo, Navigation Links, CTA Button */}
        <nav
            className={`w-full h-20 pr-3 flex items-center justify-between md:pr-12`}
        >

            <div>
                <a href="/">
                    <Image
                    src="/icons/logoMain.png"
                    alt="Metagram_logo"
                    className="-ml-6 md:-ml-0 md:w-70"
                    width={150}
                    height={0}
                    />
                </a>
            </div>
            
            <div className="block md:hidden"></div>

            <div 
            className='flex md:hidden'
            onClick={toggleMenu}
            >
                <IoIosMenu className='h-12 text-isoColor1 w-12' />
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <div className='hidden text-sm items-center space-x-8 md:flex'>
                  <a href='buy-crypto'>Buy Crypto</a>
                  <a href='#'>Trade</a>
                  <a href='#'>Wallet</a>
                  <a href='#'>About</a>
                  <a href='#'>Contact Us</a>
                  <a href='#'>FAQ</a>
              </div>

              <div className="hidden md:flex items-center space-x-5">
                  <a href='#' className='flex items-center text-isoColor1 space-x-2 flex-nowrap px-7 py-2 rounded-full border border-isoColor1 md:px-8'>
                      <span className='text-xs font-medium md:text-base'>Login</span>
                      <CgArrowLongRight className='hidden w-7 md:block' />
                  </a>
                  <a href='#' className='flex items-center bg-isoColor1 text-white space-x-2 flex-nowrap px-7 py-2 rounded-full md:px-8'>
                      <span className='text-xs font-medium md:text-base'>Sign Up</span>
                  </a>
              </div>
            </div>
        </nav>

        <div
            className={`space-y-12 z-50 w-full will-change-transform overflow-scroll h-full transform duration-500 transition-all ease-out flex flex-col px-6 py-1 text-black bg-[#f4f4f7] ${
              isMenuOpen
                ? "block fixed translate-y-0 top-0 bottom-0 right-0 left-0"
                : "-translate-y-full hidden"
            }`}
          >
            <nav
              className={`w-full h-20 flex items-center justify-between`}
            >
                <div>
                    <a href="/">
                        <Image
                        src="/icons/logoMain.png"
                        alt="Metagram_logo"
                        className="-ml-10 md:w-70"
                        width={150}
                        height={0}
                        />
                    </a>
                </div>

                <div
                className='flex text-isoColor1 md:hidden'
                onClick={toggleMenu}
                >
                    <IoCloseOutline className='h-14 w-14' />
                </div>
            </nav>

            <div className="w-full space-y-6">
              <div className='space-y-3'>
                <div className="w-full text-lg p-3 rounded-md bg-white font-bold flex items-center justify-between">
                  <a
                    href="buy-crypto"
                    className="w-full text-black hover:text-iso-green-lite flex justify-between items-center"
                  >
                    <span>Buy Crypto</span>
                  </a>
                  <FaAngleRight className="text-lg text-iso-green-lite" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white font-bold flex items-center justify-between">
                  <a
                    href="/"
                    className="w-full text-black hover:text-iso-green-lite flex justify-between items-center"
                  >
                    <span>Trade</span>
                  </a>
                  <FaAngleRight className="text-lg text-iso-green-lite" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white font-bold flex items-center justify-between">
                  <a
                    href="/"
                    className="w-full text-black hover:text-iso-green-lite flex justify-between items-center"
                  >
                    <span>Wallet</span>
                  </a>
                  <FaAngleRight className="text-lg text-iso-green-lite" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white font-bold flex items-center justify-between">
                  <a
                    href="/"
                    className="w-full text-black hover:text-iso-green-lite flex justify-between items-center"
                  >
                    <span>Support</span>
                  </a>
                  <FaAngleRight className="text-lg text-iso-green-lite" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white font-bold flex items-center justify-between">
                  <a
                    href="/"
                    className="w-full text-black hover:text-iso-green-lite flex justify-between items-center"
                  >
                    <span>About</span>
                  </a>
                  <FaAngleRight className="text-lg text-iso-green-lite" />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center md:flex-row md:items-baseline md:gap-6 space-y-5">
              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="#"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full bg-isoColor1 lg:flex items-center text-white hover:bg-isoColor2 hover:text-isoColor1 hover:rounded-full"
                >
                  Login
                </a>
              </div>
              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="#"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full bg-none border border-black lg:flex items-center text-black hover:bg-isoColor1 hover:text-white hover:rounded-full"
                >
                  Sign Up
                </a>
              </div>
            </div>
        </div>
        
      </header>
    );
}

