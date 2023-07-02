import Header from "./components/Header/Header"
import "../styles/globals.css"
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
        </body>
    </html>
  )
}
