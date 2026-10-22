import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion. Pick a lift, plan your day, log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html
  lang="en"
  data-scroll-behavior="smooth"
  className={`${oswald.variable} ${inter.variable}`}
>
      <body className="bg-bg text-white font-body antialiased">
  <PlanProvider>
    <Navbar />
    {children}
    <Footer />
    <Toaster
      position="top-center"
      toastOptions={{
        style: { background: "#151515", color: "#fff", border: "1px solid #2a2a2a" },
      }}
    />
  </PlanProvider>
</body>
    </html>
  );
}