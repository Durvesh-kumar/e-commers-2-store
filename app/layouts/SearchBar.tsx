"use client"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const SearchBar = () => {
    const [query, setQuery] = useState("")
    return (
        <div className="flex items-center border shadow-md rounded-2xl w-96 pl-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search heare......."
                className=" outline-none py-1 px-2 rounded-l-2xl w-full"
            />
            <Link href={`/products/${query}`} onClick={()=> setQuery("")} className="bg-orange-400 h-8 w-14  flex items-center justify-center rounded-r-2xl "><Search className="w-5 h-5"/></Link>
        </div>
    )
}
export const dynamic = "force-dynamic";
export default SearchBar