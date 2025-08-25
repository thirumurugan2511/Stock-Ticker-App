'use client'
import { TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react"

export default function StockDetails({stockData}) {
    if(!stockData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-500">Loading stock data...</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Stats</h2>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Price</span>
                    <span className="text-2xl font-bold text-black font-bold">₹{stockData.open}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Previous Close</span>
                    <span className="text-gray-800">₹{stockData.close}</span>                    
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Day Range</span>
                    <span className="text-gray-800">₹{stockData.low} - {stockData.high}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Open</span>
                    <span className="text-gray-800">₹{stockData.open}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Volume</span>
                    <span className="text-gray-800">₹{stockData.volume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-gray-600 flex items-center">
                        <Clock size={14} className="mr-1" /> Last Updated
                    </span>
                    <span className="text-gray-800 text-sm">
                        {new Date(stockData.date).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    )
}