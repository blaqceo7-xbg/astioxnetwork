"use client"

import { useAuth } from '@/app/context/AuthContext';
import React from 'react'
import {
    LuArrowDownToLine,
    LuArrowUpToLine,
    LuWallet,
    LuTrendingUp,
    LuTrendingDown,
    LuShieldCheck
} from 'react-icons/lu';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { useBalanceStore } from './../../store/useBalanceStore'

export const Balance = () => {
    const { user } = useAuth();

    const { isVisible, toggleVisibility } = useBalanceStore()
    const { isVisible2, toggleVisibility2 } = useBalanceStore()

    return (
        <section className="w-full space-y-4 md:space-y-6">

            {/* ================= TOTAL BALANCE ================= */}
            <div className="
                relative overflow-hidden
                w-full rounded-[28px]
                border border-neutral-200/80
                dark:border-neutral-700/70
                bg-white dark:bg-isoDark
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                dark:shadow-none
                transition-all duration-300
                hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)]
            ">

                {/* Decorative crypto glow */}
                <div className="
                    pointer-events-none absolute
                    -right-20 -top-20
                    h-56 w-56
                    rounded-full
                    bg-isoColor1/10
                    dark:bg-isoColor2/10
                    blur-3xl
                " />

                <div className="
                    pointer-events-none absolute
                    -bottom-24 -left-20
                    h-48 w-48
                    rounded-full
                    bg-isoColor2/10
                    blur-3xl
                " />

                <div className="relative p-5 md:p-7 lg:p-8">

                    {/* Header */}
                    <div className="flex items-start justify-between">

                        <div className="flex items-center gap-3">

                            <div className="
                                flex h-11 w-11
                                items-center justify-center
                                rounded-2xl
                                bg-isoColor1/10
                                text-isoColor1
                                dark:bg-isoColor2/10
                                dark:text-isoColor2
                            ">
                                <LuWallet className="h-5 w-5" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="
                                        text-xs font-medium
                                        uppercase tracking-wider
                                        text-neutral-500
                                        dark:text-neutral-400
                                    ">
                                        Est. Total Balance
                                    </span>

                                    <button
                                        type="button"
                                        onClick={toggleVisibility}
                                        className="
                                            flex h-7 w-7
                                            items-center justify-center
                                            rounded-full
                                            bg-neutral-100
                                            dark:bg-neutral-800
                                            text-neutral-500
                                            hover:text-isoColor1
                                            dark:hover:text-isoColor2
                                            transition
                                        "
                                        aria-label="Toggle total balance"
                                    >
                                        {isVisible ? (
                                            <RxEyeOpen className="h-4 w-4" />
                                        ) : (
                                            <RxEyeClosed className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                <p className="
                                    mt-1 text-[11px]
                                    text-neutral-400
                                ">
                                    Your portfolio value
                                </p>
                            </div>

                        </div>

                        {/* Status */}
                        <div className="
                            hidden sm:flex
                            items-center gap-1.5
                            rounded-full
                            border border-emerald-500/20
                            bg-emerald-500/10
                            px-3 py-1.5
                            text-[11px] font-medium
                            text-emerald-600
                            dark:text-emerald-400
                        ">
                            <span className="
                                h-1.5 w-1.5
                                rounded-full
                                bg-emerald-500
                            " />
                            Active
                        </div>

                    </div>

                    {/* Balance */}
                    <div className="
                        mt-7 flex
                        flex-col gap-5
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    ">

                        <div>

                            {isVisible ? (
                                <h1 className="
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-neutral-900
                                    dark:text-white
                                    md:text-5xl
                                ">
                                    ${user?.balance?.toLocaleString()}
                                </h1>
                            ) : (
                                <div className="flex h-[48px] items-center gap-2">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <span
                                            key={item}
                                            className="
                                                h-2.5 w-2.5
                                                rounded-full
                                                bg-neutral-900
                                                dark:bg-white
                                            "
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="
                                mt-3 flex items-center gap-2
                                text-xs text-neutral-400
                            ">
                                <LuTrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                <span>Available portfolio value</span>
                            </div>

                        </div>

                        <a
                            href="/dashboard/deposit"
                            className="
                                group
                                flex w-full sm:w-auto
                                items-center justify-center
                                gap-2
                                rounded-2xl
                                bg-isoColor1
                                px-5 py-3
                                text-sm font-semibold
                                text-white
                                shadow-lg
                                shadow-isoColor1/20
                                transition-all duration-300
                                hover:-translate-y-0.5
                                hover:shadow-xl
                                dark:bg-isoColor2
                                dark:text-black
                                dark:shadow-isoColor2/10
                            "
                        >
                            <LuArrowDownToLine
                                className="
                                    h-4 w-4
                                    transition-transform
                                    group-hover:translate-y-0.5
                                "
                            />
                            Deposit
                        </a>

                    </div>

                    {/* Bottom information strip */}
                    <div className="
                        mt-7 flex
                        items-center justify-between
                        border-t
                        border-neutral-100
                        pt-4
                        dark:border-neutral-700
                    ">

                        <div className="flex items-center gap-2">
                            <div className="
                                flex h-7 w-7
                                items-center justify-center
                                rounded-lg
                                bg-neutral-100
                                dark:bg-neutral-800
                            ">
                                <LuShieldCheck className="
                                    h-3.5 w-3.5
                                    text-isoColor1
                                    dark:text-isoColor2
                                " />
                            </div>

                            <span className="
                                text-[11px]
                                text-neutral-400
                            ">
                                Secure balance
                            </span>
                        </div>

                        <span className="
                            text-[11px]
                            font-medium
                            text-neutral-400
                        ">
                            USD
                        </span>

                    </div>

                </div>
            </div>


            {/* ================= AVAILABLE BALANCE ================= */}
            <div className="
                relative overflow-hidden
                w-full rounded-[28px]
                border border-neutral-200/80
                dark:border-neutral-700/70
                bg-white dark:bg-isoDark
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                dark:shadow-none
                transition-all duration-300
                hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)]
            ">

                <div className="
                    pointer-events-none absolute
                    -right-16 -bottom-24
                    h-52 w-52
                    rounded-full
                    bg-blue-500/10
                    blur-3xl
                " />

                <div className="relative p-5 md:p-7 lg:p-8">

                    {/* Header */}
                    <div className="flex items-start justify-between">

                        <div className="flex items-center gap-3">

                            <div className="
                                flex h-11 w-11
                                items-center justify-center
                                rounded-2xl
                                bg-blue-500/10
                                text-blue-500
                                dark:bg-isoColor2/10
                                dark:text-isoColor2
                            ">
                                <LuWallet className="h-5 w-5" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2">

                                    <span className="
                                        text-xs font-medium
                                        uppercase tracking-wider
                                        text-neutral-500
                                        dark:text-neutral-400
                                    ">
                                        Available Balance
                                    </span>

                                    <button
                                        type="button"
                                        onClick={toggleVisibility2}
                                        className="
                                            flex h-7 w-7
                                            items-center justify-center
                                            rounded-full
                                            bg-neutral-100
                                            dark:bg-neutral-800
                                            text-neutral-500
                                            hover:text-isoColor1
                                            dark:hover:text-isoColor2
                                            transition
                                        "
                                        aria-label="Toggle available balance"
                                    >
                                        {isVisible2 ? (
                                            <RxEyeOpen className="h-4 w-4" />
                                        ) : (
                                            <RxEyeClosed className="h-4 w-4" />
                                        )}
                                    </button>

                                </div>

                                <p className="
                                    mt-1 text-[11px]
                                    text-neutral-400
                                ">
                                    Funds available for withdrawal
                                </p>
                            </div>

                        </div>

                        <div className="
                            hidden sm:flex
                            rounded-full
                            bg-blue-500/10
                            px-3 py-1.5
                            text-[11px]
                            font-medium
                            text-blue-500
                            dark:bg-isoColor2/10
                            dark:text-isoColor2
                        ">
                            Available
                        </div>

                    </div>


                    {/* Balance */}
                    <div className="
                        mt-7 flex
                        flex-col gap-5
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    ">

                        <div>

                            {isVisible2 ? (
                                <h1 className="
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-neutral-900
                                    dark:text-white
                                    md:text-5xl
                                ">
                                    ${user?.earnings?.toLocaleString()}
                                </h1>
                            ) : (
                                <div className="flex h-[48px] items-center gap-2">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <span
                                            key={item}
                                            className="
                                                h-2.5 w-2.5
                                                rounded-full
                                                bg-neutral-900
                                                dark:bg-white
                                            "
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="
                                mt-3 flex items-center gap-2
                                text-xs text-neutral-400
                            ">
                                <LuTrendingDown className="h-3.5 w-3.5 text-red-500" />
                                Ready to withdraw
                            </div>

                        </div>


                        <a
                            href="/dashboard/withdrawal"
                            className="
                                group
                                flex w-full sm:w-auto
                                items-center justify-center
                                gap-2
                                rounded-2xl
                                border
                                border-neutral-200
                                bg-neutral-50
                                px-5 py-3
                                text-sm font-semibold
                                text-isoColor1
                                transition-all duration-300
                                hover:-translate-y-0.5
                                hover:bg-blue-50
                                dark:border-neutral-700
                                dark:bg-neutral-800
                                dark:text-isoColor2
                                dark:hover:bg-neutral-700
                            "
                        >
                            <LuArrowUpToLine
                                className="
                                    h-4 w-4
                                    transition-transform
                                    group-hover:-translate-y-0.5
                                "
                            />
                            Withdraw
                        </a>

                    </div>


                    {/* Bottom strip */}
                    <div className="
                        mt-7 grid
                        grid-cols-2
                        gap-3
                        border-t
                        border-neutral-100
                        pt-4
                        dark:border-neutral-700
                    ">

                        <div>
                            <p className="
                                text-[10px]
                                uppercase
                                tracking-wider
                                text-neutral-400
                            ">
                                Asset
                            </p>

                            <p className="
                                mt-1 text-xs
                                font-semibold
                                text-neutral-700
                                dark:text-neutral-200
                            ">
                                USD
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="
                                text-[10px]
                                uppercase
                                tracking-wider
                                text-neutral-400
                            ">
                                Status
                            </p>

                            <p className="
                                mt-1 text-xs
                                font-semibold
                                text-emerald-500
                            ">
                                Available
                            </p>
                        </div>

                    </div>

                </div>
            </div>

        </section>
    );
}

