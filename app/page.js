import { getMarketMovers } from "@/lib/api";
import MarketMovers from "@/components/ui/MarketMovers";
import VolumeMovers from "@/components/ui/VolumeMovers";
import PerformanceSummary from "@/components/ui/PerformanceSummary";

export default async function Home() {
    const marketData = await getMarketMovers()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    NIFTY Market Tracker
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Real-time tracking of NIFTY 50 stocks with comprehensive market data and analysis
                </p>
            </div>
            <PerformanceSummary marketData={marketData} />
            <div className="grid grid-cols-1 gap-8 mb-12">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Top Gainers
                    </h2>
                    <MarketMovers movers={marketData.gainers} type="gainers" />
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Top Losers
                    </h2>
                    <MarketMovers movers={marketData.losers} type="losers" />
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Volume Leaders
                    </h2>
                    <VolumeMovers volumeMovers={marketData.volume_movers} />
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Market Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">{marketData.total_count}
                            </div>
                            <div className="text-sm text-blue-800">Total Stocks</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-3xl font-bold text-green-600">{marketData.gainers_count}</div>
                            <div className="text-sm text-green-800">Advancing Stocks</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-3xl font-bold text-red-600">{marketData.losers_count}</div>
                            <div className="text-sm text-red-800">Declining Stocks</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}