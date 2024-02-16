import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Navigation from '@/components/navigation';
import { AppWrapper } from '@/contexts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RSéries | Tudo sobre séries',
  description: 'Tudo sobre séries de TV',
  keywords: ['séries', 'tv', 'tmdb', 'next 14']
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppWrapper>
      <html lang="pt-br">
        <body
          className={`${inter.className} bg-background-pages text-font-color`}
        >
          <Header />
          <Navigation />
          {children}
        </body>
      </html>
    </AppWrapper>
  );
}
