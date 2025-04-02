import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header';
import { Toaster } from 'sonner';
import SessionProvider from '../components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wrist Word',
  description: '基于 Next.js 15 构建的现代化 Web 应用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          {children}
          <Toaster richColors position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
