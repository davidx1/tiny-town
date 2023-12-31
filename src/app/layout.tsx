import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center">
          <nav className="absolute container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/" className="font-semibold text-xl tracking-tight">
              Tiny Town
            </Link>
            <div className="flex items-center">
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Gallery
              </Link>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
