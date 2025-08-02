import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: Request) {
  try {
    const token = await getToken({ 
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    return NextResponse.json({
      authenticated: !!token,
      token: token ? {
        id: token.id,
        name: token.name,
        email: token.email,
        hasAccessToken: !!token.accessToken
      } : null
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to check session",
      authenticated: false
    });
  }
} 