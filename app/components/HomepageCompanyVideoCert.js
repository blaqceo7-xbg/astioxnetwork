"use client"

import React from 'react'

export const HomepageCompanyVideoCert = () => {
  const [isCertTab, setCertTab] = React.useState(false);
  const [isVidTab, setVidTab] = React.useState(true);

  const handleVidTabClick = () => {
    setVidTab(true);
    setCertTab(false);
  };

  const handleCertTabClick = () => {
    setCertTab(true);
    setVidTab(false);
  };

  
  return (
    <div className='w-full flex justify-between space-x-5 items-center relative px-5 container mx-auto md:px-40'>

      <div className='w-full space-y-5 p-5 md:h-96 flex flex-col justify-center items-center md:px-10 rounded-3xl bg-[#f4f4f7] dark:bg-isoDark2 dark:text-white md:w-1/2'>
                        <div className='space-y-4'>
                          <h1 className='text-2xl font-semibold md:text-3xl'>Your one-stop, Crypto platform</h1>
            
                          <p className='text-sm'>Buy, sell, and swap crypto, earn rewards, manage wallets, and discover trades, all in one place.</p>
                        </div>
            
                        <div className="w-full flex flex-col md:hidden">

                          <section className={`relative ${isVidTab ? "block" : "hidden"} h-[250px] rounded-3xl w-full overflow-hidden`}>
      
                            {/* Background Video */}
                            <video
                              autoPlay
                              loop
                              controls
                              playsInline
                              preload="none"
                              className="absolute inset-0 h-full w-full object-cover"
                              aria-hidden="true"
                            >
                              <source src="https://jervd7yzld.ufs.sh/f/tLWByCb5iMVaE5b4ODchDVBJHa2wuynk9M83dAZEYKqf10GO" type="video/mp4" />
                            </video>

                          </section>

                          <div className={`bg-no-repeat ${isCertTab ? "block" : "hidden"} bg-certificate bg-cover h-[250px] rounded-3xl w-full md:h-[500px] bg-center`}></div>

                        </div>

                        <div className="flex justify-start space-x-1 w-full items-start">
                          <div className='flex w-fit space-x-1 items-center border border-black dark:border-neutral-600 p-1 rounded-full'>
                            <div onClick={handleVidTabClick} className={`w-fit cursor-pointer font-medium rounded-full py-3 flex items-center justify-center px-8 ${isVidTab ? 'bg-isoColor1 dark:bg-isoColor2 dark:text-black text-white' : "bg-transparent dark:text-white text-black"}`}>Video</div>
                            <div onClick={handleCertTabClick} className={`w-fit cursor-pointer font-medium rounded-full py-3 flex items-center justify-center px-8 ${isCertTab ? 'bg-isoColor1 dark:bg-isoColor2 dark:text-black text-white' : "bg-transparent dark:text-white text-black"}`}>Certificate</div>
                          </div>
                        </div>

                        <div className="flex justify-start w-full items-start">
                          <a href='signup' className='text-white dark:bg-isoColor2 dark:text-black bg-isoColor1 w-fit font-medium rounded-full py-3 flex items-center justify-center px-8'>Signup Now for Free</a>
                        </div>

      </div>
      

      <div className="w-1/2 md:h-96 hidden md:flex">

                          <section className={`relative ${isVidTab ? "block" : "hidden"} h-full rounded-3xl w-full overflow-hidden`}>
      
                            {/* Background Video */}
                            <video
                              autoPlay
                              loop
                              playsInline
                              controls
                              preload="none"
                              className="absolute inset-0 h-96 w-full object-cover"
                              aria-hidden="true"
                            >
                              <source src="https://jervd7yzld.ufs.sh/f/tLWByCb5iMVaE5b4ODchDVBJHa2wuynk9M83dAZEYKqf10GO" type="video/mp4" />
                            </video>
 
                          </section>

                          <div className={`bg-no-repeat ${isCertTab ? "block" : "hidden"} bg-certificate bg-cover h-full rounded-3xl w-full bg-center`}></div>

      </div>

    </div>
  )
}
