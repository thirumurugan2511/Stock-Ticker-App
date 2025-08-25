
const API_URL = "https://portal.tradebrains.in/api/assignment"

export async function searchStocks(keyword, length = 10) {
   try {
    const res =  await fetch (
        `${API_URL}/search?keyword=${keyword}&length=${length}`,
        {next: {revalidate: 3600}}
    );

    if(!res.ok) {
        throw new Error(`Search API responded with status ${res.status}`)
    }
    
    return await res.json();
   } catch(error) {
    console.error('Error searching stocks:', error)
    return[]
   }
}

export async function getMarketMovers(index = 'NIFTY') {
   try {
    const res =  await fetch (
        `${API_URL}/index/${index}/movers/`,
        {next: {revalidate: 300}}
    );

    if(!res.ok) {
        throw new Error(`Market movers API responded with status ${res.status}`)
    }
    
    return await res.json();
   } catch(error) {
    console.error('Error fetching market movers:', error)
    return[]
   }
}

export async function getStockPrices(symbol, days = 1, type = 'INTRADAY', limit = 1) {
   try {
    const res =  await fetch (
        `${API_URL}/stock/${symbol}/prices?days=${days}&type=${type}&limit=${limit}`,
        {next: {revalidate: 300}}
    );

    if(!res.ok) {
        if(res.status === 404) {
            throw new Error ('Stock not found')
        }
        throw new Error(`Stock prices API responded with status ${res.status}`)
    }
    
    // return Array.isArray(data) ? data : []
    return await res.json();
   } catch(error) {
    console.error(`Error fetching prices for ${symbol}:`, error)
    throw error
   }
}