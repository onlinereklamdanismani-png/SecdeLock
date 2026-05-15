import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecdeLock — Namaz & Dua Odak Uygulaması",
  description:
    "Müslümanlar için namaz takip, dua okuma, XP sistemi ve odak modu uygulaması. Her namaz ve dua için kendini kilitle.",
  keywords: "namaz, dua, tesbih, islam, prayer tracker, müslüman uygulama",
  authors: [{ name: "SecdeLock" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SecdeLock",
  },
  openGraph: {
    title: "SecdeLock",
    description: "Namaz & Dua Odak Uygulaması",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className="app-shell particle-bg">
        {children}
      </body>
    </html>
  );
}
