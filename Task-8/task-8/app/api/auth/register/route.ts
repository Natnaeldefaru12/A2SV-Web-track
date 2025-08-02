import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword, role } = body;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Call the external API for registration
    const response = await axios.post(
      "https://akil-backend.onrender.com/signup",
      {
        name,
        email,
        password,
        confirmPassword,
        role: role || "user"
      }
    );

    // Return success response
    return NextResponse.json(
      { message: "User registered successfully. Please check your email for verification." },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle errors
    console.error("Registration error:", error);
    
    // Check if it's an API response error
    if (error.response) {
      return NextResponse.json(
        { message: error.response.data.message || "Registration failed" },
        { status: error.response.status || 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}