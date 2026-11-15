import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creators Zone | Discover. Connect. Create.",
  description: "Discover talented photographers, videographers, editors and creative studios near you.",
  keywords: ["creators", "photographers", "videographers", "creative marketplace", "booking"],
  openGraph: {
    title: "Creators Zone",
    description: "Your Vision. Our Creators. One Platform.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
