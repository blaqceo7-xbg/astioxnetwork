"use client"

import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { UploadButton } from "@/utils/uploadthing";
import axios from 'axios';
import { CgArrowLeft } from 'react-icons/cg';
import { DesktopSideBar } from './../components/DesktopSideBar';
import { Header } from './../components/Header';
import LoadingScreen from './loading';
import { useAuth } from '@/app/context/AuthContext';
import { BiCopy } from "react-icons/bi";
import { GrSecure } from "react-icons/gr";
import { LuArrowDownToLine, LuUserCheck, LuWallet } from "react-icons/lu";
import { RxEyeOpen } from 'react-icons/rx';
import { FaAngleRight } from "react-icons/fa";
import { FaCircleUser, FaUser } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { PiUserCircleLight } from 'react-icons/pi';
import { GoHome } from 'react-icons/go';


export default function Page() {

  const router = useRouter();
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const [file, setFile] = useState(user.img);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const initialValueFullname = {
    fullname: user.full_name,
    }

    const initialWalletValue = {
        bitcoin_BTC: `${user.wallet_address.bitcoin_BTC}`,
        binance_BNB: `${user.wallet_address.binance_BNB}`,
        tron_TRX: `${user.wallet_address.tron_TRX}`,
        ethereum_ETH: `${user.wallet_address.ethereum_ETH}`,
        tether_USDT: `${user.wallet_address.tether_USDT}`,
    }

    const validationWalletSchema = Yup.object({
        bitcoin_BTC: Yup.string(),
        binance_BNB: Yup.string(),
        tron_TRX: Yup.string(),
        ethereum_ETH: Yup.string(),
        tether_USDT: Yup.string(),
    });

    const validationSchemaFullname = Yup.object({
        fullname: Yup.string().required(""),
    });

    async function saveFullname(values, onSubmitProps) {
        setLoading(true);
        
            try {
              
              const res = await axios.patch(
                  `/api/auth/users`,
                  {
                    full_name: values.fullname,
                  },
                  {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }  
                  }
                );
        
              if (res.status === 200) {
                    setIsError(false);
                  router.refresh();
                  setLoading(false);
              }
            } catch(err) {
              setErrorMessage(err.response.data.message);
              setIsError(true);
              setLoading(false);
            }
    }

    async function logout() {
        setLoading(true);
        
            try {
              
              const res = await axios.post(
                  `/api/auth/logout`,
                  {},
                  {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }  
                  }
                );
        
              if (res.status === 200) {
                    setIsError(false);
                  router.push("/");
              }
            } catch(err) {
              setErrorMessage(err.response.data.message);
              setIsError(true);
              setLoading(false);
            }
    }

    async function updateWalletAddress(values, onSubmitProps) {
        setLoading(true);
        
            try {
              
              const res = await axios.patch(
                  `/api/auth/users/wallet-update/upload?userId=${user._id}`,
                  {
                    binance_BNB: values.binance_BNB,
                    bitcoin_BTC: values.bitcoin_BTC,
                    tether_USDT: values.tether_USDT,
                    ethereum_ETH: values.ethereum_ETH,
                    tron_TRX: values.tron_TRX,
                  },
                  {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }  
                  }
                );
        
              if (res.status === 200) {
                    router.refresh();
                    setIsError(false);
                  setStep(1);
                  setLoading(false);
              }
            } catch(err) {
              setErrorMessage(err.response.data.message);
              setIsError(true);
              setLoading(false);
            }
    }


  return (
    <div className="bg-white w-full h-full text-black min-h-screen dark:bg-isoDark dark:text-white relative font-[family-name:var(--font-geist-sans)]">
     {loading === true && (<LoadingScreen />)}
     <div className='hidden md:block w-full'>
        <Header />
     </div>

       <div className='w-full h-full md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"settings"} />

          <div className='w-full h-full md:py-16 relative px-4 flex flex-col md:justify-center md:items-center md:px-40'>
                <div className='w-full flex flex-col space-y-8 md:space-y-16 '>

                <div className='flex items-center py-4 md:py-0 justify-center relative'>
                    {
                        step === 1 ? (
                            <a
                                className='flex absolute left-0 dark:text-isoColor2'
                                href='/dashboard'
                            >
                                <GoHome className='text-2xl' />
                            </a>
                        ) : (
                            <div
                                className='flex absolute left-0'
                                onClick={() => setStep(1)}
                            >
                                <CgArrowLeft className='text-2xl dark:text-isoColor2' />
                            </div>
                        )
                    }

                    <h1 className='text-lg font-medium md:text-3xl md:font-semibold'>

                    {step === 1 ? (
                        <span>Account Info</span>
                    ) : step === 2 ? (
                        <span></span>
                    ) : (
                        <span></span>
                    )}
                
                    </h1>
                </div>


                {step === 1 && (
                    <div className="w-full flex text-black space-y-6 relative flex-col">
                        
                        <div className="w-full overflow-hidden relative dark:border-neutral-600 flex-col space-y-6 p-4 rounded-2xl border border-neutral-200">
                        
                            <span className={`py-1 px-2 dark:bg-isoDark2 bg-[#f4f4f7] ${user.isVerified === true ? "text-green-600" : "text-yellow-600"} text-xs rounded-lg absolute top-0 right-0`}>
                            {
                                user.isVerified === true ? "Verified" : "Regular"
                            }
                            </span>

                            <div className="w-full space-y-5">
                                <div className='flex space-x-4 justify-between items-center w-full'>
                                    
                                    <div className="relative">
                                        {file === "avatar.jpg" ? (
                                            <FaCircleUser className="w-24 h-24 text-neutral-600" />
                                        ) : (
                                            <img
                                            src={file}
                                            alt=""
                                            name="img"
                                            className="w-32 h-24 bg-neutral-700 rounded-full"
                                            />
                                        )}

                                        <div onClick={() => setStep(2)} className="rounded-full absolute right-0 bottom-0 p-2 flex justify-center outline-none items-center bg-white dark:text-isoColor2 dark:bg-isoDark2">
                                            <BiEditAlt className="text-lg z-10000" />
                                        </div>
                                    </div>

                                    <div className='flex flex-col dark:text-white justify-start w-full'>
                                        <div className='flex flex-wrap space-y-2 justify-between w-full items-center'>
                                            <h1 className='text-xl font-semibold'>{user.full_name}</h1>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <p className="text-neutral-500">Astiox ID (UID)</p>
                                <p className="flex items-center space-x-2">
                                    <span className="dark:text-white">{user.username}</span>
                                    <span className="text-neutral-500">
                                        <BiCopy className='w-5 h-5' />
                                    </span>
                                </p>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <p className="text-neutral-500">Reg.Info</p>
                                <p className="flex items-center space-x-2">
                                    <span className="dark:text-white">{user.email}</span>
                                    <span className="text-neutral-500">
                                        <RxEyeOpen className='w-5 h-5' />
                                    </span>
                                </p>
                            </div>

                        </div>

                        <div className="w-full space-y-6">      
                            <div className='space-y-6 dark:text-white'>
                                <a href="/dashboard/kyc" className="w-full text-lg p-3 rounded-md font-medium flex items-center justify-between">
                                    <div
                                        className="w-full flex space-x-3 items-center"
                                    >
                                        <LuUserCheck className="text-2xl" />
                                        <span>Verification</span>
                                    </div>
                                    <FaAngleRight className="w-5 h-5 text-neutral-400 dark:text-isoColor2" />
                                </a> 

                                <div onClick={() => setStep(3)} className="w-full text-lg p-3 rounded-md font-medium flex items-center justify-between">
                                    <div
                                        className="w-full flex space-x-3 items-center"
                                    >
                                        <LuWallet className="text-2xl" />
                                        <span>Wallets</span>
                                    </div>
                                    <FaAngleRight className="w-5 h-5 text-neutral-400 dark:text-isoColor2" />
                                </div>

                                <a href="/dashboard/settings/security" className="w-full text-lg p-3 rounded-md font-medium flex items-center justify-between">
                                    <div
                                        className="w-full flex space-x-3 items-center"
                                    >
                                        <GrSecure className="text-2xl" />
                                        <span>Password</span>
                                    </div>
                                    <FaAngleRight className="w-5 h-5 text-neutral-400 dark:text-isoColor2" />
                                </a>
                            </div>
                        </div>

                        <div className='fixed md:sticky md:pt-32 bottom-4 left-4 right-4'>
                            <button
                                onClick={logout}
                                type="submit"
                                className="w-full py-4 font-semibold dark:text-isoColor2 dark:bg-isoDark2 rounded-2xl bg-[#f4f4f7] text-md hover:text-red-500 text-black"
                            >
                                Log Out
                            </button>
                        </div>

                    </div>
                )}

                {step === 3 && (
                    <div className='relative space-y-10'>
                        <h1 className="text-2xl font-semibold">Update Wallet Address</h1>
                                    <Formik
                                        initialValues={initialWalletValue}
                                        validationSchema={validationWalletSchema}
                                        onSubmit={updateWalletAddress}
                                    >
                                        {({ errors, touched, values }) => (
                                        <Form className="w-full flex md:px-8 pb-5 relative flex-col space-y-8">
                                            {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}
                                            
                                            <div>
                                            <label
                                                htmlFor="tether_USDT"
                                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                                            >Tether USDT</label>
                                            <div className='w-full flex relative justify-between items-center'>
                                                <Field name="tether_USDT">
                                                {(props) => {
                                                    const { field, form, meta } = props;
                                                    return (
                                                    <input
                                                        placeholder=""
                                                        className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white border-none text-black font-medium bg-[#f4f4f7] rounded-xl w-full p-3 text-lg focus:outline-none`}
                                                        type="text"
                                                        value={user.wallet_address.tether_USDT}
                                                        id="tether_USDT"
                                                        name="tether_USDT"
                                                        {...field}
                                                    />
                                                    );
                                                }}
                                                </Field>
                                            </div>
                    
                                            <ErrorMessage name="tether_USDT">
                                                {(errMsg) => (
                                                <span className="text-red-500 text-xs">{errMsg}</span>
                                                )}
                                            </ErrorMessage>
                                            </div>

                                            <div>
                                            <label
                                                htmlFor="bitcoin_BTC"
                                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                                            >Bitcoin BTC</label>
                                            <div className='w-full flex relative justify-between items-center'>
                                                <Field name="bitcoin_BTC">
                                                {(props) => {
                                                    const { field, form, meta } = props;
                                                    return (
                                                    <input
                                                        placeholder=""
                                                        className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white border-none text-black font-medium bg-[#f4f4f7] rounded-xl w-full p-3 text-lg focus:outline-none`}
                                                        type="text"
                                                        value={user.wallet_address.bitcoin_BTC}
                                                        id="bitcoin_BTC"
                                                        name="bitcoin_BTC"
                                                        {...field}
                                                    />
                                                    );
                                                }}
                                                </Field>
                                            </div>
                    
                                            <ErrorMessage name="bitcoin_BTC">
                                                {(errMsg) => (
                                                <span className="text-red-500 text-xs">{errMsg}</span>
                                                )}
                                            </ErrorMessage>
                                            </div>

                                            <div>
                                            <label
                                                htmlFor="binance_BNB"
                                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                                            >Binance BNB</label>
                                            <div className='w-full flex relative justify-between items-center'>
                                                <Field name="binance_BNB">
                                                {(props) => {
                                                    const { field, form, meta } = props;
                                                    return (
                                                    <input
                                                        placeholder=""
                                                        className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white border-none text-black font-medium bg-[#f4f4f7] rounded-xl w-full p-3 text-lg focus:outline-none`}
                                                        type="text"
                                                        value={user.wallet_address.binance_BNB}
                                                        id="binance_BNB"
                                                        name="binance_BNB"
                                                        {...field}
                                                    />
                                                    );
                                                }}
                                                </Field>
                                            </div>
                    
                                            <ErrorMessage name="binance_BNB">
                                                {(errMsg) => (
                                                <span className="text-red-500 text-xs">{errMsg}</span>
                                                )}
                                            </ErrorMessage>
                                            </div>

                                            <div>
                                            <label
                                                htmlFor="tron_TRX"
                                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                                            >Tron TRX</label>
                                            <div className='w-full flex relative justify-between items-center'>
                                                <Field name="tron_TRX">
                                                {(props) => {
                                                    const { field, form, meta } = props;
                                                    return (
                                                    <input
                                                        placeholder=""
                                                        className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white border-none text-black font-medium bg-[#f4f4f7] rounded-xl w-full p-3 text-lg focus:outline-none`}
                                                        type="text"
                                                        value={user.wallet_address.tron_TRX}
                                                        id="tron_TRX"
                                                        name="tron_TRX"
                                                        {...field}
                                                    />
                                                    );
                                                }}
                                                </Field>
                                            </div>
                    
                                            <ErrorMessage name="tron_TRX">
                                                {(errMsg) => (
                                                <span className="text-red-500 text-xs">{errMsg}</span>
                                                )}
                                            </ErrorMessage>
                                            </div>

                                            <div>
                                            <label
                                                htmlFor="ethereum_ETH"
                                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                                            >Ethereum ETH</label>
                                            <div className='w-full flex relative justify-between items-center'>
                                                <Field name="ethereum_ETH">
                                                {(props) => {
                                                    const { field, form, meta } = props;
                                                    return (
                                                    <input
                                                        placeholder=""
                                                        className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white border-none text-black font-medium bg-[#f4f4f7] rounded-xl w-full p-3 text-lg focus:outline-none`}
                                                        type="text"
                                                        value={user.wallet_address.ethereum_ETH}
                                                        id="ethereum_ETH"
                                                        name="ethereum_ETH"
                                                        {...field}
                                                    />
                                                    );
                                                }}
                                                </Field>
                                            </div>
                    
                                            <ErrorMessage name="ethereum_ETH">
                                                {(errMsg) => (
                                                <span className="text-red-500 text-xs">{errMsg}</span>
                                                )}
                                            </ErrorMessage>
                                            </div>
                    
                                            <button
                                            type="submit"
                                            className="w-full py-4 rounded-xl dark:bg-isoColor2 dark:text-black bg-isoColor1 text-lg hover:bg-isoColor2 hover:text-black text-white"
                                            disabled={Formik.isValid || Formik.isSubmitting}
                                            >
                                            {loading ? "Updating..." : "Update"}
                                            </button>
                                        </Form>
                                        )}
                                    </Formik>
                    </div>
                )}

                {step === 2 && (
                    <div className='w-full h-screen pt-7 space-y-10 flex relative flex-col'>
                    
                        <h1 className="text-2xl font-semibold">Edit Profile</h1>

                        <div className="space-y-6 flex flex-col justify-center items-center">
                            <div className="relative w-24 h-24">
                                {file === "avatar.jpg" ? (
                                    <FaCircleUser className="w-24 h-24 text-neutral-500" />
                                ) : (
                                    <img
                                        src={file}
                                        alt="profile"
                                        name="img"
                                        className="w-24 h-24 rounded-full object-cover bg-neutral-700"
                                    />
                                )}

                                {/* Upload button positioned at bottom-right */}
                                <div className="absolute -bottom-3 left-3 z-10">
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={ async (res) => {
                                            if (res) {
                                                const imageUrl = res[0].ufsUrl;

                                                // update local state
                                                setFile(imageUrl);

                                                // send to database
                                                await fetch(`/api/auth/users/updateAvatar`, {
                                                    method: "PUT",
                                                    headers: {
                                                    "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        userId: user._id,
                                                        img: imageUrl,
                                                    }),
                                                });

                                                router.refresh();
                                            }
                                        }}
                                        content={{
                                            button: (
                                                <div className="rounded-full p-2 dark:bg-isoDark2 flex justify-center items-center bg-[#f4f4f7] ">
                                                    <MdOutlineAddAPhoto className="text-xl text-black dark:text-isoColor2" />
                                                </div>
                                            ),
                                        }}
                                        appearance={{
                                            button:
                                                "bg-transparent border-none p-0 hover:bg-transparent",
                                            allowedContent: "hidden",
                                        }}
                                        onUploadError={(error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <Formik
                                        initialValues={initialValueFullname}
                                        validationSchema={validationSchemaFullname}
                                        onSubmit={saveFullname}
                                      >
                                        {({ errors, touched, values }) => (
                                          <Form className="w-full flex md:px-8 flex-col space-y-4">
                                            <div>
                                              <label
                                                htmlFor="fullname"
                                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                                              >Fullname</label>
                                              <Field name="fullname">
                                                {(props) => {
                                                  const { field, form, meta } = props;
                                                  return (
                                                    <input
                                                      placeholder=""
                                                      className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white text-black font-medium border-none rounded-xl bg-[#f4f4f7] w-full p-3 text-lg focus:outline-none`}
                                                      type="text"
                                                      value={user.full_name}
                                                      id="fullname"
                                                      maxLength={60}
                                                      name="fullname"
                                                      {...field}
                                                    />
                                                  );
                                                }}
                                              </Field>
                                              <ErrorMessage name="fullname">
                                                {(errMsg) => (
                                                  <span className="text-red-500 text-xs">{errMsg}</span>
                                                )}
                                              </ErrorMessage>
                                            </div>

                                            {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}                        

                                            <button
                                              type="submit"
                                              className={`w-full py-4 dark:bg-isoColor2 dark:text-black rounded-xl ${Formik.isValid || Formik.isSubmitting ? "bg-blue-100 text-white" : "bg-isoColor1 hover:bg-isoColor2 hover:text-black text-white"} text-lg`}
                                              disabled={Formik.isValid || Formik.isSubmitting}
                                            >
                                              {loading ? "Saving..." : "Save"}
                                            </button>

                                            <span className="text-xs text-neutral-500">"Avatar will also be displayed on Astiox Wallet.</span>
                        <span className="text-xs text-neutral-500">"Fullname will be used across the Astiox platform, including Astiox Wallet and Astiox Airdrop. Abusing it may lead to community penalties.</span>
                                          </Form>
                                        )}
                        </Formik>
                    </div>
                )}

                </div>

          </div>

        </div>
    </div>
  )
}
