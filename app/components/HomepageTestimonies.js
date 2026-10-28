import React from 'react'
import Image from 'next/image'

export const HomepageTestimonies = () => {
  return (
    <div className='w-full relative px-5 container mx-auto md:px-40'>

      <div className='w-full space-y-10'>
                        <div className=' md:w-2/4 space-y-4'>
                          <h1 className='text-2xl font-semibold md:text-3xl'>Enjoy a Web3 investment powered by community</h1>
            
                          <p className='text-lg'>Join our vibrant and diverse community to learn about the power of self-custody, Web3 and crypto investment.</p>
                        </div>
            
                        <div className="w-full flex flex-col space-y-7">

                            <div className="flex w-full overflow-x-scroll space-y-5 md:justify-between items-baseline gap-x-6 md:overflow-x-auto">

                                  <div className='space-y-6 min-w-[150px] text-black rounded-3xl md:w-[300px]'>

                                    <div className='bg-no-repeat bg-client3 bg-cover h-[250px] rounded-3xl w-full md:h-[500px] bg-center'></div>
            
                                    <div className='w-full flex flex-col space-y-1 dark:text-white justify-start items-start'>
                                        
                                        <h5 className='text-base font-semibold'>Esmart</h5>

                                        <p className='text-sm'>Secure your private keys like your life depends on it. #DoNotShare 🔑</p>
                    
                                    </div>

                                  </div>

                                  <div className='space-y-6 min-w-[150px] text-black rounded-3xl md:w-[300px]'>

                                    <div className='bg-no-repeat bg-client2 bg-cover h-[250px] rounded-3xl w-full md:h-[500px] bg-center'></div>
            
                                    <div className='w-full flex flex-col dark:text-white space-y-1 justify-start items-start'>
                                        
                                        <h5 className='text-base font-semibold'>Asha Lee</h5>

                                        <p className='text-sm'>The easiest way to understand DeFi is to get your hands dirty. The Astiox Network platform helped me to use protocols with small amounts and learn what works and what doesn't work.</p>
                    
                                    </div>

                                  </div>

                                  <div className='space-y-6 min-w-[150px] text-black rounded-3xl md:w-[300px]'>

                                    <div className='bg-no-repeat bg-client4 bg-cover h-[250px] rounded-3xl w-full md:h-[500px] bg-center'></div>
            
                                    <div className='w-full flex flex-col dark:text-white space-y-1 justify-start items-start'>
                                        
                                        <h5 className='text-base font-semibold'>Isabella</h5>

                                        <p className='text-sm'>As a newcomer in this field, the introduction of blockchain technology has had a profound and transformative impact on my life. It has opened up an entirely new realm of possibilities that I am eager to explore.</p>
                    
                                    </div>

                                  </div>

                                  <div className='space-y-6 min-w-[150px] text-black rounded-3xl md:w-[300px]'>

                                    <div className='bg-no-repeat bg-client1 bg-cover h-[250px] rounded-3xl w-full md:h-[500px] bg-center'></div>
            
                                    <div className='w-full flex flex-col dark:text-white space-y-1 justify-start items-start'>
                                        
                                        <h5 className='text-base font-semibold'>XBGustavo</h5>

                                        <p className='text-sm'>I thoroughly enjoy engaging with DeFi and have developed a passion for minting NFTs. However, I always make it a point to conduct my own research and consistently check the Astiox Network Security Scanner prior to any acquisition. By following these Web3 security practices, I ensure my safety and stay #SAFU. 🛡️</p>
                    
                                    </div>

                                  </div>

                            </div>

                        </div>

                        <div className="flex justify-start w-full items-start">
                          <a href='signup' className='text-white w-fit bg-isoColor1 dark:bg-isoColor2 dark:text-black font-medium rounded-full py-3 flex items-center justify-center px-8'>Join our community on Astiox</a>
                        </div>

      </div>

    </div>
  )
}
