import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export const metadata: Metadata = {
  title: "Job Posting with Authentication",
  description: "A job posting site with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
