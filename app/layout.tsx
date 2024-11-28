import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Admin Dashboard',
  description:
    'A user admin dashboard to manage pools'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
