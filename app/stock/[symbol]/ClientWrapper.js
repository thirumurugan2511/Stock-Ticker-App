'use client'
import { useEffect, useState } from "react"
import StockGraph from "@/components/ui/StockGraph"
import FavoriteButton from "@/components/ui/FavoriteButton"
import StockDetails from "@/components/ui/StockDetails"

export default function ClientWrapper({
    symbol, priceData, searchResults, stockName
}) {
    const [ mounted, setMounted] = useState(false);
    const [selectStock, setSelectedStock] = useState(null);

    useEffect(() => {
        setMounted(true);

        if(typeof window !== undefined) {
            const storedStock = sessionStorage.getItem('selectedStock');
            if(storedStock) {
                setSelectedStock(JSON.parse(storedStock))
                sessionStorage.removeItem('selectedStock')
            }
        }
    }, [])

    const stockData = selectStock || (searchResults.length > 0 ? searchResults[0] : null)
    const displayStockName = stockData ? stockData.comp_name || stockData.name : stockName

    if(!mounted) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="h-96 flex items-center justify-center">
                    <div className="animate-pulse text-gray-500">Loading stock data</div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {displayStockName} <span className="text-blue-600 font-bold text-xl">{symbol}</span>
                        </h1>
                        <p className="text-gray-600 mt-0">NSE Real-time stock information and analysis</p>
                    </div>
                    <FavoriteButton stock={{symbol, name:displayStockName}}/>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <StockGraph data={priceData} symbol={symbol} />
                </div>
                <div className="space-y-6">
                    <StockDetails stockData={priceData.length > 0 ? priceData[priceData.length -1] : null} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About {stockName}</h2>
                <p className="text-gray-700">
                    {stockName} is traded on the National stock exchange (NSE) under the symbol {symbol}.
                    This page provides comprehensive financial data and performance metrics to help investors make informed decisions about this stock.
                </p>
            </div>
        </>
    )
}