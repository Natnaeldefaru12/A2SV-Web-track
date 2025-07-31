import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export const metadata: Metadata = {
  title: "Job Posting Card",
  description: "A beautiful job posting card component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
