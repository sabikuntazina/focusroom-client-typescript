import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const poppins= Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['400',"500","600","700"]
})

export const metadata: Metadata = {
  title: "FocusRoom",
  description: "Find Your Perfect Focus Zone",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
      <body className=" min-h-full bg-[#110c08] text-gray-50 flex flex-col">
        <Navbar></Navbar>
        <main className="">
        {children}
        </main>
        <Footer></Footer>
        <Toaster position="top-right" />
        </body>
    </html>
  );
}
