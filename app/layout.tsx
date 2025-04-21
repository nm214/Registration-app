"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/store/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionTimeoutModal from "@/components/SessionTimeoutModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <SessionTimeoutModal />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
