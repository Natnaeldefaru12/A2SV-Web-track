"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setError("Please enter the complete verification code");
      return;
    }

    try {
      setLoading(true);
      
      if (!email) {
        setError("Email not found. Please try signing up again.");
        return;
      }

      // Call the verification API endpoint
      const baseUrl = window.location.origin;
      const response = await axios.post(`${baseUrl}/api/auth/verify-email`, {
        email: email,
        OTP: otpCode,
      });

      if (response.status === 200) {
        setSuccess("Email verified successfully! Redirecting to signin page...");
        // Verification successful, redirect to signin page with a small delay
        setTimeout(() => {
          router.push("/auth/signin?verified=true");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend || !email) return;
    
    try {
      // Reset the countdown and OTP fields
      setCountdown(30);
      setCanResend(false);
      setOtp(["", "", "", ""]);
      setError("");
      
      // Note: You might want to implement a resend OTP endpoint
      // For now, we'll just reset the timer
    } catch (err: any) {
      setError("Failed to resend code");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Verify Email</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
              {success}
            </div>
          )}
          
          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0"
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              You can request to{" "}
              <button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend}
                className={`font-medium ${
                  canResend
                    ? "text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Resend code
              </button>
              {" "}in
            </p>
            <p className="text-lg font-semibold text-indigo-600 mt-1">
              {formatTime(countdown)}
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || otp.join("").length !== 4}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}