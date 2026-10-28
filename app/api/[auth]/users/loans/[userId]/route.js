import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import nodemailer from 'nodemailer'
import Loan from "@/lib/models/loan";


// POST request to handle user deposit
export async function POST(req) {
  const body = await req.json();
    const amount = body.amount;
    const currency = body.currency;
    const transactionID = body.transactionID;
    const plan = body.plan;

  await connect();

  const cookieStore = await cookies(); 
    const token = cookieStore.get("jwt")?.value;

  try {
    const admin = await User.findOne({ role: "admin" });

    if (!token) {
          return Response.json({ user: null }, { status: 401 });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

    if (
      !amount ||
      !transactionID ||
      amount <= 0 ||
      isNaN(amount) ||
      !currency
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const userId = user._id

    await Loan.create({
      userId,
      transactionID,
      amount,
      plan,
      currency, // Example currency type
    });


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
      subject: `Loan Application Request - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
      text: `Your deposit of $${amount} USD of ${currency} has been successfully processed. ${process.env.NEXT_PUBLIC_COMPANY_NAME} support system are verifying your transaction. ${formatter.format(
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
    margin-bottom:25px;
  "
>

<div
  style="
    width:80px;
    height:80px;
    line-height:80px;
    border-radius:50%;
    background:#ffffff;
    color:#00ff00;
    font-size:40px;
    font-weight:bold;
    margin:0 auto 25px;
  "
>
  ✓
</div>

<h1
  style="
    color:#ffffff;
    margin:0;
    font-size:34px;
    font-weight:700;
  "
>
  Deposit Request Received
</h1>

<p
  style="
    color:rgba(255,255,255,.85);
    font-size:16px;
    line-height:28px;
    margin-top:15px;
  "
>
  Your transaction has been submitted successfully and is awaiting confirmation.
</p>


  </td>
</tr>

<!-- ========================= -->

<!-- AMOUNT HIGHLIGHT -->

<!-- ========================= -->

<tr>
  <td style="padding:0 40px;">


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
      style="padding:30px;"
    >

      <p
        style="
          color:#6b7280;
          margin:0;
          font-size:14px;
          text-transform:uppercase;
          letter-spacing:1px;
        "
      >
        Deposit Amount
      </p>

      <h2
        style="
          margin:12px 0;
          font-size:38px;
          color:#111827;
        "
      >
        $${amount}
      </h2>

      <span
        style="
          background:#fff7ed;
          color:#f97316;
          padding:8px 16px;
          border-radius:999px;
          font-size:13px;
          font-weight:600;
        "
      >
        ${currency}
      </span>

    </td>
  </tr>
</table>


  </td>
</tr>

<!-- ========================= -->

<!-- MESSAGE -->

<!-- ========================= -->

<tr>
  <td style="padding:40px;">


<p
  style="
    font-size:18px;
    color:#111827;
    margin-top:0;
  "
>
  Hello ${user.full_name},
</p>

<p
  style="
    color:#6b7280;
    line-height:30px;
    font-size:16px;
  "
>
  Thank you for choosing ${process.env.NEXT_PUBLIC_COMPANY_NAME}.
  Your deposit request has been successfully submitted and is currently under review by our finance team.
</p>

<p
  style="
    color:#6b7280;
    line-height:30px;
    font-size:16px;
  "
>
  Once the transaction is verified, the funds will be credited to your investment account automatically.
</p>


  </td>
</tr>

<!-- ========================= -->

<!-- DEPOSIT DETAILS CARD -->

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
    border-radius:18px;
  "
>

  <tr>
    <td
      colspan="2"
      style="
        padding:24px;
        font-size:18px;
        font-weight:700;
        color:#111827;
      "
    >
      Deposit Details
    </td>
  </tr>

  <tr>
    <td style="padding:14px 24px;color:#6b7280;">Transaction ID</td>
    <td align="right" style="padding:14px 24px;color:#111827;font-weight:600;">
      ${transactionID}
    </td>
  </tr>

  <tr>
    <td style="padding:14px 24px;color:#6b7280;">Date Submitted</td>
    <td align="right" style="padding:14px 24px;color:#111827;font-weight:600;">
      ${new Date().toLocaleString()}
    </td>
  </tr>

  <tr>
    <td style="padding:14px 24px;color:#6b7280;">Status</td>
    <td align="right" style="padding:14px 24px;">
      <span
        style="
          background:#fff7ed;
          color:#ea580c;
          padding:8px 16px;
          border-radius:999px;
          font-weight:600;
          font-size:12px;
        "
      >
        Pending
      </span>
    </td>
  </tr>

</table>


  </td>
</tr>

<!-- ========================= -->

<!-- PROCESS TIMELINE -->

<!-- ========================= -->

<tr>
  <td style="padding:0 40px 40px;">


<h3
  style="
    color:#111827;
    margin-bottom:20px;
  "
>
  Processing Status
</h3>

<table width="100%">

  <tr>
    <td style="padding:10px 0;">
      ✅ Deposit Request Submitted
    </td>
  </tr>

  <tr>
    <td style="padding:10px 0;color:#0500ff;font-weight:600;">
      ⏳ Verification In Progress
    </td>
  </tr>

  <tr>
    <td style="padding:10px 0;color:#6b7280;">
      🔒 Funds Will Be Auto Credited
    </td>
  </tr>

</table>


  </td>
</tr>

<!-- ========================= -->

<!-- CTA -->

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

<!-- SECURITY ALERT -->

<!-- ========================= -->

<tr>
  <td style="padding:0 40px 40px;">


<table
  width="100%"
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
        line-height:26px;
      "
    >
      <strong>Security Notice</strong><br><br>

      If you did not initiate this deposit request,
      please contact our support team immediately.
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
      padding:40px;
      border-top:1px solid #e5e7eb;
    "
  >


<p style="margin:0 0 15px;color:#111827;font-weight:600;">
  Need Help?
</p>

<p style="margin:0 0 10px;">
  <a href="mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}" style="color:#0500ff;text-decoration:none;">
    ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
  </a>
</p>

<p style="margin:0 0 20px;">
  <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color:#0500ff;text-decoration:none;">
    ${process.env.NEXT_PUBLIC_BASE_URL}
  </a>
</p>

<p style="color:#6b7280;">
  Facebook • X • Instagram • Telegram • LinkedIn
</p>

<p
  style="
    margin-top:30px;
    color:#9ca3af;
    font-size:13px;
  "
>
  © ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_COMPANY_NAME}
  <br>
  Secure Crypto Investment Platform
  <br><br>
  This is an automated notification email.
  Please do not reply directly to this message.
</p>


  </td>
</tr>
    
    `,
    };

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);

    if (admin) {
      // Set up email data
      let mailOptions = {
        from: `support@${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL} <${process.env.SMTP_USERNAME}>`,
        to: `${admin.email}`,
        subject: `Loan Application Request - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
        text: `You have received a new deposit request from ${user.full_name}. Please review the transaction in the admin panel. ${formatter.format(
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
      margin-bottom:25px;
    "
  >

  <div
    style="
      width:80px;
      height:80px;
      line-height:80px;
      border-radius:50%;
      background:#ffffff;
      color:#00ff00;
      font-size:40px;
      font-weight:bold;
      margin:0 auto 25px;
    "
  >
    ✓
  </div>

  <h1
    style="
      color:#ffffff;
      margin:0;
      font-size:34px;
      font-weight:700;
    "
  >
    Deposit Request Received
  </h1>

  <p
    style="
      color:rgba(255,255,255,.85);
      font-size:16px;
      line-height:28px;
      margin-top:15px;
    "
  >
    You have received a new deposit request from ${user.full_name}.
  </p>


    </td>
  </tr>

  <!-- ========================= -->

  <!-- AMOUNT HIGHLIGHT -->

  <!-- ========================= -->

  <tr>
    <td style="padding:0 40px;">


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
        style="padding:30px;"
      >

        <p
          style="
            color:#6b7280;
            margin:0;
            font-size:14px;
            text-transform:uppercase;
            letter-spacing:1px;
          "
        >
          Deposit Amount
        </p>

        <h2
          style="
            margin:12px 0;
            font-size:38px;
            color:#111827;
          "
        >
          $${amount}
        </h2>

        <span
          style="
            background:#fff7ed;
            color:#f97316;
            padding:8px 16px;
            border-radius:999px;
            font-size:13px;
            font-weight:600;
          "
        >
          ${currency}
        </span>

      </td>
    </tr>
  </table>


    </td>
  </tr>

  <!-- ========================= -->

  <!-- MESSAGE -->

  <!-- ========================= -->

  <tr>
    <td style="padding:40px;">


  <p
    style="
      font-size:18px;
      color:#111827;
      margin-top:0;
    "
  >
    Admin ${admin.full_name},
  </p>

  <p
    style="
      color:#6b7280;
      line-height:30px;
      font-size:16px;
    "
  >
    A new deposit request has been submitted by ${user.full_name}. Please review the transaction in the admin panel.
  </p>


    </td>
  </tr>

  <!-- ========================= -->

  <!-- DEPOSIT DETAILS CARD -->

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
      border-radius:18px;
    "
  >

    <tr>
      <td
        colspan="2"
        style="
          padding:24px;
          font-size:18px;
          font-weight:700;
          color:#111827;
        "
      >
        Deposit Details
      </td>
    </tr>

    <tr>
      <td style="padding:14px 24px;color:#6b7280;">Transaction ID</td>
      <td align="right" style="padding:14px 24px;color:#111827;font-weight:600;">
        ${transactionID}
      </td>
    </tr>

    <tr>
      <td style="padding:14px 24px;color:#6b7280;">Client Name</td>
      <td align="right" style="padding:14px 24px;color:#111827;font-weight:600;">
        ${user.full_name}
      </td>
    </tr>

    <tr>
      <td style="padding:14px 24px;color:#6b7280;">Amount</td>
      <td align="right" style="padding:14px 24px;color:#111827;font-weight:600;">
        ${amount}
      </td>
    </tr>

    <tr>
      <td style="padding:14px 24px;color:#6b7280;">Client Email</td>
      <td align="right" style="padding:14px 24px;color:#111827;font-weight:600;">
        ${user.email}
      </td>
    </tr>

    <tr>
      <td style="padding:14px 24px;color:#6b7280;">Date Submitted</td>
      <td align="right" style="padding:14px 24px;color:#111827;font-weight:600;">
        ${new Date().toLocaleString()}
      </td>
    </tr>

    <tr>
      <td style="padding:14px 24px;color:#6b7280;">Status</td>
      <td align="right" style="padding:14px 24px;">
        <span
          style="
            background:#fff7ed;
            color:#ea580c;
            padding:8px 16px;
            border-radius:999px;
            font-weight:600;
            font-size:12px;
          "
        >
          Pending
        </span>
      </td>
    </tr>

  </table>


    </td>
  </tr>

  <!-- ========================= -->

  <!-- CTA -->

  <!-- ========================= -->

  <tr>
    <td align="center" style="padding:0 40px 50px;">


  <a
    href="${process.env.NEXT_PUBLIC_BASE_URL}/admin-panel/"
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
    View Admin Panel →
  </a>


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
        padding:40px;
        border-top:1px solid #e5e7eb;
      "
    >


  <p style="margin:0 0 15px;color:#111827;font-weight:600;">
    Need Help?
  </p>

  <p style="margin:0 0 10px;">
    <a href="mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}" style="color:#0500ff;text-decoration:none;">
      ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
    </a>
  </p>

  <p style="margin:0 0 20px;">
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color:#0500ff;text-decoration:none;">
      ${process.env.NEXT_PUBLIC_BASE_URL}
    </a>
  </p>

  <p style="color:#6b7280;">
    Facebook • X • Instagram • Telegram • LinkedIn
  </p>

  <p
    style="
      margin-top:30px;
      color:#9ca3af;
      font-size:13px;
    "
  >
    © ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_COMPANY_NAME}
    <br>
    Secure Crypto Investment Platform
    <br><br>
    This is an automated notification email.
    Please do not reply directly to this message.
  </p>


    </td>
  </tr>
      
      `,
      };

      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({
      message: "Loan request successful!",
      statusMessage: "Pending",
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);

    // 🔹 Extract query filters
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const filters = { userId };

    const transactions = await Loan.find(filters);

    return NextResponse.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

