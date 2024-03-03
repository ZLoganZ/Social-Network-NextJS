import type { Metadata } from 'next';
import { ThemeModeScript } from 'flowbite-react';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import './globals.css';
import SessionProvider from '@/wrapper/SessionWrapper';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {/* <ThemeRegistry> */}
      <head>

        <ThemeModeScript />
      </head>
      <body className={font.className + ' dark'}>
        <SessionProvider>{children}</SessionProvider>
      </body>
      {/* </ThemeRegistry> */}
    </html>
  );
}
