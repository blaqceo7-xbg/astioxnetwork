import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import nodemailer from 'nodemailer'

// FETCH USERS 
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

  try {
    await connect();

    // Fetch all transactions, newest first
    const users = await User.find({ reffedBy: {
      $exists: true, $ne: type
    } }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connect();

    const deletedUser = await User.findOneAndDelete(
      { _id: id },
    );


    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in deleting user " + error.message, {
      status: 500,
    });
}}

// APPROVE/UNAPPROVED USER 
/*export const PATCH = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("userId");
    const body = await req.json();
    console.log("Request body:", body); // Log the request body for debugging
    const { userID, isVerified } = body;

    

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
      { isVerified },
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

    if (updatedUser.isVerified === true) {
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
          subject: `KYC Approval - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your KYC verification has been successfully Approved. Thank you for using ${process.env.NEXT_PUBLIC_COMPANY_NAME}. ${formatter.format(
            now
          )}`,
          html: "",
        };
    
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
    }

    if (updatedUser.isVerified === false) {
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
          subject: `KYC Rejection - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
          text: `Your KYC verification has been rejected. Please contact support for more information.`,
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
};*/