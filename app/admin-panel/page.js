"use client"

import Image from 'next/image';
import React, { useState } from 'react'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DesktopSideBar } from './components/DesktopSideBar';
import LoadingScreen from './loading';
import {
  FaUsers,
  FaArrowDown,
  FaArrowUp,
  FaWallet,
  FaMoneyBillTrendUp,
  FaCircleCheck,
  FaChartLine,
  FaHandHoldingDollar,
} from "react-icons/fa6";

export default function Page() {


  const stats = [
    {
      title: "Total Users",
      amount: "12,450",
      icon: <FaUsers />,
      bg: "bg-blue-100",
      color: "text-blue-600",
      growth: "+12.5%",
    },
    {
      title: "Total Deposits",
      amount: "$245,000",
      icon: <FaArrowDown />,
      bg: "bg-green-100",
      color: "text-green-600",
      growth: "+18.2%",
    },
    {
      title: "Total Withdrawals",
      amount: "$120,500",
      icon: <FaArrowUp />,
      bg: "bg-red-100",
      color: "text-red-600",
      growth: "-4.3%",
    },
    {
      title: "Wallet Balance",
      amount: "$560,000",
      icon: <FaWallet />,
      bg: "bg-purple-100",
      color: "text-purple-600",
      growth: "+9.8%",
    },

    // NEW CARDS
    {
      title: "Number of Deposits",
      amount: "3,245",
      icon: <FaMoneyBillTrendUp />,
      bg: "bg-emerald-100",
      color: "text-emerald-600",
      growth: "+15.1%",
    },
    {
      title: "Number of Withdrawals",
      amount: "1,876",
      icon: <FaHandHoldingDollar />,
      bg: "bg-orange-100",
      color: "text-orange-600",
      growth: "+6.4%",
    },
    {
      title: "Confirmed Deposits",
      amount: "$210,300",
      icon: <FaCircleCheck />,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
      growth: "+21.7%",
    },
    {
      title: "Confirmed Withdrawals",
      amount: "$98,420",
      icon: <FaCircleCheck />,
      bg: "bg-pink-100",
      color: "text-pink-600",
      growth: "+11.2%",
    },
    {
      title: "Interest Earned",
      amount: "$45,870",
      icon: <FaChartLine />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
      growth: "+28.9%",
    },
  ];

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
    <div className="w-full bg-[#f4f4f7] dark:bg-isoDark dark:text-white h-full text-black min-h-screen relative font-[family-name:var(--font-geist-sans)]">
      {loading === true && (<LoadingScreen />)}

       <div className='w-full h-full min-h-screen flex items-start'>
     
          <DesktopSideBar tab={"assets"} />

          <div className='w-full relative space-y-5 text-black container mx-auto'>
            
            <Header tab={'assets'} />

            <div className="min-h-screen p-4 md:p-8">
              {/* STATS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
                {stats.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-isoDark2 dark:text-white rounded-3xl p-6 border dark:border-isoDark2 border-neutral-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-500">
                          {card.title}
                        </p>

                        <h2 className="text-3xl font-bold dark:text-white text-neutral-900 mt-3">
                          {card.amount}
                        </h2>

                        <span
                          className={`inline-block mt-4 text-sm font-semibold ${
                            card.growth.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {card.growth}
                        </span>
                      </div>

                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${card.bg} ${card.color}`}
                      >
                        {card.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM SECTION */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                {/* ANALYTICS */}
                <div className="xl:col-span-2 bg-white dark:bg-isoDark2 dark:text-white rounded-3xl p-6 shadow-sm border border-neutral-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold dark:text-white text-neutral-900">
                      Revenue Analytics
                    </h2>

                    <button className="bg-neutral-100 dark:bg-isoDark dark:text-isoColor2 hover:bg-neutral-200 px-4 py-2 rounded-xl text-sm transition-all">
                      This Month
                    </button>
                  </div>

                  <div className="mt-8 h-80 dark:bg-isoDark rounded-2xl border-2 border-dashed border-neutral-200 flex items-center justify-center">
                    <p className="text-neutral-400 text-lg">
                      Analytics Chart Here
                    </p>
                  </div>
                </div>

                {/* RECENT ACTIVITIES */}
                <div className="bg-white dark:bg-isoDark2 dark:text-white rounded-3xl p-6 shadow-sm border border-neutral-100">
                  <h2 className="text-xl font-bold dark:text-white text-neutral-900">
                    Recent Activities
                  </h2>

                  <div className="space-y-5 mt-6">
                    {[
                      "New deposit confirmed",
                      "Withdrawal processed",
                      "Interest credited",
                      "New user registered",
                      "Wallet funded",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between pb-4 border-b border-neutral-100"
                      >
                        <div>
                          <p className="font-medium dark:text-white text-neutral-800">
                            {item}
                          </p>

                          <span className="text-sm text-neutral-400">
                            2 mins ago
                          </span>
                        </div>

                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
    </div>
  )
}
