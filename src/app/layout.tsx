import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import AIHelpBot from "@/components/AIHelpBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Annapurna | AI-Powered Cold Chain Intelligence",
  description:
    "Real-time distress commodity marketplace that saves food from spoiling in transit. Annapurna uses Agentic AI to autonomously reroute trucks and connect drivers with nearby wholesalers.",
  authors: [{ name: "Kenkei69", url: "https://github.com/Kenkei69" }],
  openGraph: {
    title: "Annapurna | AI-Powered Cold Chain Intelligence",
    description: "Autonomous Multi-Agent AI · Emergency Cargo Rescue · Real-Time Cold-Chain Intelligence",
    url: "https://github.com/Kenkei69/Annapurna",
    siteName: "Annapurna",
    type: "website",
  },
};

import { AuthProvider } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var t = localStorage.getItem('theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            })();
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <AuthProvider>
          <AppProvider>
            {children}
            <AIHelpBot />
            <ThemeToggle />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

