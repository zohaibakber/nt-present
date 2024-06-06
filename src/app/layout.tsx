import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RSA Encryption Demo",
  description: "Generated by create next app",
};

const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/generate",
    text: "Generate",
  },
  {
    href: "/encrypt",
    text: "Encrypt",
  },
  {
    href: "/decrypt",
    text: "Decrypt",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <header>
          <nav className="flex justify-center gap-4 p-4 items-center">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={buttonVariants()}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </header>
        <div className="p-8 lg:container">{children}</div>
      </body>
    </html>
  );
}
