import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Sun Cafe is a fictional cafe concept: thoughtful coffee in a large, light-filled hall whose light changes through the day. A design portfolio project.";

export const metadata: Metadata = {
  title: {
    default: "Sun Cafe — Coffee in a Different Light",
    template: "%s · Sun Cafe",
  },
  description,
  applicationName: "Sun Cafe",
  openGraph: {
    title: "Sun Cafe — Coffee in a Different Light",
    description,
    type: "website",
    siteName: "Sun Cafe (fictional concept)",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sun Cafe — Coffee in a Different Light",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#120d0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Marks that scripts run, so reveals may start hidden; without it everything is simply shown. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
