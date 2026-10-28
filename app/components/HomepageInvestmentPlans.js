import Image from 'next/image'
import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    planName:  process.env.NEXT_PUBLIC_PLAN_A_NAME,
    planProfit: process.env.NEXT_PUBLIC_PLAN_A_DAILY_PROFIT,
    planMinimum: process.env.NEXT_PUBLIC_PLAN_A_MIN_AMOUNT,
    planMaximum: process.env.NEXT_PUBLIC_PLAN_A_MAX_AMOUNT,
    planDuration: process.env.NEXT_PUBLIC_PLAN_A_DURATION_HRS,
    planReferral: process.env.NEXT_PUBLIC_PLAN_A_REFERRAL_BONUS,
  },
  {
    planName:  process.env.NEXT_PUBLIC_PLAN_B_NAME,
    planProfit: process.env.NEXT_PUBLIC_PLAN_B_DAILY_PROFIT,
    planMinimum: process.env.NEXT_PUBLIC_PLAN_B_MIN_AMOUNT,
    planMaximum: process.env.NEXT_PUBLIC_PLAN_B_MAX_AMOUNT,
    planDuration: process.env.NEXT_PUBLIC_PLAN_B_DURATION_HRS,
    planReferral: process.env.NEXT_PUBLIC_PLAN_B_REFERRAL_BONUS,
  },
  {
    planName:  process.env.NEXT_PUBLIC_PLAN_C_NAME,
    planProfit: process.env.NEXT_PUBLIC_PLAN_C_DAILY_PROFIT,
    planMinimum: process.env.NEXT_PUBLIC_PLAN_C_MIN_AMOUNT,
    planMaximum: process.env.NEXT_PUBLIC_PLAN_C_MAX_AMOUNT,
    planDuration: process.env.NEXT_PUBLIC_PLAN_C_DURATION_HRS,
    planReferral: process.env.NEXT_PUBLIC_PLAN_C_REFERRAL_BONUS,
  },
  {
    planName:  process.env.NEXT_PUBLIC_PLAN_D_NAME,
    planProfit: process.env.NEXT_PUBLIC_PLAN_D_DAILY_PROFIT,
    planMinimum: process.env.NEXT_PUBLIC_PLAN_D_MIN_AMOUNT,
    planMaximum: process.env.NEXT_PUBLIC_PLAN_D_MAX_AMOUNT,
    planDuration: process.env.NEXT_PUBLIC_PLAN_D_DURATION_HRS,
    planReferral: process.env.NEXT_PUBLIC_PLAN_D_REFERRAL_BONUS,
  },
  {
    planName:  process.env.NEXT_PUBLIC_PLAN_E_NAME,
    planProfit: process.env.NEXT_PUBLIC_PLAN_E_DAILY_PROFIT,
    planMinimum: process.env.NEXT_PUBLIC_PLAN_E_MIN_AMOUNT,
    planMaximum: process.env.NEXT_PUBLIC_PLAN_E_MAX_AMOUNT,
    planDuration: process.env.NEXT_PUBLIC_PLAN_E_DURATION_HRS,
    planReferral: process.env.NEXT_PUBLIC_PLAN_E_REFERRAL_BONUS,
  },
  {
    planName:  process.env.NEXT_PUBLIC_PLAN_F_NAME,
    planProfit: process.env.NEXT_PUBLIC_PLAN_F_DAILY_PROFIT,
    planMinimum: process.env.NEXT_PUBLIC_PLAN_F_MIN_AMOUNT,
    planMaximum: process.env.NEXT_PUBLIC_PLAN_F_MAX_AMOUNT,
    planDuration: process.env.NEXT_PUBLIC_PLAN_F_DURATION_HRS,
    planReferral: process.env.NEXT_PUBLIC_PLAN_F_REFERRAL_BONUS,
  },
];

export const HomepageInvestmentPlans = () => {
  return (
    <div className='w-full relative container mx-auto md:px-40'>

      <div className='space-y-10 px-5 rounded-3xl py-20 bg-[#f4f4f7] dark:bg-isoDark dark:text-white md:p-20'>
                        <h1 className='text-4xl font-semibold text-center md:text-5xl'>Investment Packages</h1>
            
                        <p className='text-center text-lg'>Find the perfect plan for your journey into investment.</p>
            
                        <div className="flex flex-col space-y-7">

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-36">

                                {plans.map((plan, i) => (
                                  <div key={i} className='bg-white dark:bg-isoDark2 dark:text-white w-full text-black rounded-3xl md:w-[300px]'>
            
                                    <div className='w-full flex p-5 flex-col space-y-7 justify-start items-start'>

                                        <p className='text-base font-semibold'>{plan.planName}</p>
                    
                                        <h3 className='text-3xl font-bold text-start md:text-2xl'>${plan.planMinimum} - ${plan.planMaximum}</h3>

                                        <div className='flex flex-col space-y-3'>

                                          <div className='flex items-center space-x-2'>
                                            <FaCheckCircle className='text-isoColor1 dark:text-isoColor2'/>
                                            <span className='text-sm'>MINIMUM: ${plan.planMinimum}</span>
                                          </div>

                                          <div className='flex items-center space-x-2'>
                                            <FaCheckCircle className='text-isoColor1 dark:text-isoColor2'/>
                                            <span className='text-sm'>MAXIMUM: ${plan.planMaximum}</span>
                                          </div>

                                          <div className='flex items-center space-x-2'>
                                            <FaCheckCircle className='text-isoColor1 dark:text-isoColor2'/>
                                            <span className='text-sm'>PROFIT: {plan.planProfit}%</span>
                                          </div>

                                          <div className='flex items-center space-x-2'>
                                            <FaCheckCircle className='text-isoColor1 dark:text-isoColor2'/>
                                            <span className='text-sm'>DURATION: {plan.planDuration} Hrs</span>
                                          </div>

                                          <div className='flex items-center space-x-2'>
                                            <FaCheckCircle className='text-isoColor1 dark:text-isoColor2'/>
                                            <span className='text-sm'>REFERRAL: {plan.planReferral}%</span>
                                          </div>

                                        </div>
                    
                                        <div></div>
                                        <div></div>
                    
                                        <div className="flex justify-center w-full items-center">
                                          <a href="/dashboard/deposit" className='text-white dark:bg-isoColor2 dark:text-black w-full bg-isoColor1 font-medium rounded-full py-3 flex items-center justify-center px-8'>Choose Plan</a>
                                        </div>
                    
                                    </div>

                                  </div>
                                ))}

                            </div>

                        </div>

            </div>

    </div>
  )
}
