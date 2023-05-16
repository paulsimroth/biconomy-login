import './globals.css';
import "@biconomy/web3-auth/dist/src/style.css";

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
