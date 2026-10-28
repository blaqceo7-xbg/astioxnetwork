"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import { CgArrowLongRight } from "react-icons/cg";
import { FaAngleRight } from 'react-icons/fa';
import { FooterCon } from '../components/Footer';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { HomepageHero } from '../components/HomepageHero';

export default function Page() {
  const [coins, setCoins] = useState([]);
  
    useEffect(() => {
      fetch("/api/coins")
        .then(res => res.json())
        .then(setCoins);
    }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

      const [isShown4, setIsShown4] = useState(true);
      const handleMainMenu4 = () => {
        setIsShown4(!isShown4);
      };

      const [isShown5, setIsShown5] = useState(true);
      const handleMainMenu5 = () => {
        setIsShown5(!isShown5);
      };

      const [isShown6, setIsShown6] = useState(true);
      const handleMainMenu6 = () => {
        setIsShown6(!isShown6);
      };



    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

  return (
    <div className="bg-white dark:bg-isoDark w-full h-full text-black dark:text-white min-h-screen space-y-20 relative font-[family-name:var(--font-geist-sans)]">

      <HomepageHero page={`buy-crypto`} />

      <main className='space-y-7'>

        <section className='w-full flex space-y-10 flex-col-reverse md:justify-between md:space-x-5 md:items-center relative px-5 container mx-auto md:flex-row md:px-48'>

          <div className="md:h-[530px] w-full h-96 overflow-hidden rounded-3xl md:w-[400px]">

                              <section className={`relative h-full rounded-3xl w-full`}>
          
                                {/* Background Video */}
                                <video
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="none"
                                  className="absolute inset-0 h-full w-full object-cover"
                                  aria-hidden="true"
                                >
                                  <source src="/vid/mobile-application.mp4" type="video/mp4" />
                                </video>

                              </section>

          </div>

          <div className='w-full space-y-7 px-4 py-10 flex flex-col justify-center dark:bg-isoDark2 dark:border dark:border-neutral-600 items-center md:px-8 md:w-[500px] rounded-3xl bg-[#f4f4f7]'>
                            <div className='space-y-4'>
                              <h1 className='text-lg text-center font-semibold md:text-lg md:px-10'>Compare and buy with trusted partners and payment methods</h1>
                            </div>

                            <div className='flex flex-wrap gap-5 justify-center items-center'>

                              <div className={`bg-no-repeat bg-white bg-applePay bg-cover h-20 rounded-xl w-20 bg-center md:w-28 md:h-28`}></div>
                              <div className={`bg-white h-20 flex items-center justify-center rounded-xl w-20 md:w-28 md:h-28`}>
                                <Image
                                src="/icons/ramp-pay.avif"
                                alt="Moon_logo"
                                className="md:w-20"
                                width={70}
                                height={0}
                                />
                              </div>
                              <div className={`bg-purple-700 h-20 flex items-center justify-center rounded-xl w-20 md:w-28 md:h-28`}>
                                <Image
                                src="/icons/moon-pay.avif"
                                alt="Moon_logo"
                                className="md:w-20"
                                width={70}
                                height={0}
                                />
                              </div>
                              <div className={`bg-white h-20 flex items-center justify-center rounded-xl w-20 md:w-28 md:h-28`}>
                                <Image
                                src="/icons/google-pay.avif"
                                alt="Moon_logo"
                                className="md:w-20"
                                width={70}
                                height={0}
                                />
                              </div>
                              <div className={`bg-no-repeat bg-white bg-sepaPay bg-cover h-20 rounded-xl w-20 bg-center md:w-28 md:h-28`}></div>
                              <div className={`bg-black h-20 flex items-center justify-center rounded-xl w-20 md:w-28 md:h-28`}>
                                <Image
                                src="/icons/simplex-pay.avif"
                                alt="Moon_logo"
                                className="md:w-20"
                                width={70}
                                height={0}
                                />
                              </div>
                              <div className={`bg-white h-20 flex items-center justify-center rounded-xl w-20 md:w-28 md:h-28`}>
                                <Image
                                src="/icons/mercuryo-pay.avif"
                                alt="Moon_logo"
                                className="md:w-20"
                                width={70}
                                height={0}
                                />
                              </div>

                            </div>

          </div>

        </section>

        <section className="flex overflow-x-scroll px-5 items-baseline space-y-5 md:overflow-x-auto md:justify-between md:items-baseline md:flex-nowrap container mx-auto gap-x-5 md:gap-x-10 md:px-48">

                                <div className='bg-[#f4f4f7] min-w-[300px] w-[500px] border border-neutral-200 text-black dark:bg-isoDark2 dark:text-white dark:border-neutral-600 items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-1 flex-col space-y-7 justify-start items-center'>
                    
                                        <h3 className='text-2xl font-semibold text-start md:text-2xl'>Global coverage</h3>

                                        <p className='md:text-sm'>Top up your wallet with a wide selection of payment methods including Apple Pay, Google Pay, debit and credit card, or bank transfer.</p>
                    
                                        <Image
                                            src="/img/raw.0f6f6e6d.svg"
                                            alt="padlock"
                                            className="md:w-72"
                                            width={200}
                                            height={0}
                                            />
                    
                    
                                    </div>

                                </div>

                                <div className='bg-[#f4f4f7] min-w-[300px] w-[500px] border border-neutral-200 text-black dark:bg-isoDark2 dark:text-white dark:border-neutral-600 items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-1 flex-col space-y-7 justify-start items-center'>
                    
                                        <h3 className='text-2xl font-semibold text-start md:text-2xl'>100+ local fiat currencies</h3>

                                        <p className='md:text-sm'>Convert USD, EUR, GBP and 100+ other fiat currencies seamlessly to crypto.</p>
                    
                                        <Image
                                            src="/img/raw.16e2b8fb.svg"
                                            alt="padlock"
                                            className="md:w-72"
                                            width={200}
                                            height={0}
                                            />
                    
                    
                                    </div>

                                </div>

                                <div className='bg-[#f4f4f7] min-w-[300px] w-[500px] border border-neutral-200 text-black dark:bg-isoDark2 dark:text-white dark:border-neutral-600 items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-1 flex-col space-y-7 justify-start items-center'>
                    
                                        <h3 className='text-2xl font-semibold text-start md:text-2xl'>Competitive rates</h3>

                                        <p className='md:text-sm'>Compare and secure the best rates from trusted payment providers across a wide range of cryptocurrencies.</p>
                    
                                        <Image
                                            src="/img/raw.7a06cf07.svg"
                                            alt="padlock"
                                            className="md:w-72"
                                            width={200}
                                            height={0}
                                            />
                    
                    
                                    </div>

                                </div>

        </section>

        <section className='w-full container mx-auto px-5 md:px-40'>
          <div className='relative z-20 text-start bg-[#f4f4f7] dark:bg-isoDark2 border border-neutral-200 dark:border-neutral-600 space-y-5 flex flex-col items-center justify-center items-center rounded-3xl px-5 py-7 md:p-20'>
          
                          <h3 className="text-4xl font-semibold">How to buy crypto</h3>
          
                          <div className="h-[500px] w-full overflow-scroll rounded-3xl">
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  {coins.map((coin) => (
                                      <a href='/dashboard/deposit'
                                      key={coin.id}
                                      
                                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/20 hover:backdrop-blur-lg hover:text-white"
                                      >
                                      <Image
                                          src={coin.image}
                                          alt={coin.name}
                                          width={32}
                                          height={32}
                                      />
                                      <span>{coin.symbol.toUpperCase()}</span>
                                      </a>
                                  ))}
                              </div>
          
                          </div>
          </div>
        </section>

        <div className='w-full container mx-auto px-5 md:px-40'>
        
          <div className='bg-isoColor1 flex flex-col-reverse gap-y-10 text-white items-center rounded-3xl px-5 py-7 md:gap-x-28 md:flex-row md:p-20'>


              <div className='w-full flex flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>

                  <h3 className='text-3xl font-semibold md:text-4xl'>Create your Astiox account today!</h3>

                  <p className='md:text-lg'>Astiox Network is a secure, self-custody crypto investment platform supporting 10M+ assets across 100+ blockchains including crypto. Buy, sell, swap, transfer and earn crypto all in one place. Available for iOS, Android, and desktop browsers.</p>

                  <a href='/signup' className='bg-white text-isoColor1 font-medium rounded-full py-4 px-8'>Check out our Platform Now</a>

              </div>

              <div>
                  <a href="#">
                      <Image
                      src="/img/raw.b373ab3f.svg"
                      alt="crypto_helmet"
                      className="md:w-72"
                      width={200}
                      height={0}
                      />
                  </a>
              </div>

          </div>

        </div>

        <section className="w-full py-16 ">
          <div className="container flex flex-col items-center px-5 mx-auto md:gap-8 space-y-8 md:space-y-0 md:flex-row md:px-48">

            <div className="w-full flex space-y-2 flex-col">
              <h1 className="text-3xl pb-5 font-semibold text-center md:text-4xl leading-snug">
                Frequently asked questions
              </h1>

              <div className="border-b border-gray-300 dark:border-neutral-600 py-4">
                <div
                  onClick={handleMainMenu}
                  className="w-full text-xl flex justify-between space-x-6 items-center"
                >
                  <span className="font-semibold text-lg">
                    What are the fees?
                  </span>
                  {isShown ? (
                    <FaAngleDown className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  ) : (
                    <FaAngleUp className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  )}
                </div>
                <div
                  className={`w-full text-sm duration-500 overflow-hidden ${
                    isShown ? "h-0 py-0" : "h-fit py-6"
                  }`}
                >
                  The fees are provided in real-time by our individual fiat onramp partners, such as MoonPay,Simplex, Ramp and others. We’ve integrated with multiple third-party payment providers to give you a range of convenient options, and you can expect favorable quotes. It’s important to note that each payment method may have a different fee structure, which can also be influenced by your region.
                </div>
              </div>

              <div className="border-b border-gray-300 dark:border-neutral-600 py-4">
                <div
                  onClick={handleMainMenu2}
                  className="w-full text-xl flex justify-between space-x-6 items-center"
                >
                  <span className="font-semibold text-lg">
                    What currencies do you support for buying crypto?
                  </span>
                  {isShown2 ? (
                    <FaAngleDown className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  ) : (
                    <FaAngleUp className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  )}
                </div>
                <div
                  className={`w-full text-sm duration-500 overflow-hidden ${
                    isShown2 ? "h-0 py-0" : "h-fit py-6"
                  }`}
                >
                  We globally support over 55 cryptocurrencies for deposit. This enables a broad range of users to purchase crypto in their native currency.
                </div>
              </div>

              <div className="border-b border-gray-300 dark:border-neutral-600 py-4">
                <div
                  onClick={handleMainMenu3}
                  className="w-full text-xl flex justify-between space-x-6 items-center"
                >
                  <span className="font-semibold text-lg">
                    Who are the fiat-to-crypto payment partners?
                  </span>
                  {isShown3 ? (
                    <FaAngleDown className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  ) : (
                    <FaAngleUp className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  )}
                </div>
                <div
                  className={`w-full text-sm duration-500 overflow-hidden ${
                    isShown3 ? "h-0 py-0" : "h-fit py-6"
                  }`}
                >
                  When buying crypto using Astiox Network, our trusted partners—including Binance, Bybit, Coinbase, Mercuryo, Ramp Network, and Transak—will handle all steps of the transactions. You can complete these transactions directly from Astiox Network with just a few clicks.
                </div>
              </div>

              <div className="border-b border-gray-300 dark:border-neutral-600 py-4">
                <div
                  onClick={handleMainMenu4}
                  className="w-full text-xl flex justify-between space-x-6 items-center"
                >
                  <span className="font-semibold text-lg">
                    Is there a minimum or maximum purchase amount?
                  </span>
                  {isShown4 ? (
                    <FaAngleDown className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  ) : (
                    <FaAngleUp className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  )}
                </div>
                <div
                  className={`w-full text-sm duration-500 overflow-hidden ${
                    isShown4 ? "h-0 py-0" : "h-fit py-6"
                  }`}
                >
                  The minimum and maximum purchase amounts depend on various factors including the preferred investment plan and the cryptocurrency you choose to buy. Generally speaking, you can buy crypto for as little as $100 USD equivalent or less.
                </div>
              </div>

              <div className="border-b border-gray-300 dark:border-neutral-600 py-4">
                <div
                  onClick={handleMainMenu5}
                  className="w-full text-xl flex justify-between space-x-6 items-center"
                >
                  <span className="font-semibold text-lg">
                    Which cryptocurrencies can I buy directly through the wallet?
                  </span>
                  {isShown5 ? (
                    <FaAngleDown className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  ) : (
                    <FaAngleUp className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  )}
                </div>
                <div
                  className={`w-full text-sm duration-500 overflow-hidden ${
                    isShown5 ? "h-0 py-0" : "h-fit py-6"
                  }`}
                >
                  Astiox Network offers you the freedom to purchase a wide variety of cryptocurrencies - over 60, in fact! This includes popular choices such as Bitcoin, Ethereum, BNB, Solana, Cosmos, and many more. Whether you’re looking for established coins or emerging tokens, we’ve got you covered.
                </div>
              </div>

              <div className="py-4">
                <div
                  onClick={handleMainMenu6}
                  className="w-full text-xl flex justify-between space-x-6 items-center"
                >
                  <span className="font-semibold text-lg">
                    Does Astiox Network support crypto withdrawals or crypto-to-fiat solutions?
                  </span>
                  {isShown6 ? (
                    <FaAngleDown className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  ) : (
                    <FaAngleUp className="h-6 w-6 md:h-5 md:w-5 dark:text-isoColor2 " />
                  )}
                </div>
                <div
                  className={`w-full text-sm duration-500 overflow-hidden ${
                    isShown6 ? "h-0 py-0" : "h-fit py-6"
                  }`}
                >
                  Yes, our network allow you to sell cryptocurrencies, ensuring a smooth and secure conversion experience directly within Astiox Network.
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <FooterCon />

    </div>
  )
}
