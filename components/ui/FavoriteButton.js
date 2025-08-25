'use client';
import { useState, useEffect } from "react"
import { Heart, Loader2 } from "lucide-react";

export default function FavoriteButton({stock}) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]')
        setIsFavorite(favorites.some(fav => fav.symbol === stock.symbol));
        setIsLoading(false)
    }, [stock.symbol])

    const toggleFavorite = () => {
        setIsLoading(true)
        const favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]')

        if(isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.symbol !== stock.symbol)
            localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites))
            setIsFavorite(false)
        } else {
            const updatedFavorites = [...favorites, stock]
            localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites))
            setIsFavorite(true)
        }

        setIsLoading(false)
    }


    if(isLoading) {
        return(
            <button disabled className="flex items-center px-4 py-2 bg-gray-100 text-gray-400 rounded-md">
                <Loader2 className="animate-spin mr-2" size={16}/>
                Loading...
            </button>
        )
    }

    return(
        <button onClick={toggleFavorite}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            isFavorite ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        >
            <Heart size={16}
            className={`mr-2 ${isFavorite ? 'fill-current' : ''}`}
            />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    )
}