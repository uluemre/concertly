import './globals.css';
import type { Metadata } from 'next';
import Providers from './providers';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Concertly',
  description: 'Concert-focused social platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
