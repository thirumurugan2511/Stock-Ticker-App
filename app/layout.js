import {Inter} from 'next/font/google';
import './globals.css';
import TickerBar from '@/components/ui/TickerBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'TradeBrains Stock Ticker',
    description: 'Real-time stock market data and analyis',
}

export default function RootLayout({children}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <TickerBar />
                <div className="min-h-screen bg-gray-50">
                <Header/>
                <main>{children}</main>
                <Footer />
                </div>
            </body>
        </html>
    )
}