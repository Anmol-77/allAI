// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import ClientBody from "./ClientBody";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Outlier Playground",
//   description: "A chat application for technical discussions and problem-solving",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
//       <ClientBody className="bg-zinc-900 text-white">{children}</ClientBody>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

// Import JetBrains Mono
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outlier Playground",
  description: "A chat application for technical discussions and problem-solving",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetBrainsMono.variable} dark`}>
      <ClientBody className="bg-zinc-900 text-white">{children}</ClientBody>
    </html>
  );
}
