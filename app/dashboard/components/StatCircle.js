"use client";

import { useEffect, useState } from "react";

export default function StatCircle({
  amount,          // e.g. 32500
  total,           // e.g. 100000
  label,
  currency = "$",
  color = "#000",
  size = 130,
  stroke = 10,
}) {
  const percentage = Math.min((amount / total) * 100, 100);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset =
      circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  const formattedAmount = amount.toLocaleString();

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />

        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 dark:text-white flex flex-col items-center justify-center text-center">
        <span className="text-lg font-bold">
          {currency}{formattedAmount}
        </span>
        <span className="text-xs text-gray-500">
          {percentage.toFixed(1)}%
        </span>
        <span className="text-xs dark:text-isoColor2 mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}
