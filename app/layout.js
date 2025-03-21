import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StripeProvider from "../components/StripeProvider";
import SessionProvider from "../components/SessionProvider"; // New

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Food Ordering App",
  description: "Powered by Rial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider> {/* Wrap with SessionProvider */}
          <Navbar />
          <StripeProvider>
            {children}
          </StripeProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}