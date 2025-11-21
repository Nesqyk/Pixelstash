import { Geist, Geist_Mono } from "next/font/google";
import { Gasoek_One } from "next/font/google";
import Script from "next/script";

const gasoekOne = Gasoek_One({
  variable: "--font-gasoek-one",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://pixelstash.netlify.app'), 
  
  title: "Pixelstash - Curated Pixel Art Resources",
  description: "Discover high-quality, curated pixel art resources including tools, asset packs, and tutorials. Built for pixel artists and game developers.",
  keywords: ["pixel art", "game assets", "pixel art resources", "game development", "pixel art tools", "curated resources"],
  authors: [{ name: "Tyrone Tabornal" }],
  creator: "Tyrone Tabornal",
  icons: {
    icon: [
      { url: "/logo_stash.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo_stash.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Pixelstash - Curated Pixel Art Resources",
    description: "Discover high-quality, curated pixel art resources including tools, asset packs, and tutorials.",
    url: "/", 
    siteName: "Pixelstash",
    images: [
      {
        url: "/splash_page.png", 
        width: 1200,
        height: 630,
        alt: "Pixelstash - Curated Pixel Art Resources",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixelstash - Curated Pixel Art Resources",
    description: "Discover high-quality, curated pixel art resources including tools, asset packs, and tutorials.",
    images: ["/splash_page.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://pixelstash.com",
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${gasoekOne.variable}`}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}