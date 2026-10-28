"use client"

import Image from 'next/image';
import React, { useState } from 'react'
import { CgArrowLongRight } from 'react-icons/cg';
import { FaAngleRight, FaCheckCircle } from 'react-icons/fa';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { IoMenu, IoCloseOutline } from 'react-icons/io5';
import { FooterCon } from '../components/Footer';
import { HomepageHero } from '../components/HomepageHero';

export default function Page() {

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

  return (
    <div className="bg-white dark:bg-isoDark w-full h-full text-black dark:text-white min-h-screen space-y-20 relative font-[family-name:var(--font-geist-sans)]">

      <HomepageHero page={`about`} />

      <main className='space-y-7'>

        <div className='w-full container space-y-10 mx-auto px-5 md:px-40'>
        
          <div className='bg-isoColor1 dark:bg-isoDark2 flex flex-col gap-y-10 text-white items-center justify-between rounded-3xl px-5 py-7 md:gap-x-28 md:flex-row md:p-20'>

              <div className='w-72 h-full flex flex-col '>
                <h1 className='text-xl font-semibold'>Our purpose</h1>
              </div>

              <div className='w-full flex flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>

                  <h3 className='text-3xl font-bold md:text-5xl'>Freedom Foundations</h3>

                  <p className='md:text-lg'>We want to give everyone the freedom to truly own, by building the foundations for the future of the free web.</p>

              </div>

              <div className='hidden md:block'>
                  <a href="/">
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

          <div className='bg-black flex flex-col gap-y-10 text-white items-center justify-between rounded-3xl px-5 py-7 md:gap-x-28 md:flex-row md:p-20'>

              <div className='w-72 h-full flex flex-col '>
                <h1 className='text-xl font-semibold space-y-5'>Our vision</h1>
                <a href="/">
                      <Image
                      src="/img/raw.e7c57d68.svg"
                      alt="crypto_helmet"
                      className="md:w-72"
                      width={200}
                      height={0}
                      />
                  </a>
              </div>

              <div className='w-full flex flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>

                  <h3 className='text-3xl font-bold md:text-5xl'>To give people the power to invest their assets</h3>

                  <p className='md:text-lg'>confidently participate in the future economy, and access opportunities that enhance their lives.</p>

              </div>

              <div className='hidden md:block'>
                  
              </div>

          </div>

          <div className='bg-isoColor2 flex flex-col gap-y-10 text-black items-center justify-between rounded-3xl px-5 py-7 md:gap-x-28 md:flex-row md:p-20'>

              <div className='w-72 h-full flex flex-col '>
                <h1 className='text-xl font-semibold space-y-5'>Our mission</h1>
                <a href="/">
                      <Image
                      src="/img/raw.b4926dd2.svg"
                      alt="crypto_helmet"
                      className="md:w-72"
                      width={200}
                      height={0}
                      />
                  </a>
              </div>

              <div className='w-full flex flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>

                  <h3 className='text-3xl font-bold md:text-5xl'>To become a personal companion</h3>

                  <p className='md:text-lg'>supporting users as they navigate Web3, the on-chain economy, and the emerging AI landscape.</p>

              </div>

              <div className='hidden md:block'>
                  
              </div>

          </div>

        </div>


        <div className='w-full hidden md:block container space-y-10 mx-auto px-5 md:px-40'>
          <div className='bg-[#f4f4f7] dark:bg-isoDark2 md:p-20'>
            <div className='flex flex-col gap-y-10 items-center justify-between rounded-3xl px-5 py-7 md:gap-x-28 md:flex-row md:px-20 md:py-10'>

                <div className='w-[500px] flex flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>

                    <h3 className='text-3xl text-isoColor1 dark:text-isoColor2 font-semibold md:text-3xl'>Founded 2019</h3>

                    <p className='md:text-lg'>Our journey started with a clear goal: to simplify and democratize crypto, making it accessible to everyone.</p>

                </div>

                <div className='hidden md:block'>
                    <a href="/">
                        <Image
                        src="/img/raw.16e2b8fb.svg"
                        alt="crypto_helmet"
                        className="md:w-52"
                        width={200}
                        height={0}
                        />
                    </a>
                </div>

            </div>

            <div className='flex flex-col gap-y-10 items-center justify-between rounded-3xl px-5 py-7 md:gap-x-28 md:flex-row-reverse md:px-20 md:py-10'>

                <div className='w-[500px] flex flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>

                    <h3 className='text-3xl text-isoColor1 dark:text-isoColor2 font-semibold md:text-3xl'>Trusted by 200M people</h3>

                    <p className='md:text-lg'>We’ve built the trust of millions by making Crypto safer, easier, and more seamless to access.</p>

                </div>

                <div className='hidden md:block'>
                    <a href="/">
                        <Image
                        src="/img/raw.0f6f6e6d.svg"
                        alt="crypto_helmet"
                        className="md:w-52"
                        width={200}
                        height={0}
                        />
                    </a>
                </div>

            </div>

            <div className='flex flex-col gap-y-10 items-center justify-between rounded-3xl px-5 py-7 md:gap-x-28 md:flex-row md:px-20 md:py-10'>

                <div className='w-[500px] flex flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>

                    <h3 className='text-3xl text-isoColor1 dark:text-isoColor2 font-semibold md:text-3xl'>We’re not stopping there</h3>

                    <p className='md:text-lg'>We’re laying the foundation to bring more people than ever safely on-chain.</p>

                </div>

                <div className='hidden md:block'>
                    <a href="/">
                        <Image
                        src="/img/raw.e7c57d68.svg"
                        alt="crypto_helmet"
                        className="md:w-52"
                        width={200}
                        height={0}
                        />
                    </a>
                </div>

            </div>
          </div>
        </div>

        <section className="flex overflow-x-scroll px-5 items-baseline space-y-5 md:overflow-x-auto md:justify-between md:items-baseline md:hidden container mx-auto gap-x-5 md:gap-x-10 md:px-48">

                                <div className='bg-[#f4f4f7] dark:bg-isoDark2 min-w-[300px] w-[500px] border border-neutral-200 dark:border-neutral-600 items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-1 flex-col space-y-7 justify-start items-center'>

                                        <Image
                                            src="/img/raw.16e2b8fb.svg"
                                            alt="padlock"
                                            className="md:w-72"
                                            width={150}
                                            height={0}
                                            />
                    
                                        <h3 className='text-2xl font-semibold text-isoColor1 dark:text-isoColor2 text-start md:text-2xl'>Founded 2019</h3>

                                        <p className='md:text-sm'>Our journey started with a clear goal: to simplify and democratize crypto, making it accessible to everyone.</p>
                    
                    
                                    </div>

                                </div>

                                <div className='bg-[#f4f4f7] dark:bg-isoDark2 min-w-[300px] w-[500px] border border-neutral-200 dark:border-neutral-600 items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-1 flex-col space-y-7 justify-start items-center'>

                                        <Image
                                            src="/img/raw.0f6f6e6d.svg"
                                            alt="padlock"
                                            className="w-72"
                                            width={400}
                                            height={0}
                                            />
                    
                                        <h3 className='text-2xl font-semibold text-isoColor1 dark:text-isoColor2 text-start md:text-2xl'>Trusted by 200M people</h3>

                                        <p className='md:text-sm'>We’ve built the trust of millions by making Crypto safer, easier, and more seamless to access.</p>
                    
                    
                                    </div>

                                </div>

                                <div className='bg-[#f4f4f7] dark:bg-isoDark2 min-w-[300px] w-[500px] border border-neutral-200 dark:border-neutral-600 items-center rounded-3xl p-5 md:p-7'>
            
                                    <div className='w-full flex p-1 flex-col space-y-7 justify-start items-center'>

                                        <Image
                                            src="/img/raw.e7c57d68.svg"
                                            alt="padlock"
                                            className="md:w-72"
                                            width={150}
                                            height={0}
                                            />
                    
                                        <h3 className='text-2xl font-semibold text-start md:text-2xl text-isoColor1 dark:text-isoColor2'>We’re not stopping there</h3>

                                        <p className='md:text-sm'>We’re laying the foundation to bring more people than ever safely on-chain.</p>

                                    </div>

                                </div>

        </section>

        <div className='w-full relative container mx-auto md:px-40'>

          <div className='space-y-10 px-5 md:px-0 md:py-5'>
                            <h1 className='text-4xl font-semibold md:text-4xl'>Ownership and accountability</h1>
                
                            <div className="flex flex-col space-y-7">

                                <div className="flex flex-col space-y-5 md:flex-row md:justify-strat md:items-baseline md:flex-wrap md:gap-x-5">

                                    <div className='bg-isoColor1 dark:bg-isoColor2 w-full text-white dark:text-black rounded-3xl md:h-[230px] md:w-[380px]'>
                
                                        <div className='w-full flex p-10 flex-col space-y-10 justify-start items-start'>
                        
                                            <h3 className='text-3xl font-bold text-start md:text-3xl'>User Obsessed</h3>

                                            <p className='text-md'>We’re obsessed with users’ problems and constantly seek better solutions.</p>
                        
                                        </div>

                                    </div>

                                    <div className='bg-isoColor1 dark:bg-isoColor2 w-full text-white dark:text-black rounded-3xl md:h-[230px] md:w-[380px]'>
                
                                        <div className='w-full flex p-10 flex-col space-y-10 justify-start items-start'>
                        
                                            <h3 className='text-3xl font-bold text-start md:text-3xl'>Ownership and accountability</h3>

                                            <p className='text-md'>We pursue outcomes with determination, passion, and grit.</p>
                        
                                        </div>

                                    </div>

                                    <div className='bg-isoColor1 dark:bg-isoColor2 w-full text-white dark:text-black rounded-3xl md:h-[230px] md:w-[380px]'>
                
                                        <div className='w-full flex p-10 flex-col space-y-10 justify-start items-start'>
                        
                                            <h3 className='text-3xl font-bold text-start md:text-3xl'>Open & Collaborative</h3>

                                            <p className='text-md'>Become the most trusted hub for Crypto experiences.</p>
                        
                                        </div>

                                    </div>

                                    <div className='bg-isoColor1 dark:bg-isoColor2 w-full text-white dark:text-black rounded-3xl md:h-[230px] md:w-[380px]'>
                
                                        <div className='w-full flex p-10 flex-col space-y-10 justify-start items-start'>
                        
                                            <h3 className='text-3xl font-bold text-start md:text-3xl'>Humble and growth mindset</h3>

                                            <p className='text-md'>We’re curious, open-minded, humble, and adaptable. We don’t expect or promise perfection.</p>
                        
                                        </div>

                                    </div>

                                    <div className='bg-isoColor1 dark:bg-isoColor2 w-full text-white dark:text-black rounded-3xl md:h-[230px] md:w-[380px]'>
                
                                        <div className='w-full flex p-10 flex-col space-y-10 justify-start items-start'>
                        
                                            <h3 className='text-3xl font-bold text-start md:text-3xl'>Integrity</h3>

                                            <p className='text-md'>Do no evil, act in good conscience, and inspire trust by holding high standards in everything that we do.</p>
                        
                                        </div>

                                    </div>

                                    <div className='bg-isoColor1 dark:bg-isoColor2 w-full text-white dark:text-black rounded-3xl md:h-[230px] md:w-[380px]'>
                
                                        <div className='w-full flex p-10 flex-col space-y-10 justify-start items-start'>
                        
                                            <h3 className='text-3xl font-bold text-start md:text-3xl'>Execution-oriented</h3>

                                            <p className='text-md'>We bias towards action, never expect perfection, done is better than perfect.</p>
                        
                                        </div>

                                    </div>

                                </div>

                            </div>

          </div>

        </div>


        <section className='w-full container px-5 mx-auto md:px-48'>
            <div className="py-2 my-6 flex flex-col md:flex-row items-center justify-between gap-x-12">
              <div className="w-full flex flex-col items-start  space-y-4 md:space-y-8">

                <h1 className="flex flex-col space-y-1 text-3xl font-bold mb-4 md:w-3/4 md:text-5xl leading-snug">
                  <span>We're a passionate team of Crypto investors & traders</span>
                </h1>

                <p className="text-base mb-8">
                  Our team is as unique and decentralized as the products we build. We span across 19 different time zones, and all walks of life.
                </p>

                <div className="w-full flex items-center space-x-6 md:items-baseline md:space-x-8">
                  <a href='/signup' className='w-fit flex text-base bg-isoColor1 dark:text-black dark:bg-isoColor2 items-center space-x-2 flex-nowrap px-4 py-4 rounded-full text-white md:px-8 md:py-3'>
                    <span>Signup Now</span>
                  </a>
                </div>
              </div>

              <div>
                <Image
                    src="/img/hero_mobile_app.avif"
                    alt="hero_mobile_app"
                    className="md:w-[950px]"
                    width={500}
                    height={0}
                />
              </div>
            </div>
        </section>

      </main>

      <FooterCon />

    </div>
  )
}
