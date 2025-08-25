import Link from "next/link";
import SearchBar from "../ui/SearchBar";

export default function Header() {
    return(
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <Link href="/" className="flex items-center mb-4 md:mb-0">
                        <div className="bg-blue-600 text-white font-bold text-xl px-3 py-2 rounded-md mr-2">
                            TB
                        </div>
                        <span className="text-xl font-semibold text-gray-800">TradeBrains</span>
                    </Link>

                    <div className="flex-1 md:px-8">
                        <SearchBar />
                    </div>

                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
                        Home
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}