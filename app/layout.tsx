import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DT - Le Truong | AI Engineer",
  description:
    "Portfolio of DT - Le Truong — AI Engineer specializing in Machine Learning, Multi-Agent Systems, and Backend AI development. Building intelligent applications from Vietnam.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Python",
    "LangGraph",
    "FastAPI",
    "Flutter",
    "Vietnam",
    "Portfolio",
    "DT Le Truong",
  ],
  authors: [{ name: "DT - Le Truong", url: "https://github.com/ShouyiLeee" }],
  creator: "DT - Le Truong",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "DT - Le Truong | AI Engineer",
    description:
      "AI Engineer specializing in Machine Learning, Multi-Agent Systems, and Backend AI development.",
    siteName: "DT - Le Truong Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
