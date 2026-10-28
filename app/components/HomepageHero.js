"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { IoCloseOutline, IoTvOutline } from "react-icons/io5";
import { CgArrowLongRight } from "react-icons/cg";
import { FaAngleRight } from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import {
  BsFacebook,
  BsInstagram,
  BsPhone,
  BsTelegram,
  BsTwitterX,
  BsYoutube
} from 'react-icons/bs';
import ThemeToggle from './ThemeToggle';
import { FaWhatsapp } from "react-icons/fa";
import CryptoTicker from './CryptoTicker';


export const HomepageHero = ({ page }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full overflow-hidden">

      {/* =========================================================
          HOME HERO
      ========================================================= */}
      {page === "home" ? (
        <header className="relative overflow-hidden w-full min-h-screen px-4 py-3 md:px-8 bg-gradient-to-br from-isoColor1/[0.04] via-white to-isoColor2/[0.08] dark:from-isoDark dark:via-isoDark dark:to-isoColor2/[0.05]">

          {/* Decorative background */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-isoColor1/10 dark:bg-isoColor2/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-isoColor2/10 dark:bg-isoColor2/10 blur-3xl pointer-events-none" />

          {/* Navbar */}
          <div className="w-full bg-white/90 left-0 z-50 dark:bg-isoDark/90 fixed top-0 right-0 flex flex-col backdrop-blur-xl border-b border-black/5 dark:border-white/5">

            <nav className="flex p-3 items-center md:py-4 justify-between w-full">

              <div className="flex items-center space-x-1">
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
                <div>
                 <span
                    className="
                      text-[18px]
                      font-extrabold
                      tracking-tight
                      text-black
                      dark:text-white
                    "
                  >
                    Astiox
                  </span>
                  <span
                    className="
                      text-xs
                      spacing-wide
                      font-light
                      dark:text-white
                    "
                  >
                    Network
                  </span>
                </div>
              </div>

              <div className="hidden items-center md:flex space-x-8">

                <div className="items-center space-x-8 flex">
                  <a href="buy-crypto">Buy Crypto</a>
                  <a href="market">Market</a>
                  <a href="#">Trade</a>
                  <a href="#">Wallet</a>
                  <a href="about">About</a>
                  <a href="support">Contact Us</a>
                </div>

                <ThemeToggle />

                <a
                  href="/signup"
                  className="w-fit flex font-medium dark:bg-isoColor2 dark:text-black items-center text-white space-x-2 flex-nowrap py-3.5 px-6 rounded-full bg-isoColor1 md:px-8 md:py-3 shadow-lg shadow-isoColor1/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Create Account</span>
                </a>

              </div>

              <div
                className="flex md:hidden"
                onClick={toggleMenu}
              >
                <IoIosMenu className="h-12 text-isoColor1 dark:text-isoColor2 w-12" />
              </div>

            </nav>

            <CryptoTicker />

          </div>

          <div className="py-16 md:py-10"></div>

          {/* Mobile Menu */}
          <div
            className={`space-y-12 z-50 w-full dark:bg-isoDark will-change-transform overflow-scroll h-full transform duration-500 transition-all ease-out flex flex-col px-6 py-1 text-black bg-[#f4f4f7] ${
              isMenuOpen
                ? "block fixed translate-y-0 top-0 bottom-0 right-0 left-0"
                : "-translate-y-full hidden"
            }`}
          >

            <nav className="w-full h-20 flex items-center justify-between">

              <div>
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
              </div>

              <div
                className="flex text-isoColor1 dark:text-isoColor2 md:hidden"
                onClick={toggleMenu}
              >
                <IoCloseOutline className="h-14 w-14" />
              </div>

            </nav>

            <div className="w-full space-y-6">
              <div className="space-y-3">

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a
                    href="buy-crypto"
                    className="w-full text-black dark:text-white flex justify-between items-center"
                  >
                    <span>Buy Crypto</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a
                    href="/dashboard/mining"
                    className="w-full text-black dark:text-white flex space-x-4 items-center"
                  >
                    <span>BTC Mining</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a
                    href="/dashboard/wallets"
                    className="w-full text-black dark:text-white flex space-x-4 items-center"
                  >
                    <span>Wallet</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a
                    href="/dashboard/loans"
                    className="w-full text-black dark:text-white flex space-x-4 items-center"
                  >
                    <span>Loans</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a
                    href="support"
                    className="w-full text-black dark:text-white flex justify-between items-center"
                  >
                    <span>Support</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a
                    href="about"
                    className="w-full text-black dark:text-white flex justify-between items-center"
                  >
                    <span>About</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

              </div>
            </div>

            <div className="w-full flex flex-col items-center md:flex-row md:items-baseline md:gap-6 space-y-5">

              <ThemeToggle />

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="login"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full border dark:border-isoColor2 dark:text-isoColor2 border-black lg:flex items-center text-black hover:rounded-full"
                >
                  Log In
                </a>
              </div>

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="signup"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 dark:bg-isoColor2 dark:text-black w-full bg-isoColor1 lg:flex items-center text-white hover:bg-isoColor2 hover:text-black hover:rounded-full"
                >
                  Sign Up
                </a>
              </div>

            </div>

          </div>

          {/* Hero */}
          <section className="relative z-20 w-full max-w-7xl container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

            <div className="md:my-8 py-8 my-4 min-h-[calc(100vh-150px)] flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">

              <div className="w-full md:w-[52%] flex flex-col items-start md:mt-12 lg:mt-20 space-y-6 md:space-y-8">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-isoColor1/20 dark:border-isoColor2/20 bg-white/70 dark:bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-medium text-isoColor1 dark:text-isoColor2">
                  <span className="w-2 h-2 rounded-full bg-isoColor1 dark:bg-isoColor2 animate-pulse"></span>
                  Next-generation Web3 platform
                </div>

                <h1 className="flex flex-col text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.04em] text-black dark:text-white leading-[1.05]">
                  <span>Modern crypto assets.</span>
                  <span className="text-isoColor1 dark:text-isoColor2">
                    Reputable Web3 Earnings.
                  </span>
                </h1>

                <div className="space-y-4">

                  <p className="text-black/70 dark:text-white/70 text-base sm:text-lg lg:text-xl leading-8 max-w-2xl">
                    Unlock the profitable power of your cryptocurrency assets and explore the world of Web3 on Astiox Network.
                  </p>

                  <a
                    href="/signup"
                    className="w-fit flex md:hidden dark:bg-isoColor2 dark:text-black font-semibold items-center text-white space-x-2 flex-nowrap py-3.5 px-6 rounded-full bg-isoColor1 shadow-lg shadow-isoColor1/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Join Astiox Network</span>
                    <CgArrowLongRight className="text-xl" />
                  </a>

                  <div className="md:flex hidden items-center space-x-3">

                    <a
                      href="/signup"
                      className="w-fit flex items-center text-isoColor1 dark:text-isoColor2 border-isoColor1/30 dark:border-isoColor2/30 space-x-3 flex-nowrap py-3 px-5 rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <BsPhone className="text-2xl" />
                      <div className="flex flex-col space-y-0">
                        <span className="text-xs">Account</span>
                        <span>Signup</span>
                      </div>
                    </a>

                    <a
                      href="/login"
                      className="w-fit flex items-center text-isoColor1 dark:text-isoColor2 border-isoColor1/30 dark:border-isoColor2/30 space-x-3 flex-nowrap py-3 px-5 rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <IoTvOutline className="text-2xl" />
                      <div className="flex flex-col space-y-0">
                        <span className="text-xs">Account</span>
                        <span>Login</span>
                      </div>
                    </a>

                  </div>
                </div>
              </div>

              <div className="relative w-full md:w-[48%] flex justify-center md:justify-end">

                <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-isoColor1/10 dark:bg-isoColor2/10 blur-3xl"></div>

                <Image
                  src="/img/hero_mobile_app.avif"
                  alt="hero_mobile_app"
                  className="relative w-full max-w-[620px] md:max-w-[720px] lg:max-w-[780px] h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_30px_70px_rgba(0,0,0,0.45)] hover:-translate-y-2 transition-transform duration-700"
                  width={500}
                  height={0}
                />

              </div>

            </div>

          </section>

        </header>

      ) : page === "about" ? (

        /* =========================================================
           ABOUT HERO
        ========================================================= */

        <header className="relative overflow-hidden w-full min-h-screen px-4 py-3 md:px-8 bg-gradient-to-br from-isoColor1/[0.04] via-white to-isoColor2/[0.08] dark:from-isoDark dark:via-isoDark dark:to-isoColor2/[0.05]">

          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-isoColor2/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-isoColor1/10 blur-3xl pointer-events-none" />

          {/* Navbar */}
          <div className="w-full bg-white/90 left-0 z-50 dark:bg-isoDark/90 fixed top-0 right-0 flex flex-col backdrop-blur-xl border-b border-black/5 dark:border-white/5">

            <nav className="flex p-3 items-center md:py-4 justify-between w-full">

              <div className="flex items-center space-x-1">
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
                <div>
                 <span
                    className="
                      text-[18px]
                      font-extrabold
                      tracking-tight
                      text-black
                      dark:text-white
                    "
                  >
                    Astiox
                  </span>
                  <span
                    className="
                      text-xs
                      spacing-wide
                      font-light
                      dark:text-white
                    "
                  >
                    Network
                  </span>
                </div>
              </div>

              <div className="hidden items-center md:flex space-x-8">

                <div className="items-center space-x-8 flex">
                  <a href="buy-crypto">Buy Crypto</a>
                  <a href="market">Market</a>
                  <a href="#">Trade</a>
                  <a href="#">Wallet</a>
                  <a href="about">About</a>
                  <a href="support">Contact Us</a>
                </div>

                <ThemeToggle />

                <a
                  href="/signup"
                  className="w-fit flex font-medium dark:bg-isoColor2 dark:text-black items-center text-white space-x-2 flex-nowrap py-3.5 px-6 rounded-full bg-isoColor1 md:px-8 md:py-3 shadow-lg shadow-isoColor1/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Create Account</span>
                </a>

              </div>

              <div
                className="flex md:hidden"
                onClick={toggleMenu}
              >
                <IoIosMenu className="h-12 text-isoColor1 dark:text-isoColor2 w-12" />
              </div>

            </nav>

            <CryptoTicker />

          </div>

          <div className="py-16 md:py-10"></div>

          {/* Mobile Menu */}
          <div
            className={`space-y-12 z-50 w-full dark:bg-isoDark will-change-transform overflow-scroll h-full transform duration-500 transition-all ease-out flex flex-col px-6 py-1 text-black bg-[#f4f4f7] ${
              isMenuOpen
                ? "block fixed translate-y-0 top-0 bottom-0 right-0 left-0"
                : "-translate-y-full hidden"
            }`}
          >

            <nav className="w-full h-20 flex items-center justify-between">

              <div>
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
              </div>

              <div
                className="flex text-isoColor1 dark:text-isoColor2 md:hidden"
                onClick={toggleMenu}
              >
                <IoCloseOutline className="h-14 w-14" />
              </div>

            </nav>

            <div className="w-full space-y-6">
              <div className="space-y-3">

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="buy-crypto" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>Buy Crypto</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/mining" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>BTC Mining</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/wallets" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>Wallet</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/loans" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>Loans</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="support" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>Support</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="about" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>About</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

              </div>
            </div>

            <div className="w-full flex flex-col items-center md:flex-row md:items-baseline md:gap-6 space-y-5">

              <ThemeToggle />

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="login"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full border dark:border-isoColor2 dark:text-isoColor2 border-black lg:flex items-center text-black"
                >
                  Log In
                </a>
              </div>

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="signup"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 dark:bg-isoColor2 dark:text-black w-full bg-isoColor1 lg:flex items-center text-white hover:bg-isoColor2 hover:text-black"
                >
                  Sign Up
                </a>
              </div>

            </div>

          </div>

          {/* About Hero */}
          <section className="relative z-20 w-full max-w-7xl container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

            <div className="md:my-8 py-8 my-4 min-h-[calc(100vh-150px)] flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">

              <div className="w-full md:w-[52%] flex flex-col items-start md:mt-12 lg:mt-20 space-y-6 md:space-y-8">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-isoColor1/20 dark:border-isoColor2/20 bg-white/70 dark:bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-medium text-isoColor1 dark:text-isoColor2">
                  <span className="w-2 h-2 rounded-full bg-isoColor1 dark:bg-isoColor2"></span>
                  Building the future of Web3
                </div>

                <h1 className="flex flex-col text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.04em] text-black dark:text-white leading-[1.05]">
                  <span>We make it easier</span>
                  <span className="text-isoColor1 dark:text-isoColor2">
                    and safer.
                  </span>
                  <span>For millions to invest</span>
                  <span className="text-isoColor1 dark:text-isoColor2">
                    in cryptocurrency.
                  </span>
                </h1>

                <div className="space-y-5">

                  <p className="text-black/70 dark:text-white/70 text-base sm:text-lg lg:text-xl leading-8 max-w-2xl">
                    Trusted by over 200 million people, we're on a mission to build a seamless Web3 hub and open ecosystem for everyone.
                  </p>

                  <a
                    href="/support"
                    className="w-fit flex items-center dark:bg-isoColor2 dark:text-black font-semibold text-white space-x-3 py-3.5 px-6 rounded-full bg-isoColor1 shadow-lg shadow-isoColor1/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Speak with Us</span>
                    <CgArrowLongRight className="text-2xl" />
                  </a>

                </div>

              </div>

              <div className="relative w-full md:w-[48%] flex justify-center md:justify-end">

                <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-isoColor2/10 blur-3xl"></div>

                <Image
                  src="/img/hero_mobile_app.avif"
                  alt="hero_mobile_app"
                  className="relative w-full max-w-[620px] md:max-w-[720px] lg:max-w-[780px] h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_30px_70px_rgba(0,0,0,0.45)] hover:-translate-y-2 transition-transform duration-700"
                  width={500}
                  height={0}
                />

              </div>

            </div>

          </section>

        </header>

      ) : page === "buy-crypto" ? (

        /* =========================================================
           BUY CRYPTO HERO
        ========================================================= */

        <header className="relative overflow-hidden w-full min-h-screen px-4 py-3 md:px-8 bg-gradient-to-br from-isoColor1/[0.04] via-white to-isoColor2/[0.08] dark:from-isoDark dark:via-isoDark dark:to-isoColor2/[0.05]">

          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-isoColor1/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-isoColor2/10 blur-3xl pointer-events-none" />

          {/* Navbar */}
          <div className="w-full bg-white/90 left-0 z-50 dark:bg-isoDark/90 fixed top-0 right-0 flex flex-col backdrop-blur-xl border-b border-black/5 dark:border-white/5">

            <nav className="flex p-3 items-center md:py-4 justify-between w-full">

              <div className="flex items-center space-x-1">
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
                <div>
                 <span
                    className="
                      text-[18px]
                      font-extrabold
                      tracking-tight
                      text-black
                      dark:text-white
                    "
                  >
                    Astiox
                  </span>
                  <span
                    className="
                      text-xs
                      spacing-wide
                      font-light
                      dark:text-white
                    "
                  >
                    Network
                  </span>
                </div>
              </div>

              <div className="hidden items-center md:flex space-x-8">

                <div className="items-center space-x-8 flex">
                  <a href="buy-crypto">Buy Crypto</a>
                  <a href="market">Market</a>
                  <a href="#">Trade</a>
                  <a href="#">Wallet</a>
                  <a href="about">About</a>
                  <a href="support">Contact Us</a>
                </div>

                <ThemeToggle />

                <a
                  href="/signup"
                  className="w-fit flex font-medium dark:bg-isoColor2 dark:text-black items-center text-white space-x-2 flex-nowrap py-3.5 px-6 rounded-full bg-isoColor1 md:px-8 md:py-3 shadow-lg shadow-isoColor1/20"
                >
                  <span>Create Account</span>
                </a>

              </div>

              <div
                className="flex md:hidden"
                onClick={toggleMenu}
              >
                <IoIosMenu className="h-12 text-isoColor1 dark:text-isoColor2 w-12" />
              </div>

            </nav>

            <CryptoTicker />

          </div>

          <div className="py-16 md:py-10"></div>

          {/* Mobile Menu */}
          <div
            className={`space-y-12 z-50 w-full dark:bg-isoDark will-change-transform overflow-scroll h-full transform duration-500 transition-all ease-out flex flex-col px-6 py-1 text-black bg-[#f4f4f7] ${
              isMenuOpen
                ? "block fixed translate-y-0 top-0 bottom-0 right-0 left-0"
                : "-translate-y-full hidden"
            }`}
          >

            <nav className="w-full h-20 flex items-center justify-between">

              <div>
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
              </div>

              <div
                className="flex text-isoColor1 dark:text-isoColor2 md:hidden"
                onClick={toggleMenu}
              >
                <IoCloseOutline className="h-14 w-14" />
              </div>

            </nav>

            <div className="w-full space-y-6">
              <div className="space-y-3">

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="buy-crypto" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>Buy Crypto</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/mining" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>BTC Mining</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/wallets" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>Wallet</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/loans" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>Loans</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="support" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>Support</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="about" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>About</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

              </div>
            </div>

            <div className="w-full flex flex-col items-center md:flex-row md:items-baseline md:gap-6 space-y-5">

              <ThemeToggle />

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="login"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full border dark:border-isoColor2 dark:text-isoColor2 border-black lg:flex items-center text-black"
                >
                  Log In
                </a>
              </div>

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="signup"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 dark:bg-isoColor2 dark:text-black w-full bg-isoColor1 lg:flex items-center text-white"
                >
                  Sign Up
                </a>
              </div>

            </div>

          </div>

          {/* Buy Crypto Hero */}
          <section className="relative z-20 w-full max-w-7xl container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

            <div className="md:my-8 py-8 my-4 min-h-[calc(100vh-150px)] flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">

              <div className="w-full md:w-[52%] flex flex-col items-start md:mt-12 lg:mt-20 space-y-6 md:space-y-8">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-isoColor1/20 dark:border-isoColor2/20 bg-white/70 dark:bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-medium text-isoColor1 dark:text-isoColor2">
                  <span className="w-2 h-2 rounded-full bg-isoColor1 dark:bg-isoColor2 animate-pulse"></span>
                  Fast, simple & secure
                </div>

                <h1 className="flex flex-col text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.04em] text-black dark:text-white leading-[1.05]">
                  <span>Buy crypto the way</span>
                  <span>you want.</span>
                  <span className="text-isoColor1 dark:text-isoColor2">
                    Start making Web3 profits.
                  </span>
                </h1>

                <div className="space-y-4">

                  <p className="text-black/70 dark:text-white/70 text-base sm:text-lg lg:text-xl leading-8 max-w-2xl">
                    Choose from 110+ fiat currencies, and buy the crypto you want, effortlessly on Astiox Network.
                  </p>

                  <a
                    href="/signup"
                    className="w-fit flex md:hidden dark:bg-isoColor2 dark:text-black font-semibold items-center text-white space-x-2 flex-nowrap py-3.5 px-6 rounded-full bg-isoColor1 shadow-lg shadow-isoColor1/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Deposit Crypto Now</span>
                    <CgArrowLongRight className="text-xl" />
                  </a>

                  <div className="md:flex hidden items-center space-x-3">

                    <a
                      href="/signup"
                      className="w-fit flex items-center text-isoColor1 dark:text-isoColor2 border-isoColor1/30 dark:border-isoColor2/30 space-x-3 flex-nowrap py-3 px-5 rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <BsPhone className="text-2xl" />
                      <div className="flex flex-col space-y-0">
                        <span className="text-xs">Account</span>
                        <span>Signup</span>
                      </div>
                    </a>

                    <a
                      href="/login"
                      className="w-fit flex items-center text-isoColor1 dark:text-isoColor2 border-isoColor1/30 dark:border-isoColor2/30 space-x-3 flex-nowrap py-3 px-5 rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <IoTvOutline className="text-2xl" />
                      <div className="flex flex-col space-y-0">
                        <span className="text-xs">Account</span>
                        <span>Login</span>
                      </div>
                    </a>

                  </div>

                </div>

              </div>

              <div className="relative w-full md:w-[48%] flex justify-center md:justify-end">

                <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-isoColor1/10 blur-3xl"></div>

                <Image
                  src="/img/crypto-wallet-moblie-ui.png"
                  alt="crypto wallet"
                  className="relative w-full max-w-[620px] md:max-w-[720px] lg:max-w-[780px] h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_30px_70px_rgba(0,0,0,0.45)] hover:-translate-y-2 transition-transform duration-700"
                  width={500}
                  height={0}
                />

              </div>

            </div>

          </section>

        </header>

      ) : page === "support" ? (

        /* =========================================================
           SUPPORT HERO
        ========================================================= */

        <header className="relative overflow-hidden w-full min-h-screen px-4 py-3 md:px-8 bg-gradient-to-br from-isoColor1/[0.04] via-white to-isoColor2/[0.08] dark:from-isoDark dark:via-isoDark dark:to-isoColor2/[0.05]">

          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-isoColor2/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-isoColor1/10 blur-3xl pointer-events-none" />

          {/* Navbar */}
          <div className="w-full bg-white/90 left-0 z-50 dark:bg-isoDark/90 fixed top-0 right-0 flex flex-col backdrop-blur-xl border-b border-black/5 dark:border-white/5">

            <nav className="flex p-3 items-center md:py-4 justify-between w-full">

              <div className="flex items-center space-x-1">
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
                <div>
                 <span
                    className="
                      text-[18px]
                      font-extrabold
                      tracking-tight
                      text-black
                      dark:text-white
                    "
                  >
                    Astiox
                  </span>
                  <span
                    className="
                      text-xs
                      spacing-wide
                      font-light
                      dark:text-white
                    "
                  >
                    Network
                  </span>
                </div>
              </div>

              <div className="hidden items-center md:flex space-x-8">

                <div className="items-center space-x-8 flex">
                  <a href="buy-crypto">Buy Crypto</a>
                  <a href="market">Market</a>
                  <a href="#">Trade</a>
                  <a href="#">Wallet</a>
                  <a href="about">About</a>
                  <a href="support">Contact Us</a>
                </div>

                <ThemeToggle />

                <a
                  href="/signup"
                  className="w-fit flex font-medium dark:bg-isoColor2 dark:text-black items-center text-white space-x-2 flex-nowrap py-3.5 px-6 rounded-full bg-isoColor1 md:px-8 md:py-3 shadow-lg shadow-isoColor1/20"
                >
                  <span>Create Account</span>
                </a>

              </div>

              <div
                className="flex md:hidden"
                onClick={toggleMenu}
              >
                <IoIosMenu className="h-12 text-isoColor1 dark:text-isoColor2 w-12" />
              </div>

            </nav>

            <CryptoTicker />

          </div>

          <div className="py-16 md:py-10"></div>

          {/* Mobile Menu */}
          <div
            className={`space-y-12 z-50 w-full dark:bg-isoDark will-change-transform overflow-scroll h-full transform duration-500 transition-all ease-out flex flex-col px-6 py-1 text-black bg-[#f4f4f7] ${
              isMenuOpen
                ? "block fixed translate-y-0 top-0 bottom-0 right-0 left-0"
                : "-translate-y-full hidden"
            }`}
          >

            <nav className="w-full h-20 flex items-center justify-between">

              <div>
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
              </div>

              <div
                className="flex text-isoColor1 dark:text-isoColor2 md:hidden"
                onClick={toggleMenu}
              >
                <IoCloseOutline className="h-14 w-14" />
              </div>

            </nav>

            <div className="w-full space-y-6">
              <div className="space-y-3">

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="buy-crypto" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>Buy Crypto</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/mining" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>BTC Mining</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/wallets" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>Wallet</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/loans" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>Loans</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="support" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>Support</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="about" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>About</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

              </div>
            </div>

            <div className="w-full flex flex-col items-center md:flex-row md:items-baseline md:gap-6 space-y-5">

              <ThemeToggle />

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="login"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full border dark:border-isoColor2 dark:text-isoColor2 border-black lg:flex items-center text-black"
                >
                  Log In
                </a>
              </div>

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="signup"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 dark:bg-isoColor2 dark:text-black w-full bg-isoColor1 lg:flex items-center text-white"
                >
                  Sign Up
                </a>
              </div>

            </div>

          </div>

          {/* Support Hero */}
          <section className="relative z-20 w-full max-w-7xl container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

            <div className="md:my-8 py-8 my-4 min-h-[calc(100vh-150px)] flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">

              <div className="w-full md:w-[52%] flex flex-col items-start md:mt-12 lg:mt-20 space-y-6 md:space-y-8">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-isoColor1/20 dark:border-isoColor2/20 bg-white/70 dark:bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-medium text-isoColor1 dark:text-isoColor2">
                  <span className="w-2 h-2 rounded-full bg-isoColor1 dark:bg-isoColor2 animate-pulse"></span>
                  We're here to help
                </div>

                <h1 className="flex flex-col text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.04em] text-black dark:text-white leading-[1.05]">
                  <span>Get in touch.</span>
                  <span className="text-isoColor1 dark:text-isoColor2">
                    Astiox Web3 support.
                  </span>
                </h1>

                <div className="space-y-6">

                  <p className="text-black/70 dark:text-white/70 text-base sm:text-lg lg:text-xl leading-8 max-w-2xl">
                    Whether you want to request a demo, send in your CV or give us some feedback, we want to hear from you.
                  </p>

                  {/* Social Links */}
                  <div className="space-y-3">

                    <span className="text-sm font-semibold text-black dark:text-white">
                      Stay Connected:
                    </span>

                    <div className="flex items-center gap-3 flex-wrap">

                      <a
                        href="#"
                        className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex items-center justify-center text-isoColor1 dark:text-isoColor2 hover:bg-isoColor1 hover:text-white dark:hover:bg-isoColor2 dark:hover:text-black transition-all duration-300"
                      >
                        <BsFacebook />
                      </a>

                      <a
                        href="#"
                        className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex items-center justify-center text-isoColor1 dark:text-isoColor2 hover:bg-isoColor1 hover:text-white dark:hover:bg-isoColor2 dark:hover:text-black transition-all duration-300"
                      >
                        <BsInstagram />
                      </a>

                      <a
                        href="#"
                        className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex items-center justify-center text-isoColor1 dark:text-isoColor2 hover:bg-isoColor1 hover:text-white dark:hover:bg-isoColor2 dark:hover:text-black transition-all duration-300"
                      >
                        <BsTwitterX />
                      </a>

                      <a
                        href="#"
                        className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex items-center justify-center text-isoColor1 dark:text-isoColor2 hover:bg-isoColor1 hover:text-white dark:hover:bg-isoColor2 dark:hover:text-black transition-all duration-300"
                      >
                        <BsTelegram />
                      </a>

                      <a
                        href="#"
                        className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex items-center justify-center text-isoColor1 dark:text-isoColor2 hover:bg-isoColor1 hover:text-white dark:hover:bg-isoColor2 dark:hover:text-black transition-all duration-300"
                      >
                        <BsYoutube />
                      </a>

                    </div>

                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                    <span className="font-semibold text-black dark:text-white">
                      Email Us:
                    </span>
                    <span>
                      info@Astiox-network.com
                    </span>
                  </div>

                  <a
                    href="/support"
                    className="w-fit flex items-center dark:bg-isoColor2 dark:text-black font-semibold text-white space-x-3 py-3.5 px-6 rounded-full bg-isoColor1 shadow-lg shadow-isoColor1/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Speak with Us</span>
                    <CgArrowLongRight className="text-2xl" />
                  </a>

                </div>

              </div>

              <div className="relative w-full md:w-[48%] flex justify-center md:justify-end">

                <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-isoColor2/10 blur-3xl"></div>

                <Image
                  src="/img/hero_mobile_app.avif"
                  alt="hero_mobile_app"
                  className="relative w-full max-w-[620px] md:max-w-[720px] lg:max-w-[780px] h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_30px_70px_rgba(0,0,0,0.45)] hover:-translate-y-2 transition-transform duration-700"
                  width={500}
                  height={0}
                />

              </div>

            </div>

          </section>

        </header>

      ) : (

        /* =========================================================
           DEFAULT / FINAL HERO
        ========================================================= */

        <header className="relative overflow-hidden w-full min-h-screen px-4 py-3 md:px-8 bg-gradient-to-br from-isoColor1/[0.04] via-white to-isoColor2/[0.08] dark:from-isoDark dark:via-isoDark dark:to-isoColor2/[0.05]">

          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-isoColor1/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-isoColor2/10 blur-3xl pointer-events-none" />

          {/* Navbar */}
          <div className="w-full bg-white/90 left-0 z-50 dark:bg-isoDark/90 fixed top-0 right-0 flex flex-col backdrop-blur-xl border-b border-black/5 dark:border-white/5">

            <nav className="flex p-3 items-center md:py-4 justify-between w-full">

              <div className="flex items-center space-x-1">
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
                <div>
                 <span
                    className="
                      text-[18px]
                      font-extrabold
                      tracking-tight
                      text-black
                      dark:text-white
                    "
                  >
                    Astiox
                  </span>
                  <span
                    className="
                      text-xs
                      spacing-wide
                      font-light
                      dark:text-white
                    "
                  >
                    Network
                  </span>
                </div>
              </div>

              <div className="hidden items-center md:flex space-x-8">

                <div className="items-center space-x-8 flex">
                  <a href="buy-crypto">Buy Crypto</a>
                  <a href="market">Market</a>
                  <a href="#">Trade</a>
                  <a href="#">Wallet</a>
                  <a href="about">About</a>
                  <a href="support">Contact Us</a>
                </div>

                <ThemeToggle />

                <a
                  href="/signup"
                  className="w-fit flex font-medium dark:bg-isoColor2 dark:text-black items-center text-white space-x-2 flex-nowrap py-3.5 px-6 rounded-full bg-isoColor1 md:px-8 md:py-3 shadow-lg shadow-isoColor1/20"
                >
                  <span>Create Account</span>
                </a>

              </div>

              <div
                className="flex md:hidden"
                onClick={toggleMenu}
              >
                <IoIosMenu className="h-12 text-isoColor1 dark:text-isoColor2 w-12" />
              </div>

            </nav>

            <CryptoTicker />

          </div>

          <div className="py-16 md:py-10"></div>

          {/* Mobile Menu */}
          <div
            className={`space-y-12 z-50 w-full dark:bg-isoDark will-change-transform overflow-scroll h-full transform duration-500 transition-all ease-out flex flex-col px-6 py-1 text-black bg-[#f4f4f7] ${
              isMenuOpen
                ? "block fixed translate-y-0 top-0 bottom-0 right-0 left-0"
                : "-translate-y-full hidden"
            }`}
          >

            <nav className="w-full h-20 flex items-center justify-between">

              <div>
                <a href="/">
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Astiox_logo"
                    className="w-10 block dark:hidden"
                    width={150}
                    height={0}
                  />
                </a>

                <a href="/">
                  <Image
                    src="/icons/mainLogo2.png"
                    alt="Astiox_logo"
                    className="w-10 hidden dark:block"
                    width={150}
                    height={0}
                  />
                </a>
              </div>

              <div
                className="flex text-isoColor1 dark:text-isoColor2 md:hidden"
                onClick={toggleMenu}
              >
                <IoCloseOutline className="h-14 w-14" />
              </div>

            </nav>

            <div className="w-full space-y-6">
              <div className="space-y-3">

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="buy-crypto" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>Buy Crypto</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/mining" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>BTC Mining</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/wallets" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>Wallet</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="/dashboard/loans" className="w-full text-black dark:text-white flex space-x-4 items-center">
                    <span>Loans</span>
                    <span className="flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1">
                      New
                    </span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="support" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>Support</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

                <div className="w-full text-lg p-3 rounded-md bg-white dark:bg-isoDark2 font-bold flex items-center justify-between">
                  <a href="about" className="w-full text-black dark:text-white flex justify-between items-center">
                    <span>About</span>
                  </a>
                  <FaAngleRight className="text-lg dark:text-isoColor2" />
                </div>

              </div>
            </div>

            <div className="w-full flex flex-col items-center md:flex-row md:items-baseline md:gap-6 space-y-5">

              <ThemeToggle />

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="login"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full border dark:border-isoColor2 dark:text-isoColor2 border-black lg:flex items-center text-black"
                >
                  Log In
                </a>
              </div>

              <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                <a
                  href="signup"
                  className="rounded-full py-4 flex justify-center text-base text-center font-medium transition-all duration-500 dark:bg-isoColor2 dark:text-black w-full bg-isoColor1 lg:flex items-center text-white"
                >
                  Sign Up
                </a>
              </div>

            </div>

          </div>

          {/* Default Hero */}
          <section className="relative z-20 w-full max-w-7xl container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

            <div className="md:my-8 py-8 my-4 min-h-[calc(100vh-150px)] flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">

              <div className="w-full md:w-[52%] flex flex-col items-start md:mt-12 lg:mt-20 space-y-6 md:space-y-8">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-isoColor1/20 dark:border-isoColor2/20 bg-white/70 dark:bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-medium text-isoColor1 dark:text-isoColor2">
                  <span className="w-2 h-2 rounded-full bg-isoColor1 dark:bg-isoColor2 animate-pulse"></span>
                  Next-generation Web3 platform
                </div>

                <h1 className="flex flex-col text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.04em] text-black dark:text-white leading-[1.05]">
                  <span>Modern crypto assets.</span>
                  <span className="text-isoColor1 dark:text-isoColor2">
                    Reputable Web3 Earnings.
                  </span>
                </h1>

                <div className="space-y-4">

                  <p className="text-black/70 dark:text-white/70 text-base sm:text-lg lg:text-xl leading-8 max-w-2xl">
                    Unlock the profitable power of your cryptocurrency assets and explore the world of Web3 on Astiox Network.
                  </p>

                  <a
                    href="/signup"
                    className="w-fit flex md:hidden dark:bg-isoColor2 dark:text-black font-semibold items-center text-white space-x-2 flex-nowrap py-3.5 px-6 rounded-full bg-isoColor1 shadow-lg shadow-isoColor1/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Join Astiox Network</span>
                    <CgArrowLongRight className="text-xl" />
                  </a>

                  <div className="md:flex hidden items-center space-x-3">

                    <a
                      href="/signup"
                      className="w-fit flex items-center text-isoColor1 dark:text-isoColor2 border-isoColor1/30 dark:border-isoColor2/30 space-x-3 flex-nowrap py-3 px-5 rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <BsPhone className="text-2xl" />
                      <div className="flex flex-col space-y-0">
                        <span className="text-xs">Account</span>
                        <span>Signup</span>
                      </div>
                    </a>

                    <a
                      href="/login"
                      className="w-fit flex items-center text-isoColor1 dark:text-isoColor2 border-isoColor1/30 dark:border-isoColor2/30 space-x-3 flex-nowrap py-3 px-5 rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <IoTvOutline className="text-2xl" />
                      <div className="flex flex-col space-y-0">
                        <span className="text-xs">Account</span>
                        <span>Login</span>
                      </div>
                    </a>

                  </div>

                </div>

              </div>

              <div className="relative w-full md:w-[48%] flex justify-center md:justify-end">

                <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-isoColor1/10 blur-3xl"></div>

                <Image
                  src="/img/hero_mobile_app.avif"
                  alt="hero_mobile_app"
                  className="relative w-full max-w-[620px] md:max-w-[720px] lg:max-w-[780px] h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_30px_70px_rgba(0,0,0,0.45)] hover:-translate-y-2 transition-transform duration-700"
                  width={500}
                  height={0}
                />

              </div>

            </div>

          </section>

        </header>
      )}

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

    </div>
  );
}