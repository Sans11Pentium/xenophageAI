import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs'
import { CrispProvider } from "@/components/shared/CrispProvider";

const IBM_Plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
})

export const metadata: Metadata = {
  title: "xenophage",
  description: "AI-powered Saas application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl='/' publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} appearance={{variables: { colorPrimary: '#624cf5'}}}>
      <html lang="en">
        <CrispProvider />
        <body className={cn("font-IBMPlex antialised", IBM_Plex.variable)}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}