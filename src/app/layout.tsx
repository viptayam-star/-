import type { Metadata, Viewport } from "next";
import { Cairo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "منصة عنوان — لوحة تحكم الإدارة",
  description:
    "لوحة تحكم إدارة منصة عنوان التعليمية: نشر التنبيهات العامة لجميع المنصات، وإدارة المدرسين والمسارات وكروت الطلاب، بحفظ فوري على الجهاز.",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "منصة عنوان",
    title: "منصة عنوان — لوحة تحكم الإدارة",
    description:
      "نشر التنبيهات العامة لجميع المنصات، وإدارة المدرسين والمسارات وكروت الطلاب من مكان واحد.",
    images: [{ url: "/icon.png", alt: "منصة عنوان" }],
  },
  twitter: {
    card: "summary",
    title: "منصة عنوان — لوحة تحكم الإدارة",
    description: "إدارة المدرسين والتنبيهات العامة لمنصة عنوان التعليمية.",
    images: ["/icon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFEB3B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-[100dvh] flex flex-col antialiased">{children}</body>
    </html>
  );
}
