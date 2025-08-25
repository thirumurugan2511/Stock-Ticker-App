import { TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react";

export default function PerformanceSummary({marketData}) {
    const advancingPercentage = (marketData.gainers_count / marketData.total_count * 100).toFixed(1);
    const decliningPercentage = (marketData.losers_count / marketData.total_count * 100).toFixed(1);

    const avgGainerChange = marketData.gainers.reduce((sum, stock) => sum + stock.percent, 0) / marketData.gainers_count;
    const avgLoserChange = marketData.losers.reduce((sum, stock) => sum + stock.percent, 0) / marketData.losers_count;

    return (
        <div className="grid grid=cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <BarChart3 className="text-blue-600" size={24} />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Stocks</h3>
                        <p className="text-2xl font-bold text-gray-900">{marketData.total_count}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="text-green-600" size={24} />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Advancing</h3>
                        <p className="text-2xl font-bold text-green-600">{marketData.gainers_count}</p>
                        <p className="text-sm text-gray-500">{advancingPercentage}% Avg +{avgGainerChange.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <TrendingUp className="text-red-600" size={24} />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Declining</h3>
                        <p className="text-2xl font-bold text-red-600">{marketData.losers_count}</p>
                        <p className="text-sm text-gray-500">{decliningPercentage}% Avg +{avgLoserChange.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <PieChart className="text-purple-600" size={24} />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Market Sentiment</h3>
                        <p className="text-xl font-bold text-gray-900">
                            {marketData.gainers_count > marketData.losers_count ? 'Bulish' : 'Bearish'}
                        </p>
                        <p className="text-sm text-gray-500">
                            {marketData.gainers_count > marketData.losers_count ? 'Positive' : 'negative'} momentum
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}