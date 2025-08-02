import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Call the external API for authentication
    console.log("Attempting login for email:", email);
    
    const response = await axios.post(
      "https://akil-backend.onrender.com/login",
      {
        email,
        password,
      }
    );

    // Get user data from response
    const userData = response.data;
    console.log("Login successful, user data:", userData);
    console.log("Response headers:", response.headers);
    console.log("Response status:", response.status);

    // Return user data with access token
    // The external API returns { success: true, data: { ... } }
    // We need to return the data part for NextAuth
    return NextResponse.json(userData);
  } catch (error: any) {
    // Handle errors
    console.error("Login error:", error);
    
    // Check if it's an API response error
    if (error.response) {
      console.log("Login API error response:", error.response.data);
      console.log("Login API error status:", error.response.status);
      return NextResponse.json(
        { message: error.response.data.message || "Authentication failed" },
        { status: error.response.status || 401 }
      );
    }

    // Generic error
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}