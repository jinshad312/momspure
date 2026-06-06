import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ScrollToTop from "@/components/ScrollToTop";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09251a",
};

export const metadata: Metadata = {
  title: {
    default: "Momspure | Premium Organic Foods & Nutrition Mixes",
    template: "%s | Momspure"
  },
  description: "Wholesome, 100% natural multi-grain nutrition health drinks, traditional spices podi, and cold-pressed oils. Handmade in small batches with zero preservatives.",
  keywords: ["organic food", "health mix", "sprouted ragi", "avulos podi", "coconut oil", "nutri mix", "healthy breakfast", "natural powders"],
  openGraph: {
    title: "Momspure | Premium Organic Foods & Nutrition Mixes",
    description: "Wholesome, 100% natural multi-grain health drinks, traditional spices podi, and cold-pressed oils. Handcrafted with zero preservatives.",
    type: "website",
    locale: "en_US",
    url: "https://momspure.com",
    siteName: "Momspure",
    images: [
      {
        url: "/assets/IMG_0061.webp",
        width: 800,
        height: 600,
        alt: "Momspure Premium Products",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momspure | Premium Organic Foods",
    description: "Wholesome, 100% natural, preservative-free traditional nutrition mixes.",
    images: ["/assets/IMG_0061.webp"],
  },
  alternates: {
    canonical: "https://momspure.com",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-ivory text-charcoal">
        <CartProvider>
          <SmoothScroll>
            <Header />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
            <FloatingActions />
            <ScrollToTop />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
