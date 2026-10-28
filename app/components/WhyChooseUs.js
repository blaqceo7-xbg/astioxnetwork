import Image from 'next/image'
import React from 'react'

export const WhyChooseUs = () => {
  return (
    <div className='w-full container mx-auto px-5 md:px-40'>
        
        <div className='bg-isoColor1 flex flex-col-reverse gap-y-10 text-white items-center rounded-3xl px-5 py-7 md:gap-x-28 md:flex-row md:p-20'>


            <div className='w-full flex flex-col space-y-7 justify-start items-center md:justify-start md:items-start '>

                <h3 className='text-3xl font-semibold md:text-4xl'>Investing on Astiox</h3>

                <p className='md:text-lg'>We know that Investing in a reliable platform is better for everyone. {process.env.NEXT_PUBLIC_COMPANY_NAME} enables cryptocurrency investors to trade their assets and connect wallets natively within seconds, without having to worry about the low-level insecure investment.</p>

                <a href='signup' className='bg-white text-isoColor1 font-medium rounded-full py-4 px-8'>Check out our Platform Now</a>

            </div>

            <div>
                <a href="signup">
                    <Image
                    src="/img/raw.b373ab3f.svg"
                    alt="crypto_helmet"
                    className="w-72"
                    width={200}
                    height={0}
                    />
                </a>
            </div>

        </div>

    </div>
  )
}
