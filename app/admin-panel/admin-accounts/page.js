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
import { FaCircleUser } from 'react-icons/fa6';

let initialValueAmount = {
    balance: 0,
    earnings: 0
  }

  const validationSchemaAmount = Yup.object({
    balance: Yup.number().required("Balance is required"),
    earnings: Yup.number().required("Earnings is required"),
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
            `/api/auth/admin/admin-accounts/user?type=all`,
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
        transaction.full_name
          ?.toLowerCase()
          .includes(query) ||
        transaction.email
          ?.toLowerCase()
          .includes(query) ||
        transaction.username
          ?.toLowerCase()
          .includes(query) ||
        transaction.role
          ?.toLowerCase()
          .includes(query)
      );
    }) || [];

  async function updateWalletAmount (values) {
    setIsMenuOpen(false);
       try {
            setLoading(true);
            const res = await axios.patch(
              `/api/auth/admin/admin-accounts/user`,
              {
                userID: selectedTransaction._id,
                balance: values.balance,
                earnings: values.earnings,
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
              `/api/auth/admin/admin-accounts/user?id=${transaction._id}`,
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
              `/api/auth/admin/admin-accounts/admin?userId=${user._id}`,
              {
                userID: transaction._id,
                role: "admin",
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
              `/api/auth/admin/admin-accounts/user?userId=${user._id}`,
              {
                userID: transaction._id,
                role: "user",
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
        setSelectedTransaction(transaction);
      }
        setIsMenuOpen(!isMenuOpen)
    }

  return (
    <div className="w-full bg-[#f4f4f7] h-full text-black dark:bg-isoDark dark:text-white min-h-screen relative font-[family-name:var(--font-geist-sans)]">
      {loading === true && (<LoadingScreen />)}

       <div className='w-full h-full min-h-screen flex items-start'>
     
          <DesktopSideBar tab={"admin-accounts"} />

          <div className='w-full relative space-y-5 text-black container mx-auto'>
            
            <Header tab={'admin-accounts'} />

            <div className="min-h-screen p-4 md:p-8">

              <div className="mb-32">

                {/* Search */}

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

                  <div className="relative w-full md:w-96">

                    <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />

                    <input
                      type="text"
                      placeholder="Search admins..."
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

                        <th className="px-5 py-4 text-left">S/N({filteredTransactions.length})</th>

                        <th className="px-5 py-4 text-left">Avatar</th>

                        <th className="px-5 py-4 text-left">Name</th>

                        <th className="px-5 py-4 text-left">Email</th>

                        <th className="px-5 py-4 text-left">Username</th>

                        <th className="px-5 py-4 text-left">Role</th>

                        <th className="px-5 py-4 text-left">Date Reg</th>

                        <th className="px-5 py-4 text-center">
                          Add/Remove Admin
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredTransactions.length > 0 ? (

                        filteredTransactions.map((user, index) => (

                          <tr
                            key={user._id}
                            className="border-b dark:text-white  dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-isoDark2 transition"
                          >

                            <td className='pl-6'>
                              {index + 1}
                            </td>

                            <td className='pl-4'>
                              {user.img === "avatar.jpg" ? (
                                                                          <FaCircleUser className="w-14 h-14 text-black dark:text-neutral-500" />
                                                                      ) : (
                                                                          <img
                                                                          src={user.img}
                                                                          alt="Avatar"
                                                                          name="img"
                                                                          className="w-14 h-14 bg-neutral-700 rounded-full"
                                                                          />
                                              )}
                            </td>

                            <td className="px-5 py-4 whitespace-nowrap font-semibold">
                              {user.full_name}
                            </td>

                            <td className="px-5 py-4 whitespace-nowrap">
                              {user.email}
                            </td>

                            <td className="px-5 py-4 whitespace-nowrap">
                              {user.username}
                            </td>

                            {/* Status */}

                            <td className="px-5 py-4">

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold

                                ${
                                  user.role === "user"
                                    ? "bg-yellow-100 text-yellow-700"

                                    : user.role === "admin"

                                    ? "bg-green-100 text-green-700"

                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {
                                  user.role === "admin"
                                    ? "Admin"

                                    : "User"
                                }
                              </span>

                            </td>

                            {/* Date */}

                            <td className="px-5 py-4 whitespace-nowrap">
                              {formatter.format(
                                new Date(user.createdAt)
                              )}
                            </td>

                            {/* Edit */}

                            <td className="px-5 py-4 text-center">

                              {user.role === "admin" ? (
                                <button
                                onClick={() => handleUnconfirmed(user)}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                              >

                                <div className="flex items-center justify-center space-x-2">
                                  <TfiClose size={18} />
                                  <span>Remove Admin</span>
                                </div>

                                </button>
                              ) : (
                                <button
                                onClick={() => handleConfirm(user)}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
                              >

                                <div className="flex items-center justify-center space-x-2">
                                  <FiCheckCircle size={18} />
                                  <span>Add Admin</span>
                                </div>

                              </button>
                              )}

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan={12}
                            className="text-center py-10 text-gray-500 dark:text-gray-400"
                          >
                            No user found.
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
