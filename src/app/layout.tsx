import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Vibe Coding with Kali",
  description: "Learn Vibe Coding with Kali - Master the art of creating high-impact MVPs using conversational AI, generative AI, computer vision, and natural language processing. By leveraging AI as your entire technical team, you gain the confidence to quickly iterate and monetize your ideas, giving you a massive competitive advantage.",
  keywords: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  openGraph: {
    title: "Learn Vibe Coding with Kali",
    description: "Learn Vibe Coding with Kali - Master the art of creating high-impact MVPs using conversational AI, generative AI, computer vision, and natural language processing. By leveraging AI as your entire technical team, you gain the confidence to quickly iterate and monetize your ideas, giving you a massive competitive advantage.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Vibe Coding with Kali",
    description: "Learn Vibe Coding with Kali - Master the art of creating high-impact MVPs using conversational AI, generative AI, computer vision, and natural language processing. By leveraging AI as your entire technical team, you gain the confidence to quickly iterate and monetize your ideas, giving you a massive competitive advantage.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
