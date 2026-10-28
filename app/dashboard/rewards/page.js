"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { DesktopSideBar } from '@/app/dashboard/components/DesktopSideBar';
import LoadingScreen from './loading';
import { Footer } from '@/app/dashboard/components/Footer';
import { FaFacebook, FaHouse, FaTelegram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { BiCopy } from 'react-icons/bi';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import { PiHouse } from 'react-icons/pi';
import axios from 'axios';


export default function Page() {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState(null);
  const [loading, setLoading] = useState(false);
  const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
  useEffect(() => {
          async function fetchReferrals() {
            try {
              setLoading(true);
    
              const res = await axios.get(
                `/api/auth/users/reffaral/ref?refId=${user.username}`,
                {
                  withCredentials: true,
                  headers: { "Content-Type": "application/json" },
                }
              );
    
              if (res.status === 200) {
                setReferrals(res.data);
                setLoading(false);
              }
            } catch(err) {
              setLoading(false);
            }
          }
      
          fetchReferrals();
        }, []);

  const copyAddress = () => {
        // Get the text field
    let copyText = document.getElementById("url");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(user.referral_link);
      alert("Link copied ✅");
    };

  
  return (
    <div className="bg-white w-full h-full dark:bg-isoDark dark:text-white text-black min-h-screen space-y-5 relative font-[family-name:var(--font-geist-sans)]">
        {loading === true && (<LoadingScreen tab={"reward"} />)}
        

        <div className='w-full h-full min-h-screen md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"reward"} />

          <div className='w-full space-y-10 h-full relative flex flex-col md:justify-center md:items-center container mx-auto md:px-40'>
                
                {/* header */}
                <div className='flex items-center p-4 justify-center relative'>
                    <a
                                className='flex absolute dark:text-isoColor2 left-4'
                                href='/dashboard'
                    >
                                <PiHouse className='text-2xl' />
                    </a>

                    <h1 className='text-lg font-medium md:text-3xl md:font-semibold'>Rewards</h1>
                </div>

                <div className='flex px-6 items-center w-full'>

                    <div className='w-1/2 space-y-3'>
                        <p className='text-xs dark:text-neutral-500'>Total Referrals</p>
                        <h1 className='text-2xl font-bold'>{user.total_referral}</h1>
                    </div>

                    <div className='w-1/2 space-y-3'>
                        <p className='text-xs dark:text-neutral-500'>Total Commissions</p>
                        <h1 className='text-2xl font-bold'>${user.commissions}</h1>
                    </div>
                
                </div>

                <div className='space-y-4 px-6'>

                    <p className='dark:text-neutral-500'>Referral link</p>

                    <div className="flex w-full justify-between rounded-3xl dark:bg-isoDark2 bg-[#f4f4f7] relative items-center">
                                <div className="space-y-0 flex flex-col flex-wrap py-2">
                                    <input
                                    id="url"
                                    className="text-lg py-1 font-extrabold bg-transparent px-4 font-normal w-full flex flex-wrap hover:outline-none px-0 border-0 outline-none"
                                    type="text"
                                    value={user.referral_link}
                                    readOnly
                                    />
                                </div>

                                <div className="flex absolute right-0 pl-6">
                                    <span onClick={copyAddress} className="rounded-xl text-neutral-400 p-3">
                                        <BiCopy className='w-5 h-5' />
                                    </span>
                                </div>
                            </div>

                </div>

                <div className='space-y-4 px-6'>
                    <p className='dark:text-neutral-500'>Share to</p>

                    <div className="w-full space-y-3 flex flex-wrap justify-start items-baseline gap-x-8 gap-y-5">
                            
                            <a target='blank' href='https://telegram.org/' className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 text-black p-3 ">
                                    <FaTelegram className='w-5 h-5' />
                                </span>
                                <p className='text-xs dark:text-white'>Telegram</p>
                            </a>
                            <a href="https://wa.me/15304634558?text=Hello%20Astiox%20Network%2C%20I%20would%20like%20to%20speak%20with%20your%20support%20team."
  target="_blank" className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 text-black p-3 ">
                                    <FaWhatsapp className='w-5 h-5' />
                                </span>
                                <p className='text-xs dark:text-white'>Whatsapp</p>
                            </a>
                            <a target='blank' href='https://x.com/' className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 text-black p-3 ">
                                    <FaXTwitter className='w-5 h-5' />
                                </span>
                                <p className='text-xs dark:text-white'>X</p>
                            </a>
                            <a target='blank' href='https://facebook.com/' className="flex gap-1 flex-col justify-center items-center">
                                <span className="rounded-xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 text-black p-3 ">
                                    <FaFacebook className='w-5 h-5' />
                                </span>
                                <p className='text-xs dark:text-white'>Facebook</p>
                            </a>
                    </div>
                </div>

                <div className='space-y-3 px-6 pb-28'>

                    <p className='font-semibold text-xl dark:text-neutral-500'>My Referrals</p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full rounded-lg">
                            <thead className="">
                            <tr className='flex justify-start text-neutral-400 space-x-10 items-center'>
                                <th className="px-4 py-3 text-sm text-left font-semibold">
                                Name
                                </th>
                                <th className="px-4 py-3 text-sm text-left font-semibold">
                                Date
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                                {referrals != null && referrals.map((referral, index) => (
                                    <tr key={index} className="hover:bg-gray-100 odd:bg-gray-50 rounded-xl dark:bg-isoDark dark:odd:bg-isoDark2 dark:hover:bg-isoDark2 dark:text-white flex space-x-10 justify-start items-center">
                                        <td className='space-y-1 px-4 py-4 overflow-auto text-nowrap'>
                                            <h2 className=' font-semibold text-sm'>
                                                {referral.full_name}
                                            </h2>
                                        </td>

                                        <td className="px-4 py-4 flex overflow-auto text-nowrap items-center space-x-1">
                                            {formatter.format(new Date(referral.createdAt))}
                                        </td>
                                    </tr>
                                ))}
                                {referrals != null && referrals.length === 0 ? (
                                    <tr className='flex w-full justify-center items-center text-base text-neutral-400'><td>Your referrals will appear here.</td></tr>
                                ) : (
                                    <tr><td></td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                </div>

          </div>

        </div>

        <Footer tab={`rewards`} />
    </div>
  )
}
