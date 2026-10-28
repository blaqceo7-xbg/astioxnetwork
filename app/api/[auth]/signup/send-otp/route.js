import { NextResponse } from 'next/server';
import connect from "@/lib/db";
import nodemailer from 'nodemailer';
import Otp from "@/lib/models/otp";
import User from '@/lib/models/user';

export async function POST(req) {
  await connect();
  const body = await req.json();
  const email = body.email;
  const user = await User.findOne({ email: email });
  
      if (user) {
        return new NextResponse(
          JSON.stringify({
            message: "User already exit with this email. Try another one instead.",
          }),
          { status: 400 }
        );
      }

      const template = `
      
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
  alt="{{companyName}}"
  width="70"
  style="
    display:block;
    margin-bottom:20px;
  "
>

<h1
  style="
    color:#ffffff;
    margin:0;
    font-size:32px;
    font-weight:700;
    line-height:42px;
  "
>
  Verify Your Account
</h1>

<p
  style="
    color:rgba(255,255,255,.85);
    font-size:16px;
    line-height:28px;
    margin-top:15px;
  "
>
  Use the verification code below to complete your action securely.
</p>


  </td>
</tr>

<!-- ========================= -->

<!-- OTP CARD -->

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
          margin:0 0 15px;
          font-size:14px;
          text-transform:uppercase;
          letter-spacing:1px;
          font-weight:600;
        "
      >
        One-Time Password
      </p>

      <div
        style="
          background:#eef2ff;
          color:#0500ff;
          font-size:42px;
          font-weight:700;
          letter-spacing:10px;
          padding:20px 25px;
          border-radius:16px;
          display:inline-block;
          font-family:Arial,sans-serif;
        "
      >
        {{otp}}
      </div>

      <p
        style="
          color:#6b7280;
          margin-top:20px;
          font-size:15px;
          line-height:26px;
        "
      >
        This code will expire in
        <strong style="color:#111827;">
          10 minutes
        </strong>.
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
    color:#6b7280;
    font-size:16px;
    line-height:30px;
  "
>
  We received a request to access your account.
  Enter the verification code above to continue.
</p>

<p
  style="
    color:#6b7280;
    font-size:16px;
    line-height:30px;
  "
>
  For your security, never share this code with anyone.
  Our team will never ask for your verification code.
</p>


  </td>
</tr>

<!-- ========================= -->

<!-- SECURITY ALERT -->

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

      If you did not request this code, please secure your account immediately and contact support.
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
    href="mailto:support@astiox-network.com"
    style="
      color:#0500ff;
      text-decoration:none;
    "
  >
    support@astiox-network.com
  </a>
</p>

<p style="margin:0 0 20px;">
  <a
    href="https://astiox-network.vercel.app"
    style="
      color:#0500ff;
      text-decoration:none;
    "
  >
    www.astiox-network.vercel.app
  </a>
</p>

<p
  style="
    color:#9ca3af;
    font-size:13px;
    line-height:22px;
  "
>
  © {{currentYear}} Astiox Network Inc
  <br>
  Secure Crypto Investment Platform
  <br><br>
  This is an automated security email.
  Please do not reply directly to this message.
</p>


  </td>
</tr>
      
      `;

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

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
          to: `${email}`,
          subject: `Email Confirmation - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your OTP for email verification is ${otp}`,
          html: template
            .replace("{{otp}}", otp)
            .replace("{{logo}}", `https://astiox-network.vercel.app/public/icons/logoMain2.png`)
            .replace("{{websiteUrl}}", "https://astiox-network.vercel.app")
            .replace("{{supportEmail}}", `support@astiox-network.com`)
            .replace("{{companyName}}", "Astiox Network Inc")
            .replace("{{date}}", new Date().toLocaleString())
            .replace("{{currentYear}}", new Date().getFullYear()),
        };

      try {
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
        // Save OTP to database
        await Otp.create({ email, otp, expiresAt });
        return new NextResponse(
          JSON.stringify({
            message: "OTP sent successFully",
            isSent: true,
          }),
          { status: 200 }
        );
      } catch (error) {
        console.log("Error: " + error);
        return new NextResponse(
          JSON.stringify({
            message: "Failed to send email " + error,
            isSent: false,
          }),
          { status: 500 }
        );
      }
}