"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function WalletQR() {
  const walletAddress = "0x1234567890abcdef1234567890abcdef";

  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(walletAddress)
      .then(url => setQr(url))
      .catch(err => console.error(err));
  }, []);

  // ✅ Copy Address
  const copyAddress = async () => {
    await navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied ✅");
  };

  // ✅ Download QR
  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "wallet-qr.png";
    link.click();
  };

  return (
    <div className="min-h-screen">

      <div className="bg-white flex justify-center items-center">

        {/* QR Code */}
        <div className="flex justify-center items-center mb-4">
          {qr && (
            <div className="">
              <img
                src={qr}
                onClick={downloadQR}
                alt="Wallet QR"
                className="w-44 h-44"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
