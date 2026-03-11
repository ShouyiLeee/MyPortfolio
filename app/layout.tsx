import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
