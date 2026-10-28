"use client"

import Image from 'next/image';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiCheckCircle, FiSearch } from "react-icons/fi";
import {
    FiEdit,
    FiTrash2,
    FiPauseCircle,
    FiClock 
} from "react-icons/fi";
import { TfiClose, TfiCheck } from "react-icons/tfi";
import LoadingScreen from '../loading';
import { DesktopSideBar } from '../components/DesktopSideBar';
import { Header } from '../components/Header';
import { useAuth } from '@/app/context/AuthContext';
import { Router } from 'next/navigation';




export default function Page() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
      const [isError, setIsError] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

useEffect(() => {
      async function fetchTransactions() {
        try {
          setLoading(true);
          const res = await axios.get(
            `/api/auth/admin/transactions/bitcoin-mining-deposit/tran?type=mining`,
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );

          if (res.status === 200) {
            setIsError(false);
            setTransactions(res.data.data);
            setLoading(false);
          }
        } catch(err) {
          setErrorMessage("Error!");
          setIsError(true);
          setLoading(false);
        }
      }
  
      fetchTransactions();
    }, []);

  const filteredTransactions =
    transactions?.filter((transaction) => {
      const query = search.toLowerCase();

      return (
        transaction.transactionID
          ?.toLowerCase()
          .includes(query) ||
        transaction.user?.email
          ?.toLowerCase()
          .includes(query) ||
        transaction.currency
          ?.toLowerCase()
          .includes(query) ||
        transaction.status
          ?.toLowerCase()
          .includes(query) ||
        transaction.plan?.plan_name
          ?.toLowerCase()
          .includes(query)
      );
    }) || [];

  const currencyIcon = (currency) => {
    switch (currency) {
      case "BTC":
        return "/icons/bitcoin.webp";

      case "ETH":
        return "/icons/ethereum.webp";

      case "USDT":
        return "/icons/Tether.webp";

      case "BNB":
        return "/icons/bnb-icon2_2x.webp";

      case "SOL":
        return "/icons/solana.webp";

      case "XRP":
        return "/icons/xrp-symbol-white-128.webp";

      default:
        return "/icons/Tether.webp";
    }
  };

  const currencyName = (currency) => {
    switch (currency) {
      case "BTC":
        return "Bitcoin";

      case "ETH":
        return "Ethereum";

      case "USDT":
        return "Tether";

      case "BNB":
        return "Binance";

      case "SOL":
        return "Solana";

      case "XRP":
        return "Ripple";

      default:
        return currency;
    }
  };

        const handleDelete = async (transaction) => {
          try {
            setLoading(true);
            const res = await axios.delete(
              `/api/auth/admin/transactions/bitcoin-mining-deposit/tran?id=${transaction._id}`,
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            );

            if (res.status === 200) {
              setIsError(false);
              window.location.reload();
            }
          } catch(err) {
            setErrorMessage("Error!");
            setIsError(true);
            setLoading(false);
          }
        };

      const handleConfirm = async  (transaction) => {
          try {
            setLoading(true);
            const res = await axios.patch(
              `/api/auth/admin/transactions/bitcoin-mining-deposit/tran?userId=${user._id}`,
              {
                transactionID: transaction._id,
                status: "Successful",
              },
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            );

            if (res.status === 200) {
              setIsError(false);
              window.location.reload();
            }
          } catch(err) {
            setErrorMessage("Error!");
            setIsError(true);
            setLoading(false);
          }
      };

      const handleUnconfirmed = async  (transaction) => {
          try {
            setLoading(true);
            const res = await axios.patch(
              `/api/auth/admin/transactions/bitcoin-mining-deposit/tran?userId=${user._id}`,
              {
                transactionID: transaction._id,
                status: "Pending",
              },
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            );

            if (res.status === 200) {
              setIsError(false);
              window.location.reload();
            }
          } catch(err) {
            setErrorMessage("Error!");
            setIsError(true);
            setLoading(false);
          }
      };
  
      const handleMainMenu = () => {
        setIsShown(!isShown);
      };
  
      const [isShown2, setIsShown2] = useState(true);
      const handleMainMenu2 = () => {
        setIsShown2(!isShown2);
      };

  return (
    <div className="w-full bg-[#f4f4f7] h-full text-black dark:bg-isoDark dark:text-white min-h-screen relative font-[family-name:var(--font-geist-sans)]">
      {loading === true && (<LoadingScreen />)}

       <div className='w-full h-full min-h-screen flex items-start'>
     
          <DesktopSideBar tab={"deposit-history"} />

          <div className='w-full relative space-y-5 text-black container mx-auto'>
            
            <Header tab={'bitcoin-mining-deposit'} />

            <div className="min-h-screen p-4 md:p-8">

              <div className="mb-32">

                {/* Search */}

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

                  <div className="relative w-full md:w-96">

                    <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />

                    <input
                      type="text"
                      placeholder="Search transaction..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-xl border dark:border-neutral-700 bg-white dark:bg-isoDark2 dark:text-white pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                    />

                  </div>

                </div>

                {/* Table */}

                <div className="overflow-x-auto rounded-2xl border dark:border-neutral-800 bg-white dark:bg-isoDark shadow-sm">

                  <table className="min-w-[1900px] w-full text-sm">

                    <thead className="bg-gray-100 dark:bg-isoDark2 dark:text-white">

                      <tr>

                        

                        <th className="px-5 py-4 text-left">Currency</th>

                        <th className="px-5 py-4 text-left">Deposit Amount ($)</th>

                        <th className="px-5 py-4 text-left">Status</th>

                        <th className="px-5 py-4 text-left">Date Reg</th>

                        <th className="px-5 py-4 text-left">Transaction ID</th>

                        <th className="px-5 py-4 text-center">
                          Approve/Unapproved
                        </th>

                        <th className="px-5 py-4 text-center">
                          Delete
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredTransactions.length > 0 ? (

                        filteredTransactions.map((transaction) => (

                          <tr
                            key={transaction._id}
                            className="border-b dark:text-white dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-isoDark2 transition"
                          >

                            

                            {/* Currency */}

                            <td className="px-5 py-4">

                              <div className="flex items-center gap-3">

                                <Image
                                  src={currencyIcon(transaction.currency)}
                                  alt={transaction.currency}
                                  width={36}
                                  height={36}
                                />

                                <div>

                                  <p className="font-semibold dark:text-white">
                                    {currencyName(transaction.currency)}
                                  </p>

                                  <p className="text-xs text-gray-400">
                                    {transaction.currency}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* Deposit */}

                            <td className="px-5 py-4 whitespace-nowrap text-green-500 font-semibold">
                              {transaction.amount.$numberDecimal}
                            </td>


                            {/* Status */}

                            <td className="px-5 py-4">

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold

                                ${
                                  transaction.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"

                                    : transaction.status === "Successful"

                                    ? "bg-green-100 text-green-700"

                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {transaction.status}
                              </span>

                            </td>

                            {/* Date */}

                            <td className="px-5 py-4 whitespace-nowrap">
                              {formatter.format(
                                new Date(transaction.createdAt)
                              )}
                            </td>

                            {/* Transaction ID */}

                            <td className="px-5 py-4 whitespace-nowrap font-medium">
                              {transaction.transactionID || transaction._id}
                            </td>

                            {/* Edit */}

                            <td className="px-5 py-4 text-center">

                              {transaction.status === "Successful" ? (
                                <button
                                onClick={() => handleUnconfirmed(transaction)}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
                              >

                                <div className="flex items-center justify-center space-x-2">
                                  <FiCheckCircle size={18} />
                                  <span>Approved</span>
                                </div>

                                </button>
                              ) : (
                                <button
                                onClick={() => handleConfirm(transaction)}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-full transition"
                              >

                                <div className="flex items-center justify-center space-x-2">
                                  <TfiClose size={18} />
                                  <span>Unapproved</span>
                                </div>

                              </button>
                              )}

                            </td>

                            {/* Delete */}

                            <td className="px-5 py-4 text-center">

                              <button
                                onClick={() => handleDelete(transaction)}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                              >

                                <FiTrash2 size={18} />

                              </button>

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan={12}
                            className="text-center py-10 text-gray-500 dark:text-gray-400"
                          >
                            No transactions found.
                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>
    </div>
  )
}
