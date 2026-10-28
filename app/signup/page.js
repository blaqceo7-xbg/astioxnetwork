"use client"

import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image'
import React, { useState } from 'react'
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from '../loading';
import { MdOutlineMailLock } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';

const initialValueEmail = {
  email: "",
}

const initialValueOtp = {
  otpField: "",
}

const initialValues = {
  full_name: "",
  username: "",
  email: "",
  password: "",
};

const validationSchemaEmail = Yup.object({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Please enter a valid email address!"),
});

const validationSchemaOtp = Yup.object({
  otpField: Yup.string().max(6, 'Please enter a 6-digit verification code.').min(6, 'Please enter a 6-digit verification code.').required("Please enter a 6-digit verification code."),
});

const validationSchema = Yup.object({
  full_name: Yup.string().trim().required("Please enter your full name"),
  username: Yup.string().trim().required("Please enter username"),
  password: Yup.string()
    .min(8, "Minium length 8 characters long!")
    .max(20, "Maximum length 20 characters long!")
    .matches(/[a-zA-Z]/, "Password should be mixed with letters & numbers")
    .required("Enter your password please!"),
});

export default function Page() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [resendCode, setResendCode] = useState(false);
  const [type, setType] = useState('password');
  const [type2, setType2] = useState('password');
  const [globalEmail, setGlobalEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState("password");
  const ref = searchParams.get("ref") || undefined;

  async function handleResendCode() {
      try {
        setResendCode(true);
        const res = await axios.post(
          `/api/auth/send-otp`,
          {
            email: globalEmail,
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

  async function sendOTP(values, onSubmitProps) {
    try {
        setLoading(true);
      onSubmitProps.setSubmitting(false);
      setGlobalEmail(values.email);

      const res = await axios.post(
        `/api/auth/signup/send-otp`,
        {
          email: values.email,
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
        setStep(2);
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
        `/api/auth/signup/verify-email`,
        {
          otp: values.otpField,
          email: globalEmail,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        setIsError(false);
        setStep(3);
        setLoading(false);
      } else {
        setErrorMessage(res.response.data.error);
        setLoading(false);
        setIsError(true);
      }
    } catch(err) {
      setErrorMessage(err.response.data.error);
      setIsError(true);
      setLoading(false);
    }
  }

  async function signup(values, onSubmitProps) {
    setLoading(true);

    try {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.setFieldValue("password", "");
      
      const res = await axios.post(
          `/api/auth/signup?ref=${ref}`,
          {
            full_name: values.full_name,
            username: values.username,
            email: globalEmail,
            password: values.password,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }  
          }
        );

      if (res.status === 201) {
        setLoading2(true);
        setTimeout(() => {
          setIsError(false);
          router.push(`/dashboard`);
        }, 3000);
      } else {
        setErrorMessage(res.response.data.message);
        setIsError(true);
        setLoading(false);
      }
    } catch(err) {
      setErrorMessage(err.response.data.message);
      setIsError(true);
      setLoading(false);
    }
  }

  const handleError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
  };

  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  }

  const handleToggle2 = () => {
    if (type === 'password') {
      setType2('text');
    } else {
      setType2('password');
    }
  }

  return (
    <div className='w-full h-screen md:py-16 bg-white dark:bg-isoDark text-black dark:text-white text-black relative px-5 flex flex-col md:justify-center md:items-center'>
        <ToastContainer />
        {loading === true && (<LoadingScreen tab={'signIn'} />)}
        {loading2 === true && (<LoadingScreen tab={'loggedIn'} />)}
        <div className='w-full flex flex-col space-y-10 md:space-y-5 md:w-[450px] md:h-[650px] md:rounded-3xl md:border md:border-neutral-200 dark:md:bg-isoDark2 dark:md:border-neutral-600'>

          <div className='py-5 md:px-6 text-isoColor1 text-xl dark:text-isoColor2 font-extrabold'>
                      <a href='/' className='hidden dark:flex items-center space-x-2'>
                          <Image
                              src="/icons/mainLogo2.png"
                              alt="logo"
                              className="w-8"
                              width={150}
                              height={0}
                          />
                          <span>ASTIOX</span>
                      </a>
          
                      <a href='/' className='dark:hidden flex items-center space-x-2'>
                          <Image
                              src="/icons/logoMain2.png"
                              alt="logo"
                              className="w-8"
                              width={150}
                              height={0}
                          />
                          <span>Astiox</span>
                      </a>
          </div>

          <div className='flex md:px-8 flex-col space-y-3'>
            <h1 className='text-2xl font-medium md:text-3xl md:font-semibold'>

            {step === 1 ? (
                <span>Welcome to Astiox Network</span>
              ) : step === 2 ? (
                <span>Verify your email</span>
              ) : (
                <span>Let's know you more</span>
              )}
          
          </h1>

            {step === 2 && <p className='text-neutral-500 text-sm md:text-base'>A 6-digit code has been sent to {globalEmail} the email is (case insensitive). Please enter it within the next 10 minutes.</p>}
          </div>


          {step === 1 && (
            <Formik
                initialValues={initialValueEmail}
                validationSchema={validationSchemaEmail}
                onSubmit={sendOTP}
              >
                {({ errors, touched, values }) => (
                  <Form className="w-full flex md:px-8 flex-col space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="flex space-x-2 items-center dark:md:text-neutral-600 text-sm pb-1 md:text-black text-neutral-600"
                      >Enter email address</label>
                      <Field name="email">
                        {(props) => {
                          const { field, form, meta } = props;
                          return (
                            <input
                              placeholder="e.g johndoe@gmail.com"
                              className={`form__input dark:md:bg-isoDark dark:focus:border-isoColor2 border-neutral-200 border text-neutral-400 font-medium rounded-xl dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 border-neutral-200 w-full p-3 text-md focus:outline-none focus:border-isoColor1 focus:text-black`}
                              type="email"
                              id="email"
                              name="email"
                              {...field}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage name="email">
                        {(errMsg) => (
                          <span className="text-red-500 text-xs">{errMsg}</span>
                        )}
                      </ErrorMessage>
                    </div>
                    {isError === true && (<p className='text-red-500 text-xs'>{errorMessage}</p>)}
                    <div className="w-full flex py-3 space-x-4">
                      <label
                        htmlFor="policy"
                        className="flex space-x-2 items-baseline"
                      >
                        <Field
                          className={`form__input border border-neutral-200 rounded-sm bg-transparent text-black dark:text-isoColor2 text-2xl focus:outline-none`}
                          type="checkbox"
                          id="policy"
                          value="policy"
                          checked
                          name="policy"
                        />
                        <span className='text-sm '>By creating an account, I agree to Astiox's <a href='privacy' className='underline'>Privacy Notice.</a></span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                      disabled={Formik.isValid || Formik.isSubmitting}
                    >
                      {loading ? "Sending OTP..." : "Continue"}
                    </button>

                    <button
                        // type="submit"
                        className="w-full dark:md:bg-isoDark dark:text-white dark:border-neutral-600 py-4 rounded-xl flex items-center px-6 space-x-10 md:space-x-20 justify-start border border-neutral-200 text-black"
                        // disabled={Formik.isValid || Formik.isSubmitting}
                      >
                        <span><FcGoogle className='w-4 h-4' /></span>
                        <span>Continue with Google</span>
                    </button>

                    <button
                        // type="submit"
                        className="w-full py-4 dark:md:bg-isoDark dark:text-white dark:border-neutral-600 rounded-xl flex items-center px-6 space-x-10 md:space-x-20 justify-start border border-neutral-200 text-black"
                        // disabled={Formik.isValid || Formik.isSubmitting}
                      >
                        <span><IoLogoApple className='w-4 h-4' /></span>
                        <span>Continue with Apple</span>
                    </button>
                  </Form>
                )}
            </Formik>
          )}

          {step === 3 && (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={signup}
              >
                {({ errors, touched, values }) => (
                  <Form className="w-full flex md:px-8 flex-col space-y-4">

                    <div>
                      <label
                        htmlFor="full_name"
                        className="flex space-x-2 dark:md:text-neutral-600 items-center text-sm pb-1 md:text-black text-neutral-600"
                      >Enter full name</label>
                      <Field name="full_name">
                        {(props) => {
                          const { field, form, meta } = props;
                          return (
                            <input
                              placeholder="Full Name e.g John Doe"
                              className={`form__input dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2 border-neutral-200 border text-neutral-400 font-medium rounded-xl w-full p-3 text-md focus:outline-none focus:border-isoColor1 focus:text-black`}
                              type="text"
                              id="full_name"
                              name="full_name"
                              {...field}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage name="full_name">
                        {(errMsg) => (
                          <span className="text-red-500 text-xs">{errMsg}</span>
                        )}
                      </ErrorMessage>
                    </div>

                    <div>
                      <label
                        htmlFor="username"
                        className="flex space-x-2 items-center dark:md:text-neutral-600 text-sm pb-1 md:text-black text-neutral-600"
                      >What should we call you?</label>
                      <Field name="username">
                        {(props) => {
                          const { field, form, meta } = props;
                          return (
                            <input
                              placeholder="Username e.g @xbgustavo"
                              className={`form__input dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2 border-neutral-200 border text-neutral-400 font-medium rounded-xl w-full p-3 text-md focus:outline-none focus:border-isoColor1 focus:text-black`}
                              type="text"
                              id="username"
                              name="username"
                              {...field}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage name="username">
                        {(errMsg) => (
                          <span className="text-red-500 text-xs">{errMsg}</span>
                        )}
                      </ErrorMessage>
                      {isError === true && (<p className='text-red-500 py-2 text-xs'>{errorMessage}</p>)}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="flex space-x-2 items-center dark:md:text-neutral-600 text-sm pb-1 md:text-black text-neutral-600"
                      >Create a password</label>
                      <div className='w-full flex relative justify-between items-center'>
                        <Field name="password">
                          {(props) => {
                            const { field, form, meta } = props;
                            return (
                              <input
                                placeholder="Password"
                                className={`form__input dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2 border-neutral-200 border text-neutral-400 font-medium rounded-xl w-full p-3 text-md focus:outline-none focus:border-isoColor1 focus:text-black`}
                                type={isVisible}
                                id="password"
                                maxLength={25}
                                name="password"
                                {...field}
                              />
                            );
                          }}
                        </Field>

                        <span className='text-black dark:text-neutral-400 absolute right-3 font-medium'>
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

                    <button
                      type="submit"
                      className="w-full py-4 dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                      disabled={Formik.isValid || Formik.isSubmitting}
                    >
                      {loading ? "Setting Up Account..." : "Create Account"}
                    </button>

                  </Form>
                )}
            </Formik>
          )}

          {step === 2 && (
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
                        className="flex space-x-2 dark:md:text-neutral-500 items-center text-sm pb-1 md:text-black text-neutral-500 font-medium"
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
                            resendCode === true ? (<span className='text-neutral-500'>Code Resent</span>) : (<span onClick={handleResendCode} className='dark:text-isoColor2 text-isoColor1'>Get Code</span>)
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
                      className="w-full py-4 dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                      // disabled={Formik.isValid || Formik.isSubmitting}
                    >
                      {loading ? "Verifying OTP..." : "Continue"}
                    </button>

                    <div className='hidden w-full dark:text-isoColor2 text-isoColor1 md:py-5 md:block'>

                      {step === 1 ? (
                            <a href='login' className='font-semibold'>Login to Astiox</a>
                          ) : step === 2 ? (
                            <span onClick={handleIsOpen} className='flex justify-center items-center font-semibold'>Didn't receive the code?</span>
                          ) : (
                            <span></span>
                          )}
                    </div>

                  </Form>
                )}
            </Formik>
          )}

          <div className='space-y-4 md:px-8'></div>

        </div>

        <div className='w-full md:py-5 text-isoColor1 dark:text-isoColor2 text-center'>

          {step === 1 ? (
                <a href='login' className='font-semibold'>Login to Astiox</a>
              ) : step === 2 ? (
                <span onClick={handleIsOpen} className=' md:hidden block font-semibold'>Didn't receive the code?</span>
              ) : (
                <span></span>
              )}
        </div>

        {isOpen === true && (
          <div className="w-full h-full p-10 flex fixed top-0 bottom-0 left-0 right-0 justify-center bg-black/70 items-center loading-modal">
            <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 bg-white dark:bg-isoDark2 space-y-4">
              <div className='flex justify-center items-center w-full'><MdOutlineMailLock className='w-16 dark:text-isoColor2 text-isoColor1 h-16' /></div>

              <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>Didn't Receive the Email Verification Code?</h1>

              <p className='text-xs'>The email verification code has been sent to your email. If you have not received the code after several attempts, please try the following:</p>

              <div>
                <ul className='list-disc md:bg-[#f4f4f7] rounded-2xl px-6 md:py-7 text-sm space-y-2'>
                  <li>Check if it is in your junk/spam mail.</li>
                  <li>Make sure your email address is {globalEmail}.</li>
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
