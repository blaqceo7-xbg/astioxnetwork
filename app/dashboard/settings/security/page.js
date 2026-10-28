"use client"

import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from './../loading';
import { MdOutlineMailLock } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { CgArrowLeft } from 'react-icons/cg';
import { TbLockPassword } from 'react-icons/tb';

const initialValueOtp = {
  otpField: "",
}

const initialValues = {
    password: "",
    confirmPassword: "",
};

const validationSchemaOtp = Yup.object({
  otpField: Yup.string().max(6, 'Please enter a 6-digit verification code.').min(6, 'Please enter a 6-digit verification code.').required("Please enter a 6-digit verification code."),
});

const validationSchema = Yup.object({
  password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .required("Password is required"),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
});

export default function Page() {

  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOTP, setIsOpenOTP] = useState(true);
  const [resendCode, setResendCode] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState("password");
  const [errorMessage, setErrorMessage] = useState('');

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
      setResendCode(false);
      return;
    }
  }

  const handleIsVisible = () => {
    if (isVisible === "password") {
      setIsVisible("text");
    } else {
      setIsVisible("password");
    }
  }

  const handleIsOpen = () => {
    if (isOpen === true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  async function sendOTP() {
    try {

      setStep(2);

      await axios.post(
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
      
    } catch (err) {
      console.log(err);
    }
  }

  async function verifyOTP(values, onSubmitProps) {
    setIsError(false);
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
        setLoading(false);
        setIsOpenOTP(false);
        setStep(1);
      }
    } catch(err) {
      setErrorMessage(err.response.data.error);
      setIsError(true);
      setLoading(false);
    }
  }

  async function changePassword(values, onSubmitProps) {
    setIsError(false);
    try {
      setLoading2(true);
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();

      const res = await axios.put(
        `/api/auth/users/change-password`,
        {
          newPassword: values.confirmPassword,
          userId: user._id,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        router.push("/login");
      }
    } catch(err) {
      setErrorMessage(err.response.data.error);
      setIsError(true);
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-full md:py-16 bg-white text-black dark:bg-isoDark min-h-screen dark:text-white relative px-5 flex flex-col md:justify-center md:items-center container mx-auto md:px-40'>
        <ToastContainer />
        {loading === true && (<LoadingScreen tab={'signIn'} />)}
        {loading2 === true && (<LoadingScreen />)}
        <div className='w-full h-full flex flex-col py-8 space-y-10 md:w-[450px] md:h-[650px] md:rounded-3xl md:border md:border-neutral-200'>

          <div className='flex md:px-8 flex-col space-y-10'>
            <div className='flex items-center justify-center relative'>
                    <a
                                className='flex absolute left-0'
                                href='/dashboard/settings'
                            >
                                <CgArrowLeft className='text-2xl' />
                    </a>
            </div>

            <h1 className='text-2xl font-medium md:text-3xl md:font-semibold'>

            {step === 1 ? (
                <span>Change Password</span>
              ) : (
                <span>Email Verification</span>
              )}
          
          </h1>

          {step === 2 && <p className='text-neutral-400 text-sm md:text-base'>Enter the 6-digit verification code sent to {user.email}.</p>}
          </div>


          {step === 1 && (
            <div className='relative'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={changePassword}
                >
                    {({ errors, touched, values }) => (
                    <Form className="w-full h-full flex md:px-8 relative flex-col space-y-6">
                        {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}
                        <div>
                        <label
                            htmlFor="password"
                            className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                        >New Password</label>
                        <div className='w-full flex relative justify-between items-center'>
                            <Field name="password">
                            {(props) => {
                                const { field, form, meta } = props;
                                return (
                                <input
                                    placeholder=""
                                    className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white border-none text-black font-medium bg-[#f4f4f7] rounded-xl w-full p-3 text-lg focus:outline-none`}
                                    type={isVisible}
                                    id="password"
                                    name="password"
                                    {...field}
                                />
                                );
                            }}
                            </Field>

                            <span className='text-black absolute right-3 font-medium dark:text-neutral-400'>
                                {
                                isVisible === "text" ? (<FaRegEye className='w-5 h-5' onClick={handleIsVisible} />) : (<FaRegEyeSlash className='w-5 h-5' onClick={handleIsVisible} />)
                                }
                            </span>
                        </div>

                        <ErrorMessage name="password">
                            {(errMsg) => (
                            <span className="text-red-500 text-xs">{errMsg}</span>
                            )}
                        </ErrorMessage>
                        </div>

                        <div>
                        <label
                            htmlFor="confirmPassword"
                            className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-600"
                        >Confirm Password</label>
                        <div className='w-full flex relative justify-between items-center'>
                            <Field name="confirmPassword">
                            {(props) => {
                                const { field, form, meta } = props;
                                return (
                                <input
                                    placeholder=""
                                    className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white border-none text-black font-medium bg-[#f4f4f7] rounded-xl w-full p-3 text-lg focus:outline-none`}
                                    type={isVisible}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    {...field}
                                />
                                );
                            }}
                            </Field>

                            <span className='text-black absolute right-3 font-medium dark:text-neutral-400'>
                                {
                                isVisible === "text" ? (<FaRegEye className='w-5 h-5' onClick={handleIsVisible} />) : (<FaRegEyeSlash className='w-5 h-5' onClick={handleIsVisible} />)
                                }
                            </span>
                        </div>

                        <ErrorMessage name="confirmPassword">
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
                        {loading ? "Updating..." : "Confirm"}
                        </button>

                        {isOpenOTP === true && (
                            <div className="w-full flex container fixed left-0 right-0 bottom-0 top-8 mx-auto justify-end bg-black/70 items-end loading-modal">
                                <div className="rounded-t-2xl md:w-96 duration-500 transition-all h-fit w-full flex flex-col items-center py-5 px-3 bg-white dark:bg-isoDark2 space-y-8">
                                <div className='flex justify-center items-center w-full'><TbLockPassword className='w-24 text-black dark:text-isoColor2 h-24' /></div>

                                <h1 className='px-6 text-2xl font-semibold text-center md:font-semibold'>Account Restrictions</h1>

                                <p className='text-sm'>In order to protect your account, withdrawals, change of password and login might require 2-step email verification to make sure it is you.</p>

                                <div className='w-full flex justify-between items-center space-x-4'>
                                    <a href='/dashboard/settings'
                                        className="w-full py-3 text-center dark:bg-isoDark dark:text-isoColor2 rounded-xl bg-[#f4f4f7] text-md hover:bg-isoColor2 hover:text-black text-black"
                                    >
                                            Cancel
                                    </a>

                                    <button
                                        onClick={sendOTP}
                                        type='button'
                                        className="w-full py-3 rounded-xl dark:bg-isoColor2 dark:text-black bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                    >
                                        Continue
                                    </button>
                                </div>
                                </div>
                            </div>
                        )}
                    </Form>
                    )}
                </Formik>
            </div>
          )}

          {step === 2 && (
            <Formik
                initialValues={initialValueOtp}
                validationSchema={validationSchemaOtp}
                onSubmit={verifyOTP}
              >
                {({ errors, touched, values }) => (
                  <Form className="w-full flex md:px-8 h-full flex-col space-y-6">
                    <div>
                      <label
                        htmlFor="otpField"
                        className="flex space-x-2 items-center text-sm pb-1 md:text-black text-neutral-500 font-medium"
                      >Email Verification Code</label>
                      <div className='w-full flex relative justify-between items-center'>
                        <Field name="otpField">
                          {(props) => {
                            const { field, form, meta } = props;
                            return (
                              <input
                                placeholder=""
                                className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 dark:bg-isoDark2 dark:border-neutral-600 dark:text-white border-none text-black font-medium bg-[#f4f4f7] rounded-xl w-full p-3 text-lg focus:outline-none`}
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
                            resendCode === true ? (<span className='text-neutral-500'>Code Resent</span>) : (<span onClick={handleResendCode} className='dark:text-isoColor2 text-isoColor1'>Get Code</span>)
                          }
                        </span>
                      </div>
                      <ErrorMessage name="otpField">
                        {(errMsg) => (
                          <span className="text-red-500 text-xs">{errMsg}</span>
                        )}
                      </ErrorMessage>
                      {isError === true && (<p className='text-red-500 py-2 text-xs'>{errorMessage}</p>)}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-lg hover:bg-isoColor2 hover:text-black text-white"
                      // disabled={Formik.isValid || Formik.isSubmitting}
                    >
                      {loading ? "Verifying OTP..." : "Submit"}
                    </button>

                    <span onClick={handleIsOpen} className='text-isoColor1 dark:text-isoColor2 flex justify-center items-center font-semibold'>Didn't receive the code?</span>

                  </Form>
                )}
            </Formik>
          )}

          <div className='space-y-4 md:px-8'></div>

        </div>

        {isOpen === true && (
          <div className="w-full h-full p-10 flex container mx-auto fixed left-0 right-0 bottom-0 top-0  justify-center bg-black/70 items-center loading-modal">
            <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full flex flex-col items-center py-5 px-3 bg-white dark:bg-isoDark2 dark:text-white space-y-4">
              <div className='flex justify-center items-center w-full'><MdOutlineMailLock className='w-16 text-isoColor1 dark:text-isoColor2 h-16' /></div>

              <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Didn't Receive the Email Verification Code?</h1>

              <p className='text-xs'>The email verification code has been sent to your email. If you have not received the code after several attempts, please try the following:</p>

              <div>
                <ul className='list-disc dark:bg-isoDark md:bg-[#f4f4f7] rounded-2xl px-6 md:py-7 text-sm space-y-2'>
                  <li>Check if it is in your junk/spam mail.</li>
                  <li>Make sure your email address is {user.email}.</li>
                  <li>The message may be delayed for a few minutes. Try again after 10 minutes.</li>
                </ul>
              </div>

              <button
                onClick={handleIsOpen}
                className="w-full py-3 dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
              >
                      OK
              </button>
            </div>
          </div>
        )}

    </div>
  )
}
