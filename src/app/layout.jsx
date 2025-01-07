import { Poppins } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/lib/query-provider'
import { Toaster } from '@/components/ui/toaster'
import SessionProvider from '@/lib/session-provider'

const fontSans = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'PEMIRAMA UNTAN',
  description: 'Created by UPA. TIK',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} antialiased`}>
        <SessionProvider>
          <QueryProvider>
            <div className="min-h-screen flex flex-col">{children}</div>
          </QueryProvider>
        </SessionProvider>

        <Toaster />
      </body>
    </html>
  )
}
