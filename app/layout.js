import './globals.css'
import {Inter} from 'next/font/google'
import {Toaster} from "@/components/ui/toaster"
import {ClerkProvider} from '@clerk/nextjs'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en" data-theme="customLight">
            <body className={`${inter.className} h-screen`}>
            {children}
            <Toaster/>
            </body>
            </html>
        </ClerkProvider>
    )
}