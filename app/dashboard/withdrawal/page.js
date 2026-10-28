"use client"

import QRCode from "qrcode";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { CgArrowLeft } from 'react-icons/cg';
import { DesktopSideBar } from './../components/DesktopSideBar';
import { Header } from './../components/Header';
import LoadingScreen from '@/app/loading';
import { useAuth } from '@/app/context/AuthContext';
import { GrTransaction } from "react-icons/gr";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { MdOutlineMailLock } from "react-icons/md";
import { LuArrowUpToLine } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { FaInfo } from "react-icons/fa6";

const initialValueOtp = {
  otpField: "",
}
const validationSchemaOtp = Yup.object({
  otpField: Yup.string().max(6, 'Please enter a 6-digit verification code.').min(6, 'Please enter a 6-digit verification code.').required("Please enter a 6-digit verification code."),
});

export default function Page() {

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [coin, setCoin] = useState("");
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [resendCode, setResendCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insufi, setInsufi] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const minWithdraw = 100;
  const maxWithdraw = 100000;


  const handleCoin = (coin) => {
    setCoin(coin);
    setStep(2);
  }

  let initialValueAmount = {
    amount: '',
  }

  const validationSchemaAmount = Yup.object({
    amount: Yup.number()
      .required("Please enter the amount you want to withdraw."),
  });

  async function handleResendCode() {
      try {
        setResendCode(true);
        const res = await axios.post(
          `/api/auth/send-otp`,
          {
            email: user.email,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (res.status === 200) {
          setResendCode(false);
          return;
        } else {
          setResendCode(false);
          return;
        }
      } catch(err) {
        return;
      }
    }

  async function validateWithdrawal (values, onSubmitProps) {
        setLoading(true);
        onSubmitProps.setSubmitting(false);
        if (values.amount < minWithdraw || values.amount > maxWithdraw) {
            setInsufi(false);
            setIsError(true);
            setErrorMessage("Amount should be between");
            setLoading(false);
            return;
        } 
        
        if (values.amount > user.earnings) {
            setInsufi(true);
            setErrorMessage("Amount exceeds available balance.");
            setIsError(true);
            setLoading(false);
            return;
        }
        
        try {
                setAmount(values.amount);
                const res = await axios.post(
                    `/api/auth/send-otp`,
                    {
                    email: user.email,
                    },
                    {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    }
                );

                if (res.status === 200) {
                    setIsError(false);
                    setStep(3);
                    setLoading(false);
                } else {
                    setErrorMessage(res.response.data.message);
                    setIsError(true);
                    setLoading(false);
                }

        } catch (err) {
                setErrorMessage(err.response.data.message);
                setIsError(true);
                setLoading(false);
        }
  }

  async function verifyOTP(values, onSubmitProps) {
    try {
      setLoading(true);
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();

      const res = await axios.post(
        `/api/auth/verify-email`,
        {
          otp: values.otpField,
          email: user.email,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        setIsError(false);
        // Send withdrawal request
        const res = await axios.post(
            `/api/auth/users/withdrawal/cashOut?userId=${user._id}`,
            {
            transaction_type: "withdrawal",
            currency: coin,
            amount: amount,
            },
            {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }  
            }
        );

        if (res.status === 200) {
            setIsError(false);
            setStep(4);
            setLoading(false);
        } else {
            setStep(2);
            setErrorMessage(res.response.data.error);
            setLoading(false);
            setIsError(true);
      }

      } else {
        setStep(2);
        setErrorMessage(res.response.data.error);
        setLoading(false);
        setIsError(true);
      }
    } catch(err) {
      setStep(2);
      setErrorMessage(err.response.data.error);
      setIsError(true);
      setLoading(false);
    }
  }

  return (
    <div className="bg-white w-full h-full dark:bg-isoDark dark:text-white text-black min-h-screen relative font-[family-name:var(--font-geist-sans)]">
     {loading === true && (<LoadingScreen />)}
     <div className='hidden md:block w-full'>
        <Header />
     </div>

       <div className='w-full h-full min-h-screen md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"withdraw"} />

          <div className='w-full h-full md:py-16 relative px-4 flex flex-col md:justify-center md:items-center md:px-40'>
                <div className='w-full flex flex-col space-y-5 md:space-y-16 '>

                {step !== 4 && (<div className='flex items-center py-4 md:py-0 justify-center relative'>
                    {
                        step === 1 ? (
                            <a
                                className='flex absolute left-0'
                                href='/dashboard'
                            >
                                <GoHome className='text-2xl' />
                            </a>
                        ) : (
                            <div
                                className='flex absolute left-0'
                                onClick={() => setStep(1)}
                            >
                                <CgArrowLeft className='text-2xl' />
                            </div>
                        )
                    }

                    <h1 className='text-lg font-medium md:text-3xl md:font-semibold'>

                    {step === 1 ? (
                        <span>Choose Currency</span>
                    ) : step === 2 ? (
                        <span>Withdraw {" "}{coin}</span>
                    ) : (
                        <span>2-Factor Security</span>
                    )}
                
                    </h1>
                </div>)}


                {step === 1 && (
                    <div className="w-full flex flex-col">
                                            <div className="w-full">
                                                <h4
                                                className={`dark:text-white  text-black font-medium py-2 px-4`}
                                                >
                                                Which coin are you withdrawing? 
                                                </h4>
                                            </div>
                    
                                            <div className="w-full flex flex-col space-y-4 py-3 transition-500 overflow-hidden">
                                                    <div className='flex w-full justify-between items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark2 py-3 rounded-2xl cursor-pointer'
                                                    onClick={() => handleCoin("BTC")}>
                                                        <div className='flex items-center px-4 space-x-2'>
                                                            <Image
                                                                src="/icons/bitcoin.webp"
                                                                alt="Astiox_logo"
                                                                className="w-7"
                                                                width={50}
                                                                height={0}
                                                            />
                                                            <div className='space-y-1'>
                                                                <h2 className='font-medium text-base dark:text-white'>Bitcoin</h2>
                                                                <span className='text-xs text-neutral-400'>BTC</span>
                                                            </div>
                                                        </div>
                    
                                                        
                                                    </div>
                    
                                                    <div className='flex w-full justify-between items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark2 py-3 rounded-2xl cursor-pointer'
                                                    onClick={() => handleCoin("BNB")}>
                                                        <div className='flex items-center space-x-2 px-4'>
                                                            <Image
                                                                src="/icons/bnb-icon2_2x.webp"
                                                                alt="Astiox_logo"
                                                                className="w-7"
                                                                width={50}
                                                                height={0}
                                                            />
                                                            <div className='space-y-1'>
                                                                <h2 className='font-medium text-base dark:text-white'>BNB</h2>
                                                                <span className='text-xs text-neutral-400'>BNB</span>
                                                            </div>
                                                        </div>
                    
                                                        
                                                    </div>
                    
                                                    <div className='flex w-full justify-between items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark2 py-3 rounded-2xl cursor-pointer'
                                                    onClick={() => handleCoin("USDT")}>
                                                        <div className='flex items-center space-x-2 px-4'>
                                                            <Image
                                                                src="/icons/Tether.webp"
                                                                alt="Astiox_logo"
                                                                className="w-7"
                                                                width={50}
                                                                height={0}
                                                            />
                                                            <div className='space-y-1'>
                                                                <h2 className='font-medium text-base dark:text-white'>USDT</h2>
                                                                <span className='text-xs text-neutral-400'>TetherUS</span>
                                                            </div>
                                                        </div>
                    
                                                        
                                                    </div>
                    
                                                    <div className='flex w-full justify-between items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark2 py-3 rounded-2xl cursor-pointer'
                                                    onClick={() => handleCoin("ETH")}>
                                                        <div className='flex items-center space-x-2 px-4'>
                                                            <Image
                                                                src="/icons/ethereum.webp"
                                                                alt="Astiox_logo"
                                                                className="w-7"
                                                                width={50}
                                                                height={0}
                                                            />
                                                            <div className='space-y-1'>
                                                                <h2 className='font-medium text-base dark:text-white'>ETH</h2>
                                                                <span className='text-xs text-neutral-400'>Ethereum</span>
                                                            </div>
                                                        </div>
                    
                                                        
                                                    </div>
                    
                                                    <div className='flex w-full justify-between items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark2 py-3 rounded-2xl cursor-pointer'
                                                    onClick={() => handleCoin("XRP")}>
                                                        <div className='flex items-center space-x-2 px-4'>
                                                            <Image
                                                                src="/icons/xrp-symbol-white-128.webp"
                                                                alt="Astiox_logo"
                                                                className="w-7"
                                                                width={50}
                                                                height={0}
                                                            />
                                                            <div className='space-y-1'>
                                                                <h2 className='font-medium text-base dark:text-white'>XRP</h2>
                                                                <span className='text-xs text-neutral-400'>XRP</span>
                                                            </div>
                                                        </div>
                    
                                                        
                                                    </div>
                    
                                                    <div className='flex w-full justify-between items-center hover:bg-[#f4f4f7] dark:hover:bg-isoDark2 py-3 rounded-2xl cursor-pointer'
                                                    onClick={() => handleCoin("SOL")}>
                                                        <div className='flex items-center space-x-2 px-4'>
                                                            <Image
                                                                src="/icons/solana.webp"
                                                                alt="Astiox_logo"
                                                                className="w-7"
                                                                width={50}
                                                                height={0}
                                                            />
                                                            <div className='space-y-1'>
                                                                <h2 className='font-medium text-base dark:text-white'>SOL</h2>
                                                                <span className='text-xs text-neutral-400'>Solana</span>
                                                            </div>
                                                        </div>
                    
                                                        
                                                    </div>
                                            </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 container mx-auto justify-center bg-black/30 items-center loading-modal">
                                                                    <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
                                                                      <div className='flex justify-center items-center w-full'><LuArrowUpToLine className='w-16 text-isoColor1 dark:text-isoColor2 h-16' /></div>
                                                        
                                                                      <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Withdrawal Request was Successful!</h1>
                                                        
                                                                      <p className='text-xs text-center'>
                                                                        The withdrawal request you made has been successful sent. {process.env.NEXT_PUBLIC_COMPANY_NAME} is processing your transaction and you'll be notified went the verification is completed. Thank you.
                                                                      </p>
                                                    
                                                                      <a
                                                                        href="/dashboard"
                                                                        className="w-full py-3 text-center dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                                      >
                                                                              OK
                                                                      </a>
                                                                    </div>
                    </div>
                )}
                
                {step === 3 && <p className='text-neutral-400 text-sm md:text-base'>A 6-digit code has been sent to <span className='font-bold text-neutral-500'>{user.email}</span> (the email is case insensitive). Please enter it within the next 10 minutes.</p>}
                {step === 3 && (
                    <Formik
                        initialValues={initialValueOtp}
                        validationSchema={validationSchemaOtp}
                        onSubmit={verifyOTP}
                    >
                        {({ errors, touched, values }) => (
                        <Form className="w-full flex md:px-8 flex-col space-y-6">
                            <div>
                            <label
                                htmlFor="otpField"
                                className="flex space-x-2 dark:text-white items-center text-sm pb-1 md:text-black text-neutral-500 font-medium"
                            >Verification Code</label>
                            <div className='w-full flex relative justify-between items-center'>
                                <Field name="otpField">
                                {(props) => {
                                    const { field, form, meta } = props;
                                    return (
                                    <input
                                        placeholder=""
                                        className={`form__input dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2 border-neutral-200 border text-black font-medium rounded-xl w-full p-3 text-md focus:outline-none focus:border-isoColor1 focus:text-black`}
                                        type="text"
                                        maxLength={6}
                                        id="otpField"
                                        autoFocus
                                        name="otpField"
                                        {...field}
                                    />
                                    );
                                }}
                                </Field>

                                <span className='text-isoColor1 absolute right-3 font-medium'>
                                {
                                    resendCode === true ? (<span className='text-neutral-500'>Code Resent</span>) : (<span onClick={handleResendCode} className='text-isoColor1 text-sm dark:text-isoColor2'>Get Code</span>)
                                }
                                </span>
                            </div>
                            <ErrorMessage name="otpField">
                                {(errMsg) => (
                                <span className="text-red-500 text-xs">{errMsg}</span>
                                )}
                            </ErrorMessage>
                            </div>
                            {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}
                            <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-isoColor1 dark:bg-isoColor2 dark:text-black text-md hover:bg-isoColor2 hover:text-black text-white"
                            // disabled={Formik.isValid || Formik.isSubmitting}
                            >
                            {loading ? "Verifying OTP..." : "Continue"}
                            </button>

                        </Form>
                        )}
                    </Formik>
                )}

                {step === 2 && (
                    <div className='w-full h-full flex text-black relative py-3 flex-col'>
                    
                        <Formik
                            initialValues={initialValueAmount}
                            validationSchema={validationSchemaAmount}
                            onSubmit={validateWithdrawal}
                        >
                            {({ errors, touched, values }) => (
                            <Form className="w-full h-full flex md:px-8 flex-col space-y-4">
                                <div className="pb-4">
                                  <div className='w-full rounded-3xl dark:bg-isoDark2 dark:text-white dark:border dark:border-neutral-600 bg-[#f4f4f5] text-black p-3 flex space-x-3 items-center'>
                                      <div className='bg-isoColor1 dark:bg-isoColor2 dark:text-black rounded-full p-1 text-blue-100'><FaInfo className={`h-4 w-4`} /></div>
                                      <p className='text-xs'>Before initiating a withdrawal, make sure your <span className="text-isoColor1 dark:text-isoColor2">wallet address</span> is uploaded in the <span className="text-isoColor1 dark:text-isoColor2">account settings</span>, to avoid any lost of asset.</p>
                                  </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="amount"
                                        className="flex space-x-2 items-center dark:text-white text-sm pb-1 md:text-black text-neutral-500 font-medium"
                                    >I want to withdraw</label>
                                    
                                    <div className='w-full flex relative justify-between items-center'>
                                        <Field name="amount">
                                        {(props) => {
                                            const { field, form, meta } = props;
                                            return (
                                            <input
                                                placeholder="Please enter amount"
                                                className={`text-neutral-400 dark:bg-isoDark2 dark:text-white bg-gray-100 font-medium border-none rounded-xl w-full p-3 text-md focus:outline-none focus:none focus:text-black`}
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                {...field}
                                            />
                                            );
                                        }}
                                        </Field>

                                        <span onClick={() => setStep(1)} className='text-black dark:text-white flex w-fit items-center space-x-1.5 absolute right-3 font-medium'>
                                            <div className='flex items-center'>
                                                {coin === "BTC" ? (
                                                <Image
                                                    src="/icons/bitcoin.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={5}
                                                    height={0}
                                                />)
                                                : coin === "ETH" ? (
                                                    <Image
                                                    src="/icons/ethereum.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={5}
                                                    height={0}
                                                />
                                                )
                                                : coin === "USDT" ? (
                                                    <Image
                                                    src="/icons/Tether.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={5}
                                                    height={0}
                                                    />
                                                )
                                                : coin === "BNB" ? (
                                                    <Image
                                                    src="/icons/bnb-icon2_2x.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={5}
                                                    height={0}
                                                    />
                                                )
                                                : coin === "XRP" ? (
                                                    <Image
                                                    src="/icons/xrp-symbol-white-128.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={5}
                                                    height={0}
                                                    />
                                                ): coin === "SOL" ? (
                                                    <Image
                                                    src="/icons/solana.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={5}
                                                    height={0}
                                                    />
                                                    )
                                                : (
                                                    <Image
                                                    src="/icons/Tether.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={5}
                                                    height={0}
                                                    />
                                                    )}
                                            </div>
                                            <span>{coin}</span>
                                            <span><TbTriangleInvertedFilled className="flex text-xs" /></span>
                                        </span>
                                    </div>

                                    <ErrorMessage name="amount">
                                        {(errMsg) => (
                                        <span className="text-red-500 text-xs">{errMsg}</span>
                                        )}
                                    </ErrorMessage>

                                    
                                </div>

                                {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}
                                {insufi !== true && (<p className={`${isError === true ? 'text-red-500' : 'text-neutral-500'} text-xs`}>${minWithdraw}.00 - ${maxWithdraw}.00</p>)}

                                <div className="flex space-x-1 items-center text-xs">
                                    <span className="text-neutral-500">Available Balance:</span>
                                    <p className="text-black dark:text-white">{user.earnings.toLocaleString()} USD</p>
                                </div>

                                <div className='fixed md:sticky md:pt-32 bottom-4 left-4 right-4'>
                                    <button
                                        type="submit"
                                        className="w-full py-4 dark:bg-isoColor2 dark:text-black rounded-full bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                        >
                                        Continue
                                    </button>
                                </div>

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
