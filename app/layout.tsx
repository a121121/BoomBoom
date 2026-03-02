import type { Metadata } from "next";
import { Forum, Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/config/site";

const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-forum",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${forum.variable} ${inter.variable}`}>
      <body
        className={`antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
