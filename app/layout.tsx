import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Chen - Portfolio',
  description: 'Chen Tetroashvili - Full Stack Developer Portfolio',
  icons: {
    icon: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    shortcut: '/android-chrome-192x192.png',
    apple: '/android-chrome-192x192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Combine font variables with base styles and layout classes
  const bodyClassName = `${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`;

  return (
    <html lang="en">
      <body className={bodyClassName}>
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
