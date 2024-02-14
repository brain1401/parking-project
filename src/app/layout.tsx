import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ParkNFind",
  description: "공원 근처 주차장 찾기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6a65ffcdc449e45a37ce301b656cbe45&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} h-[100dvh] flex flex-col`}>{children}</body>
    </html>
  );
}
