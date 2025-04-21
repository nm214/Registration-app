"use client";
import { useState, useEffect } from "react";
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
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsModalOpen(true);
      if (timerId) clearInterval(timerId);
      return;
    }

    const id = setInterval(decrementTime, 1000);
    setTimerId(id);

    return () => clearInterval(id);
  }, [timeLeft]);

  const decrementTime = () => {
    setTimeLeft((prev) => prev - 1);
  };

  const restartSession = () => {
    setTimeLeft(5 * 60);
    setIsModalOpen(false);
    if (timerId) clearInterval(timerId);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>

        <SessionTimeoutModal isOpen={isModalOpen} onClose={restartSession} />
      </body>
    </html>
  );
}
