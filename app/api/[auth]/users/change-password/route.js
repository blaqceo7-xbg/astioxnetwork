import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    await connect();

    const cookieStore = await cookies(); 
    const token = cookieStore.get("jwt")?.value;

    const body = await req.json();

    const { userId, newPassword } = body;

    if (!token) {
          return Response.json({ user: null }, { status: 401 });
        }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // validate
    if (!userId || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // update password
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
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
                  to: `${updatedUser.email}`,
                  subject: `Change Password - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
                  text: `Your password has been successfully changed. Thanks for using ${process.env.NEXT_PUBLIC_COMPANY_NAME_SMALL}.`,
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
      Password Updated
    </h1>

    <p
      style="
        color:rgba(255,255,255,.85);
        font-size:16px;
        line-height:28px;
        margin-top:15px;
      "
    >
      Your account password has been changed successfully.
    </p>

  </td>
</tr>

<!-- ========================= -->
<!-- SUCCESS CARD -->
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
            Password Change Confirmation
          </p>

          <h2
            style="
              color:#111827;
              font-size:28px;
              margin:15px 0;
            "
          >
            Your Password Is Securely Updated
          </h2>

          <p
            style="
              color:#6b7280;
              font-size:15px;
              line-height:26px;
              margin:0;
            "
          >
            Updated on ${new Date().toLocaleString()}
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
      Hello ${updatedUser.email},
    </p>

    <p
      style="
        color:#6b7280;
        font-size:16px;
        line-height:30px;
      "
    >
      This email confirms that your account password was changed successfully.
    </p>

    <p
      style="
        color:#6b7280;
        font-size:16px;
        line-height:30px;
      "
    >
      You can now continue using your account with your new password.
      For security reasons, we recommend keeping your password private and unique.
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

          If you did not make this change, please reset your password immediately and contact our support team as soon as possible.
        </td>
      </tr>

    </table>

  </td>
</tr>

<!-- ========================= -->
<!-- ACCOUNT DETAILS -->
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
          Change Details
        </td>
      </tr>

      <tr>
        <td
          style="
            padding:0 20px 20px;
            color:#6b7280;
            line-height:26px;
          "
        >
          <strong>Date:</strong> ${new Date().toLocaleString()}
          <br>
          <strong>Account:</strong> ${updatedUser.email}
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
      This is an automated security email.
      Please do not reply directly to this message.
    </p>

  </td>
</tr>
                  
                  `,
                };
            
                // Send mail with defined transport object
                await transporter.sendMail(mailOptions);

                
                
                    // Remove cookies in the browser
                    const cookieStoreDelete = await cookies();
                    cookieStoreDelete.delete('jwt');

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}