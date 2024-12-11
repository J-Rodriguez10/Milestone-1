import type { Metadata } from "next";
import { Poppins } from "@next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";


const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"], // Specify the weights you need
  subsets: ["latin"], // Specify the subsets you want to include
});

export const metadata: Metadata = {
  title: "AstroHub: Explore the ",
  description: "Portfolio Project by Jesus Rodriguez, using NASA's APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className + " relative"}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
