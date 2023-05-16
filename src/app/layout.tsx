import './globals.css';
import { Inter } from 'next/font/google';
import "@biconomy/web3-auth/dist/src/style.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Web3 Login',
  description: 'This is a Web3 Login done with Biconomy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
