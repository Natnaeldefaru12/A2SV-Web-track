"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-white text-xl font-bold">
        Job Board
      </Link>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <span className="text-gray-300">
              Welcome, {session?.user?.name || "User"}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}