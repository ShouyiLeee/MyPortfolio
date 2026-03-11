import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lê Trọng Đại Trường | AI Engineer",
  description:
    "Portfolio of Lê Trọng Đại Trường — AI Engineer specializing in Machine Learning, Multi-Agent Systems, and Backend AI development. Building intelligent applications from Vietnam.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Python",
    "LangGraph",
    "FastAPI",
    "Flutter",
    "Vietnam",
    "Portfolio",
  ],
  authors: [{ name: "Lê Trọng Đại Trường", url: "https://github.com/ShouyiLeee" }],
  creator: "Lê Trọng Đại Trường",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Lê Trọng Đại Trường | AI Engineer",
    description:
      "AI Engineer specializing in Machine Learning, Multi-Agent Systems, and Backend AI development.",
    siteName: "DT Le Portfolio",
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
        className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
