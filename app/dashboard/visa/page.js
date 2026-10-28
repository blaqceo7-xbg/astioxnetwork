"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  FileText,
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  Wallet,
  Copy,
  Moon,
  Sun,
  Info,
  LoaderCircle,
} from "lucide-react";

// Keep the existing Astiox Network header and footer.
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const COMPANY =
  process.env.NEXT_PUBLIC_COMPANY_NAME || "Astiox Network";

const PAYMENT_ADDRESS =
  process.env.NEXT_PUBLIC_TETHER_USDT || "dgdgdgdgdggdgdgdgdgdgdggdgdg";

const ASSISTANCE_FEE =
  Number(process.env.NEXT_PUBLIC_VISA_ASSISTANCE_FEE_USDT || 19000);

const initialValues = {
  // Step 1: Personal information
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  residenceCountry: "",
  maritalStatus: "",

  // Step 2: Travel information
  destination: "Canada",
  travelPurpose: "",
  intendedArrival: "",
  intendedDeparture: "",
  passportNumber: "",
  passportExpiry: "",
  previousTravel: "",
  previousVisaRefusal: "",

  // Step 3: Education
  educationLevel: "",
  institution: "",
  graduationYear: "",
  fieldOfStudy: "",

  // Step 4: Additional information
  residentialAddress: "",
  city: "",
  postalCode: "",
  preferredLanguage: "",
  dependants: "",
  additionalInformation: "",

  // Step 5: Employment
  employmentStatus: "",
  occupation: "",
  employer: "",
  employerCountry: "",
  workExperience: "",
  monthlyIncome: "",

  // Step 6: Review and payment
  privacyConsent: false,
  serviceConsent: false,
  transactionID: "",
};

const validationSchemas = {
  1: Yup.object({
    firstName: Yup.string().trim().required("First name is required."),
    lastName: Yup.string().trim().required("Last name is required."),
    email: Yup.string()
      .email("Enter a valid email address.")
      .required("Email is required."),
    phone: Yup.string().required("Phone number is required."),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future.")
      .required("Date of birth is required."),
    gender: Yup.string().required("Select your gender."),
    nationality: Yup.string().required("Select your nationality."),
    residenceCountry: Yup.string().required(
      "Select your country of residence."
    ),
    maritalStatus: Yup.string().required("Select your marital status."),
  }),

  2: Yup.object({
    destination: Yup.string()
      .oneOf(["Canada", "United States"])
      .required("Choose your destination."),
    travelPurpose: Yup.string().required("Select a travel purpose."),
    intendedArrival: Yup.date().required("Enter your intended arrival date."),
    intendedDeparture: Yup.date()
      .min(
        Yup.ref("intendedArrival"),
        "Departure must be on or after arrival."
      )
      .required("Enter your intended departure date."),
    passportNumber: Yup.string().required("Enter your passport number."),
    passportExpiry: Yup.date()
      .min(new Date(), "Your passport expiry date must be in the future.")
      .required("Passport expiry date is required."),
    previousTravel: Yup.string().required("Please answer this question."),
    previousVisaRefusal: Yup.string().required(
      "Please answer this question."
    ),
  }),

  3: Yup.object({
    educationLevel: Yup.string().required(
      "Select your highest education level."
    ),
    institution: Yup.string().required("Enter your institution."),
    graduationYear: Yup.number()
      .typeError("Enter a valid graduation year.")
      .integer("Enter a valid year.")
      .min(1900, "Enter a valid year.")
      .max(new Date().getFullYear() + 10, "Enter a valid year.")
      .required("Graduation year is required."),
    fieldOfStudy: Yup.string().required("Enter your field of study."),
  }),

  4: Yup.object({
    residentialAddress: Yup.string()
      .trim()
      .required("Enter your residential address."),
    city: Yup.string().required("Enter your city."),
    postalCode: Yup.string().required("Enter your postal code."),
    preferredLanguage: Yup.string().required(
      "Select your preferred language."
    ),
    dependants: Yup.string().required("Please select an answer."),
  }),

  5: Yup.object({
    employmentStatus: Yup.string().required(
      "Select your employment status."
    ),
    occupation: Yup.string().required("Enter your occupation."),
    employer: Yup.string().required(
      "Enter your employer or institution, or N/A."
    ),
    employerCountry: Yup.string().required("Enter the country."),
    workExperience: Yup.string().required(
      "Select your work experience."
    ),
    monthlyIncome: Yup.string().required(
      "Select your monthly income range."
    ),
  }),

  6: Yup.object({
    privacyConsent: Yup.boolean().oneOf(
      [true],
      "You must consent to the handling of your application information."
    ),
    serviceConsent: Yup.boolean().oneOf(
      [true],
      "Please confirm that you understand the nature of this service."
    ),
    transactionID: Yup.string().trim().required(
      "Enter the payment transaction reference, or submit a payment receipt reference."
    ),
  }),
};

const steps = [
  { title: "Personal details", icon: UserRound },
  { title: "Travel details", icon: Globe2 },
  { title: "Education", icon: GraduationCap },
  { title: "Additional details", icon: FileText },
  { title: "Employment", icon: BriefcaseBusiness },
  { title: "Review & payment", icon: Wallet },
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia",
  "Bangladesh", "Belgium", "Benin", "Botswana", "Brazil", "Cameroon",
  "Canada", "China", "Colombia", "Democratic Republic of the Congo",
  "Egypt", "Ethiopia", "France", "Gambia", "Germany", "Ghana",
  "India", "Indonesia", "Iran", "Ireland", "Italy", "Jamaica",
  "Japan", "Kenya", "Liberia", "Malaysia", "Mexico", "Morocco",
  "Nepal", "Netherlands", "New Zealand", "Nigeria", "Pakistan",
  "Philippines", "Portugal", "Rwanda", "Saudi Arabia", "Senegal",
  "Sierra Leone", "Singapore", "Somalia", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Tanzania", "Togo", "Turkey", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Vietnam", "Zambia", "Zimbabwe",
];

function InputField({
  name,
  label,
  type = "text",
  placeholder,
  as,
  options,
  rows,
}) {
  const base =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-isoColor1 focus:ring-2 focus:ring-isoColor1/10 dark:border-neutral-700 dark:bg-isoDark dark:text-white dark:focus:border-isoColor2";

  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-200"
      >
        {label}
      </label>

      {options ? (
        <Field as="select" id={name} name={name} className={base}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </Field>
      ) : as === "textarea" ? (
        <Field
          as="textarea"
          id={name}
          name={name}
          rows={rows || 3}
          placeholder={placeholder}
          className={base}
        />
      ) : (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={base}
        />
      )}

      <ErrorMessage name={name}>
        {(message) => (
          <p className="mt-1.5 text-xs text-red-500">{message}</p>
        )}
      </ErrorMessage>
    </div>
  );
}

function YesNoOptions() {
  return [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-isoColor1 dark:text-isoColor2">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}

export default function VisaApplicationPage() {
  const [step, setStep] = useState(0);
  const [qr, setQr] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [applicationReference, setApplicationReference] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!PAYMENT_ADDRESS) return;

    QRCode.toDataURL(PAYMENT_ADDRESS, {
      width: 220,
      margin: 2,
      color: { dark: "#111827", light: "#ffffff" },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, []);

  const copyAddress = async () => {
    if (!PAYMENT_ADDRESS) {
      setNotice("The payment address has not been configured yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(PAYMENT_ADDRESS);
      setNotice("USDT wallet address copied.");
    } catch {
      setNotice("Copy was unavailable. Select the wallet address to copy it.");
    }
  };

  async function submitApplication(values) {
    setNotice("");

    if (!PAYMENT_ADDRESS) {
      setNotice(
        "Payment is not configured. Please contact Astiox Network before making a payment."
      );
      return;
    }

    setSubmitting(true);

    try {
      // Create the application record on your own backend.
      // Implement authentication, server-side validation, and secure storage
      // in /api/visa-applications before accepting real applications.
      const response = await fetch("/api/visa-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          service: "Private visa application assistance",
          destination: values.destination,
          payment: {
            currency: "USDT",
            walletAddress: PAYMENT_ADDRESS,
            assistanceFee: ASSISTANCE_FEE,
            transactionID: values.transactionID,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit your application."
        );
      }

      setApplicationReference(
        result.applicationReference || result.reference || ""
      );
      setComplete(true);
    } catch (error) {
      setNotice(
        error.message ||
          "Your application could not be submitted. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const themeClasses = darkMode
    ? "dark bg-isoDark text-white"
    : "bg-white text-gray-900";

  return (
    <main
      className={`${themeClasses} min-h-screen font-[family-name:var(--font-geist-sans)] transition-colors duration-200`}
    >
      <div className="hidden w-full md:block">
        <Header />
      </div>

      {/* Application content */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-5 sm:px-6 md:pt-10 lg:px-8">
        {/* Top actions */}
        <div className="mb-7 flex items-center justify-between gap-3">
          <a
            href="/dashboard"
            className="flex min-w-0 items-center gap-2 text-sm font-semibold text-gray-700 hover:text-isoColor1 dark:text-neutral-200 dark:hover:text-isoColor2"
          >
            <ArrowLeft size={17} />
            <span className="truncate">{COMPANY}</span>
          </a>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle color theme"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 dark:border-neutral-700 dark:hover:bg-isoDark2"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {!complete && (
          <div>
            {/* Hero */}
            {step === 0 && (
              <section className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-isoColor1 to-blue-800 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
                <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border-[35px] border-white/10" />
                <div className="pointer-events-none absolute -bottom-36 right-24 h-72 w-72 rounded-full border-[45px] border-white/10" />

                <div className="relative z-10 max-w-3xl">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium">
                    <ShieldCheck size={16} />
                    Astiox visa assistance
                  </div>

                  <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    Start planning your next chapter in Canada or the United
                    States.
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                    Complete your profile step by step. Astiox Network provides
                    private application assistance and document preparation
                    support. 
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-isoColor1 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
                    >
                      Apply Now <ArrowRight size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById("application-process")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="rounded-xl border border-white/30 px-7 py-4 text-sm font-semibold transition hover:bg-white/10"
                    >
                      How it works
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/80">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={15} /> Six guided steps
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={15} /> Mobile-friendly application
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={15} /> Review before submission
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* Intro cards */}
            {step === 0 && (
              <section
                id="application-process"
                className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {[
                  {
                    icon: FileText,
                    title: "Complete your profile",
                    description:
                      "Provide accurate personal, travel, education, and employment details.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Review your answers",
                    description:
                      "Check your information and consent before submitting.",
                  },
                  {
                    icon: Globe2,
                    title: "Understand your next steps",
                    description:
                      "Receive a reference for your private assistance application.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-gray-200 p-5 dark:border-neutral-700 dark:bg-isoDark2"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-isoColor1/10 text-isoColor1 dark:bg-isoColor2/10 dark:text-isoColor2">
                        <Icon size={21} />
                      </div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </section>
            )}

            {/* Stepper */}
            {step > 0 && (
              <section className="mb-8">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-isoColor1 dark:text-isoColor2">
                      Application progress
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                      Step {step} of 6
                    </p>
                  </div>

                  <span className="rounded-full bg-isoColor1/10 px-3 py-1.5 text-xs font-semibold text-isoColor1 dark:bg-isoColor2/10 dark:text-isoColor2">
                    {Math.round((step / 6) * 100)}% complete
                  </span>
                </div>

                <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-isoColor1 transition-all duration-300 dark:bg-isoColor2"
                    style={{ width: `${(step / 6) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {steps.map((item, index) => {
                    const Icon = item.icon;
                    const active = step === index + 1;
                    const finished = step > index + 1;

                    return (
                      <button
                        type="button"
                        key={item.title}
                        disabled={index + 1 > step}
                        onClick={() => {
                          if (finished) setStep(index + 1);
                        }}
                        className={`flex min-w-0 flex-col items-center gap-2 rounded-xl px-1 py-3 text-center text-[10px] transition sm:text-xs ${
                          active
                            ? "bg-isoColor1 text-white dark:bg-isoColor2 dark:text-black"
                            : finished
                              ? "bg-isoColor1/10 text-isoColor1 dark:bg-isoColor2/10 dark:text-isoColor2"
                              : "bg-gray-50 text-gray-400 dark:bg-isoDark2"
                        }`}
                      >
                        {finished ? (
                          <CheckCircle2 size={19} />
                        ) : (
                          <Icon size={19} />
                        )}
                        <span className="leading-tight">{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Form */}
            {step > 0 && (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchemas[step]}
                validateOnMount={false}
                onSubmit={async (values, helpers) => {
                  if (step < 6) {
                    setNotice("");
                    setStep(step + 1);
                    helpers.setTouched({});
                    return;
                  }

                  await submitApplication(values);
                }}
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
                    <div className="min-w-0 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-isoDark2 sm:p-8">
                      {/* STEP 1 */}
                      {step === 1 && (
                        <>
                          <SectionHeading
                            eyebrow="Step 1 · About you"
                            title="Personal information"
                            description="Enter your details as they appear on your official documents."
                          />

                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <InputField
                              name="firstName"
                              label="First / given name"
                              placeholder="Enter your given name"
                            />
                            <InputField
                              name="lastName"
                              label="Last / family name"
                              placeholder="Enter your family name"
                            />
                            <InputField
                              name="email"
                              label="Email address"
                              type="email"
                              placeholder="you@example.com"
                            />
                            <InputField
                              name="phone"
                              label="Phone number"
                              type="tel"
                              placeholder="+233 ..."
                            />
                            <InputField
                              name="dateOfBirth"
                              label="Date of birth"
                              type="date"
                            />
                            <InputField
                              name="gender"
                              label="Gender"
                              options={[
                                "Male",
                                "Female",
                                "Prefer not to say",
                              ]}
                            />
                            <InputField
                              name="nationality"
                              label="Nationality"
                              options={countries}
                            />
                            <InputField
                              name="residenceCountry"
                              label="Country of residence"
                              options={countries}
                            />
                            <InputField
                              name="maritalStatus"
                              label="Marital status"
                              options={[
                                "Single",
                                "Married",
                                "Divorced",
                                "Widowed",
                                "Common-law",
                                "Prefer not to say",
                              ]}
                            />
                          </div>
                        </>
                      )}

                      {/* STEP 2 */}
                      {step === 2 && (
                        <>
                          <SectionHeading
                            eyebrow="Step 2 · Your journey"
                            title="Travel information"
                            description="Tell us about your intended visit. These answers determine visa eligibility."
                          />

                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <InputField
                              name="destination"
                              label="Destination country"
                              options={["Canada", "United States"]}
                            />
                            <InputField
                              name="travelPurpose"
                              label="Purpose of travel"
                              options={[
                                "Tourism / vacation",
                                "Visit family or friends",
                                "Business",
                                "Study",
                                "Work",
                                "Transit",
                                "Other",
                              ]}
                            />
                            <InputField
                              name="intendedArrival"
                              label="Intended arrival date"
                              type="date"
                            />
                            <InputField
                              name="intendedDeparture"
                              label="Intended departure date"
                              type="date"
                            />
                            <InputField
                              name="passportNumber"
                              label="Passport number"
                              placeholder="Enter passport number"
                            />
                            <InputField
                              name="passportExpiry"
                              label="Passport expiry date"
                              type="date"
                            />
                            <InputField
                              name="previousTravel"
                              label="Have you travelled internationally before?"
                              options={YesNoOptions()}
                            />
                            <InputField
                              name="previousVisaRefusal"
                              label="Have you previously been refused a visa?"
                              options={YesNoOptions()}
                            />
                          </div>

                          <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                            Only enter accurate information. Do not upload or
                            send passport scans through an unsecured channel.
                          </div>
                        </>
                      )}

                      {/* STEP 3 */}
                      {step === 3 && (
                        <>
                          <SectionHeading
                            eyebrow="Step 3 · Your background"
                            title="Education"
                            description="Provide details about your highest level of education."
                          />

                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <InputField
                              name="educationLevel"
                              label="Highest education level"
                              options={[
                                "Primary",
                                "Secondary / High school",
                                "Vocational / Technical",
                                "Diploma",
                                "Bachelor's degree",
                                "Master's degree",
                                "Doctorate",
                                "Other",
                              ]}
                            />
                            <InputField
                              name="institution"
                              label="School / institution"
                              placeholder="Institution name"
                            />
                            <InputField
                              name="graduationYear"
                              label="Graduation year"
                              type="number"
                              placeholder="e.g. 2022"
                            />
                            <InputField
                              name="fieldOfStudy"
                              label="Field of study"
                              placeholder="e.g. Business Administration"
                            />
                          </div>
                        </>
                      )}

                      {/* STEP 4 */}
                      {step === 4 && (
                        <>
                          <SectionHeading
                            eyebrow="Step 4 · Contact details"
                            title="Additional information"
                            description="Add your current residential and contact information."
                          />

                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <InputField
                                name="residentialAddress"
                                label="Residential address"
                                placeholder="Street and residential address"
                              />
                            </div>
                            <InputField
                              name="city"
                              label="City / town"
                              placeholder="Enter your city"
                            />
                            <InputField
                              name="postalCode"
                              label="Postal / ZIP code"
                              placeholder="Enter postal code"
                            />
                            <InputField
                              name="preferredLanguage"
                              label="Preferred language"
                              options={[
                                "English",
                                "French",
                                "Spanish",
                                "Arabic",
                                "Other",
                              ]}
                            />
                            <InputField
                              name="dependants"
                              label="Will dependants travel with you?"
                              options={YesNoOptions()}
                            />
                            <div className="sm:col-span-2">
                              <InputField
                                name="additionalInformation"
                                label="Other relevant information (optional)"
                                as="textarea"
                                rows={4}
                                placeholder="Share any additional details relevant to your request."
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* STEP 5 */}
                      {step === 5 && (
                        <>
                          <SectionHeading
                            eyebrow="Step 5 · Professional background"
                            title="Employment information"
                            description="Tell us about your current employment or other professional circumstances."
                          />

                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <InputField
                              name="employmentStatus"
                              label="Employment status"
                              options={[
                                "Employed",
                                "Self-employed",
                                "Business owner",
                                "Student",
                                "Unemployed",
                                "Retired",
                                "Other",
                              ]}
                            />
                            <InputField
                              name="occupation"
                              label="Occupation"
                              placeholder="Your current occupation"
                            />
                            <InputField
                              name="employer"
                              label="Employer / institution"
                              placeholder="Enter name or N/A"
                            />
                            <InputField
                              name="employerCountry"
                              label="Country of employment"
                              options={countries}
                            />
                            <InputField
                              name="workExperience"
                              label="Total work experience"
                              options={[
                                "No experience",
                                "Less than 1 year",
                                "1–3 years",
                                "4–6 years",
                                "7–10 years",
                                "More than 10 years",
                              ]}
                            />
                            <InputField
                              name="monthlyIncome"
                              label="Monthly income range"
                              options={[
                                "No current income",
                                "Under $500",
                                "$500–$1,499",
                                "$1,500–$2,999",
                                "$3,000–$4,999",
                                "$5,000 or more",
                                "Prefer not to say",
                              ]}
                            />
                          </div>
                        </>
                      )}

                      {/* STEP 6 */}
                      {step === 6 && (
                        <>
                          <SectionHeading
                            eyebrow="Step 6 · Final review"
                            title="Review your application"
                            description="Confirm the information below before submitting your visa assistance request."
                          />

                          <div className="space-y-5">
                            {[
                              {
                                title: "Personal information",
                                fields: [
                                  ["Full name", `${values.firstName} ${values.lastName}`],
                                  ["Email", values.email],
                                  ["Phone", values.phone],
                                  ["Date of birth", values.dateOfBirth],
                                  ["Nationality", values.nationality],
                                  ["Residence", values.residenceCountry],
                                ],
                              },
                              {
                                title: "Travel information",
                                fields: [
                                  ["Destination", values.destination],
                                  ["Purpose", values.travelPurpose],
                                  ["Arrival", values.intendedArrival],
                                  ["Departure", values.intendedDeparture],
                                  ["Passport number", values.passportNumber],
                                  ["Passport expiry", values.passportExpiry],
                                ],
                              },
                              {
                                title: "Education",
                                fields: [
                                  ["Highest education", values.educationLevel],
                                  ["Institution", values.institution],
                                  ["Graduation year", values.graduationYear],
                                  ["Field of study", values.fieldOfStudy],
                                ],
                              },
                              {
                                title: "Employment",
                                fields: [
                                  ["Status", values.employmentStatus],
                                  ["Occupation", values.occupation],
                                  ["Employer", values.employer],
                                  ["Country", values.employerCountry],
                                ],
                              },
                            ].map((section) => (
                              <div
                                key={section.title}
                                className="rounded-2xl border border-gray-200 p-4 dark:border-neutral-700"
                              >
                                <h3 className="mb-3 font-semibold">
                                  {section.title}
                                </h3>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                  {section.fields.map(([label, value]) => (
                                    <div key={label} className="min-w-0">
                                      <p className="text-xs text-gray-500 dark:text-neutral-400">
                                        {label}
                                      </p>
                                      <p className="mt-1 break-words text-sm font-medium">
                                        {value || "Not provided"}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 rounded-2xl border border-gray-200 p-4 dark:border-neutral-700">
                            <div className="mb-3 flex items-center gap-2">
                              <Wallet
                                size={20}
                                className="text-isoColor1 dark:text-isoColor2"
                              />
                              <h3 className="font-semibold">
                                Visa assistance fee
                              </h3>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                              <span className="text-sm text-gray-500 dark:text-neutral-400">
                                Service fee
                              </span>
                              <span className="text-xl font-bold">
                                {ASSISTANCE_FEE.toLocaleString("en-US")} USDT
                              </span>
                            </div>

                            <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-neutral-400">
                              This is the official Astiox visa service fee, authorized by government visa fee. Confirm the fee and
                              payment network with Astiox Network before paying.
                              Payment does not guarantee visa approval.
                            </p>
                          </div>

                          <div className="mt-6 space-y-4">
                            <label className="flex items-start gap-3 text-sm leading-6">
                              <Field
                                type="checkbox"
                                name="privacyConsent"
                                className="mt-1 h-4 w-4 accent-isoColor1"
                              />
                              <span>
                                I consent to Astiox Network processing the
                                information I have provided for the purpose of
                                responding to my private visa-assistance
                                request. I have read the applicable privacy
                                notice.
                              </span>
                            </label>
                            <ErrorMessage name="privacyConsent">
                              {(message) => (
                                <p className="text-xs text-red-500">{message}</p>
                              )}
                            </ErrorMessage>

                            <label className="flex items-start gap-3 text-sm leading-6">
                              <Field
                                type="checkbox"
                                name="serviceConsent"
                                className="mt-1 h-4 w-4 accent-isoColor1"
                              />
                              <span>
                                I understand Astiox Network is a private
                                assistance service, is not a government
                                immigration authority, and cannot guarantee a
                                visa or immigration outcome.
                              </span>
                            </label>
                            <ErrorMessage name="serviceConsent">
                              {(message) => (
                                <p className="text-xs text-red-500">{message}</p>
                              )}
                            </ErrorMessage>
                          </div>

                          <div className="mt-6 rounded-2xl bg-gray-50 p-4 dark:bg-isoDark">
                            <h3 className="mb-2 font-semibold">
                              USDT payment instructions
                            </h3>
                            <p className="mb-4 text-sm leading-6 text-gray-500 dark:text-neutral-400">
                              Verify the receiving address and supported
                              network independently before sending any funds.
                              Never send funds to an address you have not
                              verified.
                            </p>

                            {PAYMENT_ADDRESS ? (
                              <>
                                {qr && (
                                  <div className="mb-4 flex justify-center rounded-xl bg-white p-4">
                                    <img
                                      src={qr}
                                      alt="USDT payment address QR code"
                                      className="h-44 w-44"
                                    />
                                  </div>
                                )}

                                <label
                                  htmlFor="payment-address"
                                  className="mb-2 block text-xs font-medium"
                                >
                                  Receiving wallet address
                                </label>

                                <div className="flex gap-2">
                                  <input
                                    id="payment-address"
                                    readOnly
                                    value={PAYMENT_ADDRESS}
                                    className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs text-gray-700 outline-none dark:border-neutral-700 dark:bg-isoDark dark:text-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={copyAddress}
                                    className="flex shrink-0 items-center gap-2 rounded-xl bg-isoColor1 px-3 text-sm font-semibold text-white dark:bg-isoColor2 dark:text-black"
                                  >
                                    <Copy size={16} />
                                    <span className="hidden sm:inline">Copy</span>
                                  </button>
                                </div>

                                <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
                                  Network: verify the configured USDT network
                                  with the service before sending. Sending on
                                  an unsupported network can result in
                                  irreversible loss.
                                </p>
                              </>
                            ) : (
                              <p className="text-sm text-amber-700 dark:text-amber-300">
                                The USDT wallet address has not been configured.
                                No payment should be sent until the address and
                                network have been verified.
                              </p>
                            )}

                            <div className="mt-5">
                              <InputField
                                name="transactionID"
                                label="Transaction reference / hash"
                                placeholder="Enter the transaction hash after payment"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {notice && (
                        <div
                          role="alert"
                          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
                        >
                          {notice}
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 dark:border-neutral-700 sm:flex-row sm:items-center sm:justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setNotice("");
                            if (step > 1) setStep(step - 1);
                            else setStep(0);
                          }}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold transition hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-isoDark"
                        >
                          <ArrowLeft size={16} />
                          {step === 1 ? "Back to welcome" : "Previous step"}
                        </button>

                        <button
                          type="submit"
                          disabled={submitting || isSubmitting}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-isoColor1 px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-isoColor2 dark:text-black"
                        >
                          {submitting || isSubmitting ? (
                            <>
                              <LoaderCircle size={17} className="animate-spin" />
                              Submitting...
                            </>
                          ) : step === 6 ? (
                            <>
                              Submit application <CheckCircle2 size={17} />
                            </>
                          ) : (
                            <>
                              Continue <ArrowRight size={17} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-4">
                      <div className="rounded-2xl border border-gray-200 p-5 dark:border-neutral-700 dark:bg-isoDark2">
                        <div className="mb-3 flex items-center gap-2">
                          <ShieldCheck
                            size={20}
                            className="text-isoColor1 dark:text-isoColor2"
                          />
                          <h3 className="font-semibold">Before you begin</h3>
                        </div>
                        <ul className="space-y-3 text-sm leading-6 text-gray-500 dark:text-neutral-400">
                          <li>• Use accurate information.</li>
                          <li>• Check dates and spelling.</li>
                          <li>• Review your answers before submission.</li>
                          <li>• Keep your application reference.</li>
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-gray-200 p-5 dark:border-neutral-700 dark:bg-isoDark2">
                        <div className="mb-3 flex items-center gap-2">
                          <Info
                            size={20}
                            className="text-isoColor1 dark:text-isoColor2"
                          />
                          <h3 className="font-semibold">Important notice</h3>
                        </div>
                        <p className="text-sm leading-6 text-gray-500 dark:text-neutral-400">
                          This application is for private assistance only.
                          Official application procedures, government fees,
                          eligibility requirements, and decisions are controlled
                          by the relevant government.
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-5 dark:bg-isoDark2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                          Need help?
                        </p>
                        <p className="mt-2 text-sm leading-6">
                          Contact {COMPANY} using the verified contact details
                          published on your official website before sharing
                          sensitive information or sending payment.
                        </p>
                      </div>
                    </aside>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        )}

        {/* Completion screen */}
        {complete && (
          <section className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm dark:border-neutral-700 dark:bg-isoDark2 sm:p-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
              <CheckCircle2 size={34} />
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Application submitted
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 dark:text-neutral-400">
              Your private assistance request has been received. Keep your
              application reference for future correspondence.
            </p>

            {applicationReference && (
              <div className="mt-6 rounded-2xl bg-gray-50 p-5 dark:bg-isoDark">
                <p className="text-xs text-gray-500 dark:text-neutral-400">
                  Application reference
                </p>
                <p className="mt-2 break-all text-lg font-bold">
                  {applicationReference}
                </p>
              </div>
            )}

            <p className="mt-6 text-xs leading-5 text-gray-500 dark:text-neutral-400">
              Submission does not mean payment has been independently verified
              or that a visa has been approved. Government authorities make all
              official visa decisions.
            </p>

            <a
              href="/"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-isoColor1 px-7 py-3.5 text-sm font-semibold text-white dark:bg-isoColor2 dark:text-black"
            >
              Return home
            </a>
          </section>
        )}
      </div>
      <Footer tab="visa-assistance" />
    </main>
  );
}
