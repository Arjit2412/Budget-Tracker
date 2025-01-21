import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageLayout from "@/components/PageLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Government Portal",
  description: "A portal for government services and information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}