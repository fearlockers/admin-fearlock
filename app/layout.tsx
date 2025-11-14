import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fearlock - 管理画面',
  description: 'B to B向け管理システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}

