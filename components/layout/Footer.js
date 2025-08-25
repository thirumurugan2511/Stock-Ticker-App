export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                         <h3 className="text-xl font-semibold"> TradeBrains Stock Ticker</h3>
                         <p className="text-gray-400 mt-2">Real-time stock market data and analysis</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Company</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li href="#" className="hover:text-white">About Us</li>
                            <li href="#" className="hover:text-white">Contact</li>
                            <li href="#" className="hover:text-white">Privacy Policy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}