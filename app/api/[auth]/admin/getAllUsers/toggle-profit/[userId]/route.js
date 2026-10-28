import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import nodemailer from 'nodemailer'

// Play/Pause USER profit
export const PATCH = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("userId");
    const body = await req.json();
    const { userID, isPlay } = body;

    

    if (!adminId) {
      return new NextResponse(
        JSON.stringify({
          message: "ID not found",
        }),
        { status: 400 }
      );
    }

    await connect();

    // Find the user by ID
            const admin = await User.findById({ _id: adminId });
        
            if (!admin) {
              return NextResponse.json(
                { message: "You have not registered yet" },
                { status: 404 } // NOT_FOUND
              );
            }
    
            if (admin.role !== "admin") {
              return NextResponse.json(
                { message: "You are not an Admin" },
                { status: 400 } // BAD_REQUEST
              );
            }

    // Update user's transaction status
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { isPlay },
      { new: true }
    );
    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    if (updatedUser.isPlay === true) {
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
          subject: `Profit Enabled - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your profit status has been enabled. Thank you for using ${process.env.NEXT_PUBLIC_COMPANY_NAME}. ${formatter.format(
            now
          )}`,
          html: "",
        };
    
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
    }

    if (updatedUser.isPlay === false) {
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
          subject: `Profit Disabled - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your profit status has been disabled. Thank you for using ${process.env.NEXT_PUBLIC_COMPANY_NAME}. ${formatter.format(
            now
          )}`,
          html: "",
        };
    
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
    }

    return new NextResponse(
      JSON.stringify({
        message: "User account updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in updating user account" + error.message, {
      status: 500,
    });
  }
};