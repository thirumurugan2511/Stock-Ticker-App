'use client'
import { useState, useEffect } from "react"
import { getMarketMovers } from "@/lib/api"
import { TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"

export default function TickerBar() {
    const [movers, setMovers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMovers = async () => {
            try {
                const data = await getMarketMovers()
                console.log("API data:", data)
                
                const allMovers = [...(data.gainers || []), ...(data.losers || [])].slice(0, 10)
                console.log("All movers:", allMovers)
                
                setMovers(allMovers)
            } catch (error) {
                console.error('Failed to fetch Market Movers', error);
                setMovers([])
            } finally {
                setIsLoading(false)
            }
        }
        
        fetchMovers()

        const interval = setInterval(fetchMovers, 300000)
        return () => clearInterval(interval)
    }, [])

    if(isLoading) {
        return (
            <div className="bg-gray-900 py-2 px-4 text-white flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={16}/>
                <span>Loading market data</span>
            </div>
        )
    }

    if(movers.length === 0) {
        return (
            <div className="bg-gray-900 py-2 px-4 text-white text-center">
                Market data unavailable
            </div>
        )
    }

    return (
        <div className="bg-gray-900 py-2 text-white overflow-hidden">
            <div className="relative w-full overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                    {movers.map((stock, index) => (
                        <span key={index} className="mx-4 inline-block">
                            <Link 
                                href={`/stock/${stock.symbol}`}
                                className="inline-flex items-center hover:underline"
                            >
                                <span className="font-semibold mr-2 text-white">{stock.symbol}</span>
                                <span className="text-white mr-1">₹{stock.price}</span>
                                <span className={stock.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} (
                                    {stock.change >= 0 ? '+' : ''}{stock.percent.toFixed(2)}%)
                                </span>
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}