import Image from 'next/image';
import React from 'react';

const LoadingScreen = ({tab}) => {
  return (
    <div className="w-full h-full fixed z-50 top-0 bottom-0 left-0 right-0">
      {
        tab === "loggedIn" ? (
        <div className="w-full h-screen flex px-6 flex-col space-y-4 justify-center bg-white text-black items-start">
          <p className='text-base'>Welcome to</p>
          <div
                  className="space-x-2 flex justify-center text-base text-center font-medium transition-all duration-500 w-full items-center"
                >
                  <Image
                    src="/icons/logoMain2.png"
                    alt="Metagram_logo"
                    className="w-10"
                    width={50}
                    height={0}
                    />

                    <div className='flex w-full items-center justify-start text-3xl space-x-2'>
                      <h1 className='font-extrabold text-isoColor1'>METAGRAM</h1>
                      <span className='text-black font-light'>Assets</span>
                    </div>
          </div>
        </div>
      ) : tab === "signIn" ? (
        <div className="w-full h-full flex justify-center bg-black/70 items-center loading-modal">
          <div className="rounded-2xl flex flex-col items-center py-5 px-10 bg-white space-y-3">
            <div className="loader border-y-blue-950 border-t-isoColor1"></div>
            <span className="text-sm">Loading</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center bg-isoColor1 items-center loading-modal">
          <div className="rounded-2xl flex flex-col items-center py-5 px-10 bg-white shadow-xl space-y-3">
            <div className="loader border-y-blue-950 border-t-isoColor1"></div>
            <span className="text-sm text-black">Admin Panel</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
