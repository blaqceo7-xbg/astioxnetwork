"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CryptoTicker.module.css";

export default function CryptoTicker() {
  const [coins, setCoins] = useState([]);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoins() {
      try {
        const res = await fetch("/api/crypto");

        const data = await res.json();

        if (Array.isArray(data)) {
          setCoins(data);
        } else {
          console.error("API Error:", data);
          setCoins([]);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    }

    loadCoins();

    const interval = setInterval(loadCoins, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full py-4 text-center text-gray-500">
        Loading crypto prices...
      </div>
    );
  }

  if (!coins.length) {
    return (
      <div className="w-full py-4 text-center text-red-500">
        Unable to load crypto prices.
      </div>
    );
  }

  const duplicatedCoins = [...coins, ...coins];

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.leftFade} />
      <div className={styles.rightFade} />

      <motion.div
        className={styles.track}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 240,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          animationPlayState: paused
            ? "paused"
            : "running",
        }}
      >
        {duplicatedCoins.map((coin, index) => (
          <div
            key={`${coin.symbol}-${index}`}
            className={`bg-[#f4f4f7] dark:bg-isoDark2 ${styles.card}`}
          >
            <img
              src={coin.logo}
              alt={coin.name}
              width={28}
              height={28}
              loading="lazy"
            />

            <div className={styles.info}>
              <span
                className={`text-black dark:text-white ${styles.symbol}`}
              >
                {coin.symbol}
              </span>

              <span
                className={`text-black dark:text-white ${styles.name}`}
              >
                {coin.name}
              </span>
            </div>

            <div className={styles.priceSection}>
              <span
                className={`text-black dark:text-white ${styles.price}`}
              >
                $
                {Number(
                  coin.price || 0
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>

              <span
                className={
                  Number(coin.change24h) >= 0
                    ? styles.gain
                    : styles.loss
                }
              >
                {Number(coin.change24h) >= 0
                  ? "+"
                  : ""}
                {Number(
                  coin.change24h || 0
                ).toFixed(2)}
                %
              </span>
            </div>

            <div
              className={`text-black dark:text-white ${styles.stats}`}
            >
              Vol $
              {(
                Number(
                  coin.volume24h || 0
                ) / 1000000000
              ).toFixed(2)}
              B
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}