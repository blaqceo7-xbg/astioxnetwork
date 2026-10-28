import localFont from "next/font/local";
import Providers from "./providers";
import LiveChat from "./components/LiveChat";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Web3 Digital Platform to Invest in Cryptocurrencies | Astiox Network Inc.",
  description: "Buy, Sell & Trade bitcoin and alt coins on Astiox Network",
  keywords: "bitcoin, cryptocurrency, trading, mining, digital currency",
  authors: [{ name: "Astiox Network Inc", url: "https://astiox.network.vercel.app" }],
  creator: "Astiox Network Inc",
  openGraph: {
    title: "Digital Currency Platform for Trading & Mining - Astiox Network Inc",
    description: "Buy, Sell & Trade bitcoin and alt coins on Astiox network",
    url: "https://astiox-network.vercel.app",
    siteName: "Astiox Network Inc",
    images: [
      {
        url: "https://astiox-network.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Astiox Network Inc - Bitcoin Investment Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Currency Platform for Trading & Mining - Astiox Network Inc",
    description: "Buy, Sell & Trade bitcoin and alt coins on Astiox network",
    images: ["https://astiox-network.vercel.app/images/og-image.png"],
    creator: "@astioxnetwork",
  },  
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
  },
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    noindex: false,
    nofollow: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    title: "Astiox Network Inc",
    statusBarStyle: "default",
  },  
  mobileWebApp: {
    capable: true,
    title: "Astiox Network Inc",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  theme: {
    colorScheme: "light dark",
    color: "#ffffff",
  },
  manifestType: "application/manifest+json",
  applicationName: "Astiox Network Inc",
  category: "Finance",
  publisher: "Astiox Network Inc",
  publisherWebsite: "https://astiox-network.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`bg-white w-full h-full text-black min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <LiveChat />
      </body>
    </html>
  );
}
