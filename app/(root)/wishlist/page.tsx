"use client"

import Loader from "@/app/components/Loader";
import ProductCard from "@/app/components/products/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"

const Wishlist = () => {
    const { user } = useUser()
    const [loading, setLoading] = useState(true);
    const [userSigned, setUserSiged] = useState<UserType | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);

    const getUser = async () => {
        const res = await fetch("/api/users", {
            method: "GET"
        });

        if (res.ok) {
            const data = await res.json();
            setUserSiged(data)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [user]);

    const getWishlistProduct = async () => {
        setLoading(true)
        if (!userSigned) return;

        const wishlistProduct = await Promise.all(userSigned.wishlist.map(async (productId) => {
            const products = await getProductDetails(productId)
            return products;
        }));

        setProducts(wishlistProduct);
        setLoading(false)
    };

    useEffect(() => {
        getWishlistProduct()
    }, [userSigned]);

    const updateSingedInUser = (updateUser: UserType) => {
        setUserSiged(updateUser)
    }

    return loading ? <Loader/> : (
        <div className="grid gap-6">
            <h1 className="text-3xl font-bold text-gray-950">Your Wishlist</h1>
            <hr className="py-0.5 bg-gray-950" />

            {
                products?.length === 0 && (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center">No Products your Wishlist</h1>
                    </div>
                )
            }

            <div className="flex flex-wrap mx-auto gap-10 justify-center items-center">
                {
                    products.map((product: ProductType) => (
                        <ProductCard key={product._id} updateSingedInUser={updateSingedInUser} product={product} />
                    ))
                }
            </div>

        </div>
    )
}

export const dynamic = "force-dynamic";
export default Wishlist