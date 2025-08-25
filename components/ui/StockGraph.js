'use client'
import { useState, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar, Loader2 } from "lucide-react"

export default function StockGraph ({data, symbol}) {
    const [timeRange, setTimeRange] = useState('1m')

        const filterData = useMemo(() => {
        if(!data || data.length === 0) return [];

        const now = new Date();
        let cutoffDate = new Date();

        switch (timeRange) {
            case '1w': 
                cutoffDate.setDate(now.getDate() - 7);
                break;
            case '1m': 
                cutoffDate.setMonth(now.getMonth() - 1);
                break;
            case '3m': 
                cutoffDate.setMonth(now.getMonth() - 3);
                break;
            case '6m': 
                cutoffDate.setMonth(now.getMonth() - 6);
                break;
            case '1y': 
                cutoffDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                return data;
        }

        return data.filter(item => {
            const itemDate = new Date(item.date)
            return itemDate >= cutoffDate
        })
    }, [data, timeRange])

    const chartData =  filterData.map(item => ({
        date: item.date,
        price: item.close,
        open: item.open,
        high: item.high,
        low: item.low,
        volume: item.volume
    }))

    const formatPrice = (value) => `₹${value.toFixed(2)}`
    const formatDate = (value) => new Date(value). toLocaleDateString();

        if(!data || data.length === 0) {
        return (
            <div className="h-96 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                <Loader2 className="animate-sppin text-blue-500 mb-4" size={32} />
                <p className="text-gray-500">Loading chart data</p>
            </div>
        )
    }

    return(
        <div className="bg-white p-4 rounded-lg">
            <div className="flex fle-col md:flex-row md:items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">{symbol} Price Chart</h3>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <Calendar size={16} className="text-gray-500" />
                    <div className="flex space-x-1">
                        {['1w', '1m', '3m', '6m', '1y'].map((range) => (
                            <button key={range}
                            className={`px-3 py-1 text-sm rounded-md ${timeRange === range ? 'bg-blue-500 text-white': 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            onClick={() => setTimeRange(range)}
                            >
                            {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width='100%' height="100%">
                    <LineChart data={chartData} margin={{top:5, right:5, left:5, bottom:5}}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey='date'
                        tickFormatter={formatDate}
                        tick={{fontSize: 12}}
                        />
                        <YAxis
                        domain={['dataMin - 5', 'dataMax + 5']}
                        tickFormatter={formatPrice}
                        tick={{fontSize: 12}}
                        />
                        <Tooltip
                        formatter={(value) => [formatPrice(value), 'Price']}
                        labelFormatter={formatDate}
                        contentStyle={{borderRadius: '8px', border: '1px solid #e5e7eb'}}
                        />
                        <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#3b82f6' }}
                        name="Price"
                        >
                        </Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                <p>Shwing {filterData.length} trading days of data</p>
            </div>
        </div>
    )
}