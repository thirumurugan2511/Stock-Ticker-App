import Link from "next/link";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

export default function MarketMovers({movers, type}) {
    if(!movers || movers.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-500">
                    No data available
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {movers.map((stock, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-2 whitespace-nowrap">
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            <div className="py-2 whitespace-nowrap">{stock.symbol}</div>
                                            <div className="text-sm text-gray-500">{stock.comp_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                    <div className="text-gray-900">{stock.close.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                    <div className={`flex items-center ${type === 'gainers' ? 'text-green-600' : 'text-red-600'}`}>
                                        {type === 'gainers' ? (
                                            <TrendingUp size={16} className="mr-1" />
                                        ) : (
                                            <TrendingDown size={16} className="mr-1" />
                                        )}
                                        {type === 'gainers' ? '+' : ''} {stock.change.toFixed(2)}
                                    </div>
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                    <div className={`${type === 'gainers' ? 'text-green-600' : 'text-red-600'}`}>
                                        {type === 'gainers' ? '+' : ''} {stock.percent.toFixed(2)}%
                                    </div>
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                    <div className='text-gray-900'>
                                        {stock.volume.toLocaleString()}
                                    </div>
                                </td>
                                <td className="px-6 py-2 whitespace-nowrap">
                                    <Link href={`/stock/${stock.symbol}`}
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        view <ArrowUpRight size={14} className="ml-1"/>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}