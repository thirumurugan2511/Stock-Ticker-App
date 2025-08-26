import { getStockPrices, searchStocks, getMarketMovers } from "@/lib/api";
import { notFound } from "next/navigation";
import ClientWrapper from "./ClientWrapper";

export async function generateMetadata({ params }) {
  const { symbol } = params;

  try {
    const searchResults = await searchStocks(symbol, 1);
    const stock = searchResults[0];
    const companyName = stock?.comp_name || stock?.name || symbol;

    return {
      title: `${companyName} (${symbol}) - Stock Price, Chart & Analysis | TradeBrains`,
      description: `Get the latest ${companyName} (${symbol}) stock price, performance charts, technical analysis, and financial data to make informed investment decisions.`,
      keywords: [
        `${symbol} stock`,
        `${companyName} share price`,
        'stock market',
        'NSE',
        'BSE',
        'investment',
        'trading',
        'stock analysis',
        'financial data',
      ],
      openGraph: {
        title: `${companyName} (${symbol}) - Stock Price & Analysis`,
        description: `View detailed information and performance charts for ${companyName} (${symbol}) stock.`,
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${companyName} (${symbol}) - Stock Price & Analysis`,
        description: `View detailed information and performance charts for ${companyName} (${symbol}) stock.`,           
      }
    } 
  } catch (error) {
    return {
      title: `${symbol} - Stock Details | TradeBrains`,
      description: `View detailed information and price history for ${symbol} stock`
    }
  }
}

export async function generateStaticParams() {
  try {
    const marketData = await getMarketMovers();
    
    const popularStocks = [
      ...(marketData.gainers || []).slice(0, 5),
      ...(marketData.losers || []).slice(0, 5)
    ];
    
    return popularStocks.map((stock) => ({
      symbol: stock.symbol,
    }));
  } catch (error) {
    const popularSymbols = ['RELIANCE', 'INFY', 'HDFCBANK', 'ICICIBANK', 'TCS'];
    return popularSymbols.map((symbol) => ({ symbol }));
  }
}

export const revalidate = 300;

export default async function StockDetailPage({ params }) {
  const { symbol } = params;

  try {
    const [priceData, searchResults, marketData] = await Promise.all([
      getStockPrices(symbol, 30, 'DAILY', 30),
      searchStocks(symbol, 1),
      getMarketMovers()
    ]);

    let companyName = null;
    let fullData = null;
    
    const allStocks = [
      ...(marketData.gainers || []),
      ...(marketData.losers || []),
      ...(marketData.volume_movers || [])
    ];
    
    fullData = allStocks.find(stock => stock.symbol === symbol);
    
    if (fullData) {
      companyName = fullData.comp_name;
    } else if (searchResults[0]) {
      companyName = searchResults[0].name;
    }
    
    if (!searchResults[0] && !fullData) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <ClientWrapper 
          companyName={companyName}
          symbol={symbol}
          priceData={priceData}
          searchResults={searchResults}
          stockName={companyName || searchResults[0]?.name || symbol}
          fullData={fullData}
        />
      </div>
    );
  } catch (error) {
    notFound();
  }
}