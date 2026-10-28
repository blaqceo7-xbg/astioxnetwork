'use client';

import LoadingScreen from './loading';
import { DesktopSideBar } from '../components/DesktopSideBar';
import { Header } from '../components/Header';
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/app/context/AuthContext';
import React from 'react';
import { MdErrorOutline } from "react-icons/md";
import { FaRegCircleCheck } from 'react-icons/fa6';
import axios from 'axios';

const STORAGE_KEY = 'kyc_form';

// Validation schemas per step
const schemas = [
  Yup.object({
    date_of_birth: Yup.date().required('Required'),
    phone: Yup.string().required('Required'),
  }),
  Yup.object({
    address: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    zip_code: Yup.string().required('Required'),
  }),
  Yup.object({
    document_type: Yup.string().required('Required'),
    identity_file: Yup.string().required('Required'),
  }),
];

export default function KycPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [initialValues, setInitialValues] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);

  const steps = ['Personal', 'Address', 'Verification'];

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setInitialValues(JSON.parse(saved));
    } else {
      setInitialValues({
        date_of_birth: '',
        phone: '',
        address: '',
        state: '',
        country: '',
        zip_code: '',
        document_type: '',
        identity_file: 'hello',
      });
    }

    // ✅ Auto-detect country
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setInitialValues(prev => ({
          ...prev,
          country: prev?.country || data.country_name,
        }));
      });
  }, []);

  if (!initialValues) return null;

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <div className="bg-white w-full h-full text-black min-h-screen dark:bg-isoDark dark:text-white space-y-5 relative font-[family-name:var(--font-geist-sans)]">
        {loading === true && (<LoadingScreen tab={"kyc"} />)}
        
        <Header tab={`exchange`} />

        <div className='w-full h-full min-h-screen md:pt-20 flex items-start'>
     
          <DesktopSideBar tab={"kyc"} />

          <div className="min-h-screen bg-white dark:bg-isoDark flex flex-col items-center justify-center px-4 py-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
                KYC Verification
            </h1>

            <div className="w-full max-w-2xl shadow-lg rounded-2xl p-6 md:p-10">

                {/* Stepper */}
                <div className="flex justify-between mb-8">
                {steps.map((label, index) => (
                    <div key={index} className="flex-1 text-center">
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center  
                    ${step >= index ? 'bg-[#0500ff] text-white dark:bg-isoColor2 dark:text-black' : 'bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 text-black'}`}>
                        {index + 1}
                    </div>
                    <p className="text-xs mt-2">{label}</p>
                    </div>
                ))}
                </div>

                <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={schemas[step]}
                validateOnMount
                onSubmit={async (values) => {
                    if (step < steps.length - 1) {
                    setStep(step + 1);
                    } else {
                      try {
                          // ✅ API submit
                          setLoading(true);
                          setSuccess(false);
                          setError(false);
                          const res = await axios.patch(
                                      `/api/auth/users/kyc/submit?userId=${user._id}`,
                                      {
                                        "date_of_birth": values.date_of_birth,
                                        "phone": values.phone,
                                        "address": values.address,
                                        "state": values.state,
                                        "country": values.country,
                                        "zip_code": values.zip_code,
                                        "document_type": values.document_type,
                                        "identity_file": values.identity_file,
                                      },
                                      {
                                        withCredentials: true,
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                      }
                          );

                          console.log(res);

                          if (res.status === 200) {
                            localStorage.removeItem(STORAGE_KEY);
                            setLoading(false);
                            setSuccess(true);
                          } else {
                            setLoading(false);
                            setError(true);
                          }
                        } catch (err) {
                        setLoading(false);
                        setError(true);
                        console.log(err);
                      }
                    }
                }}
                >
                {({ setFieldValue, values, isValid }) => {

                    // ✅ Save to localStorage
                    useEffect(() => {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
                    }, [values]);

                    return (
                    <Form className="space-y-5">

                        <AnimatePresence mode="wait">

                        {/* STEP CONTENT */}
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >

                            {step === 0 && (
                            <div className='space-y-2 w-full'>
                                <Field type="date" name="date_of_birth" className="w-full border p-3 rounded-lg dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2" />
                                <ErrorMessage name="date_of_birth" component="div" className="text-red-500 text-sm" />

                                <Field name="phone" placeholder="Phone" className="w-full border p-3 rounded-lg dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2" />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                            </div>
                            )}

                            {step === 1 && (
                            <div className='space-y-2'>
                                <Field name="address" placeholder="Address" className="w-full border p-3 rounded-lg dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2" />
                                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />

                                <div className="grid grid-cols-2 gap-4">
                                <Field name="state" placeholder="State" className="border p-3 rounded-lg" />
                                <Field name="country" placeholder="Country" className="border p-3 rounded-lg" />
                                </div>

                                <Field name="zip_code" placeholder="Zip Code" className="w-full border p-3 rounded-lg dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2" />
                            </div>
                            )}

                            {step === 2 && (
                            <div className='space-y-2'>
                                <Field as="select" name="document_type" className="w-full border p-3 rounded-lg dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2">
                                <option value="">Select Document</option>
                                <option value="passport">Passport</option>
                                <option value="national_id">National ID</option>
                                </Field>

                                <input
                                type="file"
                                name='identity_file'
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setFieldValue('identity_file', file?.name);
                                    setFileName(file?.name);
                                }}
                                className="w-full border p-3 rounded-lg dark:bg-isoDark2 dark:border-neutral-600 dark:text-neutral-500 dark:md:bg-isoDark dark:focus:border-isoColor2"
                                />
                            </div>
                            )}

                        </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex justify-between pt-4">
                        {step > 0 && (
                            <button type="button" onClick={() => setStep(step - 1)} className="border px-4 py-2 rounded-lg">
                            Back
                            </button>
                        )}

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`ml-auto px-6 py-2 rounded-lg  
                            ${isValid ? 'bg-[#0500ff] text-white dark:bg-isoColor2 dark:text-black' : 'bg-[#f4f4f7] dark:bg-isoDark2 dark:text-isoColor2 text-black cursor-not-allowed'}`}
                        >
                            {step === steps.length - 1 ? 'Submit' : 'Next'}
                        </button>
                        </div>

                    </Form>
                    );
                }}
                </Formik>

            </div>

            {isSuccess === true && (<div className="w-full fixed top-0 bottom-0 left-0 right-0 h-full p-10 flex container mx-auto justify-center bg-black/70 items-center loading-modal">
                                                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 dark:bg-isoDark2 bg-white space-y-4">
                                                  <div className='flex justify-center items-center w-full'><FaRegCircleCheck className='w-16 text-green-500 h-16' /></div>
                                    
                                                  <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>KYC Submitted Successful!</h1>
                                    
                                                  <p className='text-xs text-center'>
                                                    The Information you submitted has been successfully sent. {process.env.NEXT_PUBLIC_COMPANY_NAME} is validating your details and you'll be notified went the verification is completed. Thank you.
                                                  </p>
                                    
                                                  
                                    
                                                  <a
                                                    href="/dashboard"
                                                    className="w-full py-3 dark:bg-isoColor2 dark:text-black text-center rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                  >
                                                          OK
                                                  </a>
                                                </div>
            </div>)} 

            {isError === true && (<div className="w-full fixed top-0 left-0 right-0 bottom-0 h-full p-10 flex justify-center bg-black/70 items-center loading-modal">
                                                <div className="rounded-2xl md:w-96 duration-500 transition-all h-fit w-full  flex flex-col items-center py-5 px-3 bg-white dark:bg-isoDark2 space-y-4">
                                                  <div className='flex justify-center items-center w-full'><MdErrorOutline className='w-16 text-red-500 h-16' /></div>
                                    
                                                  <h1 className='px-6 text-lg font-medium text-center md:font-semibold'>KYC Submitted Failed!</h1>
                                    
                                                  <p className='text-xs text-center'>
                                                    The Information you submitted failed. {process.env.NEXT_PUBLIC_COMPANY_NAME} encountered issues while validating your details and you'll be notified went the verification is completed. Thank you.
                                                  </p>
                                    
                                                  
                                    
                                                  <div
                                                    onClick={() => setError(false)}
                                                    className="w-full py-3 text-center dark:bg-isoColor2 dark:text-black rounded-xl bg-isoColor1 text-md hover:bg-isoColor2 hover:text-black text-white"
                                                  >
                                                          OK
                                                  </div>
                                                </div>
            </div>)}
          </div>

        </div>

    </div>
  );
}