import React from 'react'
import { IoStar } from "react-icons/io5";

export const HomepageAward = () => {
  return (
    <div className='w-full flex flex-wrap container gap-y-14 gap-x-5 text-2xl items-center mx-auto px-7 justify-center md:justify-between md:px-40'>
        
        <div className='font-semibold flex flex-col items-center justify-center'>
            <p>Trusted by</p>
            <p><span className='text-isoColor1 dark:text-isoColor2'>200K</span> people</p>
        </div>

        <div className='font-semibold flex flex-col items-center justify-center'>
            <p>Founded in</p>
            <p><span className='text-isoColor1 dark:text-isoColor2'>2019</span></p>
        </div>

        <div className='font-semibold flex flex-col  items-center justify-center'>
            <p>Independently</p>
            <p><span className='text-isoColor1 dark:text-isoColor2'>Audited</span></p>
        </div>

        <div className='font-semibold flex flex-col items-center justify-center'>
            <p>ISO</p>
            <p><span className='text-isoColor1 dark:text-isoColor2'>Certified</span></p>
        </div>

        <div className='font-semibold flex flex-col items-center justify-center'>
            <p>Top reviews</p>
            <p className='flex items-center space-x-1'>
                <span className='text-isoColor1 dark:text-isoColor2'><IoStar /></span>
                <span className='text-isoColor1 dark:text-isoColor2'><IoStar /></span>
                <span className='text-isoColor1 dark:text-isoColor2'><IoStar /></span>
                <span className='text-isoColor1 dark:text-isoColor2'><IoStar /></span>
                <span className='text-isoColor1 dark:text-isoColor2'><IoStar /></span>
            </p>
        </div>

    </div>
  )
}
