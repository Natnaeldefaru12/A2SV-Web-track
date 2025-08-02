import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();
    
    return NextResponse.json({
      authenticated: !!session,
      session: session ? {
        user: session.user,
        expires: session.expires
      } : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to get session",
      authenticated: false,
      timestamp: new Date().toISOString()
    });
  }
} 