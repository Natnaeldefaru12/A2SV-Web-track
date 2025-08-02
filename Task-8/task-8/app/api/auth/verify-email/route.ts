import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, OTP } = body;

    // Validate input
    if (!email || !OTP) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Call the external API for email verification
    const response = await axios.post(
      "https://akil-backend.onrender.com/verify-email",
      {
        email,
        OTP,
      }
    );

    // Return success response
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle errors
    console.error("Email verification error:", error);
    
    // Check if it's an API response error
    if (error.response) {
      return NextResponse.json(
        { message: error.response.data.message || "Email verification failed" },
        { status: error.response.status || 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 