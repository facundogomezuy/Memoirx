import Header from "./components/Header/Header"
import "../styles/globals.css"
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'MemoirX',
  description: '',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
