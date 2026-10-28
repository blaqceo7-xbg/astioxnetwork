"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { BsFacebook, BsInstagram, BsTwitterX, BsGithub, BsTelegram, BsYoutube, BsReddit } from 'react-icons/bs'
import { CgArrowLongRight } from 'react-icons/cg'
import { FaAngleRight } from 'react-icons/fa'
import { IoMenu, IoCloseOutline } from 'react-icons/io5'
import { FooterCon } from '../components/Footer'
import { HomepageHero } from '../components/HomepageHero'

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <div className="bg-white dark:bg-isoDark w-full h-full text-black dark:text-white min-h-screen space-y-20 relative font-[family-name:var(--font-geist-sans)]">
      <HomepageHero page={`support`} />

      <section className='w-full container px-5 mx-auto md:px-36'>
        <form className='md:w-1/2 space-y-5 flex flex-col w-full'>
                                                <input type='text' placeholder='Full name' className='py-2 bg-[#f4f4f7] text-black dark:bg-isoDark2 dark:text-white px-5 rounded-xl dark:border-neutral-600 border-[#f4f4f7] w-full' />
                                                <input type='email' placeholder='Email Address*' className='py-2 px-5 bg-[#f4f4f7] text-black dark:bg-isoDark2 dark:text-white rounded-xl dark:border-neutral-600 border-[#f4f4f7] w-full' />
                                                <input type='number' placeholder='Phone number (Optional)' className='py-2 px-5 bg-[#f4f4f7] text-black dark:bg-isoDark2 dark:text-white rounded-xl dark:border-neutral-600 border-[#f4f4f7] w-full' />
                                                <textarea placeholder='Message*' className='py-2 px-5 h-52 rounded-xl dark:border-neutral-600 border-[#f4f4f7] bg-[#f4f4f7] text-black dark:bg-isoDark2 dark:text-white w-full' />
                                                <div className="w-full flex items-center justify-center md:justify-start space-x-6 md:items-baseline md:space-x-8">
                                                          <button type='submit' className='w-full flex text-base text-white bg-isoColor1 dark:bg-isoColor2 dark:text-black justify-center items-center space-x-2 flex-nowrap px-4 py-4 rounded-full md:px-8 md:py-3'>
                                                            <span>Speak with Us</span>
                                                            <CgArrowLongRight className='w-7' />
                                                          </button>
                                                        </div>
                                </form>
      </section>

      <section className='w-full container px-5 mx-auto md:px-36'>
            <div className="md:my-8 py-2 my-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
              <div className="w-full flex flex-col items-start md:mt-24 space-y-4 md:space-y-8">

                <h1 className="flex flex-col space-y-1 text-center text-3xl font-bold mb-4 md:w-full md:text-5xl leading-snug">
                  <span className='text-center md:text-start'>Try Astiox for free on iOS and Android</span>
                </h1>

                <div className="w-full flex items-center space-x-6 md:items-baseline md:space-x-8">
                  <a
                    href="/signup"
                  >
                    <Image
                        src="/img/google_play.png"
                        alt="google"
                        className="md:w-[150px]"
                        width={200}
                        height={0}
                    />
                  </a>

                  <a
                    href="/signup"
                  >
                    <Image
                        src="/img/apple_store.png"
                        alt="google"
                        className="md:w-[150px]"
                        width={200}
                        height={0}
                    />
                  </a>
                </div>
              </div>

              <div>
                <Image
                    src="/img/raw.1761fe97.svg"
                    alt="hero_mobile_app"
                    className="md:w-[950px]"
                    width={500}
                    height={0}
                />
              </div>
            </div>
      </section>

      <FooterCon />
    </div>
  )
}
