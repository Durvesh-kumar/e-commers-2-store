"use client"

import { useCart } from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs"
import { CircleUser, Heart, House, Menu, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { useState } from "react";

const NaveBar = () => {
    const usePathName = usePathname()
    const { user } = useUser();
    const Cart = useCart();

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="sticky top-0 left-0 h-16 w-full flex justify-between gap-4 items-center border-b shadow-lg bg-white z-10 px-10 max-lg:px-5 max-sm:px-2">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="image"
                    height={1000}
                    width={1000}
                    className="w-16 h-16 object-scale-down mix-blend-multiply"
                />
            </Link>
            <SearchBar />
            <div className="flex items-center gap-3 max-lg:hidden">
                <Link
                    href="/"
                    className={`flex items-center gap-1 font-bold hover:text-orange-600 
                        ${usePathName === "/" ? "text-blue-600" : "text-gray-950"}`}
                >
                    <House className="w-4 h-4" />
                    <span>Home</span>
                </Link>
                <Link
                    href={user ? "/wishlist" : "/sign-in"}
                    className={`flex items-center gap-1 font-bold hover:text-orange-600 
                        ${usePathName === "/wishlist" ? "text-blue-600" : "text-gray-950"}`}
                >
                    <Heart className="w-4 h-4" />
                    Wishlist
                </Link>
                <Link
                    href={user ? "/orders" : "/sign-in"}
                    className={`flex items-center gap-1 font-bold hover:text-orange-600
                         ${usePathName === "/orders" ? "text-blue-600" : "text-gray-950"}`}
                >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order</span>
                </Link>
            </div>

            <Menu onClick={() => setIsOpen(!isOpen)} className=" cursor-pointer lg:hidden" />

            {
                isOpen && (
                    <div className="flex gap-4 top-16 right-5 absolute flex-col border shadow-lg py-6 rounded-xl px-1 bg-white lg:hidden">

                <Link href='/' className={`hover:text-red-600 hover:bg-slate-200 px-6 flex items-center gap-1 ${usePathName === "/" && "text-blue-600"}`}>
                  <House className="w-4 h-4 text-gray-400" />
                  <span>Home</span>
                </Link>
                <Link href={user ? "/wishlist" : "/sign-in"} className={`hover:text-red-600 hover:bg-slate-200 px-6 flex items-center gap-1 ${usePathName === "/wishlist" && "text-blue-600"}`}>
                  <Heart className="w-4 h-4 text-gray-400" />
                  <span>Wishlist</span>
                </Link>
                <Link href={user ? "/orders" : "/sign-in"} className={`hover:text-red-600 hover:bg-slate-200 px-6 flex items-center gap-1 ${usePathName === "/orders" && "text-blue-600"}`}>
                  <ShoppingBag className="w-4 h-4 text-gray-400" />
                  <span>Orders</span>
                </Link>
              </div>
                )
            }



            <Link
                href={user ? "/cart" : "/sign-in"}
                className={`max-lg:hidden flex items-center gap-1 font-bold border-2 border-black hover:text-orange-600 hover:border-orange-600  rounded-2xl px-4 py-1 
            ${usePathName === "/cart" && ("text-blue-600 border-blue-500")}`}
            >
                <ShoppingCart className="w-5 h-5" />
                Cart {""} ({user ? Cart.cartItems.length : 0})
            </Link>

            <Link href={user ? "/cart" : "/sign-in"} className=" relative lg:hidden">
            <p className="bg-gray-950 text-white flex items-center justify-center rounded-2xl absolute top-[-15px] left-3 px-[6px] py-[-2px]">{Cart.cartItems.length}</p>
              <ShoppingCart className="w-6 h-6"/>
            </Link>

            {
                user ? <UserButton afterSignOutUrl="/sign-in" /> : <Link href="/sign-in" className=""><CircleUser className="w-9 h-9" /></Link>
            }
        </div>
    )
}

export const dynamic = "force-dynamic";
export default NaveBar;