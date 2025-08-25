'use client'
import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { searchStocks } from "@/lib/api"
import { Search, Loader2, TrendingUp } from "lucide-react"

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if(!mounted) return;
        const delayDebounceFn = setTimeout(() => {
            if(query.length > 2) {
                performSearch();
            } else {
                setResults([])
                setShowResults(false)
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [query, mounted])

    const performSearch = async () => {
        setIsLoading(true);
        try {
            const data =  await searchStocks(query);
            setResults(data);
            setShowResults(true)
        } catch (error) {
            console.error('search error:', error);
            setResults([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelect = (stock) => {
        setQuery('');
        setResults([]);
        setShowResults(false)
        router.push(`/stock/${stock.symbol}`)
    }

    const hanldeBlur = () => {
        setTimeout(() => {
            setShowResults(false)
        }, 200)
    }

    const shouldShowResults = mounted && showResults && results.length > 0;

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus ={() => results.length > 0 && setShowResults(true)}
                placeholder="Search stocks.."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                {isLoading && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" size={20} />
                )}
            </div>

            {shouldShowResults && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    {results.map((stock) => (
                        <div key={stock.symbol}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onClick={()=> handleSelect(stock)}
                        >
                            <div className="font-medium flex items-center">
                                <TrendingUp size={16} className="text-blue-500"/>
                                <span className="text-gray-500 ml-6 text-black text-sm font-bold">{stock.symbol}</span>
                            </div>
                            <div className="text-xs ml-10 text-black">{stock.company}</div>
                        </div>
                    ))}
                </div>
            )}

            {mounted && showResults && query.length > 2 && results.length === 0 && !isLoading && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg p-4">
                    <p className="text-gray-500">No results found</p>
                </div>
            )}
        </div>
    )
}