import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalonMall | بازار تخصصی آرایشگران",
  description: "مارکت‌پلیس تخصصی محصولات و تجهیزات آرایشگاهی",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
