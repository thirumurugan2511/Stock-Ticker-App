import { getStockPrices, searchStocks } from "@/lib/api";
import { notFound } from "next/navigation";
import ClientWrapper from "./ClientWrapper";

export async function generateMetadata({ params }) {
  const { symbol } = params;

  try {
    return {
      title: `${symbol} - Stock Price, Chart & Analysis | TradeBrains`,
      description: `Get the latest (${symbol}) stock price, performance charts, technical analysis, and financial data to make informed investment decisions.`,
      keywords: [
        `${symbol} stock`,
        'stock market',
        'NSE',
        'BSE',
        'investment',
        'trading',
        'stock analysis',
        'financial data',
      ],
      openGraph: {
        title: `(${symbol}) - Stock Price & Analysis`,
        description: `View detailed information and performance charts for (${symbol}) stock.`,
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: `(${symbol}) - Stock Price & Analysis`,
        description: `View detailed information and performance charts for (${symbol}) stock.`,           
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
  const popularSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
  
  return popularSymbols.map((symbol) => ({
    symbol,
  }));
}

export const revalidate = 300;

export default async function StockDetailPage({ params }) {
  const { symbol } = params;

  try {
    const [priceData, searchResults] = await Promise.all([
      getStockPrices(symbol, 30, 'DAILY', 30),
      searchStocks(symbol, 1)
    ]);

    const stock = searchResults[0];
    
    if (!stock) {
      notFound();
    }

    const stockName = stock.name;

    return (
      <div className="container mx-auto px-4 py-8">
        <ClientWrapper 
          symbol={symbol}
          priceData={priceData}
          searchResults={searchResults}
          stockName={stockName}
        />
      </div>
    );
  } catch (error) {
    notFound();
  }
}