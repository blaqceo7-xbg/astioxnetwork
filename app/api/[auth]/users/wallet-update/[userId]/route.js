import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import nodemailer from 'nodemailer'


export async function PATCH (req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const ObjectId = require("mongoose").Types.ObjectId;
    const body = await req.json();

    const { 
      bitcoin_BTC,
      binance_BNB,
      tron_TRX,
      ethereum_ETH,
      tether_USDT,
     } = body;

  try {
        if (!userId) {
          return new NextResponse(
            JSON.stringify({
              message: "ID not found",
            }),
            { status: 400 }
          );
        }
        if (!ObjectId.isValid(userId)) {
          return new NextResponse(JSON.stringify({ message: "Invalid user ID" }), {
            status: 400,
          });
        }

    await connect();

    const user = await User.findById(userId);
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

    // Update user cryptocurrency wallets
    const updatedUserWallet = await User.findOneAndUpdate(
      {_id: userId},
      {
        $set: { 
            "wallet_address.bitcoin_BTC": bitcoin_BTC,
            "wallet_address.binance_BNB": binance_BNB,
            "wallet_address.tron_TRX": tron_TRX,
            "wallet_address.ethereum_ETH": ethereum_ETH,
            "wallet_address.tether_USDT": tether_USDT,
        }
      },
      { new: true, runValidators: true } // Returns the updated document
    );

    if (!updatedUserWallet) {
        return new NextResponse(
          JSON.stringify({
            message: "User not found in database",
          }),
          { status: 404 }
        );
      }

    const now = new Date();
    
        // Create a formatter instance
        const formatter = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
    
        // Send email notification
        // Create a transporter object using the default SMTP transport
        
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        // Set up email data
        let mailOptions = {
          from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
          to: `${user.email}`,
          subject: `Wallet Address Updated - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your wallet address has been updated successfully. ${process.env.NEXT_PUBLIC_COMPANY_NAME} support system are verifying your details. Thank You. Date: ${formatter.format(
            now
          )}`,
          html: `
          
          <!-- ========================= -->

<!-- HERO HEADER -->

<!-- ========================= -->

<tr>
  <td
    align="center"
    style="
      background:#0500ff;
      padding:50px 40px;
    "
  >


<img
  src="https://jervd7yzld.ufs.sh/f/tLWByCb5iMVaEIGGEIchDVBJHa2wuynk9M83dAZEYKqf10GO"
  alt="${process.env.NEXT_PUBLIC_COMPANY_NAME}"
  width="70"
  style="
    display:block;
    margin-bottom:20px;
  "
>

<div
  style="
    width:72px;
    height:72px;
    line-height:72px;
    border-radius:50%;
    background:#ffffff;
    color:#00ff00;
    font-size:36px;
    font-weight:bold;
    margin:0 auto 20px;
  "
>
  ✓
</div>

<h1
  style="
    color:#ffffff;
    margin:0;
    font-size:32px;
    font-weight:700;
    line-height:42px;
  "
>
  Wallet Address Update Received
</h1>

<p
  style="
    color:rgba(255,255,255,.85);
    font-size:16px;
    line-height:28px;
    margin-top:15px;
  "
>
  Your wallet addresses has been updated successfully.
</p>


  </td>
</tr>

<!-- ========================= -->

<!-- STATUS CARD -->

<!-- ========================= -->

<tr>
  <td style="padding:0 30px;">


<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    margin-top:-30px;
    background:#ffffff;
    border-radius:20px;
    box-shadow:0 10px 30px rgba(5,0,255,.08);
  "
>

  <tr>
    <td
      align="center"
      style="
        padding:40px 30px;
      "
    >

      <p
        style="
          color:#6b7280;
          margin:0;
          font-size:14px;
          text-transform:uppercase;
          letter-spacing:1px;
          font-weight:600;
        "
      >
        Update Status
      </p>

      <h2
        style="
          color:#111827;
          font-size:28px;
          margin:15px 0;
        "
      >
        Uploaded
      </h2>

      <span
        style="
          background:#fff7ed;
          color:#ea580c;
          padding:8px 16px;
          border-radius:999px;
          font-size:13px;
          font-weight:600;
        "
      >
        Successful
      </span>

      <p
        style="
          color:#6b7280;
          font-size:15px;
          line-height:26px;
          margin-top:20px;
        "
      >
        Submitted on ${new Date().toLocaleString()}
      </p>

    </td>
  </tr>

</table>


  </td>
</tr>

<!-- ========================= -->

<!-- MESSAGE -->

<!-- ========================= -->

<tr>
  <td
    style="
      padding:40px;
    "
  >


<p
  style="
    color:#111827;
    font-size:18px;
    margin-top:0;
  "
>
  Hello ${user.full_name},
</p>

<p
  style="
    color:#6b7280;
    font-size:16px;
    line-height:30px;
  "
>
  We have successfully received your cryptocurrency wallet address upload.
  Our system is currently validating the submitted wallet addresses information to ensure secure integration with your investment account.
</p>

<p
  style="
    color:#6b7280;
    font-size:16px;
    line-height:30px;
  "
>
  Once verification is completed, your wallet address will be connected and available within your dashboard. You will receive another notification when the process is finished.
</p>


  </td>
</tr>

<!-- ========================= -->

<!-- WALLET DETAILS -->

<!-- ========================= -->

<tr>
  <td style="padding:0 40px 40px;">


<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#f8fafc;
    border:1px solid #e5e7eb;
    border-radius:12px;
  "
>

  <tr>
    <td
      style="
        padding:20px;
        color:#111827;
        font-weight:600;
      "
    >
      Wallet Request Details
    </td>
  </tr>

  <tr>
    <td
      style="
        padding:0 20px 20px;
        color:#6b7280;
        line-height:28px;
      "
    >
      <strong>Submitted:</strong> ${new Date().toLocaleString()}
      <br>
      <strong>Status:</strong> Successful
    </td>
  </tr>

</table>


  </td>
</tr>

<!-- ========================= -->

<!-- CTA BUTTON -->

<!-- ========================= -->

<tr>
  <td align="center" style="padding:0 40px 50px;">


<a
  href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/"
  style="
    background:#0500ff;
    color:#ffffff;
    text-decoration:none;
    padding:16px 36px;
    border-radius:12px;
    display:inline-block;
    font-weight:600;
    font-size:15px;
  "
>
  View Dashboard →
</a>


  </td>
</tr>

<!-- ========================= -->

<!-- SECURITY NOTICE -->

<!-- ========================= -->

<tr>
  <td style="padding:0 40px 40px;">


<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#fff7ed;
    border-left:4px solid #f97316;
    border-radius:12px;
  "
>

  <tr>
    <td
      style="
        padding:20px;
        color:#9a3412;
        font-size:14px;
        line-height:24px;
      "
    >
      <strong>Security Notice</strong>
      <br><br>

      If you did not submit this wallet connection request, please contact our support team immediately and secure your account credentials.
    </td>
  </tr>

</table>


  </td>
</tr>

<!-- ========================= -->

<!-- FOOTER -->

<!-- ========================= -->

<tr>
  <td
    align="center"
    style="
      background:#f8fafc;
      padding:35px;
      border-top:1px solid #e5e7eb;
    "
  >


<p
  style="
    margin:0 0 10px;
    color:#111827;
    font-weight:600;
  "
>
  Need Help?
</p>

<p style="margin:0 0 10px;">
  <a
    href="mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}"
    style="
      color:#0500ff;
      text-decoration:none;
    "
  >
    ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
  </a>
</p>

<p style="margin:0 0 20px;">
  <a
    href="${process.env.NEXT_PUBLIC_BASE_URL}"
    style="
      color:#0500ff;
      text-decoration:none;
    "
  >
    ${process.env.NEXT_PUBLIC_BASE_URL}
  </a>
</p>

<p
  style="
    color:#9ca3af;
    font-size:13px;
    line-height:22px;
  "
>
  © ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_COMPANY_NAME}
  <br>
  Secure Crypto Investment Platform
  <br><br>
  This is an automated wallet notification email.
  Please do not reply directly to this message.
</p>


  </td>
</tr>

          
          `,
        };

        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'Wallet address updated successfully!'}),
      { status: 200 }
    );
  } catch (err) {
    console.error('API error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}