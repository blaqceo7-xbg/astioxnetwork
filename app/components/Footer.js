"use client"

import { Footer } from "flowbite-react";
import Image from "next/image";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitterX,
  BsTelegram,
  BsYoutube,
  BsReddit,
} from "react-icons/bs";

export const FooterCon = () => {
  return (
    <div className="container w-full md:pb-10 mx-auto md:px-40">
        <div className="w-full px-5 rounded-3xl text-black dark:text-white dark:bg-isoDark2 bg-[#f4f4f7]">
            <div>
                <div className="w-full px-6 py-12 ">
                    <div className="flex-col md:justify-start w-full space-y-3 justify-between sm:flex sm:justify-between md:flex">
                        <h1 className="font-semibold text-xl text-center">Stay Connected:</h1>
                        <div className="flex gap-3 flex-wrap justify-center items-center">
                            <span className="border rounded-md bg-black text-white p-2 border-black">
                                <a href="https://facebook.com"><BsFacebook size={15} /></a>
                            </span>
                            <span className="border rounded-md bg-black text-white p-2 border-black">
                                <a href="https://instagram.com"><BsInstagram size={15} /></a>
                            </span>
                            <span className="border rounded-md bg-black text-white p-2 border-black">
                                <a href="https://twitter.com"><BsTwitterX size={15} /></a>
                            </span>
                            <span className="border rounded-md bg-black text-white p-2 border-black">
                                <a href="https://github.com"><BsGithub size={15} /></a>
                            </span>
                            <span className="border rounded-md bg-black text-white p-2 border-black">
                                <a href="https://t.me"><BsTelegram size={15} /></a>
                            </span>
                            <span className="border rounded-md bg-black text-white p-2 border-black">
                                <a href="https://youtube.com"><BsYoutube size={15} /></a>
                            </span>
                            <span className="border rounded-md bg-black text-white p-2 border-black">
                                <a href="https://reddit.com"><BsReddit size={15} /></a>
                            </span>
                            
                        </div>


                       <div className="flex pt-10 w-full justify-center flex-wrap items-center">
                            <div className="gap-8 text-center grid-cols-3">
                                <h2 className="mb-4 text-base font-bold uppercase">App</h2>
                                <ul className="space-y-2 text-base">
                                    <li>
                                        <a href="buy-crypto" className="hover:underline">Buy Crypto</a>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <a href="/dashboard/wallets" className="hover:underline">Wallet</a>
                                        <span className='flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1'>New</span>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <a href="/dashboard/mining" className="hover:underline">BTC Mining</a>
                                        <span className='flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1'>New</span>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <a href="/dashboard/loans" className="hover:underline">Loans</a>
                                        <span className='flex bg-blue-100 dark:bg-isoDark dark:text-isoColor2 rounded-full text-xs px-2 py-0.5 text-isoColor1'>New</span>
                                    </li>
                                    <li>
                                        <a href="/dashboard/nft" className="hover:underline">Buy NFTs</a>
                                    </li>
                                    <li>
                                        <a href="about" className="hover:underline">About</a>
                                    </li>
                                    <li>
                                        <a href="support" className="hover:underline">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full pb-10 flex items-center justify-center">
                        <span className="text-sm text-center text-gray-500">
                            © {new Date().getFullYear()}{" "}
                            <a href="/" className="hover:underline">
                            Astiox Network Inc™
                            </a>. All Rights Reserved.
                        </span>
                </div>
            </div>
        </div>
    </div>
  );
};
